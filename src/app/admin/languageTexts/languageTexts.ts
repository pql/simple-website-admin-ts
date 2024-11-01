import { defineComponent, unref } from 'vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { LanguageTextsService } from '@/apis';
import EditLanguageTexts from './edit-language-texts/edit-language-texts.vue';

export default defineComponent({
  name: 'LanguageTexts',
  mixins: [DynamicTableComponentBase],
  data() {
    return {
      defaultFilterValue: { baseCultureName: 'zh-Hans', targetCultureName: 'en' },
    };
  },

  methods: {
    /**
     * 获取数据
     */
    async fetchDataList(filter = {} as any) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      const res = await LanguageTextsService.getApiLanguageManagementLanguageTexts({
        ...this.defaultFilterValue,
        ...queryFilter,
        ...filter,
      });
      return res;
    },
    getTabDataSource() {
      const table = this.$refs.table as any;
      return table;
    },
    editLanguageTexts(item?) {
      const _this = this;
      this.modalHelper
        .create(EditLanguageTexts, {
          pageDataList: item,
          _parents: _this,
        })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },

    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.EDIT:
          this.editLanguageTexts(item);
          break;
        default:
          break;
      }
    },
  },
});
