import { defineComponent } from 'vue';
import { filesProps } from './props';
import FileTreePanel from './file-tree-panel/file-tree-panel.vue';
import FileUnitPanel from './file-unit-panel/file-unit-panel.vue';
import CreateFolder from './create-folder/create-folder.vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';
import { FileDescriptorsService } from '@/apis';
import { isNull } from 'lodash-es';

export default defineComponent({
  components: {
    FileTreePanel,
    FileUnitPanel,
  },
  mixins: [AppComponentBase],
  props: {
    ...filesProps,
  },
  data() {
    return {
      directoryId: undefined,
      selectedTree: null, // 选中的树节点信息
      expandedKeys: [] as string[],
      breadList: [] as string[],
      fileDescriptorUpload,
      uploadParams: {} as {
        name?: string;
        directoryId?: string;
        overrideExisting?: boolean;
        extraProperties?: Record<string, any>;
      },
    };
  },
  watch: {
    'selectedTree.id': {
      handler() {
        if (
          this.selectedTree &&
          (this.selectedTree as any).id &&
          (this.selectedTree as any).id !== 'root'
        ) {
          this.directoryId = (this.selectedTree as any).id;
          this.uploadParams.directoryId = this.directoryId;
        }
      },
    },
  },
  methods: {
    /**
     * 选择树节点
     */
    selectedNodeFunc(data, breadList) {
      this.selectedTree = data;
      this.breadList = breadList;
      console.log(data);
    },
    /**
     * 判断节点是否为根节点
     * @param id string
     * @returns boolean
     */
    isRootNode(id: string) {
      return id === 'root';
    },
    /**
     * 创建文件夹
     */
    handleCreateFolder() {
      const parentId = (this.selectedTree as any)?.parentId;
      const hasChildren = (this.selectedTree as any)?.hasChildren;
      const treeId = (this.selectedTree as any)?.id;
      const treeKey = treeId && !this.isRootNode(treeId) ? treeId : null;
      const obj = treeKey ? { parentId: treeKey } : null;
      const pageDataList = obj ? [obj] : [];
      this.modalHelper
        .create(CreateFolder, { pageDataList: pageDataList }, { size: 'small' })
        .subscribe((res) => {
          if (res) {
            // [未选中节点 | 选中根节点 | 父节点是根节点且无子节点]创建文件夹，重新加载整棵树数据
            if (
              isNull(this.selectedTree) ||
              this.isRootNode(treeId) ||
              (this.isRootNode(parentId) && !hasChildren)
            ) {
              // "选中根节点"或者"未选中节点"创建文件夹到根节点下，重新加载整棵树数据
              (this.$refs.treeRef as any).reload();
            } else {
              if (hasChildren) {
                // 选中的节点，节点有子节点时创建文件夹，重新加载当前节点数据信息
                (this.$refs.treeRef as any).loadTreeDataById(treeId);
              } else {
                // 选中的节点，节点无子节点时创建文件夹，先移除当前节点数据，后重新加载当前节点父节点数据
                (this.$refs.treeRef as any).removeTreeDataById(treeId);
                (this.$refs.treeRef as any).loadTreeDataById(parentId);
              }
            }
          }
        });
    },
    /**
     * 点击表格目录
     * @param record
     */
    handleSelectDirectory(record) {
      const name = record.name;
      const index = this.breadList.findIndex((key) => key === name);
      if (index >= 0) {
        this.breadList.splice(index, 1);
      }
      this.breadList.push(name);
    },
    /**
     * 上传文件
     */
    handleUploadChange(list: string) {
      (this.$refs.treeRef as any).reload();
      if (this.$refs.fileUnitRef) {
        (this.$refs.fileUnitRef as any).refresh();
      }
    },

    /**
     * 重命名
     * @param res 重命名成功后接口返回的数据
     */
    handleUpdateName(res) {
      (this.$refs.treeRef as any).renameSuccessCallback(res);
    },

    /** 树节点重命名成功 */
    handleTreeRenameSuccess(res) {
      (this.$refs.fileUnitRef as any).refresh();
    },

    /**
     * 删除
     * @param treeId 删除对象的目标id
     */
    handleUpdateDirectory(treeId) {
      (this.$refs.treeRef as any).deleteSuccessCallback(treeId);
    },

    /**
     * 处理图片上传前的文件是否已经上传过的校验
     * @param file
     */
    async handleBeforeUpload(file) {
      const { name, size } = file;

      const fileList = [
        {
          fileName: name,
          directoryId: this.directoryId,
          size,
        },
      ];

      try {
        const info = await FileDescriptorsService.postApiFileManagementFileDescriptorPreUploadInfo({
          requestBody: fileList,
        });
        info.forEach((item) => {
          item.doesExist &&
            this.notify.warning({
              message: this.l('Unified.texts.SomeChoosedFilesExist'),
            });
        });
      } catch (err) {
        this.notify.error({ message: this.l(err.body.error.code) });
      }
    },
  },
});
