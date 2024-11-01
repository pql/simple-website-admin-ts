import { Tree } from 'ant-design-vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { selectedKeys, expandedKeys, checkedKeys, ...props } = Tree.props;

export const selectTreeProps = {
  ...props,
  /** 数据加载接口 */
  fetch: {
    type: Function,
    // required: true,
  },
  isShowHeader: {
    type: Boolean,
    default: true,
  },
  expandedKey: {
    type: Array as () => string[],
    default: [],
  },
  selectedKey: {
    type: Array as () => string[],
    default: [],
  },
  checkedKey: {
    type: Array as () => string[],
    default: [],
  },
};
