import { PacsCardService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
// import { defineComponent, createVNode } from 'vue';
import CreateoOrEditCards from './create-or-edit-cards/create-or-edit-cards.vue';
import VaildTillDateCards from './valid-till-date-cards/valid-till-date-cards.vue';
import { Modal } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';
// import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const { fromUTCDateToLocalDateHorizontalSymbol } = useTimezone();
export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase],
  data() {
    return {};
  },
  computed: {
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item) => {
        switch (item.name) {
          default:
            return true;
        }
      };
    },
  },
  methods: {
    fromUTCDateToLocalDateHorizontalSymbol,
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return PacsCardService.getApiAppPacsCardPaged(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit();
          break;
        case EVENT_BTN_ENUM.EDIT:
          this.createOrEdit(item);
          break;
        case EVENT_BTN_ENUM.DELETE:
          this.deleteItem(item);
          break;
        case EVENT_BTN_ENUM.BULK_EDIT:
          this.bulkEdit();
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.batchDelete();
          break;
        case EVENT_BTN_ENUM.VALID_TILL_DATE:
          this.bulkValidTillDate();
          break;
        case EVENT_BTN_ENUM.IMPORT:
          this.importFile(item);
          break;
        case EVENT_BTN_ENUM.COPY:
          this.copy(item);
          break;
        default:
          break;
      }
    },
    /**
     * 添加 修改
     */
    createOrEdit(item?) {
      const param = {
        pageDataList: [item?.id],
        _types: '',
        _titleName: item?.id == null ? 'Unified.texts.CreateNewCards' : 'Unified.texts.EditCards',
      };
      this.modalHelper.create(CreateoOrEditCards, { ...param }, { width: 800 }).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
    copy(item: any) {
      const param = {
        pageDataList: [item?.id],
        _types: 'copy',
        _titleName: 'Unified.texts.Copy',
      };
      this.modalHelper.create(CreateoOrEditCards, { ...param }, { width: 800 }).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
    /**
     * 单个删除
     */
    deleteItem(item?) {
      if ((item as any).userName == 'admin') {
        this.notify.warn({
          message: this.l('Unified.texts.SuperAadminCannotBeDeleted'),
        });
        return;
      }
      (this.$refs.table as any).setLoading(true);
      PacsCardService.deleteApiAppPacsCard({
        input: item.id,
      })
        .finally(() => {
          (this.$refs.table as any).setLoading(false);
        })
        .then(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        });
    },
    /**
     * 批量编辑
     */
    bulkEdit() {
      const selectItems = (this.$refs.table as any).getSelectRowKeys();
      if (selectItems.length < 1) {
        return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
      }
      const param = {
        pageDataList: selectItems,
        _types: '',
        _titleName: 'Unified.texts.EditCards',
      };
      this.modalHelper.create(CreateoOrEditCards, { ...param }, { width: 800 }).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
    /**
     * 批量删除
     */
    batchDelete() {
      if ((this.$refs.table as any).getSelectRowKeys().length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }
      const ids = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
      this.confirm({
        iconType: 'warning',
        title: () => this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
        onOk: () => {
          (this.$refs.table as any).setLoading(true);
          PacsCardService.postApiAppPacsCardBatchDelete({
            requestBody: ids,
          })
            .finally(() => {
              (this.$refs.table as any).setLoading(false);
            })
            .then(() => {
              (this.$refs.table as any).reloadGoFirstPage();
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
            });
        },
      });
    },
    //批量修改有效期
    bulkValidTillDate() {
      if ((this.$refs.table as any).getSelectRowKeys().length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }
      const selectItems = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
      const param = {
        pageDataList: selectItems,
        _types: '',
        _titleName: 'Unified.texts.EditValidTillDate',
      };
      this.modalHelper.create(VaildTillDateCards, { ...param }).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
    /*
     *导入
     */
    async importFile(e) {
      // const param = {
      //   fileType: 1,
      //   formData: { File: e.file as Blob },
      // };
      // const res = await UserService.postApiIdentityUsersImportUsersFromFile(param);
      // if (res?.isAllSucceeded) {
      //   return this.notify.success({ message: this.l('Unified.texts.ImportSuccessMessage') });
      // }
      // if (res?.failedCount) {
      //   const that = this;
      //   Modal.confirm({
      //     title: () => `Warning`,
      //     icon: () => createVNode(ExclamationCircleOutlined),
      //     content: () =>
      //       `${this.l('Unified.texts.ImportFailedMessage', [res?.succeededCount, res?.failedCount])}`,
      //     onOk() {
      //       that.downFailedExcel(res.invalidUsersDownloadToken);
      //     },
      //     onCancel() {},
      //   });
      // }
    },
    async downFailedExcel() {
      //token
      // const res = await UserService.getApiIdentityUsersDownloadImportInvalidUsersFile({
      //   token: token,
      // });
      // const blob = new Blob([res]);
      // // 创建一个指向 Blob 的 URL
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.style.display = 'none'; // 隐藏元素
      // link.href = url;
      // link.download = 'ImportUsersSampleFile.xlsx'; // 替换为你希望的文件名和扩展名
      // document.body.appendChild(link); // 将链接添加到页面
      // link.click(); // 触发点击事件，开始下载
      // setTimeout(() => {
      //   window.URL.revokeObjectURL(url); // 释放 URL 对象
      //   document.body.removeChild(link); // 移除 <a> 元素
      // }, 100);
    },
  },
});
