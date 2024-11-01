import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import EnumCheckbox from './src/enum-checkbox.vue';
import { enumCheckboxProps } from './src/props';

export const FEnumCheckbox = withInstall(EnumCheckbox);
export declare type FEnumCheckboxProps = Partial<ExtractPropTypes<typeof enumCheckboxProps>>;
