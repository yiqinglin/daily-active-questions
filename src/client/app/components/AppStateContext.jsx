// @flow
import React from 'react';

export const AppStateContext = React.createContext({
  isEditing: false,
  isSubmitting: false,
  updateEditState: nextState => {},
  updateSubmitState: nextState => {}
});