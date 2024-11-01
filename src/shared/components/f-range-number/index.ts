import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import rangeNumber from './src/range-number.vue';
import { rangeNumberProps } from './src/props';

export const FRangeNumber = withInstall(rangeNumber);
export declare type FRangeNumberProps = Partial<ExtractPropTypes<typeof rangeNumberProps>>;
