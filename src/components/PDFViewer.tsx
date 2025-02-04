"use client"
import { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Use local worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default function PDFViewer() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(900);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(Math.min(window.innerWidth - 32, 900));
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setError(null);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onDocumentLoadError(err: Error) {
    console.error('PDF load error:', err);
    setError(err.message);
  }

  const handlePageChange = (e: React.MouseEvent, newPage: number) => {
    e.preventDefault();
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      const currentScroll = containerRef.current?.scrollTop || 0;
      setPageNumber(newPage);
      // Maintain scroll position after state update
      requestAnimationFrame(() => {
        containerRef.current?.scrollTo(0, currentScroll);
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-full" ref={containerRef}>
      <div className="w-full max-w-3xl mx-auto">
        {error ? (
          <div className="p-4 text-red-600">
            Error loading PDF: {error}
          </div>
        ) : (
          <Document
            file={"https://pub-9170ad6cfbe4416e9e9387cf6fd3f1b9.r2.dev/current-bulletin.pdf"}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="flex justify-center"
            error={
              <div className="p-4 text-center text-gray-500">
                No bulletin currently available. Please check back later.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              width={width}
            />
          </Document>
        )}
      </div>

      {numPages && (
        <div className="sticky bottom-0 mt-4 flex gap-2 sm:gap-4 items-center bg-white p-2 sm:p-4 shadow-lg w-full">
          <div className="flex gap-2 sm:gap-4 items-center justify-center w-full max-w-3xl mx-auto">
            <button
              onClick={(e) => handlePageChange(e, pageNumber - 1)}
              disabled={pageNumber <= 1}
              className="px-2 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <p>Page {pageNumber} of {numPages}</p>

            <button
              onClick={(e) => handlePageChange(e, pageNumber + 1)}
              disabled={pageNumber >= (numPages || 1)}
              className="px-2 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>

            <a
              href="/bulletins/current-bulletin.pdf"
              download="current-bulletin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}