import { NextRequest } from "next/server";
import { IncomingMessage } from "http";

export function nextRequestToIncomingMessage(req: NextRequest): IncomingMessage {
  const headers: Record<string, string | string[]> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const message: Partial<IncomingMessage> = {
    headers,
    method: req.method,
    url: req.url,
  };

  return message as IncomingMessage;
}
export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0"); // Day of the month
  const year = date.getFullYear(); // Full year
  return `${month}/${day}/${year}`; // Return formatted date
}
