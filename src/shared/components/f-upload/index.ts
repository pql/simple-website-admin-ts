import { withInstall } from '@/utils';
import basicUpload from './src/BasicUpload.vue';
import uploadImage from './src/components/ImageUpload.vue';

export const FImageUpload = withInstall(uploadImage);
export const FBasicUpload = withInstall(basicUpload);
