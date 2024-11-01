<template>
  <a-select
    ref="select"
    :name="name"
    v-model:value="innerValue"
    :placeholder="l(placeholder ?? 'Select item')"
    :allow-clear="allowClear"
    :mode="dataSource?.multiple ? 'multiple' : '-'"
    class="w-full"
    :field-names="{
      label: dataSource?.labelField ?? 'label',
      value: dataSource?.valueField ?? 'value',
    }"
    :options="selectList"
    @change="handleChange"
  >
    <!-- <a-select-option value="">{{ l('-') }}</a-select-option> -->
    <!-- <a-select-option
      v-for="(item, index) of selectList"
      :key="index"
      :value="item[dataSource?.valueField ?? 'value']"
    >
      {{ item[dataSource?.labelField ?? 'label'] }}
    </a-select-option> -->
  </a-select>
</template>

<script lang="ts">
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
  import { defineComponent } from 'vue';
  import { Form } from 'ant-design-vue';
  import * as API from '@/apis';

  export default defineComponent({
    name: 'FOptionsMapSelect',
    mixins: [PageFilterComponentBase],
    props: {
      /** 控件值 */
      value: {
        type: String,
      },
      /** 控件名称 */
      name: {
        type: String,
      },
      /** 数据源名称 */
      dataSource: {
        type: Object,
        default: () => {
          return {
            /** select option  返回的接口数据取值键 {string} */
            optionsKey: undefined,
            /** 服务方法名 {string} */
            service: undefined, // EnumService.getApiEnumGetEnumMaps
            /** 数据项标题 key {string} */
            labelField: undefined,
            /** 数据项值 key {string} */
            valueField: undefined,
          };
        },
      },
      /** 启用多选 */
      multiple: {
        type: Boolean,
        default: false,
      },
      /** 占位符 */
      placeholder: {
        type: String,
      },
      /** 是否显示清除按钮 */
      allowClear: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['selectListChange'],
    setup() {
      const formItemContext = Form.useInjectFormItemContext();
      return {
        formItemContext,
      };
    },
    data() {
      return {
        /** 筛选条件 */
        filterText: undefined,
        /** 下拉框选项数据 */
        selectList: [],
        /** 用于数据联动 */
        externalParams: {},
      };
    },
    created() {
      this.dataSourceChange();
    },
    methods: {
      /** 重新加载数据 */
      reload(filterText) {
        this.loadData(filterText);
      },
      /** 刷新数据 */
      refresh(params = {}) {
        this.externalParams = Object.assign({}, params);
        this.loadData();
      },
      /** 值发生改变 */
      handleChange() {
        this.innerValueChange();
        this.formItemContext && this.formItemContext.onFieldChange();
      },
      /** 加载数据 */
      async loadData(filterText?: any) {
        // 记录筛选文本变更
        this.filterText = filterText as any;
        const { service } = this.dataSource;
        if (!service) {
          return;
        }
        const [Service, Controller] = service.split('.');

        // 默认处理请求参数
        const requestParams = {
          ...filterText,
        };
        // 请求服务端
        const request = API[Service][Controller](requestParams) as Promise<any>;

        request.then((res: any) => {
          const options = res[this.dataSource.optionsKey as string] || [];
          const convertOptions: any = arrayToObjectsOptions.convertToOptions(
            options,
            this.dataSource.labelField as string,
            this.dataSource.valueField as string,
          );
          this.selectList = convertOptions;
          console.log(
            '-----------------------------------------------------------------------convertOptions',
            convertOptions,
          );
          this.$emit('selectListChange', convertOptions);
        });
      },

      /** 外部组件触发change事件，联动本组件 */
      handleExtraChangeEvent(data) {
        console.log('handleExtraChangeEvent', data);
      },

      handleExternalTriggerChangeEvent(data) {
        console.log('handleExternalTriggerChangeEvent', data);
        this.externalParams = Object.assign({}, this.externalParams, data?.filterValues ?? {});
        this.loadData(this.externalParams);
      },
      /** 数据源发生改变 */
      dataSourceChange() {
        // 初始化数据
        this.loadData(this.filterText);
      },
    },
  });
</script>
