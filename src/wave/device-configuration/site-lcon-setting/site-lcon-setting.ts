import { updateColorWeak } from '@/logics/theme/updateColorWeak';
import {
  SiteIconSettingService,
  FireBytes_Unified_Wave_SiteIconSettings_Dtos_GetSettingDto,
  FireBytes_Unified_Wave_SiteIconSettings_Dtos_UpdateSiteIconSettingInput,
} from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent, createVNode } from 'vue';
import { UserStore } from '@/store/modules/user';
import { useTimezone } from '@/timezones/useTimezone';
import { Modal, Card } from 'ant-design-vue';
import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';
const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();
const userStore = UserStore.useStore();

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  components: { Modal, Card },
  mounted() {
    this.getData();
  },
  data() {
    const form: any = {};
    const directoryId = <string | undefined>undefined;
    const uploadParams = {} as {
      name?: string;
      directoryId?: string;
      overrideExisting?: boolean;
      extraProperties?: Record<string, any>;
    };
    return {
      form,
      rules: {},
      uploadParams,
      directoryId,
    };
  },
  computed: {},
  methods: {
    fileDescriptorUpload,
    getData() {
      this.loading = true;
      SiteIconSettingService.getApiAppSiteIconSettingSetting()
        .then((res) => {
          this.form = res;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSubmit() {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        let datas: FireBytes_Unified_Wave_SiteIconSettings_Dtos_UpdateSiteIconSettingInput = {
          id: this.form.id as string,
          siteIcon: this.form?.siteIcon?.toString(),
          buildingIcon: this.form?.buildingIcon?.toString(),
          floorIcon: this.form?.floorIcon?.toString(),
        };
        SiteIconSettingService.putApiAppSiteIconSetting({ requestBody: datas })
          .then(() => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },
});
