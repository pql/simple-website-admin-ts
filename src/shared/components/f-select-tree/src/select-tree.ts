import type { TreeProps } from 'ant-design-vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { selectTreeProps } from './props';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    ...selectTreeProps,
  },
  emits: [
    'fetch-success',
    'fetch-error',
    'add-click',
    'check',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'expand',
    'load',
    'rightClick',
    'select',
  ],
  data() {
    return {
      /** 是否处于加载状态 */
      loading: false,
      /** （受控）展开指定的树节点 */
      expandedKeys: this.expandedKey,
      /** （受控）设置选中的树节点 */
      selectedKeys: this.selectedKey,
      /** （受控）选中复选框的树节点 */
      checkedKeys: this.checkedKey,
      /** select-tree 数据 */
      treeDataList: [] as TreeProps['treeData'],
      /** select-tree 配置对象 */
      treeProps: {},
      /** 是否显示头部 */
      isShowHeaderFlag: this.isShowHeader,
    };
  },
  computed: {
    /** 是否有数据 */
    hasEmpty() {
      return !!this.getTreeDataList() && this.getTreeDataList().length > 0;
    },
  },
  watch: {
    isShowHeader(val) {
      if (val) {
        this.isShowHeaderFlag = this.isShowHeader;
      }
    },
    selectedKey(val) {
      if (val) {
        this.selectedKeys = val;
      }
    },
    checkedKey(val) {
      if (val) {
        this.checkedKeys = val;
      }
    },
    expandedKey(val) {
      if (val) {
        this.expandedKeys = val;
      }
    },
  },
  created() {
    this.initTreeProps();
  },
  mounted() {
    this.initTreeDataList();
  },
  methods: {
    /********************************************************** 组件外部实现使用方法 start ************************************************************************ */

    /** 获取 select-tree loading 状态 */
    getLoading() {
      return this.loading;
    },
    /** 设置 select-tree loading 状态 */
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    /** 获取 select-tree 某个配置 */
    getProp(key: string) {
      return Object.prototype.hasOwnProperty.call(this.treeProps, key) ? this.treeProps[key] : null;
    },
    /** 获取 select-tree 配置对象 */
    getProps() {
      return { ...this.$slots, ...this.treeProps };
    },
    /** 设置 select-tree 配置对象 某一项 */
    setProp(key: string, value: any) {
      this.treeProps[key] = value;
    },
    /** 设置 select-tree 整个配置对象 */
    setProps(treeProps: any) {
      this.treeProps = treeProps;
    },
    /** 获取 select-tree 数据 */
    getTreeDataList() {
      if (!this.treeDataList) return [];
      return this.treeDataList;
    },
    /** 设置 select-tree 数据 */
    setTreeDataList(val) {
      this.treeDataList = val;
    },
    /** 刷新数据 */
    reload() {
      this.initTreeDataList();
    },
    /********************************************************** 组件外部实现使用方法 end ************************************************************************ */
    /********************************************************** 组件内部实现使用方法 start ************************************************************************ */

    /** 初始化 select-tree 默认配置对象 */
    initTreeProps() {
      const obj = {
        /** 是否自动展开父节点 */
        autoExpandParent: false,
        /** 是否节点占据一行 */
        blockNode: true,
        /** 节点前添加 Checkbox 复选框 */
        checkable: false,
        /** checkable 状态下节点选择完全受控（父子节点选中状态不再关联） */
        checkStrictly: false,
        /** 默认展开所有树节点 */
        defaultExpandAll: false,
        /** 将树禁用 */
        disabled: false,
        /** 设置节点可拖拽 */
        draggable: true,
        /** 支持点选多个节点（节点本身） */
        multiple: false,
        /** 是否可选中 */
        selectable: true,
        /** 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 */
        showIcon: true,
        /** 是否展示连接线 */
        showLine: false,
        /** 设置 false 时关闭虚拟滚动 */
        virtual: true,
      };
      this.setProps(obj);
    },

    /** 初始化数据 */
    initTreeDataList() {
      if (this.fetch) {
        this.setLoading(true);
        this.fetch()
          .then((res) => {
            // this.setTreeDataList(res.items);
            this.$emit('fetch-success', res);
          })
          .catch((error: any) => {
            this.$emit('fetch-error', error);
          })
          .finally(() => {
            this.setLoading(false);
          });
      }
    },

    /** 新增 */
    handleAddClick() {},

    /** 点击复选框触发 */
    check(checkedKeys, e) {
      this.$emit('check', checkedKeys, e);
    },

    /** dragend 触发时调用 */
    dragend({ event, node }) {
      this.$emit('dragend', { event, node });
    },

    /** dragenter 触发时调用 */
    dragenter({ event, node, expandedKeys }) {
      this.$emit('dragenter', { event, node, expandedKeys });
    },

    /** dragleave 触发时调用 */
    dragleave({ event, node }) {
      this.$emit('dragleave', { event, node });
    },

    /** dragover 触发时调用 */
    dragover({ event, node }) {
      this.$emit('dragover', { event, node });
    },

    /** 开始拖拽时调用 */
    dragstart({ event, node }) {
      this.$emit('dragstart', { event, node });
    },

    /** drop 触发时调用 */
    drop(info) {
      this.$emit('drop', info);
    },

    /** 展开/收起节点时触发 */
    expand(expandedKeys, { expanded: bool, node }) {
      this.$emit('expand', expandedKeys, { expanded: bool, node });
    },

    /** 节点加载完毕时触发 */
    load(loadedKeys, { event, node }) {
      this.$emit('load', loadedKeys, { event, node });
    },

    /** 节点加载完毕时触发 */
    rightClick({ event, node }) {
      this.$emit('rightClick', { event, node });
    },

    /** 点击树节点触发 */
    select(selectedKeys, { selected: bool, selectedNodes, node, event }) {
      this.$emit('select', selectedKeys, {
        selected: bool,
        selectedNodes,
        node,
        event,
      });
    },

    /********************************************************** 组件内部实现使用方法 end ************************************************************************ */
  },
});
