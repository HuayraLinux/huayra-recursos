import {
  useContext,
  useState,
  useEffect,
} from 'react';

import { Context } from '../../provider';
import { ResourceRender } from 'components';
import Wrapper from './style';

const ipc = window.require('electron').ipcRenderer

export default () => {
  const { resourceId, allResources } = useContext(Context);

  const [resource, setResource] = useState(null);
  const [resourceType, setResourceType] = useState(null);

  useEffect(() => {
    if (!resourceId) return;
    const resourceFound = allResources.find(r => r.id === resourceId);

    if (!resourceFound) return;

    setResource(resourceFound);
    ipc.send('inspect-file', resourceFound.nombre_archivo);
  }, [resourceId]);

  useEffect(() => {
    ipc.on('inspect-file-result', (e, result) => {
      setResourceType(null);
      if (result instanceof Error) return;

      setResourceType(result);
    });
  }, []);

  return (
    <Wrapper.Main>
    {
      resourceType &&
      <>
        <h1>{resource.titulo}</h1>
        <h2>{resource.descripcion}</h2>
        <ResourceRender resourceType={resourceType} />
      </>
    }
    </Wrapper.Main>
  );
}
