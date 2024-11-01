import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import excelImport from './src/f-excel-import.vue';
import { excelImportProps } from './src/props';

export const FExcelImport = withInstall(excelImport);
export declare type FExcelImportProps = Partial<ExtractPropTypes<typeof excelImportProps>>;
