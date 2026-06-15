# 大盘场景：全局时间同步与颗粒度计算 (period-store)

本规范规定了大盘时序图与过滤器时间范围同步的设计理论。

## 1. 唯一时间源 `usePeriodStore`
禁止在具体页面维护单独的 `startTime` / `endTime`。大盘页所有图表与过滤器必须通过 Pinia 统一读取与监听。

```typescript
import { usePeriodStore } from "@/store/modules/period";

const periodStore = usePeriodStore();

// 声明响应式计算属性
const startTime = computed(() => periodStore.startTime);
const endTime = computed(() => periodStore.endTime);
const timeRange = computed(() => periodStore.timeRange);
```

## 2. 时序采样颗粒度自适应同步
后端接口拉取折线数据需要时间采样跨度（例如：30分钟/1小时/1天）。统一调用 `src/utils/period.ts` 中的 `period` 算法计算，严禁在页面本地手写魔法秒数。

```typescript
import { period } from "@/utils/period";

const granularity = computed(() => period.getGranularity(timeRange.value));
// 获取对应的 X 轴时间格式化掩码
const timeFormat = computed(() => period.getFormatByGranularity(granularity.value));
```

## 3. 依赖联动重载
当时间范围发生变化时，大盘所有图表数据应当响应式重载刷新：

```typescript
watch(
  () => [periodStore.startTime, periodStore.endTime],
  () => {
    fetchDashboardData();
  }
);
```
