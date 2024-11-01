import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import { RoleService } from '@/apis';
import { any } from 'vue-types';

export default defineComponent({
  name: 'MoveAllUsers',
  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {
      form: {
        id: '' as string,
        roleId: '' as string,
      },
      rolesList: [] as any[],
      roleDataSource: {
        service: 'CustomRoleService.getApiAppCustomRoleList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: { notId: this.pageDataList[0] },
        default: ''
      },
    };
  },

  mounted() {
    this.getPageData(this.pageDataList[0]);
  },
  methods: {
    getPageData(id) {
      this.form.id = id;
      this.init();
    },

    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        const { id, roleId } = this.form;
        let createScopesForm = { id, roleId };
        // 创建
        RoleService.putApiIdentityRolesMoveAllUsers(createScopesForm)
          .then((res) => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            this.handleSubmitAfter(closeFlag);
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleSubmitAfter(closeFlag = true) {
      if (closeFlag) {
        this.success();
      } else {
        this.saveNotClose();
      }
    },
    /**
     * 初始化
     */
    async init() {
      this.loading = false;
    },
    selectListChange(item) {
      this.$nextTick().then(() => {
        let defRole = {
          id: '',
          name: this.l('Unified.texts.UnassignRole'),
        };
        item.unshift(defRole);
      });
    }
  },
});
