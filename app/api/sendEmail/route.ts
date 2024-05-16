// pages/api/sheets.js
import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { ZodIssue, z } from "zod";
import nodemailer from "nodemailer";
const createExcelSchema = z.object({
  email: z.string().min(1).max(255),
  subject: z.string().min(1).max(255),
  message: z.string().min(1).max(255),
  //use zode to check if the isAdmin is true or false "strings"
});
export async function POST(req: NextRequest, res: NextResponse) {
  // return NextResponse.json({ message: "Success" }, { status: 201 });
  const body = await req.json();
  const validation = createExcelSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Replace with your mail provider's SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // your SMTP username
      pass: process.env.SMTP_PASSWORD, // your SMTP password
    },
  });
  try {
    await transporter.sendMail({
      from: `"Territory Assistant" <${process.env.SMTP_EMAIL}>`, // sender address
      to: validation.data.email, // list of receivers
      subject: validation.data.subject, // Subject line
      text: validation.data.message, // plain text body
      html: `<b>${validation.data.message}</b>`, // HTML body content
    });

    return NextResponse.json({ status: 201 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: `Request POST failed:\n ${error}` });
  }
}
