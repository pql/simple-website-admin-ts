export const inputProps = {
  /**
   * preventing XSS attacks
   * 默认 false 不开启, 为 true 时会进行 sanitize-html 数据过滤，确保数据安全
   */
  sanitize: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [String, Number],
    default: null,
  },
};
