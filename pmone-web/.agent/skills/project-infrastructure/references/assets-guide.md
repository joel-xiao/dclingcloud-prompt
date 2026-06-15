# 底层资产场景：通用组件与公共要素检索指南

开发新功能或编写新组件前，必须优先查阅并复用本指南中定义的底层公共资产，杜绝重复造轮子。

## 1. 全局通用组件检索库 (src/components/)

- **ProTable-v2** (`src/components/ProTable-v2/`):
  - 适用：统一的数据表格与查询列表组件。
- **headerFilter-v2** (`src/components/headerFilter-v2/`):
  - 适用：页面顶部通用查询过滤栏。
- **SectionFilter** (`src/components/SectionFilter/`):
  - 适用：块级或分段的多选条件过滤器（如细分维度筛选）。
- **Charts / ChartContent** (`src/components/Charts/`, `src/components/ChartContent/`):
  - 适用：时序趋势图、饼图等数据可视化大盘，以及大盘图表卡片的统一样式包裹层。
- **DataOverview** (`src/components/DataOverview/`):
  - 适用：顶部核心统计指标卡片网格，展示总量、环比、占比等。
- **BusinessTabs** (`src/components/BusinessTabs/`):
  - 适用：页面内部或业务维度的 Tab 标签页切换。
- **Description** (`src/components/Description/`):
  - 适用：键值对排版的只读详情展示面板。
- **Dialog / Drawer** (`src/components/Dialog/`, `src/components/Drawer/`):
  - 适用：全局统一样式与动画的对话框和侧边抽屉容器。
- **Status** (`src/components/Status/`):
  - 适用：表格行中带彩色圆点的状态指示标签。
- **SvgIcon** (`src/components/SvgIcon/`):
  - 适用：项目中本地 SVG 图标文件的统一载入。

## 2. 全局通用逻辑要素

- **自定义指令 (src/directives/)**:
  - 全局常用行为拦截指令（如防抖、长按、权限控制、拖拽等）。
- **状态管理 (src/stores/)**:
  - 统一存储，如 `period.ts` 时间范围控制、`user.ts` 权限管理等。
- **公共 Hooks (src/hooks/)**:
  - `useTable`：封装分页请求。
  - `useHandleData`：二次确认与请求联动。
  - `useSelection`：多选状态维护。
- **通用工具类 (src/utils/)**:
  - `period.ts` 时间周期与自适应采样计算。
  - `request.ts` 全局 HTTP 请求实例。
- **数据枚举映射 (src/enums/)**:
  - 系统类型、状态码、权限标识等核心字段定义。
