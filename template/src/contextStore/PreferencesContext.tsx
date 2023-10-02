import React from 'react';

export const PreferencesContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  isThemeDark: false,
});
