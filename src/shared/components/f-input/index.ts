import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import input from './src/Input.vue';
import { inputProps } from './src/props';

export const FInput = withInstall(input);
export declare type FInputProps = Partial<ExtractPropTypes<typeof inputProps>>;
