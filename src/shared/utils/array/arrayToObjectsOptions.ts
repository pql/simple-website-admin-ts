interface Option {
  label: string;
  value: string | number; // 假设value是string或number类型
  [key: string]: any; // 索引签名允许对象有额外的属性
}

class ArrayToObjectOptionsConverter {
  public convertToOptions<T extends object>(
    arrayObjects: T[],
    labelKey: keyof T,
    valueKey: keyof T,
  ): Option[] {
    return arrayObjects.map((item) => {
      // 确保 labelKey 和 valueKey 存在于 item 中
      if (item[labelKey] === undefined || item[valueKey] === undefined) {
        throw new Error('Missing required key in array object');
      }
      // 创建一个新的Option对象，包含原始对象的所有属性
      const option: Option = {
        label: item[labelKey] as string,
        value: item[valueKey] as string | number,
        ...item, // 保留原始对象的所有其他属性
      };
      return option;
    });
  }
}
const arrayToObjectsOptions = new ArrayToObjectOptionsConverter();

// 导出实例供他人使用
export default arrayToObjectsOptions;
