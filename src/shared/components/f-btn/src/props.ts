export const btnProps = {
  /** 按钮名称 */
  text: {
    type: String,
    default: '',
  },
  /** 按钮图标 */
  icon: {
    type: String,
    default: '',
  },
  /** 按钮事件 */
  eventName: {
    type: String,
  },
  classes: {
    type: Array,
    default: ['info'],
  },
};
