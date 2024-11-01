import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageToolbar from './src/page-toolbar.vue';
import { pageToolbarProps } from './src/props';

export const PageToolbar = withInstall(pageToolbar);
export declare type PageToolbarProps = Partial<ExtractPropTypes<typeof pageToolbarProps>>;
