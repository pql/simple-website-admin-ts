import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import timePicker from './src/time-picker.vue';
import { timePickerProps } from './src/props';

export const FTimePicker = withInstall(timePicker);
export declare type FTimePickerProps = Partial<ExtractPropTypes<typeof timePickerProps>>;
