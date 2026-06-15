# 模块重构/迁移标准流程

## 适用场景

- 旧模块目录结构不规范（深层嵌套 → 扁平化）
- 本地 `api.ts` 迁移到 `src/api/modules/` 层
- 组件提取（模块专属 → 业务域通用 → 全局通用）
- 类型定义整理（`types/index.ts` → `types.ts`）
- 废弃代码清理

## 前置条件

- 明确重构范围（单模块 / 业务域 / 跨域）
- 确认模块当前可正常运行
- 了解模块的路由配置

---

## 阶段1：现状分析

**1.1 梳理当前目录结构**

```bash
# 列出模块完整目录树
ls -la src/views/[业务域]/[模块]/
```

**1.2 识别问题**

| 问题类型     | 表现                                 | 目标                               |
| ------------ | ------------------------------------ | ---------------------------------- |
| 目录嵌套过深 | `list/index.vue`, `detail/index.vue` | 扁平化为 `index.vue`, `detail.vue` |
| 本地 API     | 模块内有 `api.ts` 或 `api/`          | 迁移到 `src/api/modules/[业务域]/` |
| 类型嵌套     | `types/index.ts`                     | 合并为根目录 `types.ts`            |
| 重复组件     | 多模块有相同组件                     | 提取到业务域 `components/`         |
| 废弃文件     | 旧版代码未删除                       | 清理                               |

**1.3 检查依赖关系**

- 路由配置：`src/assets/json/authMenuList.json` 中的 `component` 路径
- 其他模块是否引用了当前模块的组件/类型
- API 接口是否被其他模块共用

---

## 阶段2：API 层迁移

**2.1 创建目标文件**

```typescript
// src/api/modules/[业务域]/[module].ts
import { http } from "@/api";

// 从旧 api.ts 迁移接口，保持函数签名不变
export const getXxxList = (params: any) => http.get(`/api/path/list`, params, { loading: false, cancel: false });
```

**2.2 更新统一导出**

```typescript
// src/api/modules/[业务域]/index.ts
export * from "./[module]";
```

**2.3 更新引用**

将模块内所有 `import { xxx } from "./api"` 改为 `import { xxx } from "@/api/modules/[业务域]"`

**2.4 删除旧文件**

确认所有引用更新后，删除模块内的 `api.ts` 或 `api/` 目录

---

## 阶段3：目录扁平化

**3.1 文件移动**

| 旧路径                       | 新路径                |
| ---------------------------- | --------------------- |
| `[模块]/list/index.vue`      | `[模块]/index.vue`    |
| `[模块]/detail/index.vue`    | `[模块]/detail.vue`   |
| `[模块]/types/index.ts`      | `[模块]/types.ts`     |
| `[模块]/list/components/`    | `[模块]/components/`  |
| `[模块]/detail/composables/` | `[模块]/composables/` |

**3.2 更新内部引用**

移动文件后，更新所有相对路径的 import 语句。

**3.3 更新路由**

修改 `src/assets/json/authMenuList.json` 中对应的 `component` 路径。

**3.4 删除空目录**

清理 `list/`、`detail/`、`types/` 等空目录。

---

## 阶段4：组件提取（可选）

**4.1 判断提取层级**

| 条件                 | 放置位置                                |
| -------------------- | --------------------------------------- |
| 仅当前模块使用       | `src/views/[业务域]/[模块]/components/` |
| 业务域内 2+ 模块复用 | `src/views/[业务域]/components/`        |
| 跨业务域复用         | `src/components/`                       |

**4.2 提取步骤**

1. 将组件移动到目标目录
2. 抽象 Props 接口，去除硬编码的业务逻辑
3. 更新所有引用路径
4. 验证功能正常

---

## 阶段5：Composables 整理（可选）

**5.1 合并分散的逻辑**

如果 `list/` 和 `detail/` 各有自己的 composables，合并到统一的 `composables/` 目录：

```
composables/
  ├── useTable.ts      # 列表页逻辑
  ├── useDetail.ts     # 详情页逻辑
  └── useMetrics.ts    # 指标数据逻辑（可选）
```

**5.2 职责单一**

每个 composable 只负责一个关注点，避免大杂烩。

---

## 阶段6：验证

**6.1 代码检查与诊断**

由用户决定是否在本地运行自检（如 `pnpm lint:eslint` / `pnpm type:check`）或诊断工具，Agent 不得在未经授权时擅自发起命令。

**6.3 功能验证**

- 列表页正常加载
- 详情页正常跳转
- 筛选/分页/搜索功能正常
- 图表数据正常渲染

**6.4 清理确认**

- [ ] 无残留的旧目录和文件
- [ ] 无本地 `api.ts`
- [ ] 无 `types/index.ts` 嵌套
- [ ] 无未更新的 import 路径
- [ ] 路由配置已更新

---

## 目标结构

重构后的模块应符合以下结构：

```
[模块]/
  ├── index.vue              # 列表页
  ├── detail.vue             # 详情页（可选）
  ├── types.ts               # 类型定义
  ├── composables/           # 组合式函数
  │   ├── useTable.ts
  │   └── useDetail.ts
  ├── components/            # 模块专属组件
  └── config/                # 配置文件（可选）
```

API 接口位于 `src/api/modules/[业务域]/[module].ts`

---

## 参考案例

| 案例     | 路径                                 | 重构内容                                                 |
| -------- | ------------------------------------ | -------------------------------------------------------- |
| 主机模块 | `src/views/infraMonitoring/host/`    | 深层嵌套 → 扁平化、本地 API → 集中 API、组件提取到业务域 |
| 进程模块 | `src/views/infraMonitoring/process/` | 全新开发，直接按扁平化结构搭建                           |
