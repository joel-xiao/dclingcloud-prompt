/*
================================================================================
                          提示词：拓扑异常节点下游查找算法
================================================================================

角色设定：
- 你是一个前端算法逻辑专家，熟悉复杂拓扑图节点关系、异常节点检测、
  路径优先级策略和性能优化。
- 目标是实现一个可靠算法，从根节点向下游遍历，提取所有与异常节点
  相关或可达的链路。

背景说明：
- 系统包含：
  nodes: 节点数组（应用实例信息 + 异常状态）
  links: 链路数组（from/to 节点 + 调用时延 + 状态）
  props: 节点唯一标识字段组合
- 算法名：firstPhase(state)
- 常量：MAX_NODE（最大节点显示数量）

功能需求（逻辑规则）：
1. 起点：
   - 从“根节点”开始（使用 common.findRootNodes() 获取）。
2. 遍历方向：
   - 只允许向下游扩展（from → to），禁止向上游遍历。
3. 异常优先：
   - 路径上遇到异常节点（common.isException(node)）时，优先保留整条链路。
4. 正常路径显示：
   - 未遇到异常节点前，仍要显示节点，保证从根到异常节点前的所有正常节点展示。
5. 多分支处理：
   - 若下游存在多个分叉，优先选择可通向异常节点的分支；
   - 若多个分支都通向异常节点，保留节点数较多的路径（避免丢节点）。
6. 最大限制：
   - 当前节点数未达到 MAX_NODE，则继续向下扩展；
   - 达到 MAX_NODE 时，停止扩展。
7. 节点筛选：
   - 最终结果包含符合条件的节点及其链路；
   - 多余节点裁剪优先级：根节点 > 异常节点 > 异常路径节点 > 其他正常节点。

输入示例：
{
  "nodes": [...],
  "links": [...],
  "props": ["appid", "agent", "service_type", "url"]
}

输出目标：
- 返回对象：
  {
    nodes: [...], // 最终展示的节点（不超过 MAX_NODE）
    links: [...], // 对应的连线
    props
  }
- 算法要求：
  - 不丢节点；
  - 不绕过上一个异常节点；
  - 分支选择合理（优先长链路）；
  - 稳定、可复现。

输出形式：
1. 完整可运行 JS 代码；
2. 保留详细注释；
3. 符合上述逻辑；
4. 仅依赖 common.js，不依赖其他外部库。
================================================================================
*/

import common from './common.js';
const config = getGlobalConfig('g_transaction');
const MAX_NODE = config?.frist_max_node || 50;

function firstPhase(state) {
  const { nodes, links, props } = state;

  const rootNodes = common.findRootNodes(state) || [];
  if (rootNodes.length === 0) {
    console.warn('未找到任何根节点');
    return { nodes: [], links: [], props };
  }

  const exceptionNodes = nodes.filter(n => common.isException(n));

  const initialNodesSet = new Set();
  [...rootNodes].forEach(node => {
    const key = common.getNodeKey(node, props);
    initialNodesSet.add(key);
  });
  const initialNodes = Array.from(initialNodesSet).map(key => {
    const nodeIdx = nodes.findIndex(n => common.getNodeKey(n, props) === key);
    return nodes[nodeIdx];
  });

  const nodeMap = new Map();
  initialNodes.forEach(node => {
    const key = common.getNodeKey(node, props);
    nodeMap.set(key, node);
  });

  // 构建从 key -> 出边 list 的快速索引（link.to keys）
  const outMap = new Map();
  links.forEach(l => {
    const fromKey = common.getNodeKey(nodes[common.findNodeIndex(nodes, l.from)], props);
    const toNodeIdx = common.findNodeIndex(nodes, l.to);
    if (toNodeIdx === -1) return;
    const toKey = common.getNodeKey(nodes[toNodeIdx], props);
    if (!outMap.has(fromKey)) outMap.set(fromKey, []);
    outMap.get(fromKey).push(toKey);
  });

  // helper: 根据 key 得到 node
  const getNodeByKey = (key) => {
    const idx = nodes.findIndex(n => common.getNodeKey(n, props) === key);
    if (idx === -1) return null;
    return nodes[idx];
  };

  // 对于每个 root，从 root 枚举所有下游 branch（路径），返回路径数组（nodeKey 列表）
  const getAllBranchesFromRoot = (rootKey) => {
    const branches = [];
    const stack = [[rootKey, [rootKey]]]; // [currentKey, pathSoFar]
    while (stack.length) {
      const [curKey, path] = stack.pop();
      const outs = outMap.get(curKey) || [];
      if (outs.length === 0) {
        branches.push(path.slice());
      } else {
        for (let i = 0; i < outs.length; i++) {
          const nextKey = outs[i];
          // 防环：如果已在 path 中则跳过
          if (path.includes(nextKey)) {
            // 遇到环把当前 path 视为终点分支
            branches.push(path.slice());
            continue;
          }
          const newPath = path.concat(nextKey);
          stack.push([nextKey, newPath]);
        }
      }
    }
    return branches;
  };

  // 收集所有 candidate branches（每个 branch 包含 metadata）
  const candidateBranches = [];
  initialNodes.forEach(rootNode => {
    const rootKey = common.getNodeKey(rootNode, props);
    const branches = getAllBranchesFromRoot(rootKey);
    branches.forEach(pathKeys => {
      // 计算 branch 是否包含异常，firstExceptionIndex，长度
      let hasException = false;
      let firstExceptionIndex = -1;
      for (let i = 0; i < pathKeys.length; i++) {
        const n = getNodeByKey(pathKeys[i]);
        if (n && common.isException(n)) {
          hasException = true;
          firstExceptionIndex = i;
          break;
        }
      }
      const length = pathKeys.length;
      candidateBranches.push({
        rootKey,
        pathKeys,
        hasException,
        firstExceptionIndex,
        length
      });
    });
  });

  // 排序候选分支：优先包含异常（hasException true），在 hasException 相同情况下，按 length 降序（更长优先）
  candidateBranches.sort((a, b) => {
    if (a.hasException && !b.hasException) return -1;
    if (!a.hasException && b.hasException) return 1;
    // 同为异常或同为非异常时，长度更长的优先
    if (b.length !== a.length) return b.length - a.length;
    // 最后按是否更早出现异常（firstExceptionIndex 小优先），以便尽早把异常纳入
    if (a.firstExceptionIndex !== b.firstExceptionIndex) {
      return (a.firstExceptionIndex === -1 ? 1 : a.firstExceptionIndex) - (b.firstExceptionIndex === -1 ? 1 : b.firstExceptionIndex);
    }
    return 0;
  });

  // 按排序结果逐个把 branch 的节点加入 connectedNodes，直到达到 MAX_NODE
  const finalNodeKeysOrder = []; // 保持插入顺序
  const finalNodeKeysSet = new Set();
  // 先把根节点加入（initialNodes）
  initialNodes.forEach(n => {
    const k = common.getNodeKey(n, props);
    if (!finalNodeKeysSet.has(k)) {
      finalNodeKeysSet.add(k);
      finalNodeKeysOrder.push(k);
    }
  });

  for (let i = 0; i < candidateBranches.length && finalNodeKeysSet.size < MAX_NODE; i++) {
    const branch = candidateBranches[i];
    // 如果 branch 的 rootKey 不在 finalNodeKeysSet 中，跳过（我们只从已选根展开）
    if (!finalNodeKeysSet.has(branch.rootKey)) continue;

    // 依次加入 pathKeys（保证连通性），直到达到 MAX_NODE
    for (let j = 1; j < branch.pathKeys.length && finalNodeKeysSet.size < MAX_NODE; j++) {
      const key = branch.pathKeys[j];
      if (!finalNodeKeysSet.has(key)) {
        finalNodeKeysSet.add(key);
        finalNodeKeysOrder.push(key);
      }
    }

    // 特别处理若 branch 仅包含 rootKey（length==1）且我们还有配额，尝试加入 nothing（无动作）
  }

  // 最后把 finalNodeKeysOrder 映射回节点对象 list
  const finalNodes = finalNodeKeysOrder.map(key => {
    const nodeIdx = nodes.findIndex(n => common.getNodeKey(n, props) === key);
    return nodes[nodeIdx];
  }).filter(Boolean);

  // 构建 finalLinks：只保留源与目标都在 finalNodes 集合内的 links（保持连通）
  const finalNodeKeys = new Set(finalNodes.map(n => common.getNodeKey(n, props)));
  const finalLinks = links.filter(link => {
    const fromNodeIdx = common.findNodeIndex(nodes, link.from);
    const fromNode = nodes[fromNodeIdx];
    const toNodeIdx = common.findNodeIndex(nodes, link.to);
    const toNode = nodes[toNodeIdx];
    
    if (!fromNode || !toNode) return false;

    const fromKey = common.getNodeKey(fromNode, props);
    const toKey = common.getNodeKey(toNode, props);
    return finalNodeKeys.has(fromKey) && finalNodeKeys.has(toKey);
  });

  return {
    nodes: finalNodes,
    links: finalLinks,
    props
  };
}

export default {
  firstPhase,
  MAX_NODE,
};
