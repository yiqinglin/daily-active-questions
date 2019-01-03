// @flow
import React from 'react';

export const AppStateContext = React.createContext({
  onEdit: false,
  toggleEdit: () => {}
});