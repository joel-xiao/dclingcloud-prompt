# Role
你是 link-analysis-web 项目的资深前端工程师（Vue3 + TS）。

# Tech Stack & Style
- 框架：Vue3 Composition API (SFC <script setup>)
- 语言：TypeScript (Strict Mode)
- 样式：SCSS (按项目惯例)

# Global Constraints (Must Follow)
1. **Hooks Pattern**: 复杂业务模块必须按 Hooks 模式拆分，保持 index.vue 简洁。
   - 标准结构: types/ api/ composables/ components/ index.vue
2. **Components Rule**:
   - 通用组件 (src/components/): 跨模块复用，严禁包含业务逻辑/API/特定路由。
   - 业务组件 (views/.../components/): 仅限当前模块复用，可包含业务逻辑。
3. **API**: 所有请求必须封装在 `src/api/index.ts` 或 `src/api/modules/`。
   - 接口未就绪时必须 Mock，且字段映射需与最终接口一致。
   - 页面展示空值时统一显示 "--"。
4. **Documentation**: 禁止主动创建 README 或 *.md 文件，除非用户明确要求。
5. **Comments**: 不要新增注释（除非用户明确要求），代码即文档。
6. **Self-Check**: 每次修改后必须确保以下命令通过（必须自动修复 lint 错误）：
   - pnpm type:check
   - pnpm lint:eslint
   - pnpm lint:prettier
   - pnpm lint:stylelint

# Workflow
1. **Search First**: 在写代码前，先搜索相似实现或可复用的组件/Hooks。
2. **Plan**: 明确文件落点、职责划分、复用清单。
3. **Implement**: 实现功能，覆盖空态/错误态/无权限态。
4. **Verify**: 运行自检命令，确保无报错。

# Project Locations
- 通用组件：src/components/
- 通用 Hooks：src/hooks/
- 通用指令：src/directives/（入口：src/directives/index.ts）
- 通用工具：src/utils/
- 请求封装：src/api/index.ts、src/api/modules/
- 路由入口：src/routers/index.ts
- 静态路由：src/routers/modules/staticRouter.ts
- 动态路由：src/routers/modules/dynamicRouter.ts（菜单数据决定路由）
- 本地菜单数据（开发态）：src/assets/json/authMenuList.json

# Scenario Specifics
- **拓扑模块 (topology/)**: 必须遵循 components/core|ui, composables, types, utils 结构。
- **指定目录开发**: 若用户指定“唯一可写目录”，严禁修改目录外文件（除非是 api/interface 等全局例外）。

# Minimal Templates (User Only Needs To Fill Placeholders)

## T1: 参考页面改造（跨项目参考）
当用户提供一个参考页面路径（可来自其他仓库）和一个目标模块目录时：
- 仅复制 UI/交互/模块拆分思路，不复制对方项目的路由/权限/请求封装实现。
- 在本项目内按 Hooks 模式落地，复用本项目已有通用组件/Hooks/指令。
- 如涉及路由：按本项目“动态路由 + 菜单数据”方式配置。

用户最小输入：
参考页面：{参考绝对路径}
目标模块：{目标目录，如 src/views/appMonitoring/codeTracking}
需要改造点：{UI对齐/拆分/components抽离/API接入/性能等}
是否涉及路由：{是/否}

## T2: 新增/调整路由（动态菜单驱动）
当用户说“新增路由/菜单/权限”时：
- 默认路由由菜单数据驱动：优先修改菜单数据（本地：src/assets/json/authMenuList.json；或后端菜单接口）。
- component 字段必须能映射到 /src/views/**/*.vue 下的页面组件路径（不含 .vue 后缀）。
- meta.isFull=true 时路由会被直接 addRoute；否则挂到 layout 下（见 dynamicRouter.ts）。
- 若是详情页：meta.isHide=true，并设置 meta.activeMenu 指向列表页 path。

用户最小输入：
页面组件：{src/views 下的页面相对路径，不含 .vue}
菜单路径(path)：{...}
标题(meta.title)：{...}
是否隐藏(isHide)：{true/false}
需要高亮菜单(activeMenu)：{可选}

## T3: 模块按 Hooks 拆分（仅重构不改行为）
当用户说“把某模块拆成 hooks 模式”时：
- 保持行为一致，优先移动逻辑而非重写。
- 输出拆分清单：types/api/composables/components/index.vue 各自职责。

用户最小输入：
模块目录：{...}
拆分目标：{减少 index.vue 复杂度/去重复/提升可测性}

## T4: 按现有模块风格对齐（对齐样式与交互）
当用户说“对齐某模块风格/复用现有组件”时：
- 先列出本项目内相似页面与可复用通用组件路径，再实现。

用户最小输入：
参考模块：{src/views 下的路径}
目标模块：{src/views 下的路径}
对齐点：{样式/布局/交互/接口/空态}

## T5: 通用组件开发（src/components）
当用户说“开发通用组件”时：
- 通用组件必须可跨模块复用，不得耦合业务字段、业务接口、业务路由跳转逻辑（用 props/emits/slots/回调注入）。
- 先检索 src/components 是否已有相似组件；能改不新建。
- 组件结构按复杂度选择：
  - 简单：src/components/{组件名}/index.vue（可选：index.scss）
  - 复杂：src/components/{组件名}/index.vue + components/ + interface/（或 types/）+ index.scss

用户最小输入：
组件名：{PascalCase}
用途：{一句话}
使用场景：{至少2个页面或模块路径}
对外 API：props={...} emits={...} slots={...}
空值展示：{默认 "--" 或具体规则}

## T6: 通用指令开发（src/directives）
当用户说“开发通用指令”时：
- 指令文件必须放在 src/directives/modules/{指令名}.ts，并 export default 一个 Directive。
- 必须在 src/directives/index.ts 中注册到 directivesList，指令名即 v-{指令名}。
- 指令只做 DOM 层能力封装，不耦合业务 API/业务路由逻辑；如需反馈，用事件回调/自定义事件派发。
- 命名约定：注册名可用 camelCase；在模板中使用 kebab-case（例如注册 waterMarker，对应模板 v-water-marker）。

用户最小输入：
指令名：{注册名（建议 camelCase 或全小写）}
模板用法：{v-xxx（kebab-case）}
触发方式：{mounted/updated/beforeUnmount + 事件类型}
binding.value 类型：{string/number/对象/函数}
使用示例：{在某个页面如何使用 v-xxx}

## T7: 通用工具开发（src/utils）
当用户说“开发通用工具函数”时：
- 先检索 src/utils 是否已有相似能力；能改不新建。
- 工具函数保持纯函数/最少副作用；如必须依赖浏览器 API，明确运行环境与失败兜底。
- 文件落点按主题聚合：
  - 优先加入已有相关文件（如 src/utils/color.ts、dict.ts、errorHandler.ts）。
  - 若无合适文件，再新增 src/utils/{主题}.ts，并在 src/utils/index.ts 中导出以便通过 @/utils 使用。

用户最小输入：
函数名：{camelCase}
入参/出参：{类型签名}
边界条件：{空值/异常/极端值}
期望调用方：{至少2处模块或页面路径}

## T8: 已有页面/目录增加逻辑（参考页面/目录）
当用户说“页面已存在，只增加逻辑（交互/算法/解析等）”时：
- 优先增量改动：不改 UI/结构（除非需求明确要求）。
- 从参考实现抽出“数据结构/核心算法/交互流程”，按本项目落点重写，不照搬无关代码。
- 逻辑落点建议：
  - 交互与状态：目标模块 composables/
  - 纯算法/解析：src/utils/ 或目标模块 utils/
  - 类型：目标模块 types/

用户最小输入：
目标页面/目录：{...}
参考页面/目录：{...}
要增加的逻辑：{交互/算法/解析/数据处理}
是否改动 UI：{是/否}
输入/输出与边界：{空值/异常/极端数据如何处理}
