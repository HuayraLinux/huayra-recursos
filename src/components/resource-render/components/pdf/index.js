import { useState, useEffect } from 'react';

import { pdfjs, Document, Page } from 'react-pdf';

import { EmojiButton } from 'components';
import Wrapper from './style';

pdfjs.GlobalWorkerOptions.workerSrc = './pdf.worker.min.js'

export default ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoadad] = useState(false);

  const onPDFLoad = ({ numPages }) => {
    setNumPages(numPages);
    setLoadad(true);
  };
  
  useEffect(() => {
    setLoadad(false);
    setCurrentPage(1);
    setNumPages(null);
  }, [file]);

  return (
    <Wrapper.Main key={file}>
      <div className="justify-self-end mr-12">
        <EmojiButton emojiText="arrow_left" 
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage - 1 === 0}
          title="Página previa"
        />
      </div>
      <div className="justify-self-start ml-12">
        <EmojiButton emojiText="arrow_right"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage + 1 > numPages}
          title="Página siguiente"
        />
      </div>
      {
        numPages &&
        <div className="col-span-2 text-center italic">{ currentPage } / { numPages }</div>
      }
      <div className="col-span-2 mt-4">
        <div className="h-screen flex justify-center">
          <Document key={file} file={file} onLoadSuccess={onPDFLoad}>
            { loaded && <Page pageNumber={currentPage} /> }
          </Document>
        </div>
      </div>
    </Wrapper.Main>
  );
};
