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
    name: 'FResourceNamePicker',
    mixins: [PageFilterComponentBase],
    props: {
      multiple: {
        type: Boolean,
      },
    },
    data() {
      return {
        options: new Array<any>(),
      };
    },
    computed: {},
    mounted() {
      LanguagesService.getApiLanguageManagementLanguagesResources().then((result) => {
        this.options = arrayToObjectsOptions.convertToOptions(result, 'name', 'name');
      });
    },
    methods: {},
  });
</script>

<style lang="less" scoped></style>
