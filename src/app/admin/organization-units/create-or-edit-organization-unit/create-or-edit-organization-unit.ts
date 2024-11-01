import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent } from 'vue';
import { createOrEditOrganizationUnitProps } from './props';
import { OrganizationUnitService, Volo_Abp_Identity_OrganizationUnitCreateDto } from '@/apis';

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...createOrEditOrganizationUnitProps,
  },
  data() {
    return {
      form: {} as Volo_Abp_Identity_OrganizationUnitCreateDto,
      rules: {
        displayName: [],
      },
    };
  },
  computed: {
    organizationUnit(): any {
      return !!this.pageDataList && this.pageDataList.length > 0 ? this.pageDataList[0] : null;
    },
    modalTitle() {
      return !!this.organizationUnit && !!this.organizationUnit.displayName
        ? this.l('AbpIdentity.texts.EditOrganizationUnit')
        : this.l('AbpIdentity.texts.NewOrganizationUnit');
    },
  },
  mounted() {
    if (this.organizationUnit) {
      this.form.displayName = this.organizationUnit.displayName;
    } else {
      this.form.displayName = '';
    }
  },
  methods: {
    /**
     * 提交表单
     */
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        if (this.organizationUnit?.id) {
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
    createUnit(params: Volo_Abp_Identity_OrganizationUnitCreateDto, closeFlag: boolean) {
      params.parentId = this.organizationUnit?.parentId;
      this.loading = true;
      OrganizationUnitService.postApiIdentityOrganizationUnits({
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
      OrganizationUnitService.putApiIdentityOrganizationUnits({
        id: this.organizationUnit?.id,
        requestBody: {
          ...formData,
        },
      }).then(() => {
        this.notify.success({
          message: this.l('Unified.texts.SavedSuccessfully'),
        });
        if (closeFlag) {
          this.success();
        } else {
          this.saveNotClose();
        }
      });
    },
  },
});
