import { useContext } from 'react';

import { Context } from 'provider';

import { Vaca, EmojiButton } from 'components';

import Wrapper from './style';

export default () => {
  const { appFailed } = useContext(Context);

  return (
    <Wrapper.Main>
      {
        appFailed ?
        <>
          <Vaca name="OhNo" size="2x" />
          <h2 className="mt-8 text-4xl">¡Oh, no... encontramos un problema!</h2>
        </>:
        <>
          <Vaca name="Heroina" size="2x" />
          <h1 className="text-6xl text-center mt-20">Recursos Educativos Abiertos</h1>
          <EmojiButton name="CounterClockwiseArrows" title="Cargando..." size="100px" animate="pulse" />
          <h2 className="mt-4 text-4xl">Estamos preparando todo...</h2>
        </>
      }
    </Wrapper.Main>
  );
};
