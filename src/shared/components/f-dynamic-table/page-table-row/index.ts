import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageTableRow from './src/page-table-row.vue';
import { pageTableRowProps } from './src/props';

export const PageTableRow = withInstall(pageTableRow);
export declare type PageTableRowProps = Partial<ExtractPropTypes<typeof pageTableRowProps>>;
