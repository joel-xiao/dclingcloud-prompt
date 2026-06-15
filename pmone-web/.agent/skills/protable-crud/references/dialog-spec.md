# CRUD 场景：弹窗表单与动态表单项编辑规范

本规范规定了如何封装新增/编辑 Dialog 弹窗表单，并支持复杂嵌套字段与动态添加配置块场景。

## 1. 弹窗双向控制与数据流
Dialog 必须独立封装，不直接修改父组件的值，通过 `computed` 双向维护 visible 状态。

```typescript
const props = defineProps<{
  visible: boolean;
  action: "new" | "edit" | "copy";
  row: any;
}>();
const emit = defineEmits(["update:visible", "onSuccess"]);

const dialogVisible = computed({
  get: () => props.visible,
  set: val => emit("update:visible", val)
});
```

## 2. 深度初始化监听与拷贝
在 `watch(() => props.visible)` 中，当弹窗打开时，应使用 `cloneDeep` 拷贝传入的行数据，保证编辑操作的独立性，并在保存成功后调用 `emit("onSuccess")` 刷新表格。

## 3. 动态配置块与数组表单编辑（基于 Flex 弹性布局）
对于需要动态增删配置、且包含动态参数别名与键值对匹配列表的场景（例如关键页面的多组 Query 键值对过滤）：
- **动态数组映射**：`paramKeys` 定义为一个键名数组 `[{ key: "" }]`，`params` 内则是对应的行值数据 `query: [{ value: "" }]`。
- **添加/删除操作**：
```typescript
const addParamKey = (fIdx: number) => {
  forms.value[fIdx].paramKeys.push({ key: "" });
  forms.value[fIdx].params.forEach(p => p.query.push({ value: "" }));
};
const removeParamKey = (fIdx: number, kIdx: number) => {
  forms.value[fIdx].paramKeys.splice(kIdx, 1);
  forms.value[fIdx].params.forEach(p => p.query.splice(kIdx, 1));
};
```
- **排版对齐**：使用 Flex 弹性排列并设置最小宽度限制，在表头最后一列添加空占位符（`.key-add-placeholder`），以完美对齐操作栏与主体输入框。
