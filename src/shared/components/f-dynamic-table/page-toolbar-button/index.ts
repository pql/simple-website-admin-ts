import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageToolbarButton from './src/page-toolbar-button.vue';
import { pageToolbarButtonProps } from './src/props';

export const PageToolbarButton = withInstall(pageToolbarButton);
export declare type PageToolbarButtonProps = Partial<
  ExtractPropTypes<typeof pageToolbarButtonProps>
>;
