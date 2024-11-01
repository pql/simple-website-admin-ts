import { defineComponent } from 'vue';
import { useTimezone } from '@/timezones/useTimezone';
import { AuditLogsService } from '@/apis';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import LogDetail from '../log-detail/log-detail.vue';
import { logsProps } from './props';
import { METHOD_COLORS, STATUS_COLORS } from '../consts';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  props: {
    ...logsProps,
  },

  data() {
    return {
      STATUS_COLORS,
      METHOD_COLORS,
    };
  },
  methods: {
    /**
     * 日志列表
     * @param otherQuery
     * @returns
     */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();

      queryFilter.startTime = !queryFilter.executionTime
        ? undefined
        : fromLocalDateToUTCDateFormat(queryFilter.executionTime[0]);
      queryFilter.endTime = !queryFilter.executionTime
        ? undefined
        : fromLocalDateToUTCDateFormat(queryFilter.executionTime[1]);
      return AuditLogsService.getApiAuditLoggingAuditLogs(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.VIEW_DETAILS:
          this.getDetails(item);
          break;
        default:
          break;
      }
    },
    /** 查看详情 */
    getDetails(item) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper.create(LogDetail, { pageDataList: selectItems }).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
  },
});
