# 标准开发提示词（按场景类型｜可直接粘贴给 AI）

下面按开发场景列出多段提示词，选一个整段复制给 AI 使用（只填 `{...}` 占位符）。

---

## 场景 1：开发业务页面 / 业务模块（新增功能）

```text
你是 link-analysis-web 项目的资深前端工程师（Vue3 + TS）。

【任务】
在目录 src/views/{场景模块}/{业务模块}/{功能模块}/ 下实现：{标题}
目标（用户可见）：{...}

【组件规则（必须遵守）】
组件只能分两类：通用组件（src/components/）或业务组件（本模块 components/）。
先检索是否已有可复用组件；能改不新建；新增组件必须标注通用/业务。

【硬性约束】
1) Vue3 Composition API + TypeScript，SFC 使用 <script setup>
2) hooks 拆分：types/ api/ composables/ components/ index.vue
3) 请求必须走 src/api/index.ts（需要时明确 { loading: false } / { cancel: false }）
4) 空值统一显示 "--"；不要新增注释；不要新增任何 *.md
5) 接口未就绪必须 mock（方式/位置 + schema + 字段映射），字段与最终一致
6) 自检必须通过：pnpm type:check / lint:eslint / lint:prettier / lint:stylelint

【输入信息】
- 入口/前置条件：{...}
- 业务规则（可验证）：{R1... R2...}
- 不做什么（排除项）：{...}
- 是否涉及：路由={是/否} 权限={是/否} 上传/导入/下载={是/否} 图表={是/否}

【执行步骤（按顺序）】
1) 检索相似页面/接口封装/权限写法，列出参考文件路径
2) 输出落点与拆分（新增/修改文件清单 + 职责说明）
3) 实现：先 types，再 api，再 composables，再 components，最后 index.vue
4) 覆盖空态/失败态（如涉及权限再覆盖无权限）
5) 跑四个自检命令并修复到全绿

【交付输出（必须包含）】
- 变更文件列表（新增/修改）
- 复用清单（组件/hooks/指令，只写实际用到的）
- 组件划分说明（新增组件逐条一句话：通用/业务 + 原因）
```

---

## 场景 2：开发通用组件 / 通用 Hook（跨模块复用）

```text
你是 link-analysis-web 项目的资深前端工程师（Vue3 + TS）。

【任务】
开发 {通用组件/通用Hook}：{名称}
复用场景至少两个：{场景1}、{场景2}

【硬性约束】
1) 通用组件只能放 src/components/{组件名}/...；通用 Hook 放 src/hooks/{hook名}.ts（优先编辑已有文件）
2) 不要写业务字段/业务 API/业务路由逻辑到通用层
3) TS 类型齐全：Props/Emits/Slots 或 Hook 入参/返回值
4) 不要新增注释；不要新增任何 *.md
5) 自检必须通过：pnpm type:check / lint:eslint / lint:prettier / lint:stylelint

【执行步骤（按顺序）】
1) 检索是否已有相似通用组件/Hook，列出参考路径
2) 给出 API 设计（props/emits/slots 或 hook signature）+ 文件落点清单
3) 实现并自测（正常/空值/异常最少各一条）
4) 跑四个自检命令并修复到全绿

【交付输出（必须包含）】
- 变更文件列表（新增/修改）
- 使用示例（最小示例，写在回复里即可）
```

---

## 场景 3：模块重构（改为 hooks 模式 / 去重复 / 提升可维护性）

```text
你是 link-analysis-web 项目的资深前端工程师（Vue3 + TS）。

【任务】
对目录 {模块路径} 做重构：{目标，例如“按 hooks 模式拆分，减少 index.vue 复杂度”}

【硬性约束】
1) 不改变用户可见行为（除非明确要求）
2) 拆分到 types/ api/ composables/ components/（优先移动逻辑，不引入新依赖）
3) 不要新增注释；不要新增任何 *.md
4) 自检必须通过：pnpm type:check / lint:eslint / lint:prettier / lint:stylelint

【执行步骤（按顺序）】
1) 先检索当前模块与相似模块，列出参考路径
2) 输出拆分方案（每个文件职责 + 预计变更清单）
3) 实施重构并保持行为一致
4) 跑四个自检命令并修复到全绿

【交付输出（必须包含）】
- 变更文件列表（新增/修改）
- 重构前后职责对照（每个新文件一句话）
```

---

## 场景 4：Bug 修复（定位原因 + 最小改动修复）

```text
你是 link-analysis-web 项目的资深前端工程师（Vue3 + TS）。

【任务】
修复 Bug：{现象/报错信息/复现步骤}

【硬性约束】
1) 优先最小改动修复；不要顺手重构无关代码
2) 不要新增注释；不要新增任何 *.md
3) 修复后自检必须通过：pnpm type:check / lint:eslint / lint:prettier / lint:stylelint

【执行步骤（按顺序）】
1) 在代码库中定位相关代码路径与调用链（列出路径）
2) 给出根因（1~3 句）+ 修复方案（最小改动）
3) 实现修复（必要时补充最小测试/复现验证方式）
4) 跑四个自检命令并修复到全绿

【交付输出（必须包含）】
- 根因说明 + 修复点说明
- 变更文件列表（新增/修改）
```

---

## 场景 5：接入接口（Req/Res 类型、字段映射、错误与空态）

```text
你是 link-analysis-web 项目的资深前端工程师（Vue3 + TS）。

【任务】
把页面/模块 {模块路径} 从 mock/静态数据切换为真实接口：{接口用途描述}

【硬性约束】
1) 请求必须走 src/api/index.ts（按需配置 loading/cancel）
2) 类型优先放在该模块 types/；跨模块共享才放到全局接口类型
3) 空值显示 "--"；覆盖空态/失败态
4) 不要新增注释；不要新增任何 *.md
5) 自检必须通过：pnpm type:check / lint:eslint / lint:prettier / lint:stylelint

【执行步骤（按顺序）】
1) 检索现有接口封装风格与相似接口，列出参考路径
2) 明确 API（method/url/用途/Req/Res/配置）+ 字段映射（后端 -> 前端）
3) 实现 api + types + composables 接入
4) 跑四个自检命令并修复到全绿

【交付输出（必须包含）】
- API 清单（Req/Res）+ 字段映射
- 变更文件列表（新增/修改）
```

---

## 场景 6：拓扑模块开发（topology 子模块）

```text
你是 link-analysis-web 项目的资深前端工程师（Vue3 + TS）。

【任务】
在目录 src/views/{场景模块}/{业务模块}/{功能模块}/topology/ 下实现拓扑：{标题}

【硬性约束】
1) 目录结构：components/core|ui、composables、types、utils、api、index.vue
2) 必达能力：
   - 节点多状态；hover/click 高亮
   - 连线左右中心锚点；自动避障；分层渲染
   - 复杂链路缩放/平移无延迟、无样式错乱
3) 请求必须走 src/api/index.ts；空值显示 "--"
4) 不要新增注释；不要新增任何 *.md
5) 自检必须通过：pnpm type:check / lint:eslint / lint:prettier / lint:stylelint

【执行步骤（按顺序）】
1) 检索相似拓扑/图渲染实现，列出参考路径
2) 输出模块拆分与状态/事件清单
3) 实现并逐条验证必达能力
4) 跑四个自检命令并修复到全绿

【交付输出（必须包含）】
- 能力清单逐条验收说明
- 变更文件列表（新增/修改）
```
