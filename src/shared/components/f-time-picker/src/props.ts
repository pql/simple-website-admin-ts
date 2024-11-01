export const timePickerProps = {
  /** 控件值 */
  value: {
    type: String,
  },
  /** 值格式化格式 */
  valueFormat: {
    type: String,
    default: 'HH:mm:ss',
  },
  placeholder:{
    type: String,
    default: '',
  }
};
