import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import provinceCityArea from './src/province-city-area.vue';
import { provinceCityAreaProps } from './src/props';

export const ProvinceCityArea = withInstall(provinceCityArea);
export declare type ProvinceCityAreaProps = Partial<ExtractPropTypes<typeof provinceCityAreaProps>>;
