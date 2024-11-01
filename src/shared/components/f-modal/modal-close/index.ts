import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import modalClose from './src/modal-close.vue';
import { modalCloseProps } from './src/props';

export const ModalClose = withInstall(modalClose);
export declare type ModalCloseProps = Partial<ExtractPropTypes<typeof modalCloseProps>>;
