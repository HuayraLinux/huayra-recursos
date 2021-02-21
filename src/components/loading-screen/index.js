import { useContext } from 'react';

import { Context } from 'provider';

import { EmojiButton } from 'components';

import Wrapper from './style';

export default () => {
  const { appFailed } = useContext(Context);

  return (
    <Wrapper.Main>
      {
        appFailed ?
        <>
          <EmojiButton name="DizzyFace" title="Oh no" size="128px" />
          <h2 className="mt-8 text-4xl">Oh no encontramos un problema...</h2>
          <p className="mt-8 text-xl">Por favor ponete en contacto con <span className="underline cursor-pointer">nosotros</span></p>
        </>:
        <>
          <h1 className="text-6xl text-center">Recursos Educativos Abiertos</h1>
          <EmojiButton name="CounterClockwiseArrows" title="Cargando..." size="128px" animate="pulse" />
          <h2 className="mt-8 text-4xl">Estamos preparando todo...</h2>
        </>
      }
    </Wrapper.Main>
  );
};
