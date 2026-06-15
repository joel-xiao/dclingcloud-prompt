# 链路场景：TypeAdapter 适配器模式实现规范

在链路监控场景下，多端数据源（如系统性能指标、SQL 慢查询、外部网关服务）的属性定义不尽相同。系统通过 `TypeAdapter` 模式将这些异构数据归一化处理。

## 1. 适配器接口标准 (`TypeAdapter`)
每一个特定的数据适配器文件（如 `adapters/app.ts`，`adapters/sql.ts`）必须实现该接口：

```typescript
export interface TypeAdapter {
  // 1. 顶部过滤条件配置说明
  filters: {
    source: FilterConfig[];
    target: FilterConfig[];
    sourceTitle?: string;
    targetTitle?: string;
  };
  // 2. 表格展示配置与 columns 定义
  columns: {
    metricColumns: any[];
    getDynamicColumns: (ctx: any, source: string, target: string) => any[];
  };
  // 3. 看板图表指标配置与系列取色
  charts: ChartConfig[];
  // 4. 数据拉取接口声明与时序清洗函数
  dataSource: {
    getFilterKeys: (ctx: any) => string[];
    getGroupByKeys: (ctx: any) => string[];
    fetchTableData: (params: ApiParams, ctx: any) => Promise<any>;
    transformTableData: (rawData: any, options: any) => any[];
    fetchTimeSeriesData: (params: ApiParams, ctx: any) => Promise<any>;
    transformTimeSeriesData: (rawData: any, ctx: any) => any[];
  };
}
```

## 2. 适配器调用链流程 (Registry & Dispatch)
- **注册中枢**：在业务的 `modules/index.ts` 中维护注册表 `const adapters: Record<string, TypeAdapter> = { ... }`。
- **动态分发**：根据当前路由上下文中的数据源类型和级别，调用 `getAdapter(level, type)` 动态分派。
- **页面渲染解耦**：大盘 `index.vue` 仅负责骨架搭建，数据拉取与转化职责全部委派给对应 Adapter 完成。
