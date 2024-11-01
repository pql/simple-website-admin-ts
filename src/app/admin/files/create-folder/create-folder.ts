import { defineComponent } from 'vue';
import { createFolderProps } from './props';
import {
  DirectoryDescriptorsService,
  Volo_FileManagement_Directories_CreateDirectoryInput,
} from '@/apis';
import ModalComponentBase from '@/shared/component-base/modal-component-base';

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...createFolderProps,
  },
  data() {
    return {
      form: {} as Volo_FileManagement_Directories_CreateDirectoryInput,
    };
  },
  computed: {
    folderUnit(): any {
      return !!this.pageDataList && this.pageDataList.length > 0 ? this.pageDataList[0] : null;
    },
    modalTitle() {
      return !!this.folderUnit && !!this.folderUnit.name
        ? this.l('FileManagement.texts.Rename')
        : this.l('FileManagement.texts.CreateFolder');
    },
  },
  mounted() {
    if (this.folderUnit) {
      this.form.name = this.folderUnit.name;
    } else {
      this.form.name = '';
    }
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        if (this.folderUnit?.id) {
          this.updateUnit(this.form, closeFlag);
        } else {
          // 创建
          this.createUnit(this.form, closeFlag);
        }
      });
    },
    /**
     * 创建
     */
    createUnit(params: Volo_FileManagement_Directories_CreateDirectoryInput, closeFlag: boolean) {
      params.parentId = this.folderUnit?.parentId;
      this.loading = true;
      DirectoryDescriptorsService.postApiFileManagementDirectoryDescriptor1({
        requestBody: params,
      })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          if (closeFlag) {
            this.success();
          } else {
            this.saveNotClose();
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * 编辑
     */
    updateUnit(formData: any, closeFlag: boolean = true) {
      this.loading = true;
      DirectoryDescriptorsService.postApiFileManagementDirectoryDescriptor({
        id: this.folderUnit?.id,
        requestBody: {
          ...formData,
        },
      })
        .then((res) => {
          this.notify.success({
            message: this.l('Unified.texts.SavedSuccessfully'),
          });
          if (closeFlag) {
            this.success(res);
          } else {
            this.saveNotClose(res);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
