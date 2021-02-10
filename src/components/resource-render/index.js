import {
  useState,
  useEffect,
} from 'react';

const appendCustomProtocol = file => `proto-propio://${file}`;

const Video = ({ file }) => (
  <video autoPlay controls>
    <source src={file} />
  </video>
);

const Img = ({ file }) => (
  <img src={file} />
);


export default ({ resourceType }) => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (!resourceType) return;

    const { filePath, mimeType } = resourceType;

    switch (mimeType) {
      case 'video/mp4':
        setComponent(<Video file={appendCustomProtocol(filePath)} />)
        break;

      case 'image/jpeg':
        setComponent(<Img file={appendCustomProtocol(filePath)} />)
        break;

      default:
        console.log(`${filePath} (${mimeType}) no soportado`);
        setComponent(null);
    }
  }, [resourceType]);

  return (
    <>
      { component }
    </>
  );
};
