import {
  useContext,
  useState,
  useEffect
} from 'react';

import { Context } from 'provider';
import Wrapper from './style';

export default () => {
  const {
    resources,
    resourceId,
    setResourceId,
    isSearching,
  } = useContext(Context);

  const [resourcesToExplore, setResourcesToExplore] = useState([]);

  useEffect(() => {
    setResourcesToExplore(resources);
  }, [resources]);

  return (
    <Wrapper.Main>
      {
        resourcesToExplore.length ?
        resourcesToExplore.map(c => (
          <Wrapper.Item
            onClick={() => setResourceId(c.id)}
            key={c.id}
            selected={c.id === resourceId}
          >
            { c.titulo }
          </Wrapper.Item>
        )):
        <div className="h-full flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl text-center">
            {
              isSearching ?
              'No se encontraron recursos, probá con otra búsqueda.' :
              'Buscá algo o elegí una categoría acá van a aparecer recursos'
            }
          </h1>
        </div>
      }
    </Wrapper.Main>
  );
};
