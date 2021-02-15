import {
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import Emoji from 'react-emoji-render';

import { Context } from '../../provider';
import { ResourceRender, SplashScreen } from 'components';
import Wrapper from './style';
import mime from 'mime-types';

const ipc = window.require('electron').ipcRenderer

export default () => {
  const { resourceId, allResources } = useContext(Context);

  const [showSplash, setShowSplash] = useState(true);
  const [resourceFile, setResourceFile] = useState(null);
  const [resourceTitle, setResourceTitle] = useState(null);
  const [resourceDescription, setResourceDescription] = useState(null);
  const [resourceType, setResourceType] = useState(null);

  useEffect(() => {
    if (!resourceId) return;
    setShowSplash(false);

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
      {
        showSplash ?
        <SplashScreen /> :
        <Wrapper.ResourcePlaceholder>
          <div className="flex justify-between items-baseline">
            <h1 className="text-2xl truncate">{ resourceTitle }</h1>
            <div className="flex ">
              <Emoji text=":file_folder:" style={{ fontSize: '32px' }}/>
              <Emoji text=":memo:" style={{ fontSize: '32px', marginTop: '-0.2rem' }}/>
            </div>
          </div>
          <h2 className="text-lg">{ resourceDescription }</h2>
          <ResourceRender file={resourceFile} mimeType={resourceType} />
        </Wrapper.ResourcePlaceholder>
      }
    </Wrapper.Main>
  ), [resourceFile]);
};
