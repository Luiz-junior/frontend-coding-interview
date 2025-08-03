export interface User {
  email: string;
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function login(email: string): void {
  if (typeof window !== "undefined") {
    const user = { email };
    localStorage.setItem("user", JSON.stringify(user));
  }
}

export function getLikedPhotos(): string[] {
  if (typeof window === "undefined") return [];
  const liked = localStorage.getItem("likedPhotos");
  return liked ? JSON.parse(liked) : [];
}

export function toggleLike(photoId: string): void {
  if (typeof window !== "undefined") {
    const likedPhotos = getLikedPhotos();
    const isLiked = likedPhotos.includes(photoId);
    if (isLiked) {
      localStorage.setItem(
        "likedPhotos",
        JSON.stringify(likedPhotos.filter((id) => id !== photoId))
      );
    } else {
      localStorage.setItem(
        "likedPhotos",
        JSON.stringify([...likedPhotos, photoId])
      );
    }
  }
}
