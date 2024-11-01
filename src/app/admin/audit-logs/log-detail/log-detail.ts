import { defineComponent, ref } from 'vue';
import { logDetailProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { STATUS_COLORS, METHOD_COLORS } from '../consts';
import { AuditLogsService, Volo_Abp_AuditLogging_AuditLogDto } from '@/apis';
import { useTimezone } from '@/timezones/useTimezone';

const { fromUTCDateToLocalDateTime: formateDateToDatetime } = useTimezone();

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...logDetailProps,
  },
  data() {
    const DetailDto: Volo_Abp_AuditLogging_AuditLogDto = {
      id: '',
      userId: '',
      userName: '',
      tenantId: '',
      tenantName: '',
      impersonatorUserId: '',
      impersonatorUserName: '',
      impersonatorTenantId: '',
      impersonatorTenantName: '',
      executionTime: '',
      executionDuration: 0,
      clientIpAddress: '',
      clientName: '',
      browserInfo: '',
      httpMethod: '',
      url: '',
      exceptions: '',
      comments: '',
      httpStatusCode: 0,
      applicationName: '',
      correlationId: '',
      entityChanges: [],
      actions: [],
    };
    return {
      STATUS_COLORS,
      METHOD_COLORS,
      id: null,
      form: DetailDto,
      /** 当前tab页 */
      currentTab: '1',
      activeKey: ['0'],
    };
  },
  mounted() {
    this.getPageData(this.pageDataList![0]);
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
      if (this.id != null) {
        const auditLogs = await AuditLogsService.getApiAuditLoggingAuditLogs1({
          id: this.id,
        });
        auditLogs.executionTime = formateDateToDatetime(auditLogs.executionTime);
        this.form = auditLogs;
      }
      this.loading = false;
    },
  },
});
