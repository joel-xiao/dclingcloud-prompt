---
name: trace-waterfall
description: 开发或修改调用链分析、瀑布图时序分布、节点右侧抽屉参数展示等功能。当界面包含“父子嵌套甘特图+时序计算+右侧抽屉面板”特征时触发。
---

# 场景基准：调用链追踪与时序瀑布图场景

## 1. 场景特征识别
- 页面由“**父子节点嵌套结构图表 + 时序甘特图Timeline + 节点点击弹出右侧参数抽屉**”构成。
- 典型案例：链路分析大盘 `linkAnalysis`、代码堆栈追踪 `codeTracking`。

## 2. 核心组件资产映射
当识别到调用链时序特征时，AI **必须**直接复用或对齐以下资产：
1. **多数据源适配器**：实现 `TypeAdapter` 驱动模型。将 `app`、`sql`、`external` 等不同类型的接口数据格式统一标准化。
2. **时序位置布局**：基于偏移量（Offset）与耗时占比动态计算并应用 inline styles。
3. **节点详情展示**：右侧抽屉面板（`DetailDrawer`）统一接收并渲染 Span 属性元数据与堆栈日志。

## 3. 开发规范与实例参考
- [Waterfall 甘特图位置百分比算法与抽屉规范](./references/waterfall-calc.md)
- [TypeAdapter 多源数据适配器模式实现标准](./references/adapter-pattern.md)
