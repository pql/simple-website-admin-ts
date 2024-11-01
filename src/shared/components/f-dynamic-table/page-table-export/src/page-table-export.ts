import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { pageTableExportProps } from './props';
import { jsonToSheetXlsx } from '@/components/Excel';
import { FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto } from '@/apis';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    ...pageTableExportProps,
  },
  methods: {
    /** 导出当前页 */
    export(header: { [key: string]: any }, data: any[]) {
      jsonToSheetXlsx({
        header: header,
        data: data,
        filename: `${this.exportConfig?.filename ?? 'Data'}.xlsx`,
      });
      this.notify.success({
        message: this.l('ExportSuccess'),
      });
    },
    /** 格式化excel的数据 */
    formatExcelData(type: string, listColumns: any, data: any): any {
      const columns = this.formatColumns(listColumns);
      return data.map((record, index) => {
        const obj = {};
        columns.forEach((column) => {
          if (column.type === 'no') {
            // 序号
            if (this.getShowPagination() && type === 'Export') {
              obj[column.type] = (this.getCurrentPage() - 1) * this.getPageSize() + (index + 1);
            } else {
              obj[column.type] = index + 1;
            }
          } else if (column.type === 'datetime' || column.type === 'dateTime') {
            if (column.dateFormat == 'YYYY-MM-DD') {
              obj[column.field!] = this.dateUtil.fromUTCDateToLocalDate(
                this.exportConfig.formatColumn(column.field, record[column.field!]),
              );
            } else {
              obj[column.field!] = this.dateUtil.fromUse12HoursToLocalDateTime(
                this.exportConfig.formatColumn(column.field, record[column.field!]),
              );
            }
          } else {
            // 其他
            obj[column.field!] = this.exportConfig.formatColumn(
              column.field!,
              record[column.field!],
            );
          }
        });
        return obj;
      });
    },
    /** 格式化excel表头 */
    formatExcelHeader(listColumns: any[]): { [key: string]: any } {
      const obj = {};
      for (const column of this.formatColumns(listColumns)) {
        obj[column.field! ?? column.type!] = this.l(column.title ?? '');
      }
      return obj;
    },
    /** 格式化列 */
    formatColumns(listColumns: any[]) {
      const columns: Array<FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto> = listColumns
        .filter((item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) => {
          return item.type !== 'action' && !!item.ifShow;
        })
        .sort((a, b) => {
          return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
        });
      return columns;
    },
    /** 获取当前是否显示分页 */
    getShowPagination() {
      // 在组件中实现
      return true;
    },
    /** 获取每页数据量 */
    getPageSize() {
      // 在组件中实现
      return 0;
    },
    /** 获取当前页码 */
    getCurrentPage() {
      // 在组件中实现
      return 0;
    },
  },
});
