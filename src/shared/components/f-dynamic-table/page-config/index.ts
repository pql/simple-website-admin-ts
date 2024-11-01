import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageConfig from './src/page-config.vue';
import { pageConfigProps } from './src/props';

export const PageConfig = withInstall(pageConfig);
export declare type PageConfigProps = Partial<ExtractPropTypes<typeof pageConfigProps>>;
