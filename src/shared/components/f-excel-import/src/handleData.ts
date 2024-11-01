export const transform = (value: any) => {
  const data: FileErrors[] = [];
  const rowErrors = value.rowErrors;
  const hasError = value.hasError;
  const templateErrors = value.templateErrors;
  if (hasError) {
    if (rowErrors) {
      rowErrors.forEach((element) => {
        const item = new FileErrors();
        item.title = `第${element.rowIndex}行`;
        for (const i in element.fieldErrors) {
          const child = new FileErrorsItemArray();
          child.key = i;
          child.value = element.fieldErrors[i];
          item.content.push(child);
        }
        data.push(item);
      });
    }
    if (templateErrors) {
      templateErrors.forEach((element) => {
        const item = new FileErrors();
        item.title = element.columnName;
        item.level = element.errorLevel;
        const child = new FileErrorsItemArray();
        child.key = element.requireColumnName;
        child.value = element.message;
        item.content.push(child);
        data.push(item);
      });
    }
  }
  return data;
};

export class FileErrors {
  title?: String;
  level?: String;
  content: FileErrorsItemArray[] = [];
}

export class FileErrorsItemArray {
  key?: String;
  value?: String;
}
