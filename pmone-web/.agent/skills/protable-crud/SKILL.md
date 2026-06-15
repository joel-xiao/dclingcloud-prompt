---
name: protable-crud
description: 开发或修改配置管理、CRUD 列表、带头部搜索与弹窗表单的页面。当界面包含“过滤条件+列表表格+新增/编辑/查看弹窗”特征时触发。
---

# 场景基准：配置管理与 CRUD 数据列表

## 1. 场景特征识别
- 页面由“**顶部过滤器 + 表格列表 + 操作按钮/行操作 + 新增/编辑弹窗表单**”构成。
- 典型案例：关键页面配置 `keyPageConfig`、系统配置 `appSystemsConfig`、异常模块配置 `exceptionModel`。

## 2. 核心组件资产映射
当识别到上述界面特征时，AI **必须**直接复用以下资产：
1. **数据过滤（Header）**：使用 `@/components/headerFilter-v2/index.vue` 进行通用过滤条件定义。
2. **数据展示（Table）**：使用 `@/components/ProTable-v2/index.vue`。
3. **列声明（TSX Columns）**：创建同级 `columns.tsx`，定义 `ColumnProps` 类型。
4. **弹窗表单（Dialog）**：封装独立子 Dialog 组件（如 `XxxDialog.vue`），使用 `v-model:visible` 控制双向可见性，提供 `acceptParams` 注入行数据。

## 3. 开发规范与实例参考
- 📖 [列表页面装配与 columns.tsx 列定义规范](file:///Users/xiao/Documents/xiao/YUHENG/Projects/link-analysis-web-dev/link-analysis-web/.agent/skills/protable-crud/references/table-spec.md)
- 📖 [Dialog 弹窗表单与动态表单数组编辑规范](file:///Users/xiao/Documents/xiao/YUHENG/Projects/link-analysis-web-dev/link-analysis-web/.agent/skills/protable-crud/references/dialog-spec.md)
