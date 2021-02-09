import {
  useContext,
  useState,
  useEffect,
} from 'react';

import { Context } from '../../provider';
import Wrapper from './style';

export default () => {
  const { resourceId, allResources } = useContext(Context);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    if (!resourceId) return;
    const resourceFound = allResources.find(r => r.id === resourceId);

    if (!resourceFound) return;

    setResource(resourceFound);
  }, [resourceId]);

  if (!resource) return null;

  return (
    <Wrapper.Main>
      <h1>{resource.titulo}</h1>
      <h2>{resource.descripcion}</h2>
    </Wrapper.Main>
  );
}
