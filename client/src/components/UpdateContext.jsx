// UpdateContext.js
import React from 'react';

const UpdateContext = React.createContext({
  update: false,
  setUpdate: () => {},
});

export default UpdateContext;