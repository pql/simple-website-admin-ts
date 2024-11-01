import { OrganizationUnitService, Volo_Abp_Identity_OrganizationUnitDto } from '@/apis';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import CreateOrEditOrganizationUnit from '../create-or-edit-organization-unit/create-or-edit-organization-unit.vue';
import _ from 'lodash-es';

export default defineComponent({
  mixins: [AppComponentBase],
  data() {
    return {
      ouData: new Array<Volo_Abp_Identity_OrganizationUnitDto>(),
      NodeTreeItem: null, // 右键菜单
      // 选中的item
      activeNode: {} as Volo_Abp_Identity_OrganizationUnitDto,
      currentNode: null as any,
      pageDataList: [] as any,
      breadList: [] as String[],
      code: null as any,
    };
  },
  methods: {
    fetch() {
      return new Promise((resolve, reject) => {
        OrganizationUnitService.getApiIdentityOrganizationUnitsAll()
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /** 刷新 */
    reload() {
      (this.$refs.tree as any).reload();
    },
    /** 新增 */
    handleAddClick() {
      this.pageDataList = [];
      this.modalHelper
        .create(
          CreateOrEditOrganizationUnit,
          { pageDataList: this.pageDataList },
          { width: '500px' },
        )
        .subscribe((res) => {
          if (res) {
            this.reload();
          }
        });
    },
    /** 编辑组织机构 */
    editUnit() {
      // 等待和后端商量这个权限位字符串
      // const canManageOrganizationTree = this.isGrantedAny(
      //   'Pages.Administration.OrganizationUnits.ManageOrganizationTree',
      // );
      // if (!canManageOrganizationTree) {
      //   this.message.error(this.l('YouHaveNoOperatingPermissions'));
      //   return;
      // }
      if (this.activeNode) {
        this.pageDataList = [this.activeNode];
        this.modalHelper
          .create(
            CreateOrEditOrganizationUnit,
            { pageDataList: this.pageDataList },
            { width: '500px' },
          )
          .subscribe((res) => {
            if (res) {
              this.reload();
            }
          });
      }
    },
    /**
     * 添加子节点
     * @param node 当前选中节点
     */
    addSubUnit(treeKey) {
      // 等待和后端商量这个权限位字符串
      // const canManageOrganizationTree = this.isGrantedAny(
      //   'Pages.Administration.OrganizationUnits.ManageOrganizationTree',
      // );
      // if (!canManageOrganizationTree) {
      //   this.notify.success({
      //     message: this.l('YouHaveNoOperatingPermissions'),
      //   });
      //   return;
      // }
      if (this.code.split('.').length > 5) {
        return this.notify.error({ message: this.l('ReachedItsMaximumLimit') });
      }
      if (treeKey) {
        const obj = treeKey
          ? {
              parentId: treeKey,
            }
          : null;
        this.pageDataList = obj ? [obj] : [];
        this.modalHelper
          .create(
            CreateOrEditOrganizationUnit,
            { pageDataList: this.pageDataList },
            { width: '500px' },
          )
          .subscribe((res) => {
            if (res) {
              this.reload();
            }
          });
      }
    },
    onRightClick({ node }) {
      this.code = node.code;
      this.activeNode = this.ouData.find(
        (item) => item.id == node.dto.id,
      ) as Volo_Abp_Identity_OrganizationUnitDto;
    },
    /**
     * 删除组织结构
     */
    deleteConfirm(treeKey) {
      // 等待和后端商量这个权限位字符串
      // const canManageOrganizationTree = this.isGrantedAny(
      //   'Pages.Administration.OrganizationUnits.ManageOrganizationTree',
      // );
      // if (!canManageOrganizationTree) {
      //   this.notify.success({
      //     message: this.l('YouHaveNoOperatingPermissions'),
      //   });
      //   return;
      // }
      if (treeKey) {
        (this.$refs.tree as any).setLoading(true);
        OrganizationUnitService.deleteApiIdentityOrganizationUnits({ id: treeKey })
          .then(() => {
            this.notify.success({
              message: this.l('Unified.texts.SavedSuccessfully'),
            });
            this.clearMenu();
          })
          .finally(() => {
            this.reload();
          });
      }
    },
    onContextMenuClick(treeKey, menuKey) {
      switch (menuKey) {
        case 'AddSubUnit':
          this.addSubUnit(treeKey);
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
        case 'Edit':
          this.editUnit();
          break;
        default:
          break;
      }
    },
    fetchSuccess(val) {
      this.ouData = val.items as Array<Volo_Abp_Identity_OrganizationUnitDto>;
      const newTreeData = this.treeDataMap();
      (this.$refs.tree as any).setTreeDataList(newTreeData);
    },
    /**
     * 重组Tree数据
     */
    treeDataMap() {
      const ouDtataParentIsNull = _.filter(this.ouData, (item) => item.parentId === null);
      return ouDtataParentIsNull.map((item) => this._recursionGenerateTree(item));
    },
    /**
     * 递归重组特性菜单为nzTree数据类型
     * @param item 组织机构项
     */
    _recursionGenerateTree(item) {
      // 叶子节点
      const children = _.filter(this.ouData, (child) => child.parentId === item.id);
      // 父节点 无返回undefined
      const parentOu = _.find(this.ouData, (p) => p.id === item.parentId);
      const _treeNode = {
        title: item.displayName + '(' + item.userCount + ')',
        key: item.id.toString(),
        isLeaf: children && children.length <= 0,
        // slots: {
        //   icon: children && children.length > 0 ? 'folder' : 'file',
        // },
        expanded: true,
        isMatched: true,
        code: item.code,
        memberCount: item.userCount,
        dto: item,
        parent: parentOu,
        children: [],
      };
      if (children && children.length) {
        children.forEach((itemChild: any) => {
          const childItem = this._recursionGenerateTree(itemChild) as never;
          _treeNode.children.push(childItem);
        });
      }
      return _treeNode;
    },
    /**
     * 选中item
     */
    onSelect(selectedKeys, _info) {
      this.activeNode = this.ouData.find(
        (item) => item.id == selectedKeys[0],
      ) as Volo_Abp_Identity_OrganizationUnitDto;
      this.breadList = [this.activeNode.displayName ?? ''];
      this.getBreadcrumb(this.activeNode);
      this.$emit('selectedNode', this.activeNode, this.breadList);
    },
    /** 获取面包屑 */
    getBreadcrumb(activeNode: Volo_Abp_Identity_OrganizationUnitDto) {
      if (activeNode.parentId) {
        const parentNode = this.ouData.find(
          (item) => item.id == activeNode.parentId,
        ) as Volo_Abp_Identity_OrganizationUnitDto;
        this.breadList.unshift(parentNode.displayName ?? '');
        if (parentNode.parentId) {
          this.getBreadcrumb(parentNode);
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
      // 卡控
      if (node.node.code.split('.').length > 5) {
        return;
      }
      if (dropPosition == '-1') {
        // 移动到根组织
        // 当前需要移动的节点id
        OrganizationUnitService.putApiIdentityOrganizationUnitsMove({
          id: this.currentNode.dto.id,
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
              this.currentNode.dto.displayName,
              node.node.dataRef.dto.displayName,
            ]),
          onOk: () => {
            // 当前需要移动的节点id
            const id = this.currentNode.dto.id;
            //需要发送到的新节点
            const newParentId = moveId;
            OrganizationUnitService.putApiIdentityOrganizationUnitsMove({
              id: id,
              requestBody: {
                newParentId: newParentId,
              },
            }).then(() => {
              this.clearMenu();
              this.reload();
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
