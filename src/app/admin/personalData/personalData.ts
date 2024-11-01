import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import CreateClaimTypesModal from '@/app/admin/claimTypes/CreateClaimTypesModal/CreateClaimTypesModal.vue';
import { createVNode, defineComponent } from 'vue';
import { GdprRequestService } from '@/apis';
import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';
import moment, { Moment } from 'moment';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { AbpStore } from '@/store/modules/abp';
import { UserStore } from '@/store/modules/user';
import { router } from '@/router';
import { PageEnum } from '@/enums/pageEnum';
import { downloadByData } from '@/utils/file/download';
import { ExportFileOption, exportFile } from '@/utils/file/exportFile';
import { useTimezone } from '@/timezones/useTimezone';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();

export default defineComponent({
  mixins: [DynamicTableComponentBase],

  data() {
    return {
      loading: true,
      isRequestAllowed: false,
    };
  },
  component: {
    Modal,
  },
  computed: {},
  mounted() {
    this.initi();
  },
  methods: {
    /**
     * 列表
     */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.userId = this.abp.currentUser?.id as string;
      return GdprRequestService.getApiGdprRequestsList(queryFilter);
    },
    initi() {
      this.queryPersonalDataPermission();
    },
    queryPersonalDataPermission() {
      GdprRequestService.getApiGdprRequestsIsRequestAllowed()
        .then((res) => {
          this.isRequestAllowed = res;
        })
        .finally(() => { });
    },
    requestPersonalData() {
      this.isRequestAllowed = false;
      GdprRequestService.postApiGdprRequestsPrepareData()
        .then((res) => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.queryPersonalDataPermission();
        })
        .catch((error) => {
          this.isRequestAllowed = true;
          this.message.error(this.l(error.body.error.code));
        })
        .finally(() => {
          this.message.success(this.l('Unified.texts.SavedSuccessfully'));
          this.loading = false;
        });
    },
    async download(id) {
      const filename = 'PersonalData.zip';
      const options: ExportFileOption = {
        /** 获取导出文件的token请求 */
        getOutputStreamToken: GdprRequestService.getApiGdprRequestsDownloadToken({ id: id }),
        /** 【导出，下载】配置 axios */
        config: {
          url: '/api/gdpr/requests/data/' + id + '',
          params: {
            filename,
          },
        },
      };

      try {
        await exportFile(options, filename);
      } finally {
        this.loading = false;
      }
    },
    deletePersonalDataPopup() {
      const th = this;
      Modal.confirm({
        title: () => `${this.l('Unified.texts.Tips')}`,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => `${this.l('AbpGdpr.texts.DeletePersonalDataWarning')}`,
        onOk() {
          th.deletePersonalData();
        },
        onCancel() { },
      });
    },
    deletePersonalData() {
      let isSucceed = true;
      GdprRequestService.deleteApiGdprRequests()
        .then((res) => { })
        .catch((error) => {
          isSucceed = false;
          this.message.error(this.l(error.body.error.code));
        })
        .finally(() => {
          if (isSucceed) {
            const userStore = UserStore.useStore();
            userStore.logout(true);
          }
        });
    },
  },
});
