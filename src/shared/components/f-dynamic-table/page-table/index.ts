import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageTable from './src/page-table.vue';
import { pageTableProps } from './src/props';

export const PageTable = withInstall(pageTable);
export declare type PageTableProps = Partial<ExtractPropTypes<typeof pageTableProps>>;
