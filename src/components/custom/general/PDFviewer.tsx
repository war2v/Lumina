'use client';

type PDFViewerProps = {
  url: string;
};

export default function PDFViewer({ url }: PDFViewerProps) {
  return (
    <iframe
      src={url}
      title="PDF Viewer"
      className="w-full h-screen border-none"
    />
  );
}
