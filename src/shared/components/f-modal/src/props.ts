export const modalProps = {
  width: {
    type: [String, Number],
    default: '1000px',
  },
  title: {
    type: String,
    default: '新增',
  },
  pageDataList: {
    type: Array,
    default: [],
  },
  /**是否展示Footer按钮 */
  isShowFooter: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
};
