import { withInstall } from '@/utils';
import SvgIcon from './src/SvgIcon.vue';
import IconPicker from './src/IconPicker.vue';
import Icon from './Icon.vue';

export const FIconPicker = withInstall(IconPicker);
export const FSvgIcon = withInstall(SvgIcon);
export const FIcon = withInstall(Icon);
