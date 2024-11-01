<template>
  <a-checkbox-group
    v-bind="getAttrs"
    :options="checkboxOptions"
    :value="value"
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
  import { enumCheckboxProps } from './props';
  import { computed, onMounted, useAttrs, ref } from 'vue';
  import enumMapService from '@/shared/abp/enum.service';
  import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
  import { Form } from 'ant-design-vue';

  defineOptions({
    name: 'FEnumCheckbox',
    inheritAttrs: false,
  });

  const emit = defineEmits(['change', 'update:value']);

  const props = defineProps({
    ...enumCheckboxProps,
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

  const checkboxOptions = ref();

  function handleChange(...args) {
    emit('update:value', args[0]);
    emit('change', args[0]);
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
      checkboxOptions.value = convertOptions;
    }
  });
</script>

<style lang="less" scoped>
  @import './enum-checkbox.less';
</style>
