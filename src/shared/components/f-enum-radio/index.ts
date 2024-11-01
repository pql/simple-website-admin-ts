import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import EnumRadio from './src/enum-radio.vue';
import { enumRadioProps } from './src/props';

export const FEnumRadio = withInstall(EnumRadio);
export declare type FEnumRadioProps = Partial<ExtractPropTypes<typeof enumRadioProps>>;
