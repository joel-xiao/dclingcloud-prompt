# 指定目录开发提示词（精简版）

复制后填空即可。要求不降级：严格目录限制、复用通用能力、接口/类型、Mock、验收、自检与外部参考都必须覆盖。

---

## 模板（复制后填空）

你是资深前端工程师，请在项目 `link-analysis-web` 内完成需求。必须使用 Composition API + TS（`<script setup>`），接口必须走 `src/api/index.ts`，空值统一 `--`。

### 0. 目录限制（最高优先级）

- 唯一可写目录：`[填写绝对或相对路径]`（推荐：`src/views/[场景模块]/[业务模块]/[功能模块]/`）
- 禁止改动：除“唯一可写目录”外的任何文件（新增/修改/删除均禁止）
- 例外（仅确实无法完成时才允许，且交付必须逐条说明原因）：
  - `src/api/interface/index.ts`
  - `src/api/modules/xxx.ts`
  - 其他：`[填写]`

交付必须包含：

- 实际变更文件列表
- 是否触发例外：是/否（如是：原因列表）

### 1. 需求

- 标题/目标/入口：
- 业务规则（可验证）：R1/R2/…
- 开关：路由(是/否) 权限(是/否) 上传/导入/下载(是/否) 图表(是/否) 拓扑(是/否)
- 不做什么：

### 2. 落点（三级目录）

- 目录：`src/views/[场景模块]/[业务模块]/[功能模块]/`
- 入口：`index.vue`
- 允许的模块内拆分（仅限本目录内）：
  - `components/core|ui`、`composables`、`types`、`utils`、`api`

### 3. 必选复用（只用，不改）

- ProTable / ECharts / Upload / ImportExcel / Loading / SelectFilter / TreeFilter / SearchForm / SvgIcon / SelectIcon / WangEditor
- useHandleData / useDownload / useAuthButtons
- v-auth（如涉及）

### 4. 接口与类型（优先目录内）

- 请求：统一走 `src/api/index.ts`
- 类型：优先本目录 `types/`；需要跨模块共享才触发例外改 `src/api/interface/index.ts`
- 接口：优先本目录 `api/`；需要跨模块共享才触发例外改 `src/api/modules/`

### 5. Mock + 验收 + 自检

- Mock（接口未就绪必填）：方式/位置 + Schema + 字段映射
- 验收：AC + 边界（空态/错误态/无权限/失败）
- 自检必须通过：
  - `pnpm type:check`
  - `pnpm lint:eslint`
  - `pnpm lint:prettier`
  - `pnpm lint:stylelint`

### 6. 外部页面参考（你给外部地址时必填）

- 外部文件：`[填写绝对路径]`
- 只参考：布局/字段/交互/接口字段/校验/状态逻辑
- 不照搬：外部组件库、状态管理、路由权限、样式体系、工具封装
- 输出：拆解清单（分区/数据源/事件/API 触发/映射/权限点）+ 本项目落点（全部在唯一可写目录内）
