import { useContext, useMemo } from 'react';
import mime from 'mime-types';

import { Context } from 'provider';
import { EmojiButton, Vaca } from 'components';

import Wrapper from './style';

const emojis = {
  Videos: 'Videos',
  Documentos: 'Documents',
  Imágenes: 'Picture',
  Experiencias: 'Goggles',
  Audios: 'Microphone',
};

const fileTypes = [
  {
    type: 'Videos',
    mimes: ['video/mp4'],
  },
  {
    type: 'Documentos',
    mimes: ['application/pdf'],
  },
  {
    type: 'Imágenes',
    mimes: ['image/jpeg'],
  },
  {
    type: 'Experiencias',
    mimes: ['text/html'],
  },
  {
    type: 'Audios',
    mimes: ['audio/mpeg'],
  },
];

const getHumanFileType = (mimeType) => {
  const t = fileTypes.find(ft => ft.mimes.includes(mimeType))
  if (!t) return;

  return t.type;
};

const analyze = (resources) => {
  const report = resources.reduce((acc, r) => {
    const mimeType = mime.lookup(r.nombre_archivo)
    const humanType = getHumanFileType(mimeType);
    if (!humanType) return acc;
 
    if (!acc[humanType]) acc[humanType] = { resources: [] };
    acc[humanType].resources.push(r);

    return acc
  }, {});

  return report;
};

export default () => {
  const { allResources, setResources } = useContext(Context);

  const report = useMemo(
    () => analyze(allResources)
  , [allResources]);

  return (
    <Wrapper.Main>
      <div className="w-full flex justify-center items-end" >
        <Vaca name="Indica" width="200px" height="200px" />
        <div style={{ marginBottom: '32px' }}>
          <h1 className="text-5xl text-center">Recursos Educativos Abiertos</h1>
          <h2 className="text-4xl">Tenés a tu disposición: </h2>
        </div>
      </div>
      <ul className="text-left mt-20 flex items-end">
        {
          Object.keys(report).map((k) => (
            <li className="text-2xl px-8 flex flex-col items-center">
              <EmojiButton
                onClick={() => setResources(report[k].resources)}
                name={emojis[k]}
                title={`Ver ${k}`}
                size="128px"
              />
              <h3 className="font-bold">{report[k].resources.length}</h3>
              <h4>{k}</h4>
            </li>
          ))
        }
      </ul>
    </Wrapper.Main>
  );
};
