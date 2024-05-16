import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Image as Immage } from "@prisma/client";
import type { Image } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";

export async function GET(
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse<Image | ErrorResponse>> {
  const territoryID = request.nextUrl.searchParams.get("territoryID");

  const congregationID = request.nextUrl.searchParams.get("congregationID");
  let getImage: Immage | null = null;
  try {
    if (territoryID && congregationID) {
      const parsedTerrId = parseInt(territoryID, 10);
      getImage = await prisma.image.findUnique({
        where: {
          territoryID_congregationID: {
            territoryID: parsedTerrId,
            congregationID: congregationID,
          },
        },
      });

      if (!getImage) {
        return NextResponse.json({ message: "IMAGE Record not found" });
      }

      return NextResponse.json(getImage, { status: 201 });
    }
  } catch (e) {
    return NextResponse.json({
      message: `IMAGE GET transaction failed:\n ${e}`,
    });
  }
  return NextResponse.json({ message: "IMAGE Record not found" });
}
