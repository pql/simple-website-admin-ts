import { IPageTableExportConfig } from '../../page-table/interfaces';

export const pageTableExportProps = {
  /** Excel导出配置 */
  exportConfig: {
    type: Object as PropType<IPageTableExportConfig>,
    default: {
      filename: 'Data',
      formatColumn: (field, value) => {
        return value;
      },
    },
  },
};
