import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import selectTree from './src/select-tree.vue';
import { selectTreeProps } from './src/props';

export const FSelectTree = withInstall(selectTree);
export declare type FSelectTreeProps = Partial<ExtractPropTypes<typeof selectTreeProps>>;
