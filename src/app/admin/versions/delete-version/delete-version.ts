import { defineComponent } from 'vue';
import { deleteVersionProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { EditionService } from '@/apis';
import { Select } from 'ant-design-vue';

export default defineComponent({
  components: {
    Select,
  },
  mixins: [ModalComponentBase],
  props: {
    ...deleteVersionProps,
  },
  data() {
    const id: String = '';
    const displayName: String = '';
    const radioModel: number = 1;
    const tenantCount: number = 0;
    const selectVersionsOptions: any = [];
    const allocationId: String = '';
    return {
      id,
      displayName,
      radioModel,
      tenantCount,
      selectVersionsOptions,
      allocationId,
    };
  },
  mounted() {
    this.getPageData(this.versionsId);
  },
  methods: {
    getPageData(id) {
      this.id = id;
      this.initData();
    },
    initData() {
      this.init();
    },
    /**
     * 初始化
     */
    async init() {
      this.loading = true;

      const roleResult = await EditionService.getApiSaasEditionsAll();
      this.tenantCount =
        roleResult?.find((f) => {
          return f.id == this.id;
        })?.tenantCount ?? 0;
      this.displayName =
        roleResult?.find((f) => {
          return f.id == this.id;
        })?.displayName ?? '';
      this.selectVersionsOptions = roleResult
        ?.filter((f) => {
          return f.id != this.id;
        })
        .map((m) => ({ value: m.id, label: m.displayName }));

      this.allocationId = 'needAllot';
      this.selectVersionsOptions.splice(0, 0, {
        value: 'needAllot',
        label: this.l('Unified.texts.Versions:NeedAllot'),
      });
      this.loading = false;
    },
    selectChange(selectKey) {
      this.allocationId = selectKey;
    },
    handleSubmit() {
      if (this.radioModel == 1) {
        this.deleteVersions();
      } else if (this.radioModel == 2) {
        if (this.allocationId == 'needAllot') {
          this.notify.warning({ message: this.l('Unified.texts.Versions:NeedAllot') });
          return;
        }
        this.moveVersions();
      }
    },
    deleteVersions() {
      this.loading = true;
      EditionService.deleteApiSaasEditions({ id: this.id.toString() })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          this.handleSubmitAfter(true);
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    moveVersions() {
      this.loading = true;
      EditionService.putApiSaasEditionsMoveAllTenants({
        id: this.id.toString(),
        editionId: this.allocationId.toString(),
      })
        .then(() => {
          this.deleteVersions();
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
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
