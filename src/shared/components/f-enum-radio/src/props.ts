export const enumRadioProps = {
  /** 数据源类型 */
  type: {
    type: String,
    required: true,
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
  value: {
    default: null,
  },
};
