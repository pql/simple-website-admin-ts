import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent } from 'vue';
import { moveAllTenantsProps } from './props';
import { EditionService } from '@/apis';
import { Select } from 'ant-design-vue';

export default defineComponent({
  components: { Select },
  mixins: [ModalComponentBase],
  props: {
    ...moveAllTenantsProps,
  },
  data() {
    const id: String = '';
    const tenantCount: number = 0;
    const selectVersionsOptions: any = [];
    const allocationId: String = '';
    return {
      id,
      tenantCount,
      selectVersionsOptions,
      allocationId,
      versionDataSource: {
        service: 'EditionService.getApiSaasEditionsAll', //接口名，
        labelField: 'displayName', //下拉框标题
        valueField: 'id', //下拉框值
        params: { },
      },
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
    handleSubmit() {
      this.moveVersions();
    },
    moveVersions() {
      this.loading = true;
      EditionService.putApiSaasEditionsMoveAllTenants({
        id: this.id.toString(),
        editionId: this.allocationId.toString(),
      })
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
      this.loading = true;

      const roleResult = await EditionService.getApiSaasEditionsAll();
      this.tenantCount =
        roleResult?.find((f) => {
          return f.id == this.id;
        })?.tenantCount ?? 0;
      this.selectVersionsOptions = roleResult
        ?.filter((f) => {
          return f.id != this.id;
        })
        .map((m) => ({ value: m.id, label: m.displayName }));

      this.selectVersionsOptions.splice(0, 0, {
        value: '',
        label: this.l('Unified.texts.Versions:CancelAllocation'),
      });

      this.loading = false;
    },
  },
});
