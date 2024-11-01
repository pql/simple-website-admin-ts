import { FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto } from '@/apis';

export const pageToolbarProps = {
  /** 按钮配置 */
  buttonConfig: {
    type: Object as PropType<FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto>,
    default: {},
  },
  /** 是否展示按钮 */
  showButton: {
    type: Function as PropType<(config: string) => boolean>,
    default: () => {
      return (config: string) => {
        return true;
      };
    },
  },
};
