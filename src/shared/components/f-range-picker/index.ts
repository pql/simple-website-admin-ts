import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import rangePicker from './src/range-picker.vue';
import { rangePickerProps } from './src/props';

export const FRangePicker = withInstall(rangePicker);
export declare type FRangePickerProps = Partial<ExtractPropTypes<typeof rangePickerProps>>;
