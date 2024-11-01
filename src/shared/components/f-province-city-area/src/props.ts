export const provinceCityAreaProps = {
  placeholder: {
    type: String,
  },
  /**
   * 位置 省市区数组 [provinceCode,cityCode,areaCode]
   */
  value: {
    type: Array<string>,
    default: (): String[] => [],
  },
};
