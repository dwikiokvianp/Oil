export interface CameraDetail {
  id: number;
  name: string;
  photo: string;
  convert: string;
}
export const CameraForm = [
  {
    id: 1,
    name: "photo_ktp",
    photo: "",
    convert: "",
  },
  {
    id: 2,
    name: "photo_orang",
    photo: "",
    convert: "",
  },
  {
    id: 3,
    name: "photo_tangki",
    photo: "",
    convert: "",
  },
];

export const HandoverForm = [
  {
    id: 1,
    name: "photo_kebersihan",
    photo: "",
    convert: "",
  },
  {
    id: 2,
    name: "photo_tangki",
    photo: "",
    convert: "",
  },
  {
    id: 3,
    name: "photo_level_gauge",
    photo: "",
    convert: "",
  },
  {
    id: 4,
    name: "photo_pompa",
    photo: "",
    convert: "",
  },
];

export const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
