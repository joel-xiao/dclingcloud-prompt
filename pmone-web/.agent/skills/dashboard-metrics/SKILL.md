---
name: dashboard-metrics
description: 开发或修改指标看板、趋势图表、监控大盘页面。当界面包含“全局时间范围选择+折线/柱状趋势图+多图表联动”特征时触发。
---

# 场景基准：监控大盘与趋势分析场景

## 1. 场景特征识别
- 页面由“**全局时间范围/粒度选择（顶部）+ 核心指标统计卡片网格 + 多组折线/柱状趋势图**”构成。
- 典型案例：用户体验性能看板 `userExperience-v2`、链路时序分析。

## 2. 核心组件资产映射
当识别到大盘趋势特征时，AI **必须**直接复用以下资产：
1. **全局时间同步（Store）**：使用 `usePeriodStore` 作为唯一时间范围状态中心。
2. **时序图表（Chart）**：使用 `@/components/Charts/MetricCharts.vue`，配合 `MetricConfig` 配置结构驱动渲染。
3. **响应式布局**：基于 CSS Grid 设置响应式多栏卡片网格与图表网格，确保不同分辨率下的自适应。

## 3. 开发规范与实例参考
- 📖 [时序图表配置与颜色一致性基准](file:///Users/xiao/Documents/xiao/YUHENG/Projects/link-analysis-web-dev/link-analysis-web/.agent/skills/dashboard-metrics/references/charts-layout.md)
- 📖 [全局时间联动与自适应颗粒度解析](file:///Users/xiao/Documents/xiao/YUHENG/Projects/link-analysis-web-dev/link-analysis-web/.agent/skills/dashboard-metrics/references/period-sync.md)
