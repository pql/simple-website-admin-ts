import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import CreateLanguagesModal from './CreateLanguagesModal/CreateLanguagesModal.vue';

import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import { LanguagesService } from '@/apis';

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  data() {
    return {
      defaultLanguage: '',
    };
  },
  computed: {},
  methods: {
    /**
     * 获取数据
     */
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return LanguagesService.getApiLanguageManagementLanguages(queryFilter);
    },
    createOrEdit(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(CreateLanguagesModal, {
          pageDataList: selectItems,
        })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 单个删除
     */
    deleteItem(item?) {
      (this.$refs.table as any).setLoading(true);
      LanguagesService.deleteApiLanguageManagementLanguages({
        id: item.id,
      })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        })
        .finally(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          (this.$refs.table as any).setLoading(false);
        });
    },
    async setDefaultLanguage(item?) {
      const res = await LanguagesService.putApiLanguageManagementLanguagesSetAsDefault({
        id: item.id,
      });
      (this.$refs.table as any).reloadGoFirstPage();
      (this.$refs.table as any).setLoading(false);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit();
          break;
        case EVENT_BTN_ENUM.DELETE:
          this.deleteItem(item);
          break;
        case EVENT_BTN_ENUM.EDIT:
          this.createOrEdit(item);
          break;
        case EVENT_BTN_ENUM.SET_DEFAULT_LANGUAGE:
          this.setDefaultLanguage(item);
          break;
        default:
          break;
      }
    },
  },
});
