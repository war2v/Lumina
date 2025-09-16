import Image from "next/image";

export const renderResource = (currentResource: any) => {
  if (!currentResource) {
    return <p className="text-muted-foreground">No resource selected.</p>;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_PRESENTATION_RESOURCES_URL + currentResource.file_path;
  const fileType = currentResource.file_type;
  const fileName = currentResource.file_name || "file";

  switch (fileType) {
    // 🖼️ Images
    case "image/jpeg":
    case "image/jpg":
    case "image/png":
    case "image/webp":
    case "image/gif":
    case "image/svg+xml":
    case "image/bmp":
      return (
        <Image
          src={url}
          alt={fileName}
          fill
          className="rounded border"
        />
      );

    // 📄 PDF (now handled here)
    case "application/pdf":
      return (
        <iframe
          src={url}
          title={fileName}
          className="w-full h-[600px] rounded border shadow"
        />
      );

    // 🎞️ Videos
    case "video/mp4":
    case "video/webm":
    case "video/ogg":
      return (
        <video controls className="w-full max-w-3xl rounded shadow">
          <source src={url} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );

    // 🎧 Audio
    case "audio/mpeg":
    case "audio/mp3":
    case "audio/wav":
    case "audio/ogg":
      return (
        <audio controls className="w-full">
          <source src={url} type={fileType} />
          Your browser does not support the audio element.
        </audio>
      );

    // 📊 Office documents (Google Docs Viewer)
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": // .docx
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation": // .pptx
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": // .xlsx
    case "application/msword":
    case "application/vnd.ms-powerpoint":
    case "application/vnd.ms-excel":
      return (
        <iframe
          
          title={fileName}
          className="w-full h-[600px] rounded border"
        />
      );

    // 🧾 Plain text, markdown, CSV, JSON, HTML
    case "text/plain":
    case "text/csv":
    case "text/markdown":
    case "application/json":
    case "application/xml":
    case "text/html":
    case "text/javascript":
    case "text/css":
      return (
        <iframe
          src={url}
          title={fileName}
          className="w-full h-96 rounded border bg-white"
        />
      );

    // 🗃️ Fallback for unknown/unsupported types (e.g., .zip, .fig, .psd)
    default:
      return (
        <div className="text-center text-muted-foreground">
          <p>Preview not available for this file type.</p>
          <a
            href={url}
            download
            className="inline-block mt-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Download {fileName}
          </a>
        </div>
      );
  }
};
