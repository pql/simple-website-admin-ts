<template>
  <a-select
    v-model:value="innerValue"
    :dropdownStyle="{}"
    :placeholder="l('Unified.texts.Versions')"
    @change="innerValueChange"
    class="width-100"
    :options="options"
  />
</template>

<script lang="ts">
  import { EditionService } from '@/apis';
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FVersionNamePicker',
    mixins: [PageFilterComponentBase],
    props: {
      multiple: {
        type: Boolean,
      },
      defaultValue: {
        type: [Number, String],
        default: '',
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
        let result = await EditionService.getApiSaasEditionsAll();
        if (result && result.length > 0) {
          // 转换items到options，假设转换函数返回的是一个Option类型的数组
          // @ts-ignore
          this.options = arrayToObjectsOptions.convertToOptions(result, 'displayName', 'id');
          this.options.splice(0, 0, { label: '-', value: '' });
          // const foundOption =this.options[this.defaultValue].value;
          // if (foundOption) {
          //   this.$emit('change', foundOption);
          //   this.$emit('update:value', foundOption);
          //   this.$emit('onReady', foundOption);
          // }
        }
      },
    },
  });
</script>

<style lang="less" scoped>
  .width-100 {
    width: 100%;
  }
</style>
