import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageFilter from './src/page-filter.vue';
import { pageFilterProps } from './src/props';

export const PageFilter = withInstall(pageFilter);
export declare type PageFilterProps = Partial<ExtractPropTypes<typeof pageFilterProps>>;
