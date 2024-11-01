import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { UploadChangeParam, UploadFile } from 'ant-design-vue/es/upload';
import { DataRowErrorInfo, FileDto, TemplateErrorInfo } from '@/shared/types/utils';
import { getToken } from '@/utils/auth';
import { transform } from './handleData';
import FileDownloadService from '@/shared/utils/file-download.service';
import { excelImportProps } from './props';
import BasicConfigInstance from '@/shared/config/basic-config';
import { UserService, EnumService, ExcelCommonService } from '@/apis';
import { exportFile, ExportFileOption } from '@/utils/file/exportFile';

interface iData {
  templateLoading: boolean;
  importExcelUrl: string;
  fileList: UploadFile[];
  uploadHeaders: any;
  isVisible: boolean;
  isConfirmLoading: boolean;
  templateErrors: TemplateErrorInfo[] | undefined;
  rowErrors: DataRowErrorInfo[] | undefined;
  hasError: boolean;
  labelingErrorFileDto: FileDto | undefined;
  fileData: { file: Blob; originalFile: any } | any;
  saveDisabled: boolean;
  excelEnumItem: Object;
  errorFileData: any | undefined;
}

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    ...excelImportProps,
  },
  emits: ['fileUploadedSuccessEvent'],
  data(): iData {
    return {
      /** 下载模板文件 loading */
      templateLoading: false,

      /** 上传Excel接口地址 */
      importExcelUrl: '',

      // 文件列表的双向绑定
      fileList: [],
      uploadHeaders: {},

      isVisible: false,

      isConfirmLoading: false,

      /** 模板错误 */
      templateErrors: undefined,
      /** 验证错误 */
      rowErrors: undefined,
      /** 是否存在导入错误 */
      hasError: false,
      /** 错误标注文件 */
      labelingErrorFileDto: undefined,
      fileData: {},
      saveDisabled: true,
      excelEnumItem: {},
      errorFileData: undefined,
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    async initPage() {
      const excelEnum =
        (await EnumService.getApiEnumGetEnumMapsByName({
          name: 'ImportExportType',
        })) ?? [];
      const key = this.config?.args?.importExportType || 'Users';
      this.excelEnumItem = Object.values(excelEnum).find((item) => item['value'] === key) || {};
      // this.importExcelUrl =
      //   BasicConfigInstance.remoteServiceBaseUrl +
      //   '/api/services/app/FileManagement/UploadTempFile';

      // // 设置头部信息
      // this.uploadHeaders = {
      //   Authorization: 'Bearer ' + getToken(),
      // };
    },
    transform(data: any) {
      return transform(data);
    },
    callback(value: any) {
      this.showModal();
    },
    showModal(): void {
      this.isVisible = true;
    },
    handleChange(info: UploadChangeParam) {
      this.fileList = [...info.fileList];

      if (info.file.status === 'done' || info.file.status === 'success') {
        if (info.file.response.error) {
          this.message.warn(this.l(info.file.response.error.message));
        } else {
          this.$emit('fileUploadedSuccessEvent', info.file.response.result.fileToken);
        }
      }
    },
    handleCustomRequest(info) {
      const { file, onProgress, onSuccess, onError } = info;
      const reader = new FileReader();
      reader.onload = () => {
        // 这里你获取到了文件的数据流
        const blobData = new Blob([file]);
        this.fileData = { file: blobData, originalFile: file };
        this.saveDisabled = false;
        this.errorFileData = undefined;
        // 手动调用上传成功回调
        onSuccess('success');
      };
      reader.onerror = (e) => {
        onError(e);
        this.message.warn(this.l(`${file.name} 文件读取失败.`));
      };
      reader.readAsArrayBuffer(file); // 或者 readAsDataURL, readAsText 根据你的需求
    },
    async submit() {
      const pam = {
        type: this.excelEnumItem['key'],
        file: this.fileData.file,
      };

      const res = await ExcelCommonService.postApiExcelCommonImportDataAsync({ formData: pam });
      if (res?.isSuccess) {
        this.handleCancel();
        this.notify.success({ message: this.l('Unified.texts.ImportSuccessMessage') });
      } else {
        this.errorFileData = res;
        this.notify.error({ message: res.errorMessage });
      }
      this.$emit('fileUploadedSuccessEvent', res?.isSuccess);
    },
    async handleDownLoadTem() {
      this.templateLoading = true;
      const filename = `${this.excelEnumItem['value']}ImportSampleFile.xlsx`;
      const options: ExportFileOption = {
        /** 获取导出文件的token请求 */
        getOutputStreamToken: UserService.getApiIdentityUsersDownloadToken(),
        /** 【导出，下载】配置 axios */
        config: {
          url: '/api/ExcelCommon/ExportExcelTemplateAsync',
          params: {
            FileName: filename,
            type: this.excelEnumItem['key'],
          },
        },
      };
      try {
        await exportFile(options, filename);
      } catch (error) {
        console.log(error);
      } finally {
        this.templateLoading = false;
      }
    },
    /* 下载失败的文件 */
    async downErrorFile() {
      const fileName = `${this.excelEnumItem['value']}ErrorFile.xlsx`;
      const options: ExportFileOption = {
        getOutputStreamToken: UserService.getApiIdentityUsersDownloadToken(),
        config: {
          url: '/api/ExcelCommon/DownErrorExcel',
          params: { errorGuid: this.errorFileData?.errorGuid, fileName: fileName },
        },
      };

      await exportFile(options, fileName);
    },
    downError(item) {
      FileDownloadService.downloadTempFile(item.error.labelingErrorFileDto);
    },
    deleteItem(item) {
      this.fileList = this.fileList.filter((v) => v.uid !== item.uid);
    },
    handleCancel(): void {
      // this.templateErrors = undefined;
      // this.rowErrors = undefined;
      // this.labelingErrorFileDto = undefined;
      // this.hasError = undefined;
      this.fileList = [];
      this.isVisible = false;
    },
    /** 初始化导入结果 */
    initImportReturn(errors: any): any {
      if (errors) {
        // this.templateErrors = errors.templateErrors;
        // this.rowErrors = errors.rowErrors;
        // this.hasError = errors.hasError;
        // this.labelingErrorFileDto = errors.labelingErrorFileDto;
        this.fileList[this.fileList.length - 1].error = errors;
        // this._cdr.detectChanges();

        if (!errors.hasError) {
          // this.isVisible = false;
          // 维护多语言
          this.notify.success({ message: this.l('UploadSuccess') });
        }
      }
    },
  },
});
