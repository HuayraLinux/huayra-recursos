import {
  useContext,
  useMemo
} from 'react';

import Emoji from 'react-emoji-render';
import mime from 'mime-types';

import { Context } from 'provider';

import Wrapper from './style';

const fileTypes = [
  {
    type: 'Videos',
    mimes: ['video/mp4'],
    emoji: <Emoji text=":globe_with_meridians:" />,
  },
  {
    type: 'Documentos',
    mimes: ['application/pdf'],
    emoji: <Emoji text=":globe_with_meridians:" />,
  },
];

const getHumanFileType = (mimeType) => {
  const t = fileTypes.find(ft => ft.mimes.includes(mimeType))
  if (!t) return;

  return t.type;
};

const analyze = (resources) => {
  console.log('analyze');
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
      <div className="">
        <h1 className="text-4xl text-center">Bienvenido a los recursos educativos</h1>
        <h1 className="text-4xl text-center">de Educ.Ar en Huayra</h1>
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
      </div>
    </Wrapper.Main>
  );
};
