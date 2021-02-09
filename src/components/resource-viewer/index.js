import {
  useContext,
  useState,
  useEffect,
} from 'react';

import { Context } from '../../provider';
import Wrapper from './style';

// const fs = window.require('fs');
const ipc = window.require('electron').ipcRenderer

const Viewer = ({ resource }) => {
  console.log(resource);

  return (
    <>
      {
        resource.tipo === 'VIDEO' ?
        <video autoPlay controls>
          <source src="proto-propio:///tmp/recursos/cs-sociales/geografia/globo/video-globo.mp4" type="video/mp4" />
        </video> :
        resource.tipo === 'IMAGEN' ?
        <img src="proto-propio:///tmp/recursos/biologia/cel_procariota/celula-procariota-partes.jpg" /> :
        null
      }
    </>
  );
};

export default () => {
  const { resourceId, allResources } = useContext(Context);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    if (!resourceId) return;
    const resourceFound = allResources.find(r => r.id === resourceId);

    if (!resourceFound) return;

    // ipc.send('inspect-dir', resourceFound.carpeta);
    
    setResource(resourceFound);
  }, [resourceId]);

  return (
    <Wrapper.Main>
    {
      resource &&
      <>
        <h1>{resource.titulo}</h1>
        <h2>{resource.descripcion}</h2>
        <Viewer resource={resource} />
      {/*
        <video autoplay controls>
          <source src="proto-propio:///tmp/recursos/cs-sociales/geografia/globo/video-globo.mp4" type="video/mp4" />
        </video>
      */}
      </>
    }
    </Wrapper.Main>
  );
}
