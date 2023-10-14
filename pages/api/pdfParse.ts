import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Extract FormData from the request
  const data = await request.formData();
  // Extract the uploaded file from the FormData
  const file: File | null = data.get("file") as unknown as File;

  // Make sure file exists
  if (!file) {
    return NextResponse.json({ success: false, error: "No file found" });
  }

  // Make sure file is a PDF
  if (file.type !== "application/pdf") {
    return NextResponse.json({ success: false, error: "Invalid file type" });
  }
  const pdfLoader = new PDFLoader(file);
  const splitDocuments = await pdfLoader.loadAndSplit();
  console.log(splitDocuments);
  return NextResponse.json({ text: splitDocuments });
}