---
inclusion: always
---

# 🛠 Central Agent Core Index

你当前运行在 Kiro IDE 环境下，必须强制对齐项目根目录的中央能力库：

## 📋 规则加载顺序

1. **Root Rules**: 优先加载并遵守根目录的 `.cursorrules`
2. **Skills**: 立即索引并理解 `.agent/skills/` 下的所有能力定义
3. **Workflows**: 复杂任务必须调用 `.agent/workflows/` 中的标准流程

## 可用能力 (Skills)

- **protable-crud**: 数据管理与 CRUD 场景基准（表格、TSX columns、子 Dialog 弹窗）
- **dashboard-metrics**: 监控大盘与趋势分析场景基准（指标卡片、MetricCharts、全局时间联动）
- **trace-waterfall**: 调用链追踪与时序甘特图场景基准（甘特图宽度偏移算法、TypeAdapter 适配器注册）
- **project-infrastructure**: 全局基础设施资产（Hooks、Components、Utils、Enums 等）调用及检索基准
- **skill-creator**: 用于辅助编写、优化和评估智能体 Skill 规则的元技能。

## 📝 工作流 (Workflows)

- **module-dev**: 通用模块开发流程
- **module-refactor**: 模块重构/迁移流程

## ⚡ 优先级

1. 遵循用户最新指令
2. 强制遵守 `.cursorrules` 中的 Vue3/TS 技术栈规范与 Hooks 模式
3. 任务执行前必须检查 `.agent/skills/` 是否有对应能力
