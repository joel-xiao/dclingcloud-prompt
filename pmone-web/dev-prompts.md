# 开发提示词（团队固定格式｜精简版）

复制后按项填空即可。要求不降级：目录规范、通用组件复用、接口/类型、Mock、验收、自检与外部参考都必须覆盖。

---

## 模板（复制后填空）

你是资深前端工程师，请在项目 `link-analysis-web` 内完成需求。必须使用 Composition API + TS（`<script setup>`），优先复用通用组件/Hooks，接口必须走 `src/api/index.ts`，空值统一 `--`。

### 1. 需求

- 标题：
- 目标：
- 入口/角色：
- 范围（改动页面/模块）：
- 业务规则（可验证）：
  - R1：
  - R2：
- 开关：路由(是/否) 权限(是/否) 上传/导入/下载(是/否) 图表(是/否) 拓扑(是/否)
- 不做什么：

### 2. 落点（三级目录）

- 页面目录：`src/views/[场景模块]/[业务模块]/[功能模块]/`
- 页面入口：`src/views/[场景模块]/[业务模块]/[功能模块]/index.vue`
- 路由 component：`/[场景模块]/[业务模块]/[功能模块]/index`
- 预计文件变更：
  - 页面：
  - components：
  - composables：
  - types：
  - api：

### 3. 必选复用（填你实际用了什么）

- 组件：ProTable / ECharts / Upload / ImportExcel / Loading / SvgIcon / SelectIcon / SelectFilter / TreeFilter / SearchForm / WangEditor
- hooks：useHandleData / useDownload / useAuthButtons / useTable（仅非 ProTable 场景）
- 指令：v-auth（如涉及）

### 4. 路由与权限（如涉及）

- 菜单（必须三级 parent -> children -> children）：
  - path：
  - name：
  - component：
  - meta：title/icon/isHide/isFull/isKeepAlive/isAffix/activeMenu
- 按钮权限：
  - key（通常 = 路由 name）：
  - points：

### 5. 接口与类型（必须写清 Req/Res）

统一：请求走 `src/api/index.ts`；类型沉淀在 `src/api/interface/index.ts`（或模块 types，按团队约定）。

- API1：method/url，用途，Req，Res，配置（loading/cancel 默认或关闭）
- API2：

### 6. Mock + Schema（接口未就绪必填）

- Mock：方式/位置
- Schema：字段、类型、可空、默认值
- 映射：后端字段 -> 页面字段（如有）

### 7. 实现草案

- 页面分区：Header / Filter / Content / Drawer/Dialog（按需）
- 单一数据源：state 列表（query/分页/详情/字典等）
- 提示策略：成功/失败/确认（优先 useHandleData 等）

如果是 ProTable 页，补充：

- columns 草案：列类型（selection/index/expand/sort）、字段列、search 配置、render/headerRender/插槽
- request 适配：request-api 参数预处理、data-callback 映射、init-param

### 8. 验收（必须可验证）

- AC：
- 边界：空态/错误态/无权限/接口失败
- 性能：大表格/复杂渲染（如涉及）

### 9. 自检（必须通过）

- `pnpm type:check`
- `pnpm lint:eslint`
- `pnpm lint:prettier`
- `pnpm lint:stylelint`

### 10. 交付输出（必须包含）

- 变更文件列表
- 复用清单
- 如有外部参考：参考文件路径 + 映射说明

### 11. 外部页面参考（你给外部地址时必填）

- 外部文件：`[填写绝对路径]`
- 只参考：布局/字段/交互/接口字段/校验/状态逻辑
- 不照搬：外部组件库、状态管理、路由权限、样式体系、工具封装
- 先拆解再实现：分区、数据源、事件、接口触发时机、字段映射、权限点

---

## 拓扑（涉及才启用）

目录：`src/views/[场景模块]/[业务模块]/[功能模块]/topology/`（components/core|ui、composables、types、utils、api、index.vue）

要求：节点多状态；连线左右中心锚点；自动避障/分层渲染；hover/click 高亮；复杂链路缩放/平移无延迟与错乱
