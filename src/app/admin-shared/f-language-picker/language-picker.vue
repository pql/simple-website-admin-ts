<template>
  <a-select
    v-model:value="innerValue"
    :dropdownStyle="{}"
    :placeholder="l('Unified.texts.LanguageText:ResourceName')"
    @change="innerValueChange"
    class="w-full"
    :options="options"
  />
</template>

<script lang="ts">
  import { LanguagesService } from '@/apis';
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FLanguagePicker',
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
        let result = await LanguagesService.getApiLanguageManagementLanguagesAll();
        if (result?.items && result.items.length > 0) {
          // 转换items到options，假设转换函数返回的是一个Option类型的数组
          // @ts-ignore
          this.options = arrayToObjectsOptions.convertToOptions(
            result.items,
            'displayName',
            'cultureName',
          );
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

<style lang="less" scoped></style>
