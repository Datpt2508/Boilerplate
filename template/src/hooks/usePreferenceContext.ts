import { useContext } from 'react';

import { PreferenceContext } from '~/contextStore/ActionPreferenceContext';

export default () => useContext(PreferenceContext);
