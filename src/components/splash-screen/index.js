import {
  useContext,
  useMemo
} from 'react';

import mime from 'mime-types';

import { Context } from 'provider';

import Wrapper from './style';

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
    
    if (!acc[humanType]) acc[humanType] = 0
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

  console.log(report);

  return (
    <Wrapper.Main>
      <h1 className="text-4xl text-center">Recursos Educativos Abiertos</h1>
      <h2 className="mt-12 text-2xl">Tenés a tu disposición: </h2>
      <ul className="text-left mt-4">
        {
          Object.keys(report).map((k) => (
            <li className="text-lg">
              <div className="flex justify-between">{report[k]} {k}</div>
            </li>
          ))
        }
      </ul>
    </Wrapper.Main>
  );
};
