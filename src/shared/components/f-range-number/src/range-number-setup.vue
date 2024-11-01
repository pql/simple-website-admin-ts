<template>
  <div class="flex items-center" :style="{ width: isString(width) ? width : `${width}px` }">
    <slot name="prefix">
      {{ prefix }}
    </slot>
    <a-input-number
      v-bind="getAttrs"
      v-model:value="value[0]"
      :placeholder="l(placeholder[0])"
      :min="min"
      :max="value![1]"
      @blur="handleBlur($event)"
    />
    <span class="mx-1">{{ separator }}</span>
    <a-input-number
      v-bind="getAttrs"
      v-model:value="value[1]"
      :placeholder="l(placeholder[1])"
      :min="value![0]"
      :max="max"
      @blur="handleBlur($event)"
    />
    <slot name="suffix">
      {{ suffix }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
  import { rangeNumberProps } from './props';
  import { computed, useAttrs } from 'vue';
  import { Form } from 'ant-design-vue';
  import { l } from '@/shared/i18n';
  import { gt, isString, toNumber } from 'lodash-es';

  defineOptions({
    name: 'FRangeNumber',
    inheritAttrs: false,
  });

  const emit = defineEmits(['change', 'update:value']);
  const props = defineProps({
    ...rangeNumberProps,
  });

  const attrs = useAttrs();

  const getAttrs = computed(() => {
    return {
      ...props,
      ...attrs,
    };
  });

  const formItemContext = Form.useInjectFormItemContext();

  const value = computed({
    get() {
      return props.value ?? [];
    },
    set(value) {
      emit('update:value', value);
    },
  });

  const handleBlur = (e) => {
    // 获取输入框的值,这里转成 number 类型
    let result = e.target.value !== '' ? toNumber(e.target.value) : undefined;
    // 判断输入范围最值
    if (result && result > props.max) result = props.max;
    if (result && result < props.min) result = props.min;

    // 解构获取最值
    const [min, max] = value.value;
    // 判断最小值是否大于最大值，为真就调换位置
    if (result && result > max) {
      value.value = gt(result, max) ? [max, result] : [result, max];
    }

    // 判断最大值是否小于最小值，为真就调换位置
    if (result && result < min) {
      value.value = gt(min, result) ? [result, min] : [min, result];
    }

    emit('change', value.value);
    formItemContext && formItemContext.onFieldBlur();
    formItemContext && formItemContext.onFieldChange();
  };
</script>

<style lang="less" scoped>
  @import './range-number.less';
</style>
