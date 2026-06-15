# 链路场景：Waterfall 甘特图位置算法与抽屉规范

本规范定义调用链时序甘特图（瀑布图）的前端布局排版与属性交互要求。

## 1. 甘特图时序分布核心算法 (Timeline Percentages)
- 概念定义：
  - 调用链开始时间：\(T_{start}\)
  - 调用链总耗时：\(D_{total} = T_{end} - T_{start}\)
  - 某个 Span 的开始时间：\(T_{span}\)
  - 该 Span 的独立耗时：\(D_{span}\)
- 百分比样式计算公式：
  - **左侧偏移量 (Left Offset)**:
    \[
    \text{left} = \frac{T_{span} - T_{start}}{D_{total}} \times 100\%
    \]
  - **节点占比宽度 (Width)**:
    \[
    \text{width} = \max\left(\frac{D_{span}}{D_{total}} \times 100\%, 1\%\right)
    \]
    *注：为了防止极短耗时节点在图表上消失，宽度必须设置 `1%` 或 `2px` 的最小保护值。*

## 2. 父子节点树状递归结构 (Tree View Layout)
- 缩进深度：每个子节点基于深度 `depth` 缩进 `depth * 16px`。
- 折叠机制：利用 `expanded` 属性控制子树行的渲染，保持页面纵向滚动的平滑。

## 3. 右侧详情抽屉 (DetailDrawer)
- 点击瀑布图节点，从右侧拉出 `DetailDrawer` 组件。
- 详情展示结构：
  - **Basic Specs**：Span 名称、耗时 (ms)、服务类型、触发来源。
  - **Metadata Attributes**：表格化键值对渲染（如 SQL 语句、HTTP Method、状态码）。
  - **Logs / CallStacks**：使用单行折叠式展示多条异常堆栈日志，并提供一键复制代码块。
