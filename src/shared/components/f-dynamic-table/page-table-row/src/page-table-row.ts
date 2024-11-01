import { defineComponent } from 'vue';
import { pageTableRowProps } from './props';
import PageTableExport from '../../page-table-export/src/page-table-export';
import {
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto,
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
} from '@/apis';
import { DateFormatStore } from '@/store/modules/dateFormat';

const dateFormatStore = DateFormatStore.useStoreWithOut();
type CompareOperator = '!=' | '>' | '>=' | '<' | '<=' | '==' | '=' | '';

const compareFunctions: Record<
  CompareOperator,
  (a: number | string | Date, b: number | string | Date) => boolean
> = {
  '!=': (a, b) => a != b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a == b,
  '=': (a, b) => a === b,
  '': () => false,
};
export default defineComponent({
  mixins: [PageTableExport],
  props: {
    ...pageTableRowProps,
  },
  computed: {
    /** 计算器-计算返回值绑定字段值：支持嵌套 */
    formatFieldValue() {
      return (key: string, value: any) => {
        let result = value;
        try {
          const field: Array<string> = key.split('.');
          field.map((item) => {
            result = result[item];
          });
          return result;
        } catch (error) {
          return null;
        }
      };
    },
    /** 计算-格式化数字 */
    formatNumber() {
      return (column: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto, value) => {
        const text = value;
        if (!text) {
          return '';
        }
        // 防止不是number报错
        if (typeof text !== 'number') {
          const arr = text.toString().split('.');
          if (arr.length <= 1) {
            arr[1] = '00';
          }
          return `${arr[0]}.${arr[1].substr(0, column.numberDigits)}`;
        }
        return text.toFixed(column.numberDigits as any);
      };
    },
    /** 计算-格式化日期 */
    formatDate() {
      return (column: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto, value) => {
        const fieldValue = column.field ? value : '';
        if (fieldValue == null) {
          return fieldValue;
        }
        if (column.dateFormat == 'YYYY-MM-DD') {
          return this.dateUtil.fromUTCDateToLocalDate(fieldValue);
        }
        if (dateFormatStore.getUse12Hours) {
          return this.dateUtil.fromUTCDateToLocalDateTimeWithA(fieldValue);
        } else {
          return this.dateUtil.fromUTCDateToLocalDateTime(fieldValue);
        }
      };
    },
    /** 计算-列类型为type为link时的链接地址 */
    formatLinkPath() {
      return (column: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto, record) => {
        let link = column.linkPath;
        const params = column.linkParam?.split(',');
        params?.forEach((item) => {
          link = link?.replace('${' + item + '}', record[item]);
        });
        return link;
      };
    },
    /** 计算-当前列的序号 */
    currentNo() {
      return (index) => {
        if (!this.getShowPagination()) {
          return index + 1;
        }
        return (this.getCurrentPage() - 1) * this.getPageSize() + (index + 1);
      };
    },
    /** 计算-列颜色计算 */
    bgColor() {
      return (column: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto, record: any) => {
        if (!column.listViewColumnColor) return {};
        let condition = false;
        const value = this.formatFieldValue(column.field as string, record);
        if (column.type == 'datetime' || column.type == 'dateTime') {
          condition = compareFunctions[column.listViewColumnColor.determineType || ''](
            this.formatDate(column, value),
            column.listViewColumnColor.value,
          );
        } else if (column.type === 'number') {
          condition = compareFunctions[column.listViewColumnColor.determineType || ''](
            Number(this.formatNumber(column, value)),
            Number(column.listViewColumnColor.value),
          );
        } else {
          condition = compareFunctions[column.listViewColumnColor.determineType || ''](
            value,
            column.listViewColumnColor.value,
          );
        }
        const bg =
          column.field === column.listViewColumnColor.colFieldName &&
          condition &&
          value != undefined
            ? column.listViewColumnColor.color
            : '';

        const style = bg
          ? {
              background: bg,
              display: 'initial',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '10px',
              fontSize: '12px',
            }
          : {};

        return style;
      };
    },
    /** 检查-是否有权限 */
    hasGranted() {
      return (val) => {
        if (!val) return true;
        return this.isGrantedAny(val);
      };
    },
    /** 检查菜单按钮是否是空 */
    isMenuButtonEmpty() {
      return (item, column, record) => {
        const arr = item.filter((i) => {
          return this.hasGranted(i.acl) && this.formatShowActionBtn(i, column, record);
        });
        return arr.length > 0 ? false : true;
      };
    },
    /** 控制表格操作栏按钮隐藏 */
    formatShowActionBtn() {
      return (
        item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto,
        column: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
        record: any,
      ): boolean => {
        return this.showActionBtn(item, column, record);
      };
    },
  },
});
