import { withInstall } from '@/utils';
import type { ExtractPropTypes } from 'vue';
import modal from './src/modal.vue';
import { modalProps } from './src/props';

export const Modal = withInstall(modal);
export declare type ModalProps = Partial<ExtractPropTypes<typeof modalProps>>;
