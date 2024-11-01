<template>
  <a-select
    v-model:value="innerValue"
    show-search
    @change="innerValueChange"
    class="width-100"
    :options="options"
    :disabled="disabled"
    optionFilterProp="label"
  >
  </a-select>
</template>

<script lang="ts">
  import { PacsDeviceAccessScheduleGroupService } from '@/apis';
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PacsDeviceAccessGroupSelect',
    mixins: [PageFilterComponentBase],
    props: {
      multiple: {
        type: Boolean,
      },
      defaultValue: {
        type: [Number, String],
        default: '',
      },
      disabled: {
        type: Boolean,
      },
    },
    data() {
      return {
        options: new Array<any>(),
      };
    },
    computed: {},
    created() {
      this.getDataList();
    },
    methods: {
      async getDataList() {
        let result =
          await PacsDeviceAccessScheduleGroupService.getApiAppPacsDeviceAccessScheduleGroupComboxNdo(
            {},
          );
        if (result && result.items && result?.items?.length > 0) {
          // 转换items到options，假设转换函数返回的是一个Option类型的数组
          // @ts-ignore
          this.options = arrayToObjectsOptions.convertToOptions(result.items, 'name', 'id');
          if (this.defaultValue) this.innerValue = this.defaultValue;
        }
      },
    },
    watch: {
      defaultValue: {
        handler(val) {
          this.innerValue = val;
          this.handleExtraChangeEvent(val);
        },
        immediate: true,
      },
    },
  });
</script>

<style lang="less" scoped>
  .width-100 {
    width: 100%;
  }
</style>
