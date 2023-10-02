import { useContext } from 'react';

import { ToastContext, ToastContextProps } from '~/contextStore/ToastContext';

export default (): ToastContextProps => useContext(ToastContext);
