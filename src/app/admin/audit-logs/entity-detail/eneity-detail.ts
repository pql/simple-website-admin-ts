import { defineComponent, ref } from 'vue';
import { entityDetailProps } from './props';
import {
  AuditLogsService,
  Volo_Abp_Auditing_EntityChangeType,
  Volo_Abp_AuditLogging_EntityChangeDto,
  Volo_Abp_AuditLogging_EntityChangeWithUsernameDto,
} from '@/apis';
import ModalComponentBase from '@/shared/component-base/modal-component-base';

import { useTimezone } from '@/timezones/useTimezone';

const { fromUTCDateToLocalDateTime: formateDateToDatetime } = useTimezone();

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...entityDetailProps,
  },
  data() {
    const DetailDto: Volo_Abp_AuditLogging_EntityChangeDto = {
      id: '',
      auditLogId: '',
      tenantId: '',
      changeTime: '',
      changeType: Volo_Abp_Auditing_EntityChangeType._0,
      entityId: '',
      entityTypeFullName: '',
      propertyChanges: [],
    };
    return {
      id: null,
      item: DetailDto,
      loadType: 'single', // 'single' | 'all'
      form: [
        {
          entityChange: DetailDto,
          userName: null,
        },
      ] as Volo_Abp_AuditLogging_EntityChangeWithUsernameDto[],
      activeKey: ref(['1']),
      columns: [
        {
          title: this.l('AbpAuditLogging.texts.PropertyName'),
          dataIndex: 'propertyName',
          key: 'propertyName',
        },
        {
          title: this.l('AbpAuditLogging.texts.OriginalValue'),
          dataIndex: 'originalValue',
          key: 'originalValue',
        },
        {
          title: this.l('AbpAuditLogging.texts.NewValue'),
          dataIndex: 'newValue',
          key: 'newValue',
        },
      ],
    };
  },
  mounted() {
    this.getPageData(this.pageDataList![0], this.pageType);
  },
  methods: {
    formateDatetime(dateTimeString) {
      // 判断字符串是否包含多余的引号
      const hasExtraQuotes = /^"(\\".*\\"|.*)"$/.test(dateTimeString);
      if (hasExtraQuotes) {
        // 去掉前后双引号和转义的双引号
        dateTimeString = dateTimeString.replace(/^"|"$/g, '').replace(/\\"/g, '"');
      }
      return formateDateToDatetime(dateTimeString);
    },
    getPageData(item, loadType) {
      this.item = item;
      this.id = item.id;
      this.loadType = loadType;
      this.initData();
    },
    initData() {
      this.init();
    },
    changeType(type) {
      return type == 0
        ? this.l('AbpAuditLogging.texts.Created')
        : type == 1
          ? this.l('AbpAuditLogging.texts.Updated')
          : this.l('AbpAuditLogging.texts.Deleted');
    },
    /**
     * 初始化
     */
    async init() {
      this.loading = true;
      if (this.id != null && this.loadType == 'single') {
        const changesEntity =
          await AuditLogsService.getApiAuditLoggingAuditLogsEntityChangeWithUsername({
            entityChangeId: this.id,
          });
        this.form = [changesEntity];
      } else if (this.id != null && this.loadType == 'all') {
        const changesEntitys =
          await AuditLogsService.getApiAuditLoggingAuditLogsEntityChangesWithUsername({
            entityId: this.item.entityId as string,
            entityTypeFullName: this.item.entityTypeFullName as string,
          });
        this.form = changesEntitys;
      }
      this.loading = false;
    },
  },
});
