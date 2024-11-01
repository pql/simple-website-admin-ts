<template>
  <a-select
    v-bind="getAttrs"
    :value="value"
    :mode="dataSource?.multiple ? 'multiple' : '-'"
    :field-names="{
      label: labelField ?? 'label',
      value: valueField ?? 'value',
    }"
    :options="selectOptions"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { enumSelectProps } from './props';
  import { computed, onMounted, useAttrs, ref } from 'vue';
  import enumMapService from '@/shared/abp/enum.service';
  import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
  import { Form } from 'ant-design-vue';

  defineOptions({
    name: 'FEnumSelect',
    inheritAttrs: false,
  });

  const emit = defineEmits(['change', 'update:value']);
  const props = defineProps({
    ...enumSelectProps,
  });
  const { type, labelField, valueField } = props;

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
      return props.value;
    },
    set(value) {
      emit('update:value', value);
    },
  });

  const selectOptions = ref();

  function handleChange(...args) {
    emit('update:value', args[0]);
    emit('change', ...args);
    formItemContext && formItemContext.onFieldChange();
  }

  onMounted(async () => {
    if (type) {
      await enumMapService.init();
      const options = enumMapService.getData(type);
      const convertOptions = arrayToObjectsOptions.convertToOptions(
        options,
        labelField,
        valueField,
      );
      selectOptions.value = convertOptions;
    } else {
      const { options } = props;
      const convertOptions = arrayToObjectsOptions.convertToOptions(
        options,
        labelField,
        valueField,
      );
      selectOptions.value = convertOptions;
    }
  });
</script>

<style lang="less" scoped>
  @import './enum-select.less';
</style>
