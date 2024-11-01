import { IButtonItem } from '../interfaces';

export const pageConfigProps = {
  type: {
    type: String,
  },
  /** 按钮集合 */
  buttonList: {
    type: Object as PropType<IButtonItem[]>,
    default: [
      {
        title: 'Unified.texts.Personalized:ListConfiguration',
        icon: '#yo-icon-liebiaosheji',
        eventName: 'ListConfig',
        desc: '列配置',
      },
      {
        title: 'Unified.texts.Personalized:QueryConditionConfiguration',
        icon: '#yo-icon-chaxuntiaojianpeizhi',
        eventName: 'QueryConfig',
        desc: '搜索配置',
      },
      {
        title: 'Unified.texts.Personalized:ColumnColorConfiguration',
        icon: '#yo-icon-lieyansepeizhi',
        eventName: 'ColumnColorConfig',
        desc: '列颜色配置',
      },
      {
        title: 'Unified.texts.Personalized:ExportCurrentPage',
        icon: '#yo-icon-daochudangqianye',
        eventName: 'Export',
        desc: '导出',
      },
      {
        title: 'Unified.texts.Personalized:ExportAllPages',
        icon: '#yo-icon-daochusuoyoushuju',
        eventName: 'BulkExport',
        desc: '批量导出',
      },
    ],
  },
  /** 是否展示按钮 */
  showButton: {
    type: Function as PropType<(button: IButtonItem) => boolean>,
    default: () => {
      return (button) => {
        return true;
      };
    },
  },
};
