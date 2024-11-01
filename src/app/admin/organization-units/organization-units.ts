import { defineComponent } from 'vue';
import PagedListingComponentBase from '/@/shared/component-base/paged-listing-component-base';
import OrganizationUnitTreePanel from './organization-unit-tree-panel/organization-unit-tree-panel.vue';
import OrganizationUnitMembersPanel from './organization-unit-members-panel/organization-unit-members-panel.vue';
import OrganizationUnitRolePanel from './organization-unit-role-panel/organization-unit-role-panel.vue';

export default defineComponent({
  components: {
    OrganizationUnitTreePanel,
    OrganizationUnitMembersPanel,
    OrganizationUnitRolePanel,
  },
  mixins: [PagedListingComponentBase],
  data() {
    return {
      currentTab: '1',
      selectedTree: null, // 选择的树结构
      showtab: false,
      breadList: [] as String[],
    };
  },
  methods: {
    /**
     * 选择树结构
     */
    selectedNodeFunc(data, breadList) {
      this.breadList = breadList;
      this.selectedTree = data;
      this.currentTab = '1';
    },
  },
});
