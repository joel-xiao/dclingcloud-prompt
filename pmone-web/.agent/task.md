# Task List - Universal Scenario Archetypes Reorganization

- [x] 1. 清理物理文件夹
  - [x] 删除原子技能文件夹 (`dialog-form`, `header-filter`, `metric-charts`, `period-store`, `protable-columns`, `protable-v2`, `trace-waterfall`)
- [x] 2. 创建 4 大场景化技能的主 SKILL.md
  - [x] 编写 `.agent/skills/protable-crud/SKILL.md` (CRUD 场景)
  - [x] 编写 `.agent/skills/dashboard-metrics/SKILL.md` (监控看板场景)
  - [x] 编写 `.agent/skills/trace-waterfall/SKILL.md` (调用链瀑布图场景)
  - [x] 更新 `.agent/skills/project-infrastructure/SKILL.md` (项目基础设施)
- [x] 3. 编写场景配套的 references 子文档与真实案例
  - [x] `protable-crud` 场景：编写 `table-spec.md` 与 `dialog-spec.md`
  - [x] `dashboard-metrics` 场景：编写 `charts-layout.md` 与 `period-sync.md`
  - [x] `trace-waterfall` 场景：编写 `waterfall-calc.md` 与 `adapter-pattern.md`
  - [x] `project-infrastructure` 场景：编写 `assets-guide.md`
- [x] 4. 更新全局规则与索引入口
  - [x] 修改 [.cursorrules](file:///.cursorrules)
  - [x] 修改 [.agent/rules/global.md](file:///.agent/rules/global.md)
