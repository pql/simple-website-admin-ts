import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import select from './src/select.vue';
import { selectProps } from './src/props';

export const FSelect = withInstall(select);
export declare type FSelectProps = Partial<ExtractPropTypes<typeof selectProps>>;
