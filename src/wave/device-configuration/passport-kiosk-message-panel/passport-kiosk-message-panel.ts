import { PassportKioskMessagePanelService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import PassportKioskMessageDetail from './passport-kiosk-message-detail/passport-kiosk-message-detail.vue';
import { UserStore } from '@/store/modules/user';
import { useTimezone } from '@/timezones/useTimezone';
import { Modal } from 'ant-design-vue';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();
const userStore = UserStore.useStore();

export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase],
  data() {
    return {};
  },
  computed: {
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item, column, record) => {
        switch (item.name) {
          default:
            return true;
        }
      };
    },
  },
  methods: {
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();

      queryFilter.startTime = !queryFilter.submissionDateTime
        ? undefined
        : queryFilter.submissionDateTime[0];
      queryFilter.endTime = !queryFilter.submissionDateTime
        ? undefined
        : queryFilter.submissionDateTime[1];

      return PassportKioskMessagePanelService.postApiAppPassportKioskMessagePanelPaged({
        requestBody: queryFilter,
      });
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.EDIT:
          this.viewDetail(item);
          break;
        case EVENT_BTN_ENUM.DETAIL:
          this.viewDetail(item);
          break;
        default:
          break;
      }
    },
    /**
     * 详情
     */
    viewDetail(item?) {
      const param = {
        pageDataList: [item?.id],
      };
      this.modalHelper
        .create(PassportKioskMessageDetail, { ...param }, { size:'medium' })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
  },
});
