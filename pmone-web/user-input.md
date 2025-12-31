## 用户输入模版实例（配合系统提示词 T1~T7）

```text
模板：T1 参考页面改造（跨项目参考）
参考页面：/Users/xiao/Documents/xiao/YUHENG/Projects/pmone-web/src/pages/monitoring/CodeTraceDetail.vue
目标模块：src/views/appMonitoring/codeTracking
需要改造点：UI对齐 + 拆分 CallChain/CodeStack/ThreadProfiling + hooks 模式
是否涉及路由：是
```

```text
模板：T2 新增/调整路由（动态菜单驱动）
页面组件：/appMonitoring/codeTracking/pages/CodeTrackingDetail
菜单路径(path)：/appMonitoring/requestTracing/codeTrackingDetail
标题(meta.title)：代码追踪详情
是否隐藏(isHide)：false
需要高亮菜单(activeMenu)：/appMonitoring/requestTracing/codeTrackingList
```

```text
模板：T3 模块按 Hooks 拆分（仅重构不改行为）
模块目录：src/views/appMonitoring/codeTracking/ThreadProfiling
拆分目标：减少 index.vue 复杂度，逻辑下沉到 composables，抽离 types
```

```text
模板：T4 按现有模块风格对齐（对齐样式与交互）
参考模块：src/views/appMonitoring/codeTracking/pages/CodeTrackingDetail.vue
目标模块：src/views/appMonitoring/codeTracking/CallChain/index.vue
对齐点：布局栅格 + 表格样式 + 空态展示 + 交互文案
```

```text
模板：T5 通用组件开发（src/components）
组件名：KeyValueList
用途：展示 Label-Value 信息列表，空值显示 --
使用场景：src/views/appMonitoring/codeTracking/pages/CodeTrackingDetail.vue；src/views/dashboard/dataVisualize/index.vue
对外 API：props={ items: Array<{ label: string; value: string | number | null }> } emits={ } slots={ value }
空值展示：默认 "--"
```

```text
模板：T6 通用指令开发（src/directives）
指令名：waterMarker
模板用法：v-water-marker
触发方式：mounted + window resize
binding.value 类型：{ text: string; gap?: number; opacity?: number }
使用示例：<div v-water-marker="{ text: 'internal' }"></div>
```

```text
模板：T7 通用工具开发（src/utils）
函数名：formatDurationMs
入参/出参：(ms: number | null | undefined) => string
边界条件：ms 为空/NaN 返回 "--"；负数按 0 处理
期望调用方：src/views/appMonitoring/codeTracking/pages/CodeTrackingDetail.vue；src/views/appMonitoring/codeTracking/CallChain/index.vue
```

