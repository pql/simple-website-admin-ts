import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { defineComponent } from 'vue';
import { OidcClient } from '@/utils/auth/oidc';

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  data() {
    return {
      loading: true,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    /**
     * 列表
     */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.startTime = !queryFilter.creationTime ? undefined : queryFilter.creationTime[0];
      queryFilter.endTime = !queryFilter.creationTime ? undefined : queryFilter.creationTime[1];
      return OidcClient.getApiAccountSecurityLogs(queryFilter);
    },
  },
});
