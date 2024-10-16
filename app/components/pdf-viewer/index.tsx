export function PDFViewer({ id }: { id: string }) {
  return <iframe className="h-full w-full" src={`/assets/pdf/${id}.pdf`} />
}
