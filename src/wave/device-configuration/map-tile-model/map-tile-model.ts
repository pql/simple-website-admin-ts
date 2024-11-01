import { BuildingFloorModelService, FileDescriptorsService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent, createVNode } from 'vue';
import CreateOrEditMapTileModel from './create-or-edit-map-tile-model/create-or-edit-map-tile-model.vue';
import { UserStore } from '@/store/modules/user';
import { useTimezone } from '@/timezones/useTimezone';
import { Modal } from 'ant-design-vue';
import { downloadFile } from '@/utils/file/fileDescriptor';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();
const userStore = UserStore.useStore();

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
      return (item, column, record) => {
        switch (item.name) {
          default:
            return true;
        }
      };
    },
  },
  methods: {
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.type = 1;
      return BuildingFloorModelService.getApiAppBuildingFloorModelPaged(queryFilter);
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
        case EVENT_BTN_ENUM.DECOMPRESS:
          this.decompress(item);
          break;
        case EVENT_BTN_ENUM.DOWNLOAD:
          this.download(item);
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
        _titleName:
          item?.id == null
            ? 'Unified.texts.CreateNewMapTileModel'
            : 'Unified.texts.EditMapTileModel',
      };
      this.modalHelper
        .create(CreateOrEditMapTileModel, { ...param }, { width: 500 })
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
      if ((item as any).userName == 'admin') {
        this.notify.warn({
          message: this.l('Unified.texts.SuperAadminCannotBeDeleted'),
        });
        return;
      }
      (this.$refs.table as any).setLoading(true);
      BuildingFloorModelService.deleteApiAppBuildingFloorModel({
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
        _titleName: 'Unified.texts.EditMapTileModel',
      };
      this.modalHelper
        .create(CreateOrEditMapTileModel, { ...param }, { width: 500 })
        .subscribe((res) => {
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
          BuildingFloorModelService.postApiAppBuildingFloorModelBatchDelete({
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
    decompress(item?) {
      (this.$refs.table as any).setLoading(true);
      BuildingFloorModelService.postApiAppBuildingFloorModelBuildingFloorModelDecompress({
        id: item.id,
      })
        .finally(() => {
          (this.$refs.table as any).setLoading(false);
        })
        .then(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.notify.success({ message: this.l('SuccessfullyDecompres') });
        });
    },
    download(item?) {
      FileDescriptorsService.getApiFileManagementFileDescriptor({
        id: item.fileId,
      }).then((res) => {
        const fileDescriptorId: string = item.fileId;
        const filename: string = res.name as string;
        downloadFile(fileDescriptorId, filename);
      });
    },
  },
});
