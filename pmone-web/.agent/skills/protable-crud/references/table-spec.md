# CRUD 场景：表格与列装配规范 (columns.tsx)

本规范规定了如何拼装一个标准的配置数据管理页面。

## 1. 列表页面 index.vue 模板基准
页面统一包裹在 `PageWrapper` 中，头部通过 `HeaderFilter` 驱动过滤，主体通过 `ProTable` 渲染。

```vue
<template>
  <PageWrapper :scrollable="false" class="page-container">
    <template #header>
      <HeaderFilter
        title="关键页面配置"
        hidden-time-range
        :filter-options="filterOptions"
        @filter="handleFilter"
      />
    </template>

    <PageBox title="列表" full title-icon header-mode="fixed">
      <ProTable
        ref="proTableRef"
        :columns="columns"
        :request-api="fetchApi"
        :init-param="initParam"
        :tool-button="['setting']"
        :header="false"
        :card="false"
        height="100%"
      >
        <template #toolButton>
          <el-button type="primary" :icon="Plus" @click="handleOpenModel('new')">新建</el-button>
          <el-button type="danger" :icon="Delete" :disabled="!proTableRef?.selectedListIds.length" @click="handleBatchDelete">批量删除</el-button>
        </template>
        <template #operation="{ row }">
          <el-button type="primary" link @click="handleOpenModel('edit', row)">编辑</el-button>
          <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
        </template>
      </ProTable>
    </PageBox>
  </PageWrapper>
</template>
```

## 2. 独立 columns.tsx 规范
表格列必须剥离为 `columns.tsx` 文件，通过 TSX 完成复杂类型与操作项的自定义 Render。

```tsx
import { ColumnProps } from "@/components/ProTable-v2/interface";

export const keyPageColumns: ColumnProps<any>[] = [
  { type: "selection", fixed: "left", width: 50 },
  { prop: "name", label: "名称", search: { el: "input" } },
  {
    prop: "matcher.appid",
    label: "应用 ID",
    render: scope => <span>{scope.row.matcher?.appid || "--"}</span>
  },
  {
    prop: "matcher.path_rule.model_type",
    label: "匹配类型",
    render: scope => {
      const typeMap: Record<string, string> = {
        Plain: "文本匹配",
        RegexPath: "正则匹配",
        WildcardPath: "通配符匹配"
      };
      return <span>{typeMap[scope.row.matcher?.path_rule?.model_type] || "--"}</span>;
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 150 }
];
```
