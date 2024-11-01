import { defineComponent } from 'vue';
import { entitiesProps } from './props';
import { AuditLogsService } from '@/apis';
import { useTimezone } from '@/timezones/useTimezone';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import EntityDetail from '../entity-detail/entity-detail.vue';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  props: {
    ...entitiesProps,
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 实体列表
     * @param otherQuery
     * @returns
     */
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();

      console.log(fromLocalDateToUTCDateFormat(queryFilter.changeTime));

      queryFilter.startDate = !queryFilter.changeTime
        ? undefined
        : fromLocalDateToUTCDateFormat(queryFilter.changeTime[0]);
      queryFilter.endDate = !queryFilter.changeTime
        ? undefined
        : fromLocalDateToUTCDateFormat(queryFilter.changeTime[1]);
      return AuditLogsService.getApiAuditLoggingAuditLogsEntityChanges(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CHANGE_DETAILS:
          this.getEntityChanges(item, 'single');
          break;
        case EVENT_BTN_ENUM.ALL_CHANGE_DETAILS:
          this.getEntityChanges(item, 'all');
          break;
        default:
          break;
      }
    },
    /** 查看详情 */
    getEntityChanges(item, type) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item];
      }
      this.modalHelper
        .create(EntityDetail, { pageDataList: selectItems, pageType: type })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
  },
});
