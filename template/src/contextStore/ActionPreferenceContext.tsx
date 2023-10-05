import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  memo,
  useMemo,
  useReducer,
} from 'react';

import useCallbackRef from '~/hooks/useCallbackRef';

type ActionProps = {
  countApp: number;
};

type State = {
  result: ActionProps;
};

type Action = {
  type: 'COUNT_APP';
  payload: {
    countApp: number;
  };
};

type PreferenceActionsContextProps = {
  getActionStatePref: () => ActionProps;
  setActionCountApp?: (item: number) => void;
  //Base preference action
};

type PreferenceContextProps = State;

const initialState: ActionProps = {
  countApp: 0,
  //Base initial state
};

const reducer = (state: State, action: Action): State => {
  const nextState = { ...state };

  switch (action.type) {
    case 'COUNT_APP':
      nextState.result.countApp = action.payload.countApp;
      break;
  }

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

  const setActionCountApp = useCallbackRef((dataPlayer: number) => {
    setState({
      type: 'COUNT_APP',
      payload: {
        countApp: dataPlayer,
      },
    });
  });

  const actionValues = useMemo(
    () => ({
      getActionStatePref,
      setActionCountApp,
    }),
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
