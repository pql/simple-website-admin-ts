import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import {
  // TreeLoadingDto,
  // PanelPermissionControlServiceProxy,
  // ControlTreeLoadingInput
  FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto as TreeLoadingDto,
  PanelPermissionControlService,
  FireBytes_Unified_Wave_PanelPermissionControls_Dtos_ControlTreeLoadingInput as ControlTreeLoadingInput,
} from '/@/apis';
import arrayService from '@/shared/utils/array/array.service';
import { ReloadOutlined } from '@ant-design/icons-vue';
import { DataNode } from 'ant-design-vue/lib/tree';
import * as _ from 'lodash-es';

export default defineComponent({
  components: {
    ReloadOutlined,
  },
  mixins: [DynamicTableComponentBase],
  props: {
    /** 选中的数据 */
    defaultSelectedPermissions: {
      type: Object as PropType<string[]>,
      default: [],
    },
    isChange: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['selectedControlPermissionsChange', 'update:isChange'],
  watch: {
    /** 选中数据发生改变 */
    defaultSelectedPermissions(val: string[]) {
      if (!Array.isArray(val)) {
        val = [];
      }
    },
    /** 筛选条件发生改变 */
    filterText(val: string) {
      this.onFilterChange(val);
    },
  },
  data() {
    return {
      /** 所有权限 */
      permissions: [] as TreeLoadingDto[],
      /** 授权的权限 */
      grantedPermissionNames: [] as string[],
      /** 所有权限字典 */
      permissionsDict: {} as { [key: string]: TreeLoadingDto },
      /** 树数据 */
      treeData: new Array<DataNode>(),
      /** 展开的键 */
      expandedKeys: [] as string[],
      /** 自动展开父级 */
      autoExpandParent: true,
      /** 筛选字符串 */
      filterText: '',
      /** 选中的权限 */
      checkedPermissions: [] as string[],
    };
  },
  mounted() {
    // 请求服务端数据
    this.loading = true;
    const input = {} as ControlTreeLoadingInput;
    PanelPermissionControlService.postApiAppPanelPermissionControlControlTreeLoading()
      .finally(() => {
        this.loading = false;
      })
      .then((result) => {
        this.permissions = result ?? [];

        // 处理数据
        this.permissionsDict = {};
        this.permissions.forEach((item) => {
          (item as any).value = item.id;
          // 添加到字典
          this.permissionsDict[item.id] = item;
        });

        // 转树
        this.arrToTreeNode(this.getDefaultSelectedPermissions());
      });
  },
  methods: {
    /**
     * 数组重组为Tree数据
     */
    arrToTreeNode(grantedPermissionNames: string[]) {
      // 转换为树形数据
      const tree: any[] = [];
      const childrenOf = {};
      // 置空展开的节点
      this.expandedKeys = [];
      const leafPermissionDict: { [key: string]: boolean } = {};

      var selectKey = [];
      //循环权限
      for (const item of this.permissions) {
        (item as any).key = item.id;
        (item as any).title = item.displayName;

        var idList = [];
        if (item.parentIdList) {
          idList = item.parentIdList.split('|') || [];
        }

        idList.push(item.nodeId);
        childrenOf[idList.join('|')] = childrenOf[idList.join('|')] || [];
        (item as any).children = childrenOf[idList.join('|')];

        if (item.parentId) {
          childrenOf[item.parentIdList] = childrenOf[item.parentIdList] || [];
          childrenOf[item.parentIdList].push(item);
        } else {
          tree.push(item);
        }
      }
      this.treeData = tree;
      // 递归树
      const newGrantedPermissionNameKey: string[] = [];
      // 递归树
      arrayService.visitTree(this.treeData, (item) => {
        // 默认展开全部
        this.expandedKeys.push(item.key);
        // 叶子节点已选中
        if (item.isLeaf) {
          item.isChecked = grantedPermissionNames.find((p) => p === item.nodeId) ? true : false;
          leafPermissionDict[item.key] = true;
        }
        if (grantedPermissionNames.find((p) => p === item.nodeId)) {
          newGrantedPermissionNameKey.push(item.key);
        }
      });

      //将非叶子节点的权限从选中项中移除,避免直接checked
      const newGrantedPermissionNames: string[] = [];
      for (const grantedPermission of newGrantedPermissionNameKey) {
        if (!leafPermissionDict[grantedPermission]) {
          continue;
        }
        newGrantedPermissionNames.push(grantedPermission);
      }
      this.grantedPermissionNames = newGrantedPermissionNames;
    },
    /**
     * 重新加载
     */
    reload(): void {
      this.loading = true;
      this.arrToTreeNode(this.checkedPermissions);
      this.onFilterChange('');
      this.loading = false;
    },
    /** 筛选条件发生改变 */
    onFilterChange(filterText: string) {
      // 匹配的项
      const filterList = this.permissions.filter((item) => {
        if (item.displayName!.indexOf(filterText) > -1 && item.displayName) {
          return true;
        }
        return false;
      });

      // 展开的项
      const expanded = [...new Set(filterList.map((o) => o.displayName))] as any[];
      this.expandedKeys = expanded;
      this.autoExpandParent = true;
      this.filterText = filterText;

      // 滑动到对应位置
      this.$nextTick(() => {
        setTimeout(() => {
          const treeRef = this.$refs.tree as any;
          if (!treeRef) {
            return;
          }
          if (filterList.length > 0 && filterText !== '') {
            treeRef.scrollTo({ key: filterList[0].displayName });
          } else {
            treeRef.scrollTo({ key: 0 });
          }
        }, 50);
      });
    },
    /**
     * 选中
     */
    onCheck(checkedKeys: string[]) {
      // 选中的数据处理
      const data: string[] = [];
      for (let key of checkedKeys) {
        //选中时添加父节点数据
        const item = this.permissions.find((p) => p.id === key);

        // 加入设备
        data.push(item.nodeId);

        // 处理父节点权限
        if (item.parentIdList) {
          const idList = item.parentIdList.split('|') || [];
          for (let i = idList.length; i > 0; i--) {
            const tempIdList = _.slice(idList, 0, i);
            const tempId = _.join(tempIdList, '_');
            data.push(tempId);
          }
        }
      }

      // 更新并映射到父级
      this.checkedPermissions = data;
      this.$emit('selectedControlPermissionsChange', this.checkedPermissions);
      this.$emit('update:isChange', true);
    },
    /** 获取传入的，默认选中的权限 */
    getDefaultSelectedPermissions(): string[] {
      if (!Array.isArray(this.defaultSelectedPermissions)) {
        return [];
      }

      return this.defaultSelectedPermissions as string[];
    },
    /** 展开项发生改变 */
    onExpand(keys: string[]) {
      this.expandedKeys = keys;
      this.autoExpandParent = false;
    },
  },
});
