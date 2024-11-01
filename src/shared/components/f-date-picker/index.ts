import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import datePicker from './src/date-picker.vue';
import { datePickerProps } from './src/props';

export const FDatePicker = withInstall(datePicker);
export declare type FDatePickerProps = Partial<ExtractPropTypes<typeof datePickerProps>>;
