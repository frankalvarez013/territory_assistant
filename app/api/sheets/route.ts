// pages/api/sheets.js
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { ZodIssue, z } from "zod";
const createExcelSchema = z.object({
  sheetID: z.string().min(1).max(255),
  sheetName: z.string().min(1).max(255),
  //use zode to check if the isAdmin is true or false "strings"
});
export async function POST(req: NextRequest, res: NextResponse) {
  // return NextResponse.json({ message: "Success" }, { status: 201 });
  const body = await req.json();
  const validation = createExcelSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "C:/Users/Frank/Desktop/vast-reality-401722-c373a9fee177.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = body.sheetID; // Replace with your actual spreadsheet ID
    const range = body.sheetName; // Adjust based on your needs

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    // Send the sheet data back to the client
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error accessing Google Sheets" }, { status: 500 });
  }
}
export async function GET(req: NextRequest, res: NextResponse) {}

export async function PATCH(req: NextRequest, res: NextResponse) {}

export async function DELETE(req: NextRequest, res: NextResponse) {}
