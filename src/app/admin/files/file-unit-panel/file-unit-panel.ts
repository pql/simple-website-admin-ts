import { defineComponent } from 'vue';
import { fileTreePanelProps } from './props';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { DirectoryDescriptorsService } from '@/apis';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import CreateFolderComponent from '@/app/admin/files/create-folder/create-folder.vue';
import { downloadFile } from '@/utils/file/fileDescriptor';

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  props: {
    ...fileTreePanelProps,
  },
  emits: ['update:name', 'selectDirectory', 'update:directory'],
  data() {
    return {
      directoryDescriptorId: undefined,
    };
  },
  watch: {
    'selectedTree.id': {
      handler(val) {
        this.directoryDescriptorId = !this.isRootNode(val) ? val : undefined;
      },
      immediate: true,
    },
    directoryDescriptorId: {
      handler() {
        this.refresh();
      },
    },
  },
  methods: {
    /**
     * 判断节点是否为根节点
     * @param id string
     * @returns boolean
     */
    isRootNode(id: string) {
      return id === 'root';
    },
    /** 刷新 */
    refresh() {
      (this.$refs.table as any).reload();
    },
    /** 获取数据 */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      const { maxResultCount, skipCount, Name, sorting } = queryFilter;
      return new Promise((resolve, reject) => {
        if (!this.selectedTree || !this.selectedTree?.id) {
          reject();
          return;
        }
        DirectoryDescriptorsService.getApiFileManagementDirectoryDescriptor1({
          id: this.directoryDescriptorId,
          filter: Name,
          sorting: sorting,
          maxResultCount: otherQuery.maxResultCount ?? maxResultCount,
          skipCount: otherQuery.skipCount ?? skipCount,
        })
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 按钮点击事件
     * @param event 事件类型
     * @param item 操作数据
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.OPEN:
          this.handleNameSelect(item);
          break;
        case EVENT_BTN_ENUM.RENAME:
          this.renameUnit(item);
          break;
        case EVENT_BTN_ENUM.DELETE:
          this.removeUnit(item);
          break;
        default:
          break;
      }
    },

    /**
     * 选中的列数据对象
     * @param record
     */
    handleNameSelect(record) {
      const isDirectory = this.fileIsDirectory(record);
      if (isDirectory) {
        // 目录
        this.directoryDescriptorId = record.id ?? undefined;
        this.reload();
        this.$emit('selectDirectory', record);
      } else {
        // 其他文件点击下载
        const fileDescriptorId: string = record.id;
        const filename: string = record.name;
        downloadFile(fileDescriptorId, filename);
      }
    },
    fileIsDirectory(record): boolean {
      return record.isDirectory;
    },
    /** 重命名文件 */
    renameUnit(record) {
      this.modalHelper
        .create(CreateFolderComponent, { pageDataList: [record] }, { size: 'small' })
        .subscribe((res) => {
          if (res) {
            this.$emit('update:name', res);
            this.reload();
          }
        });
    },
    /** 删除文件 */
    removeUnit(record) {
      this.confirm({
        iconType: 'warning',
        title: this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteWarningMessage'),
        onOk: () => {
          this.deleteConfirm(record.id);
        },
      });
    },
    /**
     * 确认删除节点
     */
    deleteConfirm(treeKey) {
      if (treeKey) {
        DirectoryDescriptorsService.deleteApiFileManagementDirectoryDescriptor({ id: treeKey })
          .then(() => {
            this.notify.success({
              message: this.l('Unified.texts.SavedSuccessfully'),
            });
          })
          .finally(() => {
            this.$emit('update:directory', treeKey);
            this.reload();
          });
      }
    },
  },
});
