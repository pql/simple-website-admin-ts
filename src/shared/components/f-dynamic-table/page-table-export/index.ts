import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageTableExport from './src/page-table-export.vue';
import { pageTableExportProps } from './src/props';

export const PageTableExport = withInstall(pageTableExport);
export declare type PageTableExportProps = Partial<ExtractPropTypes<typeof pageTableExportProps>>;
