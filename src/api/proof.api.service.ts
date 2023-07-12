import { fuelApiService } from "./axios.config.ts";

export const uploadProof = async (form: FormData) => {
  const id = form.get("orderId");
  const { data } = await fuelApiService.post(`/proof/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
