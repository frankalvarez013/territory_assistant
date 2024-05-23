import { useEffect, useState } from "react";
import { User } from "@prisma/client";
export default async function DeleteUser(id: string) {
  try {
    let response = await fetch(`/api/user?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return { success: true, data };
  } catch (error) {
    console.error("Failed to delete user", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      return { success: false, error: String(error) }; // Handle other types of errors
    }
  }
}
