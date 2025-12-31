# 指定目录开发提示词（按模块拆分｜精简版）

按“功能模块类型”选模板复制填空：通用组件 / 业务组件（页面）/ 拓扑模块。所有模板默认继承下方“通用约束”（标准不降级），但以“目录限制”为最高优先级。

---

## 通用约束（所有模板默认生效）

- 技术：Vue3 Composition API + TS，SFC 用 `<script setup>`（按需 TSX）
- 复用：可以使用项目已有通用组件/Hooks/指令，但不得修改“唯一可写目录”之外的文件
- 请求：必须走 `src/api/index.ts`；可用 `{ loading: false }` / `{ cancel: false }`
- 展示：空值统一 `--`
- Mock：接口未就绪必须 mock（方式/位置 + schema + 字段映射；schema 与最终一致）
- 自检：`pnpm type:check` `pnpm lint:eslint` `pnpm lint:prettier` `pnpm lint:stylelint` 必须通过
- 外部参考：只参考布局/字段/交互/接口字段/校验/状态逻辑，不照搬外部组件库/路由权限/样式/工具封装

---

## 模板 0：目录限制（先填，最高优先级）

- 唯一可写目录：`[填写绝对或相对路径]`
- 禁止改动：除“唯一可写目录”外的任何文件（新增/修改/删除均禁止）
- 例外（仅确实无法完成时才允许，交付必须逐条说明原因）：
  - `src/api/interface/index.ts`
  - `src/api/modules/xxx.ts`
  - 其他：`[填写]`

交付必须包含：

- 实际变更文件列表
- 是否触发例外：是/否（如是：原因列表）

---

## 模板 1：通用组件开发（限定目录）

- 唯一可写目录（应指向 `src/components/...` 或 `src/hooks/...`）：
- 组件名称/用途：
- API/Props/Events（必须类型化）：Props / Emits / Slots
- 复用清单（只用不改）：组件 / hooks / 指令
- 接口（如有）：method/url，用途，Req，Res，配置（loading/cancel）
- 验收：AC + 边界（空态/错误态/失败）

---

## 模板 2：业务组件/页面开发（限定目录）

- 唯一可写目录（推荐）：`src/views/[场景模块]/[业务模块]/[功能模块]/`
- 需求：标题/目标/入口/规则(R1/R2)/不做什么
- 落点：`index.vue` + 允许拆分（仅在本目录内）`components/core|ui`、`composables`、`types`、`utils`、`api`
- 复用（只用不改）：ProTable/ECharts/Upload/ImportExcel/Loading + useHandleData/useDownload/useAuthButtons + v-auth（如涉及）
- 接口与类型：API（Req/Res）+ 字段映射
- 验收：AC + 边界（空态/错误态/无权限/失败）

---

## 模板 3：拓扑模块开发（限定目录）

- 唯一可写目录（推荐）：`src/views/[场景模块]/[业务模块]/[功能模块]/topology/`
- 落点：`components/core|ui`、`composables`、`types`、`utils`、`api`、`index.vue`
- 必达能力：
  - 节点：多状态/图标/文本；拖拽/缩放/旋转；标签避让
  - 连线：左右中心锚点；自动避障；分层渲染；差异化样式；label 悬浮/旋转；hover/click 高亮；路径动画
  - 性能：复杂链路缩放/平移无延迟、无样式错乱
- 接口与类型：API（Req/Res）+ schema + 字段映射
- 验收：功能 + 性能 + 边界（空态/错误态/无权限/失败）
- 外部参考（如有）：外部文件路径 + 拆解清单 + 映射到本目录落点
