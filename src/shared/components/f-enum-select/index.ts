import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import EnumSelect from './src/enum-select.vue';
import { enumSelectProps } from './src/props';

export const FEnumSelect = withInstall(EnumSelect);
export declare type FEnumSelectProps = Partial<ExtractPropTypes<typeof enumSelectProps>>;
