import {
  useState,
  useEffect,
} from 'react';

import * as Viewers from './components';

const appendCustomProtocol = file => `proto-propio://${file}`;

const Img = ({ file }) => (
  <img src={file} />
);

export default ({ file, mimeType }) => {
  let component;

  switch (mimeType) {
    case 'video/mp4':
      component = <Viewers.Video key={file} file={appendCustomProtocol(file)} />;
      break;

    case 'image/jpeg':
      component = <Img file={appendCustomProtocol(file)} />;
      break;

    case 'application/pdf':
      component = <Viewers.PDF file={appendCustomProtocol(file)} />;
      break;

    default:
      console.log(`${file} (${mimeType}) no soportado`);
      component = null;
  }

  return (
    <div className="">
      { component }
    </div>
  );
};
