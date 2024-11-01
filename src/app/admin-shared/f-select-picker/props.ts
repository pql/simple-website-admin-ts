export const selectPickerProps = {
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
    default: {
      /** 服务方法名 */
      service: undefined,
      /** 数据项标题 key */
      labelField: undefined,
      /** 数据项值 key */
      valueField: undefined,
      /** 要被转换的参数数组
       * @example [{"originKey": "roleNames", "targetKey": "roleId"}]
       */
      paramsConversion: [],
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
};
