import enumMapService from '@/shared/abp/enum.service';
import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
import { defineComponent } from 'vue';
import { enumSelectProps } from './props';
import _ from 'lodash-es';
import { Observable } from 'rxjs';
import * as API from '@/apis';
import { Form } from 'ant-design-vue';

export default defineComponent({
  mixins: [PageFilterComponentBase],
  props: {
    ...enumSelectProps,
  },
  emits: ['selectListChange', 'change', 'update:value'],
  setup() {
    const formItemContext = Form.useInjectFormItemContext();
    return {
      formItemContext,
    };
  },
  data() {
    return {
      /** 下拉框数据 */
      selectOptions: [] as any[],
      /** 总数据条数 */
      totalCount: 0,
    };
  },
  computed: {
    getAttrs() {
      return {
        ...this.$attrs,
        ...this.$props,
      };
    },
    cvalue: {
      get() {
        return this.$props.value;
      },
      set(value) {
        this.innerValue = value;
        this.$emit('update:value', this.innerValue);
      },
    },
  },
  async mounted() {
    const { type, labelField, valueField, dataSource } = this.$props as any;
    if (_.isString(type)) {
      // 配置了接口服务，调用接口服务，获取下拉框数据
      if (dataSource.service && _.isString(dataSource.service)) {
        this.loadData().subscribe(({ items, totalCount }) => {
          const options: any[] = items[type];
          const convertOptions = arrayToObjectsOptions.convertToOptions(
            options,
            labelField,
            valueField,
          );
          this.selectOptions = convertOptions;
          this.totalCount = totalCount;
        });
      } else {
        await enumMapService.init();
        const options: any[] = enumMapService.getData(type);
        const convertOptions = arrayToObjectsOptions.convertToOptions(
          options,
          labelField,
          valueField,
        );
        this.selectOptions = convertOptions;
      }
    } else {
      const convertOptions = arrayToObjectsOptions.convertToOptions(
        this.$props.options,
        labelField,
        valueField,
      );
      this.selectOptions = convertOptions;
    }
  },
  methods: {
    /** 下拉框值发生改变 */
    handleChange(value, option) {
      this.$emit('change', this.innerValue, option);
      this.$emit('update:value', this.innerValue);
      this.formItemContext && this.formItemContext.onFieldChange();
    },
    /** 加载数据 */
    loadData(options?: Recordable): Observable<any> {
      // 获取api服务
      const { service, params } = this.dataSource;

      // 获取服务名称及服务方法
      const [Service, Controller] = service.split('.');

      // 默认处理请求参数
      const requestParams = {
        ...(params ?? {}), // 接口请求参数
        ...(options ?? {}), // 额外参数
      };

      console.log('requestParams', requestParams);

      // 请求服务端
      const fetch = API[Service][Controller](requestParams);

      return new Observable((obs) => {
        fetch?.then((res) => {
          const items = res?.items || res || [];
          this.$emit('selectListChange', items);
          obs.next({
            totalCount: res?.totalCount || res.length || res?.items?.length || 0,
            items: items,
          });
          obs.complete();
        });
      });
    },
    /** 数据源发生改变 */
    dataSourceChange() {
      // 初始化数据
      this.loadData().subscribe(({ items, totalCount }) => {
        this.selectOptions = items;
        this.totalCount = totalCount;
      });
    },
    /** 外部组件触发change事件，联动本组件 */
    handleExtraChangeEvent(data) {
      console.log('handleExtraChangeEvent', data);
    },
  },
});
