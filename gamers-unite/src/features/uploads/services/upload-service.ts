import { apiClient } from "@/services/api/client";

type UploadImageResponse = {
  success: boolean;
  data: {
    imageUrl: string;
  };
};

export async function uploadImage(file: File, target: "avatar" | "cafe" = "avatar", cafeSlug?: string) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("target", target);

  if (cafeSlug) {
    formData.append("cafeSlug", cafeSlug);
  }

  const response = await apiClient.post<UploadImageResponse>("/uploads/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.imageUrl;
}
