import { withInstall } from '@/utils';
import dynamicTable from './src/dynamic-table.vue';
import { ExtractPropTypes } from 'vue';
import { dynamicTableProps } from './src/props';

export * from './common';

export const FDynamicTable = withInstall(dynamicTable);
export declare type FDynamicProps = Partial<ExtractPropTypes<typeof dynamicTableProps>>;
