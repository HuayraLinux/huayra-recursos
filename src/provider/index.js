import { useState, createContext } from 'react';

import allResources from '../indice.json';

export const Context = createContext(null);

export default ({ children }) => {
  const [resources, setResources] = useState([]);
  const [resourceId, setResourceId] = useState(null);

  const providerValue = {
    resources,
    resourceId,
    setResources,
    setResourceId,
    allResources,
  };

  return (
    <Context.Provider value={providerValue}>
      { children }
    </Context.Provider>
  );
};
