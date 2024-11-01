import { ModalHelper, ModalService } from '@/shared/helpers';

export const registerServices = (): void => {
  ModalService.prototype.getModalService = () => {
    return ModalHelper;
  };
};
