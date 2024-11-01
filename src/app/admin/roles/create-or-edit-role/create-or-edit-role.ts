import { defineComponent } from 'vue';
import { createOrEditRoleProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { RoleService, Volo_Abp_Identity_IdentityRoleCreateDto } from '@/apis';

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...createOrEditRoleProps,
  },
  data() {
    const rolesCreateDto: Volo_Abp_Identity_IdentityRoleCreateDto = {
      name: '',
      isDefault: false,
      isPublic: false,
    };
    return {
      id: null,
      form: rolesCreateDto,
      rules: {
        name: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 50,
            message: this.l('Unified.texts.OverMaxLength'),
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    this.getPageData(this.pageDataList![0] as string);
  },
  methods: {
    getPageData(id) {
      this.id = id;
      this.initData();
    },
    async initData() {
      if (this.id != null) {
        this.loading = true;
        try {
          const roleResult = await RoleService.getApiIdentityRoles({
            id: this.id,
          });
          this.form = {
            name: roleResult.name as string,
            isDefault: roleResult.isDefault,
            isPublic: roleResult.isPublic,
          };
        } catch (error) {
          console.log(error);
        } finally {
          this.loading = false;
        }
      }
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        const createRoles = {
          name: this.form.name,
          isDefault: this.form.isDefault,
          isPublic: this.form.isPublic,
        };
        if (this.id == null) {
          // 创建
          RoleService.postApiIdentityRoles({
            requestBody: createRoles,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.handleSubmitAfter(closeFlag);
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          // 修改
          RoleService.putApiIdentityRoles({
            id: this.id,
            requestBody: createRoles,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.handleSubmitAfter(closeFlag);
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    handleSubmitAfter(closeFlag = true) {
      if (closeFlag) {
        this.success();
      } else {
        this.saveNotClose();
      }
    },
  },
});
