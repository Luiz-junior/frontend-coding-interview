import axios from "axios";
import { PexelsResponse } from "../types/index";

export async function fetchPhotos() {
  try {
    const response = await axios.get(
      "https://api.pexels.com/v1/search?query=nature&per_page=10",
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY!,
        },
      }
    );

    return response.data as PexelsResponse;
  } catch (error) {
    throw new Error("Failed to fetch photos" + error);
  }
}
