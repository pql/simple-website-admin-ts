import SampleComponentBase from '@/shared/component-base/sample-component-base';
import { defineComponent, toRaw } from 'vue';
import {
  ControlPanelTreeNodeService,
  FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingRequest as TreeNodeLoadingRequest,
  FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingDto as ControlePanelTreeNodeLoadingDto,
} from '@/apis';
import { getFileUrlById } from '@/shared/components/f-upload/src/helper';
import _ from 'lodash-es';
// import mittEvent from '@/utils/eventBus';

export default defineComponent({
  mixins: [SampleComponentBase],
  inject: ['selectNodeChange'],
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['changeUnfold'],
  data() {
    return {
      /** 表单数据 */
      form: {
        searchValue: undefined,
      },
      // 选中的item
      activeNode: { type: '', nodeId: '', id: '', parentNodeId: '', children: [] },
      expandedKeys: [] as any[],
      selectedKeys: [] as string[],
      loadedKeys: [] as string[],
      /** 树节点数据 */
      ouData: Array<ControlePanelTreeNodeLoadingDto>(),
      isUnfold: true,
    };
  },
  watch: {
    isShow: {
      handler(newVal) {
        this.isUnfold = newVal;
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    /** 处理搜索事件 */
    async handleSearch() {
      const items: Array<ControlePanelTreeNodeLoadingDto> =
        (await this.loadData({
          filter: this.form.searchValue,
          type: 'site',
        })) ?? [];
      this.fetchSuccess(items);
    },
    /** 加载树节点数据 */
    async loadData(options: TreeNodeLoadingRequest, loading = true) {
      // 开启tree loading
      (this.$refs.tree as any).setLoading(loading);
      try {
        const result =
          await ControlPanelTreeNodeService.postApiAppControlPanelTreeNodeControlePanelTreeNodeLoading(
            {
              requestBody: options,
            },
          );
        if (_.isArray(result)) {
          for (const item of result) {
            if (item.type != 'deviceCategory') {
              item.icon = await getFileUrlById(item.icon);
            }
          }
          return result;
        } else {
          return [];
        }
      } catch (error) {
        console.log('error', error);
      } finally {
        // 关闭tree loading
        if (loading) (this.$refs.tree as any).setLoading(false);
      }
    },
    /**
     * 选中item
     */
    onSelect(selectedKeys, info: any) {
      if (info.selectedNodes && info.selectedNodes.length === 0) {
        return;
      }
      const selectNodeChange = this.selectNodeChange as (node: Object) => void;
      selectNodeChange(info.node);
    },
    /**
     * 展开/关闭item
     */
    async onExpand(expandedKeys, { expanded, node }) {
      node.expanded = expanded;
      this.expandedKeys = expandedKeys;
      if (expanded && node.dto.nodeId && node?.children?.length === 0) {
        // 不加载楼层下的设备
        if (node.dto.type !== 'floor') {
          const items = await this.loadData({
            filter: this.form.searchValue,
            parentId: node.dto.nodeId,
            type: node.dto.type,
            id: node.dto.id,
          });
          if (_.isArray(items)) {
            // 数组对象去重
            const treeData = _.uniqWith([...toRaw(this.ouData), ...items], _.isEqual);
            // 重新赋值
            this.ouData = treeData;
            const newTreeData = this.treeDataMap(treeData);
            (this.$refs.tree as any).setTreeDataList(newTreeData);
          }
        }
      }
    },
    /** 获取树节点数据 */
    async fetch() {
      /** 初始化site数据 */
      return await this.loadData({
        type: 'site',
      });
    },
    /** 成功获取树节点数据后的回调 */
    fetchSuccess(val: Array<ControlePanelTreeNodeLoadingDto>) {
      if (!_.isArray(val)) {
        val = [];
      }
      const treeData = [...val];
      this.ouData = treeData;
      /** 获取递归后的新节点数据 */
      const newTreeData = this.treeDataMap(treeData);
      /** 设置节点数据 */
      (this.$refs.tree as any).setTreeDataList(newTreeData);
    },
    /**
     * 重组Tree数据
     */
    treeDataMap(treeData: Array<ControlePanelTreeNodeLoadingDto>) {
      const ouDtataParentIsNull = _.filter(treeData, (item) => _.isNull(item?.parentNodeId));
      const data = ouDtataParentIsNull.map((target) =>
        this._recursionGenerateTree(target, treeData),
      );
      return data;
    },
    /**
     * 递归重组特性菜单为nzTree数据类型
     * @param target 父节点Id为null的文件项
     * @param treeData 总文件项数据(包含父节点Id为null的文件项数)
     */
    _recursionGenerateTree(target, treeData: Array<ControlePanelTreeNodeLoadingDto>) {
      // 叶子节点
      const children = _.filter(treeData, (item) => _.isEqual(item?.parentNodeId, target.nodeId));
      // 父节点 没有找到则返回undefined
      const parentOu = _.find(treeData, (item) =>
        _.isEqual(item.nodeId, (target as any)?.parentNodeId),
      );
      const isLeaf = target.type === 'floor' ? true : target.isLeaf;
      const _treeNode = {
        title: target.nodeName,
        key: target.nodeId.toString(),
        isLeaf: isLeaf,
        expanded: true,
        // isMatched: true,
        dto: { ...target, isLeaf },
        parent: parentOu,
        children: [],
      };
      if (children && children.length) {
        children.forEach((child: any) => {
          const childItem = this._recursionGenerateTree(child, treeData) as never;
          _treeNode.children.push(childItem);
        });
      }
      if (!_treeNode.children) {
        _treeNode.isLeaf = true;
      }

      return _treeNode;
    },
    /** 右键点击 */
    onRightClick(e) {
      this.activeNode = e.node.dto;
    },
    /**
     * 树形控件右键菜单
     * @param key nodeId
     * @param type 节点类型
     * @param menuKey 菜单keu
     */
    onContextMenuClick(menuKey) {
      switch (menuKey) {
        //刷新
        case 'RefreshSubUnit':
          this.refreshUnit(this.activeNode);
          break;
        //展开
        case 'UnfoldSubUnit':
          this.unfoldSubUnit(this.activeNode);
          break;
        default:
          break;
      }
    },
    /**
     * 右键展开
     */
    async unfoldSubUnit(data: any) {
      const { nodeId, type, id } = data;
      (this.$refs.tree as any).setLoading(true);
      const resData: Array<ControlePanelTreeNodeLoadingDto> =
        (await this.loadData({
          filter: this.form.searchValue,
          parentId: nodeId,
          type: type,
          id: id,
        })) ?? [];
      data.children = resData;
      // 数组对象去重

      const treeData = _.uniqWith([...toRaw(this.ouData), ...resData], _.isEqual);
      // 重新赋值
      this.ouData = treeData;
      const newTreeData = this.treeDataMap(treeData);

      (this.$refs.tree as any).setTreeDataList(newTreeData);
      this.$nextTick(() => {
        this.expandedKeys.push(data.nodeId);
        this.loadedKeys = [...this.expandedKeys];
      });
      //递归子级展开
      for (const children of data.children) {
        if (children.type !== 'floor') this.unfoldSubUnit(children);
      }
      (this.$refs.tree as any).setLoading(false);

      return;
    },

    /**
     * 节点刷新
     * @param isRefreshActiveNode  是否刷新当前节点
     */
    async refreshUnit(data) {
      const { nodeId, type, id } = data;
      const resData: Array<ControlePanelTreeNodeLoadingDto> =
        (await this.loadData({
          filter: this.form.searchValue,
          parentId: nodeId,
          type: type,
          id: id,
        })) ?? [];
      if (_.isArray(resData)) {
        // 数组对象去重
        const treeData = _.uniqWith([...toRaw(this.ouData), ...resData], _.isEqual);
        // 重新赋值
        this.ouData = treeData;
        const newTreeData = this.treeDataMap(treeData);
        (this.$refs.tree as any).setTreeDataList(newTreeData);
      }

      return;
    },

    /* 打开/收起面板 */
    unfoldClick(isUnfold: boolean) {
      this.isUnfold = isUnfold;
      this.$emit('changeUnfold', isUnfold);
    },
  },
});
