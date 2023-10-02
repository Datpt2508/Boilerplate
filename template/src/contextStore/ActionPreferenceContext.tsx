import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {
  ReactNode,
  createContext,
  memo,
  useMemo,
  useReducer,
  useState,
} from 'react';

import useCallbackRef from '~/hooks/useCallbackRef';

type ActionProps = {
  limitPage: number;
  dataFirebase: Array<any>;
  countApp: number;
  deviceUUID: string;
  friendName: string;
  friendUUID: string;
  qrInvite: string;
  isDataLocated: boolean;
  isLocated: boolean;
  adsMobState: GoogleRemoteAds;
  isShowInterstitial: boolean;
  //Base action prop
};

type State = {
  result: ActionProps;
};

type Action =
  | {
      type: 'SET_DATA_FIREBASE';
      payload: {
        dataFirebase: Array<any>;
      };
    }
  | {
      type: 'COUNT_APP';
      payload: {
        countApp: number;
      };
    }
  | {
      type: 'LIMIT_PAGE';
      payload: {
        limitPage: number;
      };
    }
  | {
      type: 'SET_DEVICE_UUID';
      payload: {
        deviceUUID: string;
      };
    }
  | {
      type: 'SET_FRIEND_NAME';
      payload: {
        friendName: string;
      };
    }
  | {
      type: 'SET_FRIEND_UUID';
      payload: {
        friendUUID: string;
      };
    }
  | {
      type: 'QR_INVITE_CODE';
      payload: {
        qrInvite: string;
      };
    }
  | {
      type: 'SET_IS_DATA_LOCATED';
      payload: {
        isDataLocated: boolean;
      };
    }
  | {
      type: 'SET_IS_LOCATED';
      payload: {
        isLocated: boolean;
      };
    }
  | {
      type: 'SET_STATE_ADSMOB';
      payload: GoogleRemoteAds;
    }
  | {
      type: 'SET_IS_SHOW_INTERSTITIAL';
      payload: {
        isShowInterstitial: boolean;
      };
    };
// Base action

type PreferenceActionsContextProps = {
  getActionStatePref: () => ActionProps;
  setActionLimitPage?: (item: number) => void;
  setDataFirebase?: () => void;
  setActionCountApp?: (item: number) => void;
  setActionDeviceUUID?: (item: string) => void;
  setActionFriendName?: (item: string) => void;
  setActionFriendUUID?: (item: string) => void;
  setActionQRInvite?: (item: string) => void;
  setActionIsLocated?: (item: boolean) => void;
  setActionIsDataLocated?: (item: string) => void;
  setStateAdsMob?: (item: GoogleRemoteAds) => void;
  setActionIsShowInterstitial?: (item: boolean) => void;
  //Base preference action
};

type PreferenceContextProps = State;

const initialState: ActionProps = {
  limitPage: 5,
  dataFirebase: [],
  countApp: 0,
  deviceUUID: '',
  friendName: '',
  friendUUID: '',
  qrInvite: '',
  isLocated: false,
  isDataLocated: false,
  adsMobState: {},
  isShowInterstitial: false,
  //Base initial state
};

const reducer = (state: State, action: Action): State => {
  const nextState = { ...state };

  switch (action.type) {
    case 'SET_DATA_FIREBASE':
      nextState.result.dataFirebase = action.payload.dataFirebase;
      break;
    case 'COUNT_APP':
      nextState.result.countApp = action.payload.countApp;
      break;
    case 'LIMIT_PAGE':
      nextState.result.limitPage = action.payload.limitPage;
      break;
    case 'SET_DEVICE_UUID':
      nextState.result.deviceUUID = action.payload.deviceUUID;
      break;
    case 'SET_FRIEND_NAME':
      nextState.result.friendName = action.payload.friendName;
      break;
    case 'SET_FRIEND_UUID':
      nextState.result.friendUUID = action.payload.friendUUID;
      break;
    case 'QR_INVITE_CODE':
      nextState.result.qrInvite = action.payload.qrInvite;
      break;
    case 'SET_IS_LOCATED':
      nextState.result.isLocated = action.payload.isLocated;
      break;
    case 'SET_IS_DATA_LOCATED':
      nextState.result.isDataLocated = action.payload.isDataLocated;
      break;
    case 'SET_STATE_ADSMOB':
      nextState.result.adsMobState = action.payload.adsMobState;
      break;
    case 'SET_IS_SHOW_INTERSTITIAL':
      nextState.result.isShowInterstitial = action.payload.isShowInterstitial;
      break;
  }
  // console.log(
  //   '🚀isShowTour->',
  //   state?.result?.isShowTour,
  //   '| isShowClub->',
  //   state?.result?.isShowClub,
  //   '| isShowPitch->',
  //   state?.result?.isShowPitch,
  //   '| isShowStadium->',
  //   state?.result?.isShowStadium,
  //   '| isShowPlayer->',
  //   state?.result?.isShowPlayer,
  // );
  return nextState;
};

export const PreferenceActionsContext =
  createContext<PreferenceActionsContextProps>({
    getActionStatePref: () => initialState,
  });

export const PreferenceContext = createContext<PreferenceContextProps>({
  result: initialState,
});

const ActionPreferenceProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [state, setState] = useReducer(reducer, { result: initialState });
  // const [isLocated, setIsLocated] = useState(false);

  const getActionStatePref = useCallbackRef(() => state.result);

  const setActionLimitPage = useCallbackRef((item: number) =>
    setState({
      type: 'LIMIT_PAGE',
      payload: {
        limitPage: item,
      },
    }),
  );

  const setActionQRInvite = useCallbackRef((item: string) =>
    setState({
      type: 'QR_INVITE_CODE',
      payload: {
        qrInvite: item,
      },
    }),
  );

  const setActionDeviceUUID = useCallbackRef((item: string) => {
    console.log('🚀 ~ Device UUID ---->:', item);
    setState({
      type: 'SET_DEVICE_UUID',
      payload: {
        deviceUUID: item,
      },
    });
  });

  const setActionFriendName = useCallbackRef((item: string) => {
    setState({
      type: 'SET_FRIEND_NAME',
      payload: {
        friendName: item,
      },
    });
  });

  const setActionFriendUUID = useCallbackRef((item: string) => {
    setState({
      type: 'SET_FRIEND_UUID',
      payload: {
        friendUUID: item,
      },
    });
  });

  const setActionIsLocated = useCallbackRef((item: boolean) => {
    setState({
      type: 'SET_IS_LOCATED',
      payload: {
        isLocated: item,
      },
    });
  });

  const setActionIsDataLocated = useCallbackRef(async (item: string) => {
    let isLocated = false;

    setTimeout(() => {
      firestore()
        .collection('Users')
        .doc(item)
        .onSnapshot((documentSnapshot) => {
          const userData = documentSnapshot.data();

          if (userData?.friend.length > 0) {
            isLocated = true;
          }
          setState({
            type: 'SET_IS_DATA_LOCATED',
            payload: {
              isDataLocated: isLocated,
            },
          });
        });
    }, 500);
  });

  const setDataFirebase = async () => {
    const data = [...state.result.dataFirebase];
    let lastDocument: string | null = null;

    if (data.length > 0) {
      lastDocument = data[data.length - 1].documentSnapshot;
    }

    auth()
      .signInAnonymously()
      .then(() => {
        let query = firestore()
          .collection('Explore')
          .orderBy('event_date')
          .limit(10);

        if (lastDocument) {
          query = query.startAfter(lastDocument);
        }

        query.get().then((querySnapshot) => {
          const newData = [];
          querySnapshot.forEach((documentSnapshot) => {
            const dataItem = {
              documentSnapshot: documentSnapshot,
              ...documentSnapshot.data(),
            };
            newData.push(dataItem);
          });

          if (querySnapshot.size > 0) {
            data.push(...newData);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('length', data.length);
    setState({
      type: 'SET_DATA_FIREBASE',
      payload: {
        dataFirebase: data,
      },
    });
  };

  const setActionCountApp = useCallbackRef((dataPlayer: number) => {
    setState({
      type: 'COUNT_APP',
      payload: {
        countApp: dataPlayer,
      },
    });
  });

  const setStateAdsMob = useCallbackRef((item: object) => {
    console.log(
      '🚀 ~ file: ActionPreferenceContext.tsx:333 ~ setStateAdsMob ~ item:',
      item,
    );
    setState({
      type: 'SET_STATE_ADSMOB',
      payload: {
        adsMobState: item,
      },
    });
  });

  const setActionIsShowInterstitial = useCallbackRef((item: boolean) => {
    setState({
      type: 'SET_IS_SHOW_INTERSTITIAL',
      payload: {
        isShowInterstitial: item,
      },
    });
  });

  const actionValues = useMemo(
    () => ({
      getActionStatePref,
      setDataFirebase,
      setActionCountApp,
      setActionLimitPage,
      setActionDeviceUUID,
      setActionFriendName,
      setActionFriendUUID,
      setActionQRInvite,
      setActionIsLocated,
      setActionIsDataLocated,
      setStateAdsMob,
      setActionIsShowInterstitial,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <PreferenceActionsContext.Provider value={actionValues}>
      <PreferenceContext.Provider value={state}>
        {children}
      </PreferenceContext.Provider>
    </PreferenceActionsContext.Provider>
  );
};

export default memo(ActionPreferenceProvider);
