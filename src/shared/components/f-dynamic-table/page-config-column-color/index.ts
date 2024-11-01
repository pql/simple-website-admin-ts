import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import pageConfigColumnColor from './src/page-config-column-color.vue';
import { pageConfigColumnColorProps } from './src/props';

export const PageConfigColumnColor = withInstall(pageConfigColumnColor);
export declare type PageConfigColumnColorProps = Partial<
  ExtractPropTypes<typeof pageConfigColumnColorProps>
>;
