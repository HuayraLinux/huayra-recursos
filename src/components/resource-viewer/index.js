import {
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

import { Context } from '../../provider';
import { ResourceRender } from 'components';
import Wrapper from './style';
import mime from 'mime-types';

const ipc = window.require('electron').ipcRenderer

export default () => {
  const { resourceId, allResources } = useContext(Context);

  const [resourceFile, setResourceFile] = useState(null);
  const [resourceTitle, setResourceTitle] = useState(null);
  const [resourceDescription, setResourceDescription] = useState(null);
  const [resourceType, setResourceType] = useState(null);

  const [allowRender, setAllowRender] = useState(false);

  useEffect(() => {
    if (!resourceId) return;

    const resourceFound = allResources.find(r => r.id === resourceId);

    setResourceTitle(resourceFound.titulo);
    setResourceDescription(resourceFound.descripcion);
    setResourceType(mime.lookup(resourceFound.nombre_archivo));

    ipc.send('build-filename', resourceFound.nombre_archivo);
  }, [resourceId]);

  useEffect(() => {
    ipc.on('build-filename-result', (e, result) => {
      setResourceFile(result);
    });
  }, []);

  return useMemo(() => (
    <Wrapper.Main>
      <h1>{ resourceTitle }</h1>
      <h2>{ resourceDescription }</h2>
      <ResourceRender file={resourceFile} mimeType={resourceType} />
    </Wrapper.Main>
  ), [resourceFile]);
};
