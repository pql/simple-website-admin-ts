import { defineComponent } from 'vue';
import { selectProps } from './props';
import * as API from '@/apis';
import { Observable } from 'rxjs';
import { Form } from 'ant-design-vue';
import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';

export default defineComponent({
  mixins: [PageFilterComponentBase],
  props: {
    ...selectProps,
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
      selectList: [],
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
  },
  watch: {
    /** 数据源发生改变，调用对应函数 */
    dataSource() {
      this.dataSourceChange();
    },
  },
  created() {
    this.dataSourceChange();
  },
  mounted() {},
  methods: {
    /** 重新加载数据 */
    reload(options) {
      this.loadData(options).subscribe(({ items, totalCount }) => {
        this.selectList = items;
        this.totalCount = totalCount;
      });
    },
    /** 刷新数据 */
    refresh(params = {}) {
      const options = Object.assign({}, params);
      this.loadData(options).subscribe(({ items, totalCount }) => {
        this.selectList = items;
        this.totalCount = totalCount;
      });
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
            totalCount: res?.totalCount || res.length || res?.items.length,
            items: items,
          });
          obs.complete();
        });
      });
    },
    /** 下拉框值发生改变 */
    handleChange(value, option) {
      this.$emit('change', this.innerValue, option);
      this.$emit('update:value', this.innerValue);
      this.formItemContext && this.formItemContext.onFieldChange();
    },

    /** 外部组件触发change事件，联动本组件 */
    handleExtraChangeEvent(fieldValue) {
      // console.log(this.dataSource);

      // 触发修改
      const filterValues = this.formModel ?? {};

      const data = {
        filterValues: filterValues,
        currentValue: fieldValue,
      };

      if (this.dataSource?.valueChange && this.dataSource?.valueChange.length > 0) {
        this.handleExternalTrigger(this.dataSource.valueChange ?? [], data);
      }
    },

    /** 通知 */
    handleExternalTrigger(subList: string[], data?: any) {
      const parentVm = this.parentInstance;
      if (parentVm) {
        const subs = subList.filter((s) => s);
        for (let i = 0, l = subs.length; i < l; i++) {
          const sub = subs[i];
          let instance: any = null;
          if (Array.isArray(parentVm!.refs[sub])) {
            instance = parentVm!.refs[sub][0];
          } else {
            instance = parentVm!.refs[sub] as any;
          }
          if (instance?.handleExternalTriggerChangeEvent) {
            instance.handleExternalTriggerChangeEvent(data);
          }
        }
      }
    },

    handleExternalTriggerChangeEvent(data) {
      // console.log('handleExternalTriggerChangeEvent', data);
      const options = Object.assign({}, data?.filterValues ?? {});
      this.loadData(options).subscribe(({ items, totalCount }) => {
        this.selectList = items;
        this.totalCount = totalCount;
      });
    },
    /** 数据源发生改变 */
    dataSourceChange() {
      // 初始化数据
      this.loadData().subscribe(({ items, totalCount }) => {
        this.selectList = items;
        this.totalCount = totalCount;
      });
    },
  },
});
