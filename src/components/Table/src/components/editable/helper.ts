import { ComponentType } from '../../types/componentType';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('AutoComplete')) {
    return t('Unified.texts.common:inputText');
  }
  if (component.includes('Picker')) {
    return t('Unified.texts.PleaseChoose');
  }

  if (
    component.includes('Select') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch') ||
    component.includes('DatePicker') ||
    component.includes('TimePicker')
  ) {
    return t('Unified.texts.PleaseChoose');
  }
  return '';
}
