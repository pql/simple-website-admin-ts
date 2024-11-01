import { FireBytes_Unified_ButtonGroups_Dtos_ButtonConfigs } from '@/apis';

export const excelImportProps = {
  /**
   * 上传文件展示方式
   * button 按钮展示
   * drag 拖拽展示
   */
  showType: {
    type: String,
    default: 'drag',
  },

  /** 上传按钮名称多语言编码 */
  buttonTest: {
    type: String,
    default: '选择',
  },

  type: {
    type: String,
    default: 'primary',
  },

  icon: {
    type: String,
    // default: 'icon-shangchuan'
    default: '',
  },

  text: {
    type: String,
    default: '',
  },

  disable: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: 'info',
  },
  maxCount: {
    type: Number,
    default: 1,
  },
  config: {
    type: Object as PropType<FireBytes_Unified_ButtonGroups_Dtos_ButtonConfigs>,
    required: true,
  },
};
