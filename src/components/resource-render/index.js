import {
  useState,
  useEffect,
} from 'react';

import * as Viewers from './components';

const appendCustomProtocol = file => `proto-propio://${file}`;

const Video = ({ file }) => (
  <video autoPlay controls className="w-full h-full" style={{ maxHeight: '450px' }}>
    <source src={file}/>
  </video>
);

const Img = ({ file }) => (
  <img src={file} />
);

export default ({ file, mimeType }) => {
  let component;

  switch (mimeType) {
    case 'video/mp4':
      component = <Video key={file} file={appendCustomProtocol(file)} />;
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
