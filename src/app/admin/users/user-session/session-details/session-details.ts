import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, ref } from 'vue';
import { SessionsService, Volo_Abp_Identity_IdentitySessionDto } from '@/apis';
import { useTimezone } from '@/timezones/useTimezone';
const { fromUTCDateToLocalDateTime: formateDateToDatetime } = useTimezone();

export default defineComponent({
  name: 'AuditLogDetail',
  mixins: [ModalComponentBase],
  props: {
    _id: {
      type: Array,
      required: true,
    },
  },
  data() {
    const DetailDto: Volo_Abp_Identity_IdentitySessionDto = {};
    return {
      form: DetailDto,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.init();
    },
    /**
     * 初始化
     */
    async init() {
      this.loading = true;
      const auditLogs = await SessionsService.getApiIdentitySessions1({ id: this._id.toString() });
      this.form = auditLogs;
      if (this.form.signedIn) this.form.signedIn = formateDateToDatetime(this.form.signedIn);
      if (this.form.lastAccessed)
        this.form.lastAccessed = formateDateToDatetime(this.form.lastAccessed);
      this.loading = false;
    },
  },
});
