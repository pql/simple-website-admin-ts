import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageConfigFilter from './src/page-config-filter.vue';
import { pageConfigFilterProps } from './src/props';

export const PageConfigFilter = withInstall(pageConfigFilter);
export declare type PageConfigFilterProps = Partial<ExtractPropTypes<typeof pageConfigFilterProps>>;
