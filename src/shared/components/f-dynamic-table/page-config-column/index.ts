import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageConfigColumn from './src/page-config-column.vue';
import { pageConfigColumnProps } from './src/props';

export const PageConfigColumn = withInstall(pageConfigColumn);
export declare type PageConfigColumnProps = Partial<ExtractPropTypes<typeof pageConfigColumnProps>>;
