import {
  useContext,
  useState,
  useEffect
} from 'react';

import { Context } from 'provider';

import Wrapper from './style';

export default () => {
  const {
    allResources,
    setResources,
    setResourceId,
    setIsSearching,
  } = useContext(Context);

  const onSearchInput = ({ target }) => {
    const inputValue = target.value.toUpperCase();
    if (!inputValue) {
      setResources([]);
      setIsSearching(false);
      return;
    }

    const filteredResources = allResources
      .filter(r => r.titulo.toUpperCase().includes(inputValue));

    setResources(filteredResources);
    setIsSearching(true);
  };
    
  return (
    <Wrapper.Main>
      <input onChange={onSearchInput} className="w-full h-full outline-none" type="text" />
    </Wrapper.Main>
  );
};
