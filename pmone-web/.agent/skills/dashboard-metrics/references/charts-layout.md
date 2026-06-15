# 大盘场景：时序图表绘制与配色规范

本规范指导大盘中 MetricCharts 组件的布局与视觉展示。

## 1. 核心时序图配置 (`MetricCharts.vue`)
趋势图渲染采用配置化的 `MetricConfig`，禁止手写底层 ECharts 繁琐的 option。

```vue
<MetricCharts
  :title="chartTitle"
  :metrics="metricsConfig"
  :data-source="chartData"
  :time-key="timeKey"
  height="300px"
/>
```

## 2. 图表配色一致性基准
为防止混淆，大盘同视图下的相同指标，配色必须绝对一致。
- 核心配色映射：
  - **请求量/次数 (Requests)**：经典蓝 (`#1890ff` / `#409eff`)
  - **报错率/异常率 (Errors)**：警示红 (`#f5222d` / `#f56c6c`)
  - **耗时/响应时间 (Duration)**：中性黄/橙 (`#fa8c16` / `#e6a23c`)
  - **吞吐量/QPS (Throughput)**：生机绿 (`#52c41a` / `#67c23a`)
- 图表背景采用浅灰色格栅，边线宽度统一为 1.5px 软边缘平滑曲线。

## 3. CSS Grid 响应式看板网格
为确保多端对齐，指标卡片和大盘图表必须采用 Grid 弹性网格：

```scss
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}
```
