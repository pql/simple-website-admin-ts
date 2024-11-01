import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import timeRangePicker from './src/time-range-picker.vue';
import { timeRangePickerProps } from './src/props';

export const FTimeRangePicker = withInstall(timeRangePicker);
export declare type FTimeRangePickerProps = Partial<ExtractPropTypes<typeof timeRangePickerProps>>;
