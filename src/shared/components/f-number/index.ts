import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import numberCom from './src/number.vue';
import { numberProps } from './src/props';

export const FNumber = withInstall(numberCom);
export declare type FNumberProps = Partial<ExtractPropTypes<typeof numberProps>>;
