export interface DataSource {
  /** 服务方法名 */
  service: string;
  /** 是否多选 */
  multiple?: boolean;
  /** 请求参数 */
  params?: Recordable;
}

export const enumSelectProps = {
  /** 数据源类型, 设置了值，则调用公用枚举接口，也可不填值，直接通过 options 来给下拉框选项赋值 */
  type: {
    type: String,
  },
  /** 数据项标题 key */
  labelField: {
    type: String,
    default: 'label',
  },
  /** 数据项值 key */
  valueField: {
    type: String,
    default: 'value',
  },
  /** 控件值 */
  value: {
    type: [String, Number, Array<String>, Array<Number>],
    default: null,
  },
  /** 下拉框选项值，和 type 互斥，设置了 type 则不用传。新增这个选项的原因是兼容手动加入的选项数据（不调接口） */
  options: {
    type: Array<Recordable>,
    default: [],
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
