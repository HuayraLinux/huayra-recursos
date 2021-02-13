import { useState, createContext } from 'react';

import allResources from '../indice.json';

export const Context = createContext(null);

export default ({ children }) => {
  const [resources, setResources] = useState([]);
  const [resourceId, setResourceId] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const providerValue = {
    resources,
    resourceId,
    isSearching,
    setResources,
    setResourceId,
    allResources,
    setIsSearching,
  };

  return (
    <Context.Provider value={providerValue}>
      { children }
    </Context.Provider>
  );
};
