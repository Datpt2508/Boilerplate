import React from 'react';

import AddLocatedModal from '~/screens/components/ModalComponent/AddLocatedModal';
import ConfirmAddFriendModal from '~/screens/components/ModalComponent/ConfirmAddFriendModal';
import ConfirmDeleteFriendModal from '~/screens/components/ModalComponent/ConfirmDeleteFriendModal';
import EditNameModal from '~/screens/components/ModalComponent/EditNameModal';
import ExampleModal from '~/screens/components/ModalComponent/ExampleModal';
import FriendBottomModal from '~/screens/components/ModalComponent/FriendBottomModal';
import GrandPermissionModal from '~/screens/components/ModalComponent/GrandPermissionModal';
import NetWorkDisableModal from '~/screens/components/ModalComponent/NetWorkDisableModal';
import OptionsPhotoModal from '~/screens/components/ModalComponent/OptionsPhotoModal';
import ShareCodeBottomModal from '~/screens/components/ModalComponent/ShareCodeBottomModal';

const ModalContainer = (): JSX.Element => {
  return (
    <>
      <ExampleModal />
      <FriendBottomModal />
      <ShareCodeBottomModal />
      <GrandPermissionModal />
      <OptionsPhotoModal />
      <AddLocatedModal />
      <EditNameModal />
      <NetWorkDisableModal />
      <ConfirmAddFriendModal />
      <ConfirmDeleteFriendModal />

      {/* TODO: this is sample modal, add more modal between  */}
    </>
  );
};

export default ModalContainer;
