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
