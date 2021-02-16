import {
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';

import mime from 'mime-types';

import { Context } from 'provider';
import {
  EmojiButton,
  ResourceRender,
  SplashScreen
} from 'components';

import Wrapper from './style';

const ipc = window.require('electron').ipcRenderer;

export default () => {
  const { resourceId, allResources } = useContext(Context);

  const [showSplash, setShowSplash] = useState(true);
  const [resourceFile, setResourceFile] = useState(null);
  const [resourceTitle, setResourceTitle] = useState(null);
  const [resourceDescription, setResourceDescription] = useState(null);
  const [resourceType, setResourceType] = useState(null);
  const [resourceNotFound, setResourceNotFound] = useState(null);

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

      if (result.error) {
        setResourceNotFound(true);
      } else {
        setResourceNotFound(false);
      }

      setResourceFile(result.filePath);
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
            <div className="flex">
              {
                !resourceNotFound &&
                <>
                  <EmojiButton emojiText="file_folder" 
                    title="Abrir en carpeta"
                    onClick={() => ipc.send('open-in-folder', resourceFile)}
                  />
                  <EmojiButton emojiText="memo" 
                    title="Abrir recurso"
                    onClick={() => ipc.send('open-file', resourceFile)}
                    style={{ marginTop: '-0.2rem' }}
                  />
                </>
              }
            </div>
          </div>
          <h2 className="text-lg">{ resourceDescription }</h2>
          {
            resourceNotFound ?
            <div className="flex flex-col items-center justify-center rounded">
              <EmojiButton emojiText="warning" 
                title="Archivo no encontrado"
                size="64px"
              />
              <h1 className="text-2xl font-bold">Archivo no encontrado</h1>
              <h2
                className="mt-9 underline cursor-pointer text-sm"
                onClick={() => ipc.send('open-resource-folder')}
              >
                Abrir carpeta de recursos
              </h2>
            </div>:
            <ResourceRender file={resourceFile} mimeType={resourceType} />
          }
        </Wrapper.ResourcePlaceholder>
      }
    </Wrapper.Main>
  ), [resourceFile]);
};
