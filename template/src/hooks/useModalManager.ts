import { useModalManager } from '@vlzh/react-modal-manager';
import { ModalParams } from '@vlzh/react-modal-manager/dist/interfaces';
import { useCallback } from 'react';

import usePreferenceActionsContext from './usePreferenceActionsContext';

type SupportedModals =
  | 'ExampleModal'
  | 'FriendBottomModal'
  | 'ShareCodeBottomModal'
  | 'GrandPermissionModal'
  | 'OptionsPhotoModal'
  | 'AddLocatedModal'
  | 'EditNameModal'
  | 'NetWorkDisableModal'
  | 'ConfirmAddFriendModal'
  | 'ConfirmDeleteFriendModal';

type ModalManagerProps = {
  openModal: (
    modalName: SupportedModals,
    closeOther?: boolean,
    params?: ModalParams,
  ) => void;
  closeModal: (modalName: SupportedModals) => void;
  isOpen: (modalName: SupportedModals) => boolean;
  getParams: (modalName: SupportedModals) => ModalParams | null;
};

export default (name?: SupportedModals): ModalManagerProps => {
  const methods = useModalManager(name);
  const actionMethod = usePreferenceActionsContext();

  const openModal = useCallback(
    (
      modalName: SupportedModals,
      closeOther?: boolean,
      params?: ModalParams,
    ): void => {
      methods.openModal(modalName, closeOther, params);
    },
    [methods],
  );

  const closeModal = useCallback(
    (modalName: SupportedModals): void => {
      methods.closeModal(modalName);
      actionMethod.setActionCloseModal?.();
    },
    [methods],
  );

  const isOpen = useCallback(
    (modalName: SupportedModals): boolean => {
      return methods.isOpen(modalName);
    },
    [methods],
  );

  const getParams = useCallback(
    (modalName: SupportedModals): ModalParams | null => {
      return methods.getParams(modalName);
    },
    [methods],
  );

  return {
    openModal,
    closeModal,
    isOpen,
    getParams,
  };
};
