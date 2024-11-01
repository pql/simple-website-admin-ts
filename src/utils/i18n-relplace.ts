/**
 * 将 "Volo.Abp." 转换为 "Abp"，并在第一个点左边的部分加上 ".texts"
 *
 * @param input - 需要转换的输入字符串
 * @returns 转换后的字符串，或者如果不符合条件则返回原始字符串
 */
export function convertVoloAbpToAbp(input: string): string {
  // 检查输入字符串是否以 "Volo.Abp." 开头
  if (input.startsWith('Volo.Abp.')) {
    // 第一步：将 "Volo.Abp." 替换为 "Abp"
    let result = input.replace('Volo.Abp.', 'Abp');
    // 第二步：找到第一个点的位置
    const firstDotIndex = result.indexOf('.');
    if (firstDotIndex !== -1) {
      // 获取第一个点左边的部分，例如 "AbpIdentity"
      const beforeFirstDot = result.substring(0, firstDotIndex);
      // 第三步：将这个部分加上 ".texts"
      result = `${beforeFirstDot}.texts${result.substring(firstDotIndex)}`;
    }
    return result;
  }
  // 如果输入字符串不以 "Volo.Abp." 开头，则返回原始字符串
  return input;
}
