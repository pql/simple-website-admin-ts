<template>
  <a-radio-group v-bind="getAttrs" :options="radioOptions" :value="value" @change="handleChange" />
</template>

<script setup lang="ts">
  import { enumRadioProps } from './props';
  import { computed, onMounted, useAttrs, ref } from 'vue';
  import enumMapService from '@/shared/abp/enum.service';
  import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
  import { Form } from 'ant-design-vue';

  defineOptions({
    name: 'FEnumRadio',
    inheritAttrs: false,
  });

  const emit = defineEmits(['change', 'update:value']);
  const props = defineProps({
    ...enumRadioProps,
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

  const radioOptions = ref();

  function handleChange(...args) {
    const item = args[0];
    const value = item.target.value;
    emit('update:value', value);
    emit('change', item.target);
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
      radioOptions.value = convertOptions;
    }
  });
</script>

<style lang="less" scoped>
  @import './enum-radio.less';
</style>
