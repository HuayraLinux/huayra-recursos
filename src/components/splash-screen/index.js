import { useContext, useMemo } from 'react';
import mime from 'mime-types';

import { Context } from 'provider';
import { EmojiButton } from 'components';

import Wrapper from './style';

const emojis = {
  Videos: 'Videos',
  Documentos: 'Documents',
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
    
    if (!acc[humanType]) acc[humanType] = 0;
    acc[humanType] = acc[humanType] + 1;

    return acc
  }, {});

  return report;
};

export default () => {
  const { allResources } = useContext(Context);

  const report = useMemo(
    () => analyze(allResources)
  , [allResources]);

  return (
    <Wrapper.Main>
      <h1 className="text-6xl text-center">Recursos Educativos Abiertos</h1>
      <h2 className="mt-8 text-4xl">Tenés a tu disposición: </h2>
      <ul className="text-left mt-8 flex">
        {
          Object.keys(report).map((k) => (
            <li className="text-2xl px-8 flex flex-col items-center">
              <EmojiButton name={emojis[k]} title="Ups" size="128px" />
              <h3 className="font-bold">{report[k]}</h3>
              <h4>{k}</h4>
            </li>
          ))
        }
      </ul>
    </Wrapper.Main>
  );
};
