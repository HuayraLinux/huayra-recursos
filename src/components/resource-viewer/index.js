import {
  useContext,
  useState,
  useEffect,
} from 'react';

import { Context } from '../../provider';
import Wrapper from './style';

// const fs = window.require('fs');
const ipc = window.require('electron').ipcRenderer

export default () => {
  const { resourceId, allResources } = useContext(Context);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    if (!resourceId) return;
    const resourceFound = allResources.find(r => r.id === resourceId);

    if (!resourceFound) return;

    ipc.send('inspect-dir', resourceFound.carpeta);
    

    // const content = fs.readFileSync('/tmp/lala', 'utf8');
    // console.log(content)
    setResource(resourceFound);
  }, [resourceId]);

  return (
    <Wrapper.Main>
    {
      resource &&
      <>
        <h1>{resource.titulo}</h1>
        <h2>{resource.descripcion}</h2>
      </>
    }
    </Wrapper.Main>
  );
}
