export enum ErrorLevels {
  Warning = 'Warning',
  Error = 'Error',
}

export class TemplateErrorInfo implements ITemplateErrorInfo {
  errorLevel!: ErrorLevels;
  columnName!: string | undefined;
  requireColumnName!: string | undefined;
  message!: string | undefined;

  constructor(data?: ITemplateErrorInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.errorLevel = _data['errorLevel'];
      this.columnName = _data['columnName'];
      this.requireColumnName = _data['requireColumnName'];
      this.message = _data['message'];
    }
  }

  static fromJS(data: any): TemplateErrorInfo {
    data = typeof data === 'object' ? data : {};
    let result = new TemplateErrorInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['errorLevel'] = this.errorLevel;
    data['columnName'] = this.columnName;
    data['requireColumnName'] = this.requireColumnName;
    data['message'] = this.message;
    return data;
  }
}

export interface ITemplateErrorInfo {
  errorLevel: ErrorLevels;
  columnName: string | undefined;
  requireColumnName: string | undefined;
  message: string | undefined;
}

export class DataRowErrorInfo implements IDataRowErrorInfo {
  rowIndex!: number;
  fieldErrors!: { [key: string]: string } | undefined;

  constructor(data?: IDataRowErrorInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.rowIndex = _data['rowIndex'];
      if (_data['fieldErrors']) {
        this.fieldErrors = {} as any;
        for (let key in _data['fieldErrors']) {
          if (_data['fieldErrors'].hasOwnProperty(key))
            this.fieldErrors![key] = _data['fieldErrors'][key];
        }
      }
    }
  }

  static fromJS(data: any): DataRowErrorInfo {
    data = typeof data === 'object' ? data : {};
    let result = new DataRowErrorInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['rowIndex'] = this.rowIndex;
    if (this.fieldErrors) {
      data['fieldErrors'] = {};
      for (let key in this.fieldErrors) {
        if (this.fieldErrors.hasOwnProperty(key)) data['fieldErrors'][key] = this.fieldErrors[key];
      }
    }
    return data;
  }
}

export interface IDataRowErrorInfo {
  rowIndex: number;
  fieldErrors: { [key: string]: string } | undefined;
}

export class FileDto implements IFileDto {
  fileName!: string;
  fileType!: string;
  fileToken!: string;

  constructor(data?: IFileDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.fileName = _data['fileName'];
      this.fileType = _data['fileType'];
      this.fileToken = _data['fileToken'];
    }
  }

  static fromJS(data: any): FileDto {
    data = typeof data === 'object' ? data : {};
    let result = new FileDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['fileName'] = this.fileName;
    data['fileType'] = this.fileType;
    data['fileToken'] = this.fileToken;
    return data;
  }
}

export interface IFileDto {
  fileName: string;
  fileType: string;
  fileToken: string;
}
