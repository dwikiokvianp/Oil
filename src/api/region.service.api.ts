import { fuelApiService } from "./axios.config.ts";

export interface City {
  id: number;
  name: string;
  province_id: number;
}

export interface GetCityResponse {
  data: City[];
}

export interface ProvinceResponse {
  id: number;
  name: string;
  city: City[];
}

export interface GetProvinceResponse {
  data: ProvinceResponse[];
}

export interface GetProvinceByIdResponse {
  data: ProvinceResponse;
}

export const getRegionCity = async (): Promise<GetCityResponse> => {
  const { data } = await fuelApiService.get("/city");
  return data;
};

export const getRegionProvince = async (): Promise<GetProvinceResponse> => {
  const { data } = await fuelApiService.get("/province");
  return data;
};

export const getRegionCityById = async (id: number) => {
  const { data } = await fuelApiService.get(`/city/${id}`);
  return data;
};

export const getRegionProvinceById = async (
  id: number
): Promise<GetProvinceByIdResponse> => {
  const { data } = await fuelApiService.get(`/province/${id}`);
  return data;
};
