// import type { InputNumberProps } from 'ant-design-vue/es/input-number';

// type ValuePair = (string | number | undefined)[];

// export type RangeNumberProps = {
//   value?: ValuePair; // 表单控件的值
//   placeholder: [string, string]; // 占位符
//   separator: string; // 分割线
//   width: [string, number]; // 容器宽度
//   suffix: string; // 后缀, 不传则不显示
// } & InputNumberProps;

export const rangeNumberProps = {
  /** 组件值 */
  value: {
    type: [Array<number>],
  },
  placeholder: {
    type: Array<string>,
    default: () => ['Start', 'End'],
  },
  /** 最小值 */
  min: {
    type: Number,
    default: -Infinity,
  },
  /** 最大值 */
  max: {
    type: Number,
    default: Infinity,
  },
  /** 分隔符 */
  separator: {
    type: String,
    default: '-',
  },
  /** 容器宽度 */
  width: {
    type: [String, Number],
    default: 'auto',
  },
  /** 前缀，不传则不显示 */
  prefix: {
    type: String,
  },
  /** 后缀，不传则不显示 */
  suffix: {
    type: String,
  },
};
