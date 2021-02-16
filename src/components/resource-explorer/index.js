import {
  useContext,
  useState,
  useEffect
} from 'react';

import { Context } from 'provider';
import Wrapper from './style';

export default () => {
  const { resources, resourceId, setResourceId } = useContext(Context);
  const [resourcesToExplore, setResourcesToExplore] = useState([]);

  useEffect(() => {
    setResourcesToExplore(resources);
  }, [resources]);

  if (!resourcesToExplore.length) {
    return (
      <div className="border-2 bg-white flex flex-col items-center justify-center rounded text-center px-4">
        <h1 className="text-2xl">Buscá algo o elegí una categoría acá van a aparecer recursos</h1>
      </div>
    );
  }

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
        null
      }
    </Wrapper.Main>
  );
};
