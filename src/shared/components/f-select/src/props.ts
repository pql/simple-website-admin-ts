export interface DataSource {
  /** 服务方法名 */
  service: string;
  /** 下拉框绑定标题字段 */
  labelField: string;
  /** 下拉框绑定值字段 */
  valueField: string;
  /** 是否多选 */
  multiple?: boolean;
  /** 请求参数 */
  params?: Recordable;
  /** 数据联动数组 */
  valueChange?: Array<string>;
}

export const selectProps = {
  /** 控件值 */
  value: {
    type: [String, Number, Object, Boolean, Array, Date, Function, Symbol],
  },
  /** 控件名称 */
  name: {
    type: String,
  },
  /** form表单model */
  formModel: {
    type: Object,
  },
  /** 父级实例 */
  parentInstance: {
    type: Object,
  },
  /** 占位符 */
  placeholder: {
    type: String,
  },
  /** 数据源 */
  dataSource: {
    type: Object,
    default: () => {
      return {
        multiple: false,
      } as DataSource;
    },
  },
};
