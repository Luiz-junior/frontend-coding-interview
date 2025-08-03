"use client";

import { redirect } from "next/navigation";
import { fetchPhotos } from "../lib/pexels";
import PhotoList from "../components/PhotoList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function PhotosPage() {
  const { user } = useAuth();
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      redirect("/login");
    }

    const loadPhotos = async () => {
      try {
        const data = await fetchPhotos();
        setPhotos(data.photos);
      } catch (error) {
        toast.error("Failed to load photos", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    loadPhotos();
  }, [user]);

  if (!user) return null;

  return (
    <div className="flex justify-center min-h-screen w-full">
      <div className="w-full max-w-[600px]">
        <header className="p-4 flex items-center justify-between mt-4 lg:mt-2">
          <Image src="/logo.svg" alt="Clever Logo" width={75} height={75} />
        </header>
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-6">All photos</h1>
          <PhotoList photos={photos} />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
