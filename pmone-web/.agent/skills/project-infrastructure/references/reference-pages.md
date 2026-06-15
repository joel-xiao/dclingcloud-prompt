# 底层资产场景：标准主题页面开发参考基准

当开发新的页面或模块时，AI 应当查阅以下已实现的标准页面架构，对齐其目录拆分、逻辑分工与适配器写法。

## 1. 监控与溯源大盘类参考
对于需要渲染调用链路、甘特图时序瀑布、以及代码崩溃堆栈溯源的场景：
- **链路分析大盘** (`src/views/appMonitoring/linkAnalysis/`):
  - 核心参考：`TypeAdapter` 数据适配器分发机制，表格和看板组件彻底解耦的架构；
  - 适用：复杂拓扑、链路多级联动数据加载。
- **代码追踪与高亮** (`src/views/appMonitoring/codeTracking/`):
  - 核心参考：Monaco Editor / SourceMap 行堆栈对齐，高亮展示报错位置；
  - 适用：日志分析、崩溃定位。

## 2. 指标分析与性能大盘类参考
对于需要展示性能指标趋势、全局时间控制与大批图表联动的页面：
- **用户体验大盘** (`src/views/userExperience-v2/`):
  - 核心参考：`MetricCharts` 的并排栅格渲染，图表系列折线取色一致性；
  - 适用：性能大盘、多图表协同加载。

## 3. 表格与配置数据管理类参考
对于常规的表格列表、表单录入、增删改查场景：
- **系统/应用管理配置** (`src/views/managementCenter/appConfig/applicationConfig/`):
  - 核心参考：标准的 ProTable 驱动列表，简洁的新增/编辑子 Dialog 表单通信；
  - 适用：典型基础数据维护页。
- **关键页面映射规则配置** (`src/views/managementCenter/appConfig/keyPageConfig/`):
  - 核心参考：`columns.tsx` 的 TSX 自定义渲染，以及包含级联 Cascader、动态 Query 参数增删数组编辑的复杂表单；
  - 适用：复杂规则、高级规则嵌套配置。
- **异常模型策略配置** (`src/views/exceptionInsight/programException/`):
  - 核心参考：过滤条件配置与列表逻辑的映射实现。
