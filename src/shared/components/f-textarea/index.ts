import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import textarea from './src/Textarea.vue';
import { textareaProps } from './src/props';

export const FTextarea = withInstall(textarea);
export declare type FTextareaProps = Partial<ExtractPropTypes<typeof textareaProps>>;
