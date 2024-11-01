export class IdHelper {
  /** 生成guid */
  genGuid(prefix: string = 'id') {
    return prefix + this.getGuid();
  }

  getId(prefix = 'id_'): string {
    return prefix + this.getGuid();
  }

  getTime() {
    return new Date().getTime();
  }

  getGuid(): string {
    const { s4 } = this;
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  protected s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
}

const idHelperInstace = new IdHelper();
export default idHelperInstace;
