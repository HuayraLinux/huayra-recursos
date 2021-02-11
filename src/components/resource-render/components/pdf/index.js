import { useState, useEffect } from 'react';

import { pdfjs, Document, Page } from 'react-pdf';

import Wrapper from './style';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

export default ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const onPDFLoad = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  return (
    <Wrapper.Main>
      <Wrapper.Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage - 1 === 0}>Previo</Wrapper.Button>
      <Wrapper.Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage + 1 > numPages}>Siguiente</Wrapper.Button>
      <div className="col-span-2 mt-4">
        <div className="h-screen flex justify-center">
          <Document file={file} onLoadSuccess={onPDFLoad}>
            <Page pageNumber={currentPage} />
          </Document>
        </div>
      </div>
    </Wrapper.Main>
  );
};
