import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import Btn from './src/btn.vue';
import { btnProps } from './src/props';

export const FBtn = withInstall(Btn);
export declare type FBtnProps = Partial<ExtractPropTypes<typeof btnProps>>;
