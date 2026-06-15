# 模块开发标准流程

## 适用场景

开发任何业务模块（列表页 + 详情页结构），适用于监控、管理、分析等各类业务场景

## 前置条件

- 已有设计图/需求文档
- 明确列表页和详情页的字段
- 明确业务逻辑和数据流

## 开发流程

### 阶段1：API 层准备

**1.1 创建 API 接口**

在 `src/api/modules/` 下创建对应的业务模块文件：

```typescript
// src/api/modules/[业务域]/[模块].ts
import { http } from "@/api";

export const get[Module]List = (params: any) =>
  http.get(`/api/path/list`, params, { loading: false, cancel: false });

export const get[Module]Detail = (params: any) =>
  http.get(`/api/path/detail`, params, { loading: false });
```

**1.2 更新 index.ts**

```typescript
// src/api/modules/[业务域]/index.ts
export * from "./[module]";
```

**关键规则：**

- API 接口必须放在 `src/api/modules/` 层
- 不要在业务模块内创建本地 `api.ts`
- 参数和返回值类型定义为 `any`

### 阶段2：类型定义

在模块根目录创建 `types.ts`：

```typescript
// src/views/[业务域]/[模块]/types.ts

/** 列表项 */
export interface [Module]Item {
  id: string;
  name: string;
  // ... 根据实际字段定义
}

/** 详情信息 */
export interface [Module]DetailInfo {
  // ... 根据实际字段定义
}

/** 筛选参数 */
export interface [Module]FilterParams {
  search?: Record<string, any>;
}
```

**关键规则：**

- `types.ts` 放在模块根目录
- 不要创建 `types/index.ts` 嵌套目录
- 根据实际业务定义接口

### 阶段3：配置文件（可选）

如果模块需要配置（如图表配置、选项列表等），在 `config/` 目录创建：

```typescript
// src/views/[业务域]/[模块]/config/options.ts
export const OPTIONS = {
  // ... 配置项
};
```

**适用场景：**

- 图表配置
- 下拉选项
- 静态数据
- 常量定义

### 阶段4：Composables

将业务逻辑抽取到 `composables/` 目录：

```typescript
// src/views/[业务域]/[模块]/composables/useTable.ts
export function use[Module]Table() {
  const tableData = ref<[Module]Item[]>([]);
  const loading = ref(false);

  const loadData = async (filters: [Module]FilterParams) => {
    loading.value = true;
    try {
      const res = await get[Module]List(filters);
      tableData.value = res.data?.list || [];
    } finally {
      loading.value = false;
    }
  };

  return { tableData, loading, loadData };
}
```

**关键规则：**

- 复杂逻辑必须抽取到 composables
- 每个 composable 职责单一
- 返回响应式数据和方法

### 阶段5：列表页开发

使用 `PageWrapper` + `ProTable` 标准布局：

```vue
<template>
  <PageWrapper :scrollable="false">
    <template #header>
      <HeaderFilter :title="title" :filter-options="filterOptions" @filter="handleFilter" />
    </template>

    <Box full :border="false">
      <ProTable :columns="columns" :data="tableData" :loading="loading" :tool-button="['setting']">
        <template #tableHeader>
          <Title :title="tableTitle" />
        </template>

        <template #filter>
          <el-input v-model="searchKeyword" placeholder="搜索" />
        </template>

        <template #operation="scope">
          <el-button type="primary" link @click="goToDetail(scope.row)"> 查看详情 </el-button>
        </template>
      </ProTable>
    </Box>
  </PageWrapper>
</template>

<script setup lang="ts">
import { use[Module]Table } from "./composables/useTable";

const { tableData, loading, loadData } = use[Module]Table();
</script>
```

**列配置规范：**

- 序号列：`{ type: "index", isSetting: false }`
- 默认显示列：`isShow: true`
- 扩展列：`isShow: false`
- 操作列：`{ prop: "operation", isSetting: false }`
- 使用 ProTable 内置的 `tool-button=['setting']` 进行列控制

### 阶段6：详情页开发

详情页同样使用 `PageWrapper` + `Box` 布局容器，根据业务需求组织内容区块：

```vue
<template>
  <PageWrapper :scrollable="true">
    <template #header>
      <!-- 头部：时间筛选/面包屑等 -->
      <HeaderTimeFilter :title="detailInfo?.name" @time-change="handleTimeChange" />
    </template>

    <!-- 基础信息卡片 -->
    <Box :border="true">
      <div class="info-section">
        <div class="header">基础信息</div>
        <div class="meta-list">
          <div class="meta-item">
            <span class="label">名称：</span>
            <span class="value">{{ detailInfo?.name }}</span>
          </div>
          <!-- 更多字段 -->
        </div>
      </div>
    </Box>

    <!-- 图表区域（可选） -->
    <Box :border="true">
      <div class="charts-grid">
        <MetricCharts v-for="chart in charts" :key="chart.title" v-bind="chart" />
      </div>
    </Box>

    <!-- 其他业务卡片 -->
    <!-- ... -->
  </PageWrapper>
</template>

<script setup lang="ts">
import { PageWrapper, Box } from "@/components/Page";
import { use[Module]Detail } from "./composables/useDetail";

const { detailInfo, loadDetail } = use[Module]Detail();
</script>
```

**关键规则：**

- 详情页使用 `PageWrapper` 作为页面容器，`Box` 作为卡片容器
- 简单详情页也可以不用 `PageWrapper`/`Box`，根据实际需求决定
- 使用 composables 管理数据和逻辑
- 图表使用 `MetricCharts` 组件，参考 `charts-bindding` skill
- 复用通用组件（开发前先检查 `src/views/[业务域]/components/`）

### 阶段7：组件开发（可选）

如果模块有专属组件，放在 `components/` 目录：

```vue
<!-- src/views/[业务域]/[模块]/components/CustomTable.vue -->
<template>
  <ProTable :columns="columns" :data="data" :tool-button="['setting']">
    <template #tableHeader>
      <Title :title="title" />
    </template>
  </ProTable>
</template>
```

**组件分类：**

- 模块专属组件 → `src/views/[业务域]/[模块]/components/`
- 业务域通用组件 → `src/views/[业务域]/components/`
- 全局通用组件 → `src/components/`

### 阶段8：验证与优化

**8.1 代码检查**

由用户决定是否在终端运行自检程序进行格式与类型检查（如 `pnpm lint:eslint`、`pnpm type:check`）。Agent 仅负责输出正确无误的代码，不主动发起检查命令。

**8.2 结构诊断（可选）**

经用户授权或要求后，可配合诊断工具分析结构：

**8.3 清理废弃代码**

- 删除旧版嵌套目录（如 `list/index.vue`, `detail/index.vue`）
- 删除本地 `api.ts` 文件
- 删除重复组件
- 删除废弃的 `types/index.ts`

**8.4 目录结构验证**

```
[模块]/
  ├── index.vue              # 列表页
  ├── detail.vue             # 详情页（可选）
  ├── types.ts               # 类型定义
  ├── composables/           # 组合式函数（可选）
  │   ├── useTable.ts
  │   └── useDetail.ts
  ├── components/            # 模块专属组件（可选）
  │   └── CustomTable.vue
  └── config/                # 配置文件（可选）
      └── options.ts
```

## 关键检查点

### ✅ API 层

- [ ] 接口在 `src/api/modules/[业务域]/` 目录
- [ ] 已在对应的 `index.ts` 导出
- [ ] 无本地 `api.ts` 文件

### ✅ 类型定义

- [ ] `types.ts` 在模块根目录
- [ ] 根据实际业务定义接口
- [ ] 无 `types/index.ts` 嵌套目录

### ✅ 目录结构

- [ ] 扁平化结构，按功能分类（composables、components、config）
- [ ] 无过度嵌套（如 `list/index.vue`）
- [ ] 文件命名清晰（`index.vue` 表示列表页）

### ✅ 组件规范

- [ ] 列表页使用 `PageWrapper` + `ProTable`
- [ ] 使用 ProTable 内置的列控制功能
- [ ] 详情页布局根据业务需求设计
- [ ] 复用通用组件

### ✅ 代码质量

- [ ] 由用户决定并确认通过格式/类型自检
- [ ] 无废弃文件
- [ ] Composables 职责单一

## 常见问题

### Q1: 文件写入不生效？

A: 使用 `executeBash` + `cat` 直接写入，避免缓存问题

### Q2: ProTable 列配置不显示？

A: 检查 `isShow` 默认值，扩展列设为 `false`

### Q3: API 接口应该放在哪里？

A: 必须放在 `src/api/modules/` 层，不要放在业务模块内

### Q4: 什么时候需要创建 composables？

A: 当组件逻辑超过 100 行或有复用需求时

### Q5: 通用组件和专属组件如何区分？

A:

- 只在当前模块使用 → 模块 `components/`
- 业务域内复用 → 业务域 `components/`
- 全局复用 → 全局 `src/components/`

## 输出物

根据实际业务需求，输出物可能包括但不限于：

**必需：**

- API 接口（在 `src/api/modules/` 层）
- 类型定义（`types.ts`）
- 至少一个页面组件（如 `index.vue`）

**可选（根据业务需求）：**

- 详情页（`detail.vue`）
- 多个子页面（`create.vue`, `edit.vue`, `preview.vue` 等）
- Composables（`composables/` 目录）
- 模块专属组件（`components/` 目录）
- 配置文件（`config/` 目录）
- 工具函数（`utils/` 目录）
- 常量定义（`constants/` 目录）

**质量要求：**

- 无 lint 错误
- 无 type 错误
- 无废弃文件
- 目录结构清晰
