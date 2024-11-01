import { defineComponent } from 'vue';
import { selectPickerProps } from './props';
import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import { Form } from 'ant-design-vue';
import * as API from '@/apis';

export default defineComponent({
  mixins: [PageFilterComponentBase],
  props: {
    ...selectPickerProps,
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
  watch: {
    /** 数据源发生改变,调用对应函数 */
    // dataSource() {
    //   this.dataSourceChange();
    // },
  },
  created() {
    this.dataSourceChange();
  },
  mounted() {},
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
    loadData(filterText?: any) {
      // 记录筛选文本变更
      this.filterText = filterText as any;
      const { service } = this.dataSource;
      if (!service) {
        return;
      }
      const [Service, Controller] = service.split('.');

      // 默认处理请求参数

      // 处理请求参数
      const requestParams = {
        ...filterText,
      };

      /**
       * 转换请求参数
       * @param params 被转换的参数对象
       * @returns void
       */
      const transformParams = (params) => {
        const conversionKeys =
          this.dataSource?.paramsConversion?.map((item) => item.originKey) || [];

        Object.keys(params).forEach((key) => {
          const conversionItem = this.dataSource?.paramsConversion?.find(
            (item) => item.originKey === key,
          );

          if (conversionItem) {
            // 如果key在paramsConversion中，进行转换
            params[conversionItem.targetKey] = params[key];
            delete params[key];
          } else if (!conversionKeys.includes(key)) {
            // 如果key不在paramsConversion中，删除它
            delete params[key];
          }
        });
      };

      if (this.dataSource?.paramsConversion?.length) {
        transformParams(requestParams);
      }

      // 请求服务端
      const request = API[Service][Controller](requestParams) as Promise<any>;

      request.then((res) => {
        const items = res?.items || res || [];
        this.selectList = items;
        this.$emit('selectListChange', items);
      });

      // return new Observable((obs) => {
      //   request?.then((res) => {
      //     const items = res?.items || res || [];
      //     this.$emit('selectListChange', items);
      //     obs.next({
      //       totalCount: res?.totalCount || res.length || res?.items.length,
      //       items: items,
      //     });
      //     obs.complete();
      //   });
      // });
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
