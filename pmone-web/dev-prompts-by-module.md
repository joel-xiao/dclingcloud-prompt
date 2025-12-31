# 开发提示词（按模块拆分｜精简版）

按“功能模块类型”选模板复制填空：通用组件 / 业务组件（页面）/ 拓扑模块。所有模板默认继承下方“通用约束”（标准不降级）。

---

## 通用约束（所有模板默认生效）

- 技术：Vue3 Composition API + TS，SFC 用 `<script setup>`（按需 TSX）
- 复用优先：能用 `src/components`、`src/hooks`、`src/directives` 就必须用，禁止重复造轮子
- 请求：必须走 `src/api/index.ts`；可用 `{ loading: false }` / `{ cancel: false }`
- 展示：空值统一 `--`
- Mock：接口未就绪必须 mock（方式/位置 + schema + 字段映射；schema 与最终一致）
- 自检：`pnpm type:check` `pnpm lint:eslint` `pnpm lint:prettier` `pnpm lint:stylelint` 必须通过
- 外部参考：只参考布局/字段/交互/接口字段/校验/状态逻辑，不照搬外部组件库/路由权限/样式/工具封装

---

## 模板 1：通用组件开发（全局复用）

目标：开发可复用的通用组件（或通用 hooks），供多个页面/模块使用。

- 组件名称/用途：
- 放置位置：
  - 组件：`src/components/[组件名]/...`
  - hooks（如需要）：`src/hooks/[hook名].ts`
  - types（如需要）：就近或 `src/typings/`（按团队约定）
- 使用场景（至少 2 个）：
  - 场景 1：
  - 场景 2：
- API/Props/Events（必须类型化）：Props / Emits / Slots（如有）
- 复用清单（必须写清本次用了哪些已有能力）：
  - 组件：
  - hooks：
  - 指令：
- 接口（如组件自带请求则必须写）：
  - API：method/url，用途，Req，Res，配置（loading/cancel）
- 验收（可验证）：
  - AC：
- 交付输出：
  - 变更文件列表

---

## 模板 2：业务组件/页面开发（按三级目录）

目标：按“场景模块/业务模块/功能模块”落地页面与其业务组件拆分。

- 需求：标题/目标/入口/范围/规则(R1/R2)/不做什么
- 落点：
  - 页面目录：`src/views/[场景模块]/[业务模块]/[功能模块]/`
  - 入口：`index.vue`
  - 可拆分：`components/core|ui`、`composables`、`types`、`utils`、`api`
- 路由与权限（如涉及）：
  - 菜单三级 parent -> children -> children
  - 路由：path/name/component/meta（title/icon/isHide/isFull/isKeepAlive/isAffix/activeMenu）
  - 按钮权限：key（通常=路由 name）+ points（用于 `v-auth` / `useAuthButtons`）
- 复用（必须写你实际用的）：
  - 表格优先 ProTable；图表优先 ECharts；确认操作优先 useHandleData；下载优先 useDownload
- 接口与类型：
  - API：method/url，用途，Req，Res，配置（loading/cancel）
- 页面草案：分区 + 单一数据源 state 列表 + 事件清单
- 若是 ProTable 页补充：
  - columns：列类型、字段列、search、render/headerRender/插槽
  - request：参数预处理、data-callback、init-param
- 验收：AC + 边界（空态/错误态/无权限/失败）+ 性能（如大表格）
- 交付输出：变更文件列表 + 复用清单 + 外部参考映射（如有）

---

## 模板 3：拓扑模块开发（独立模块）

目标：在功能模块下新增 topology 子模块，按目录分层拆分，并满足复杂链路交互与性能要求。

- 需求：标题/目标/入口/范围/规则(R1/R2)/不做什么
- 落点（必须）：
  - `src/views/[场景模块]/[业务模块]/[功能模块]/topology/`
  - `components/core|ui`、`composables`、`types`、`utils`、`api`、`index.vue`
- 拓扑能力清单（必须逐条确认）：
  - 节点：按 UI 实现自定义形状/多状态/图标/文本；拖拽/缩放/旋转；标签避让
  - 连线：左右中心锚点；自动避障；分层渲染；差异化样式；label 悬浮/旋转；hover/click 高亮；路径动画
  - 性能：复杂链路缩放/平移无延迟、无样式错乱
- 复用（必须写你实际用的）：Element Plus + 本项目通用组件（请求/确认/下载等按通用约束）
- 接口与类型：API（Req/Res）+ schema + 字段映射
- 验收：功能 + 性能 + 边界（空态/错误态/无权限/失败）
- 外部参考（如有）：外部文件路径 + 拆解清单 + 映射到本项目目录
