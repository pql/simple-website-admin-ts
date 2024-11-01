export class BasicConfig {
  /**
   * 远程服务器地址
   */
  remoteServiceBaseUrl: string = '';

  /**
   * topbar 通知组件中获取通知数量
   */
  notificationCount = 5;

  grid = {
    /**
     * 每页显示条目数
     */
    defaultPageSize: 20,
    /**
     * 每页显示条目数下拉框值
     */
    defaultPageSizes: ['20', '50', '100', '200'],
  };

  /** 按钮配置 */
  button = {
    create: 'Create',
    createVersion: 'CreateVersion',
    copy: 'Copy',
    copyVersion: 'CopyVersion',
    edit: 'Edit',
    delete: 'Delete',
    deleteVersion: 'DeleteVersion',
    submit: 'Submit',
    save: 'Save',
    confirm: 'Confirm',
    refresh: 'Refresh',
    singleAudit: 'SingleAudit',
    cancel: 'Cancel',
    audit: 'Audit',
    batAudit: 'BatAudit',
    batConfirm: 'BatConfirm',
    handle: 'Handle',
    auditHandle: 'AuditHandle',
    batHandle: 'BatHandle',
    input: 'Input',
    detail: 'Detail',
    tag: 'Tag',
    export: 'ExportToExcel',
    DownloadExcelTemplate: 'DownloadExcelTemplate',

    import: 'Import',
    translateFault: 'TranslateFault',
    download: 'Download',
    check: 'Check',
    batCheck: 'BatCheck',
    translateRepairTask: 'TranslateRepairTask',
    material: 'Material',
    review: 'Review',
    workOrder: 'WorkOrder',
    upload: 'Upload',
    distribute: 'Distribute',
    sync: 'Sync',
    relation: 'Relation',
    cancelRelation: 'CancelRelation',
    print: 'Print',
    reassign: 'Reassign',
    delay: 'Delay',
    arrange: 'Arrange',
    repair: 'Repair',
    activate: 'Activate',
    return: 'Return',
    stockOut: 'StockOut',
    oneShot: 'OneShot',
    upDown: 'UpDown',
    lock: 'Lock',
    unlock: 'Unlock',
    temporaryPlan: 'TemporaryPlan',
    inspect: 'Inspect',
    trend: 'Trend',
    modelAudit: 'ModelAudit',
  };
}

const BasicConfigInstance = new BasicConfig();

export default BasicConfigInstance;
