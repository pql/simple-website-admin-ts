import { DirectoryDescriptorsService, Volo_FileManagement_Files_FileDescriptorDto } from '@/apis';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent, toRaw } from 'vue';
import _ from 'lodash-es';
import CreateFolderComponent from '@/app/admin/files/create-folder/create-folder.vue';

export default defineComponent({
  mixins: [AppComponentBase],
  emits: ['selectedNode', 'update:name'],
  data() {
    return {
      ouData: new Array<Volo_FileManagement_Files_FileDescriptorDto>(),
      NodeTreeItem: null, // 右键菜单
      expandedKeys: [],
      // 选中的item
      activeNode: {} as Volo_FileManagement_Files_FileDescriptorDto,
      pageDataList: [] as any,
      currentNode: null as any,
      rootNodeData: {
        items: [
          {
            id: 'root',
            name: this.l('FileManagement.texts.Menu:FileManagement'),
            parentId: null,
            hasChildren: true,
          },
        ],
      },
      breadList: [] as String[],
    };
  },
  mounted() {},
  methods: {
    /**
     * 判断节点是否为根节点
     * @param id string
     * @returns boolean
     */
    isRootNode(id: string) {
      return id === 'root';
    },
    async fetch(nodeId) {
      const result =
        await DirectoryDescriptorsService.getApiFileManagementDirectoryDescriptorSubDirectories({
          parentId: this.isRootNode(nodeId) ? undefined : nodeId,
        }).catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        });
      return result;
    },
    onRightClick({ node }) {
      this.activeNode = this.ouData.find(
        (item) => item.id === node.dto.id,
      ) as Volo_FileManagement_Files_FileDescriptorDto;
    },
    /** 刷新 */
    reload() {
      (this.$refs.tree as any).reload();
    },
    onContextMenuClick(treeKey, menuKey) {
      switch (menuKey) {
        case 'CreateFolder':
          this.addSubUnit(treeKey);
          break;
        case 'Rename':
          this.renameUnit(treeKey);
          break;
        case 'Delete':
          this.confirm({
            iconType: 'warning',
            title: this.l('Unified.texts.ConfirmOperation'),
            content: this.l('Unified.texts.ConfirmDeleteWarningMessage'),
            onOk: () => {
              this.deleteConfirm(treeKey);
            },
          });
          break;
        default:
          break;
      }
    },
    /**
     * 重命名成功回调
     * @param res 重命名后接口返回的信息
     */
    async renameSuccessCallback(res) {
      const treeId = res.id;
      const selectedTree: any = this.ouData.find((item) => item.id === treeId);
      const parentId = selectedTree?.parentId;
      const hasChildren = selectedTree?.hasChildren;
      if (res) {
        this.$emit('update:name', res);
        // [未选中节点 | 选中根节点 | 父节点是根节点且无子节点]重命名文件夹，重新加载整棵树数据
        if (
          _.isNull(selectedTree) ||
          this.isRootNode(treeId) ||
          (this.isRootNode(parentId) && !hasChildren)
        ) {
          this.reload();
        } else {
          if (hasChildren) {
            // 重命名文件夹
            this.ouData.forEach((item) => {
              if (item.id === treeId) {
                item.name = res.name;
              }
            });
            // 重新获取节点信息
            const newTreeData = this.treeDataMap(this.ouData);
            /** 设置节点数据 */
            (this.$refs.tree as any).setTreeDataList(newTreeData);
          } else {
            // 重命名文件夹
            this.ouData.forEach((item) => {
              if (item.id === treeId) {
                item.name = res.name;
              }
            });
            // 重新获取节点信息
            const newTreeData = this.treeDataMap(this.ouData);
            /** 设置节点数据 */
            (this.$refs.tree as any).setTreeDataList(newTreeData);
          }
        }
      }
    },
    /** 重命名文件夹 */
    renameUnit(treeId) {
      const selectedTree: any = this.ouData.find((item) => item.id === treeId);

      if (selectedTree) {
        this.pageDataList = [selectedTree];
        this.modalHelper
          .create(CreateFolderComponent, { pageDataList: this.pageDataList }, { size: 'small' })
          .subscribe(this.renameSuccessCallback);
      }
    },
    /**
     * 添加子节点
     * @param treeId
     */
    addSubUnit(treeId) {
      const selectedTree: any = this.ouData.find((item) => item.id === treeId);
      const parentId = selectedTree?.parentId;
      const hasChildren = selectedTree?.hasChildren;
      const treeKey = treeId && !this.isRootNode(treeId) ? treeId : null;
      const obj = treeKey ? { parentId: treeKey } : null;
      this.pageDataList = obj ? [obj] : [];
      this.modalHelper
        .create(CreateFolderComponent, { pageDataList: this.pageDataList }, { size: 'small' })
        .subscribe((res) => {
          if (res) {
            // [未选中节点 | 选中根节点 | 父节点是根节点且无子节点]创建文件夹，重新加载整棵树数据
            if (
              _.isNull(selectedTree) ||
              this.isRootNode(treeId) ||
              (this.isRootNode(parentId) && !hasChildren)
            ) {
              // "选中根节点"或者"未选中节点"创建文件夹到根节点下，重新加载整棵树数据
              this.reload();
            } else {
              if (hasChildren) {
                // 选中的节点，节点有子节点时创建文件夹，重新加载当前节点数据信息
                this.loadTreeDataById(treeId);
              } else {
                // 选中的节点，节点无子节点时创建文件夹，先移除当前节点数据，后重新加载当前节点父节点数据
                this.removeTreeDataById(treeId);
                this.loadTreeDataById(parentId);
              }
            }
          }
        });
    },
    /**
     * 删除节点
     */
    deleteConfirm(treeId) {
      const treeKey = treeId && !this.isRootNode(treeId) ? treeId : null;
      // 开启tree loading
      (this.$refs.tree as any).setLoading(true);

      DirectoryDescriptorsService.deleteApiFileManagementDirectoryDescriptor({ id: treeKey })
        .then(() => {
          this.notify.success({
            message: this.l('Unified.texts.SavedSuccessfully'),
          });
          this.clearMenu();
        })
        .finally(() => {
          this.deleteSuccessCallback(treeKey);
          // 关闭tree loading
          (this.$refs.tree as any).setLoading(false);
        });
    },

    /** 删除成功后的回调 */
    deleteSuccessCallback(treeId) {
      const selectedTree: any = this.ouData.find((item) => item.id === treeId);
      const parentId = selectedTree?.parentId;
      const hasChildren = selectedTree?.hasChildren;
      // [未选中节点 | 选中根节点 | 父节点是根节点且无子节点]删除文件夹，重新加载整棵树数据
      if (
        _.isNull(selectedTree) ||
        this.isRootNode(treeId) ||
        (this.isRootNode(parentId) && !hasChildren)
      ) {
        // "选中根节点"或者"未选中节点"从根节点下删除文件夹，过滤掉选中的节点，重新加载整棵树数据
        const treeData = _.filter(this.ouData, (item) => item.id !== treeId);
        this.ouData = treeData;
        const newTreeData = this.treeDataMap(treeData);
        (this.$refs.tree as any).setTreeDataList(newTreeData);
      } else {
        if (hasChildren) {
          // 选中的节点删除文件夹，节点有子节点时，先删子孙节点，最后在删除选中节点
          this.recursionRemoveNodeByTreeId(treeId);
          const newTreeData = this.treeDataMap(this.ouData);
          (this.$refs.tree as any).setTreeDataList(newTreeData);
        } else {
          // 选中的节点删除文件夹，节点无子节点，过滤掉选中的节点，重新加载整棵树数据
          const treeData = _.filter(this.ouData, (item) => item.id !== treeId);
          this.ouData = treeData;
          const newTreeData = this.treeDataMap(treeData);
          (this.$refs.tree as any).setTreeDataList(newTreeData);
        }
      }
    },
    fetchSuccess(val) {
      if (!val.items) {
        val.items = [];
      }
      /** 返回的数据无父节点id的节点手动绑定到根节点上 */
      val.items.forEach((item) => {
        if (_.isNull(item.parentId)) {
          item.parentId = 'root';
        }
      });

      const treeData = [...toRaw(this.rootNodeData.items), ...val.items];

      this.ouData = treeData;
      /** 获取递归后的新节点数据 */
      const newTreeData = this.treeDataMap(treeData);
      /** 设置节点数据 */
      (this.$refs.tree as any).setTreeDataList(newTreeData);
    },
    /**
     * 重组Tree数据
     */
    treeDataMap(treeData: Array<Volo_FileManagement_Files_FileDescriptorDto>) {
      const ouDtataParentIsNull = _.filter(treeData, (item: any) => _.isNull(item?.parentId));
      const data = ouDtataParentIsNull.map((target) =>
        this._recursionGenerateTree(target, treeData),
      );
      return data;
    },
    /**
     * 递归删除节点
     * @param treeId 节点id
     */
    recursionRemoveNodeByTreeId(treeId: string) {
      const ouData = this.ouData;
      if (!treeId) return;
      const children = _.filter(ouData, (item: any) => item.parentId === treeId);
      children.forEach((child: any) => {
        // 删除子节点
        const index = ouData.findIndex((item) => item.id === child.id);
        ouData.splice(index, 1);
        this.ouData = ouData;
        this.recursionRemoveNodeByTreeId(child.id);
      });
      // 删除当前节点
      const index = ouData.findIndex((item) => item.id === treeId);
      ouData.splice(index, 1);
      this.ouData = ouData;
    },

    /**
     * 递归重组特性菜单为nzTree数据类型
     * @param target 父节点Id为null的文件项
     * @param treeData 总文件项数据(包含父节点Id为null的文件项数)
     */
    _recursionGenerateTree(target, treeData: Array<Volo_FileManagement_Files_FileDescriptorDto>) {
      // 叶子节点
      const children = _.filter(treeData, (item: any) => _.isEqual(item?.parentId, target.id));
      // 父节点 没有找到则返回undefined
      const parentOu = _.find(treeData, (item) => _.isEqual(item.id, (target as any).parentId));

      const _treeNode = {
        title: target.name,
        key: target.id.toString(),
        isLeaf: !target.hasChildren,
        // expanded: true,
        // isMatched: true,
        dto: target,
        parent: parentOu,
        children: [],
      };
      if (children && children.length) {
        children.forEach((child: any) => {
          const childItem = this._recursionGenerateTree(child, treeData) as never;
          _treeNode.children.push(childItem);
        });
      }
      return _treeNode;
    },
    /**
     * 选中item
     */
    async onSelect(selectedKeys, _info) {
      const activeNode: Volo_FileManagement_Files_FileDescriptorDto =
        _.find(this.ouData, (item) => item.id === selectedKeys[0]) ?? {};

      console.log('activeNode', activeNode);
      if (activeNode) {
        this.activeNode = activeNode;
        this.breadList = [activeNode?.name ?? 'root'];
        this.getBreadcrumb(activeNode);
        this.$emit('selectedNode', activeNode, this.breadList);
      }
    },
    /**
     * 展开/关闭item
     */
    async onExpand(expandedKeys, { expanded, node }) {
      node.expanded = expanded;
      this.expandedKeys = expandedKeys;
      const nodeId = this.isRootNode(node?.dto?.id) ? undefined : node?.dto?.id;
      if (expanded && nodeId && node?.children?.length === 0) {
        await this.loadTreeDataById(nodeId);
      }
    },
    /**
     * 移除当前节点信息
     */
    removeTreeDataById(nodeId: string) {
      // 找到当前节点, 移除当前节点以及关联到当前节点上的其他节点
      this.ouData = _.filter(this.ouData, (item) => item.id !== nodeId);
    },
    /**
     * 加载node节点信息
     */
    async loadTreeDataById(nodeId: string) {
      // 根节点则不重新加载数据
      if (this.isRootNode(nodeId)) return;

      // 设置tree loading
      (this.$refs.tree as any).setLoading(true);

      // 获取当前节点数据信息
      await this.getTreeDataByNodeId(nodeId);

      // 关闭tree loading
      (this.$refs.tree as any).setLoading(false);
    },

    /**
     * 重新加载tree node节点信息
     * @param
     */
    async reloadTreeDataByNode({ id, parentId, name }) {
      (this.$refs.tree as any).setLoading(true);

      // 重新获取当前节点数据信息
      await this.getTreeDataByNodeId(id);

      (this.$refs.tree as any).setLoading(false);
    },

    async getTreeDataByNodeId(nodeId) {
      const res: any = await this.fetch(nodeId);
      if (!res.items) {
        res.items = [];
      }
      // 数组对象去重
      const treeData = _.uniqWith([...toRaw(this.ouData), ...res.items], _.isEqual);

      // 重新赋值
      this.ouData = treeData;
      const newTreeData = this.treeDataMap(treeData);
      (this.$refs.tree as any).setTreeDataList(newTreeData);
    },
    /** 获取面包屑 */
    getBreadcrumb(activeNode) {
      if (activeNode.parentId) {
        const parentNode = _.find(this.ouData, (item) => item.id === activeNode.parentId) ?? {};
        if (parentNode) {
          this.breadList.unshift(parentNode?.name ?? '');
          if (parentNode?.parentId) {
            this.getBreadcrumb(parentNode);
          }
        }
      }
    },
    DragStart(node: any) {
      this.currentNode = node.node.dataRef;
    },
    DragEnd(node: any) {
      const { dropPosition } = node;
      let moveId: any = null;
      if (node) {
        moveId = node.node.dataRef.dto.id;
      }
      if (!this.currentNode) {
        return;
      }
      if (node.node.dataRef.dto.id === this.currentNode.dto.id) {
        return;
      }
      if (dropPosition == '-1') {
        // 移动到根组织
        // 当前需要移动的节点id
        DirectoryDescriptorsService.postApiFileManagementDirectoryDescriptorMove({
          requestBody: {
            id: this.currentNode.dto.id,
          },
        }).then(() => {
          this.clearMenu();
          this.reload();
          this.notify.success({
            message: this.l('Unified.texts.SavedSuccessfully'),
          });
        });
      } else {
        this.confirm({
          iconType: 'info',
          title: () =>
            this.l('Unified.texts.MoveConfirm', [
              this.currentNode.dto.name,
              node.node.dataRef.dto.name,
            ]),
          onOk: () => {
            // 当前需要移动的节点id
            const id = this.currentNode.dto.id;
            //需要发送到的新节点
            const newParentId = moveId;
            DirectoryDescriptorsService.postApiFileManagementDirectoryDescriptorMove({
              requestBody: {
                id: id,
                newParentId: newParentId,
              },
            }).then(async (res) => {
              this.clearMenu();

              const treeId = newParentId;
              const selectedTree: any = this.ouData.find((item) => item.id === newParentId);
              const parentId = selectedTree?.parentId;
              const hasChildren = selectedTree?.hasChildren;
              const treeKey = treeId && !this.isRootNode(treeId) ? treeId : null;

              // 移动到[未选中节点 | 选中根节点 | 父节点是根节点且无子节点]文件夹，重新加载整棵树数据
              if (
                _.isNull(selectedTree) ||
                this.isRootNode(treeId) ||
                (this.isRootNode(parentId) && !hasChildren)
              ) {
                console.log('remove to root node');
                this.ouData.forEach((item: any) => {
                  if (item.id === id) {
                    item.parentId = newParentId;
                  }
                });
                this.reload();
              } else {
                if (hasChildren) {
                  console.log('hasChildren');
                  this.ouData.forEach((item: any) => {
                    if (item.id === id) {
                      item.parentId = newParentId;
                    }
                  });
                  // 重新获取节点信息
                  const newTreeData = this.treeDataMap(this.ouData);
                  /** 设置节点数据 */
                  (this.$refs.tree as any).setTreeDataList(newTreeData);
                } else {
                  console.log('No children');
                  this.ouData.forEach((item: any) => {
                    if (item.id === id) {
                      item.parentId = newParentId;
                    }
                  });

                  // 递归移除旧节点
                  this.recursionRemoveNodeByTreeId(id);
                  // 递归移除新节点
                  this.recursionRemoveNodeByTreeId(newParentId);

                  // 重新获取新节点的父级节点数据
                  await this.loadTreeDataById(parentId);
                }
              }
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
            });
            return Promise.resolve();
          },
        });
      }
    },
    /**
     * 用于点击空白处隐藏增删改菜单
     */
    clearMenu() {
      this.NodeTreeItem = null;
    },
  },
});
