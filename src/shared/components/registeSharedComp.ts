import type { App } from 'vue';
import { FBtn } from './f-btn';
import { FInput } from './f-input';
import { FTextarea } from './f-textarea';
import { FDynamicTable } from './f-dynamic-table';
import { FResizeLayout } from './f-resize-layout';
import { FSelectTree } from './f-select-tree';
import { FBasicUpload, FImageUpload } from './f-upload';
import { FEnumSelect } from './f-enum-select';
import { FEnumRadio } from './f-enum-radio';
import { FEnumCheckbox } from './f-enum-checkbox';
import { FSelect } from './f-select';
import { FRangeNumber } from './f-range-number';
import { FDatePicker } from './f-date-picker';
import { FRangePicker } from './f-range-picker';
import { FTimePicker } from './f-time-picker';
import { FTimeRangePicker } from './f-time-range-picker';
import { FNumber } from './f-number';
import { FIcon, FIconPicker, FSvgIcon } from './f-icon';

export function registerSharedComp(app: App) {
  // 注册 自定义组件
  app.use(FBtn);
  app.use(FInput);
  app.use(FTextarea);
  app.use(FSelect);
  app.use(FRangeNumber);
  app.use(FDynamicTable);
  app.use(FResizeLayout);
  app.use(FSelectTree);
  app.use(FBasicUpload);
  app.use(FImageUpload);
  app.use(FEnumSelect);
  app.use(FEnumRadio);
  app.use(FEnumCheckbox);
  app.use(FDatePicker);
  app.use(FRangePicker);
  app.use(FTimePicker);
  app.use(FTimeRangePicker);
  app.use(FNumber);
  app.use(FIcon);
  app.use(FIconPicker);
  app.use(FSvgIcon);
}
