import { defineComponent } from 'vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { unref } from 'vue';
import { TextTemplateDefinitionsService } from '@/apis';
import message from './message/message.vue';
import { router } from '@/router';
import { downloadByData } from '@/utils/file/download';

export default defineComponent({
  name: 'textTemplates',
  mixins: [DynamicTableComponentBase],
  components: { message },
  data() {
    return {
      currentComponentsKey: 'textTemplates',
      currentComponentsValue: '',
    };
  },

  methods: {
    /**
     * 获取数据
     */
    async fetchDataList(filter = {} as any) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      const res =
        await TextTemplateDefinitionsService.getApiTextTemplateManagementTemplateDefinitions({
          filterText: queryFilter.filterText,
        });
      return res;
    },
    getTabDataSource() {
      const table = this.$refs.table as any;
      return table;
    },
    edit(item?) {
      this.currentComponentsKey = 'message';
      this.currentComponentsValue = item.name;
    },
    receiveDataFromChild(data) {
      this.currentComponentsKey = data;
    },

    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.EDIT:
          this.edit(item);
          break;
        default:
          break;
      }
    },
  },
});
