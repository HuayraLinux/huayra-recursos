import { useState, createContext } from 'react';

import allResources from '../indice.json';

export const Context = createContext(null);

export default ({ children }) => {
  const [resourceId, setResourceId] = useState(null);

  return (
    <Context.Provider value={{ resourceId, setResourceId, allResources }}>
      { children }
    </Context.Provider>
  );
};
