import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { FExcelImport } from '@/shared/components/f-excel-import';
import { PageToolbarButton } from '../../page-toolbar-button';
import { pageToolbarProps } from './props';
import {
  FireBytes_Unified_ButtonGroups_Dtos_ButtonConfigs,
  FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto,
} from '@/apis';

export default defineComponent({
  components: {
    FExcelImport,
    PageToolbarButton,
  },
  mixins: [AppComponentBase],
  props: {
    ...pageToolbarProps,
  },
  emits: ['actionClick', 'ready'],
  data() {
    return {
      /** 已经准备就绪 */
      isReady: false,
      /** 所有按钮 */
      buttonList: [] as FireBytes_Unified_ButtonGroups_Dtos_ButtonConfigs[],
      /** 左侧按钮配置项 */
      leftList: [] as FireBytes_Unified_ButtonGroups_Dtos_ButtonConfigs[],
      /** 右侧按钮配置项 */
      rightList: [] as FireBytes_Unified_ButtonGroups_Dtos_ButtonConfigs[],
    };
  },
  watch: {
    buttonConfig(buttonGroup: FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto) {
      this.setButtonGroup(buttonGroup);
    },
  },
  methods: {
    /** toolbar 按钮点击事件 */
    handleClick(type: string | undefined | null, value = undefined, config?) {
      this.$nextTick(() => {
        this.$emit('actionClick', type, value, config);
      });
    },
    /** 监听左侧容器滚动 */
    handleLeftScroll(event) {
      const eventDelta = -event.wheelDelta || -event.deltaY * 20;
      const scrollDiv = this.$refs.left as Element;
      scrollDiv.scrollLeft = scrollDiv.scrollLeft + eventDelta / 2;
    },
    /** 监听右侧容器滚动 */
    handleRightScroll(event) {
      const eventDelta = -event.wheelDelta || -event.deltaY * 20;
      const scrollDiv = this.$refs.right as Element;
      scrollDiv.scrollLeft = scrollDiv.scrollLeft + eventDelta / 2;
    },
    /** 设置按钮配置 */
    setButtonGroup(buttonGroup: FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto) {
      if (!buttonGroup) return;

      buttonGroup = this.processButtonGroup(buttonGroup);
      this.buttonList = this.processButtonConfig(buttonGroup, 'show');
      this.leftList = this.processButtonConfig(buttonGroup, 'left');
      this.rightList = this.processButtonConfig(buttonGroup, 'right');

      if (!this.isReady) {
        this.isReady = true;
        this.$emit('ready', this);
      }
    },
    /** 处理按钮组 */
    processButtonGroup(buttonGroup: FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto) {
      if (!buttonGroup) {
        buttonGroup = {
          buttonConfigs: [],
        };
      }
      if (!Array.isArray(buttonGroup.buttonConfigs)) {
        buttonGroup.buttonConfigs = [];
      }
      return buttonGroup;
    },
    /** 处理按钮配置 */
    processButtonConfig(
      buttonGroup: FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto,
      type: 'left' | 'right' | 'show',
    ) {
      // 左侧按钮
      if (type === 'left') {
        const arr = buttonGroup.buttonConfigs?.filter((item) => {
          return item.position === 'left' && (item.acl ? this.isGrantedAny(item.acl) : true);
        });
        return (
          arr?.sort((a, b) => {
            return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
          }) || []
        );
      }

      // 右侧按钮
      if (type === 'right') {
        const arr = buttonGroup.buttonConfigs?.filter((item) => {
          return item.position === 'right' && (item.acl ? this.isGrantedAny(item.acl) : true);
        });
        return (
          arr?.sort((a, b) => {
            return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
          }) || []
        );
      }

      // 展示的按钮
      if (type === 'show') {
        const arr = buttonGroup.buttonConfigs?.filter((item) => {
          return item.acl ? this.isGrantedAny(item.acl) : true;
        });
        return (
          arr?.sort((a, b) => {
            return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
          }) || []
        );
      }

      return [];
    },
    /** 根据名称获取按钮组中的ref */
    getButtonRef<T>(name: string) {
      const refInstance = this.$refs[name];
      if (!refInstance) {
        return undefined;
      }
      return refInstance as T;
    },
  },
});
