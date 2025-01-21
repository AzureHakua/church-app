"use client"
import { useState } from 'react';
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

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setError(null);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function onDocumentLoadError(err: Error) {
    console.error('PDF load error:', err);
    setError(err.message);
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="flex-1 overflow-auto">
        {error ? (
          <div className="p-4 text-red-600">
            Error loading PDF: {error}
          </div>
        ) : (
          <Document
            file="/bulletins/current-bulletin.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="border shadow-lg"
            error={
              <div className="p-4 text-center text-gray-500">
                No bulletin currently available. Please check back later.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              className="max-w-[95vw]"
              width={900}
            />
          </Document>
        )}
      </div>

      {numPages && (
        <div className="sticky bottom-0 mt-4 flex gap-4 items-center bg-white p-4 shadow-lg">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setPageNumber(page => Math.max(1, page - 1))}
              disabled={pageNumber <= 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            
            <p>Page {pageNumber} of {numPages}</p>
            
            <button
              onClick={() => setPageNumber(page => Math.min(numPages || page, page + 1))}
              disabled={pageNumber >= (numPages || 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>

            <a 
              href="/bulletins/current-bulletin.pdf"
              download="current-bulletin.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  );
}