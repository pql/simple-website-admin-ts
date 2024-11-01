import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import resizeLayout from './src/resize-layout.vue';
import { resizeLayoutProps } from './src/props';

export const FResizeLayout = withInstall(resizeLayout);
export declare type FResizeLayoutProps = Partial<ExtractPropTypes<typeof resizeLayoutProps>>;
