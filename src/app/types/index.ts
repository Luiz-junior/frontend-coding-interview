export interface Photo {
  id: number;
  src: {
    medium: string;
  };
  alt: string;
  photographer: string;
  photographer_url: string;
  avg_color: string;
}

export interface PexelsResponse {
  photos: Photo[];
}

export interface User {
  email: string;
}
