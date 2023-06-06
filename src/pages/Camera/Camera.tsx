import Webcam from "react-webcam";
import { useCallback, useState, useRef } from "react";
import { AiFillAlert, AiFillCamera } from "react-icons/ai";
import Modal from "../../components/Modal.tsx";
import { dataURLtoFile } from "../../utils/camera.utils.ts";
import axios from "axios";
import { useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: { exact: "environment" },
};

export function CameraReact() {
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState([
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
  ]);
  const [id, setId] = useState(1);
  const webcamRef: any = useRef(null);
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(
        import.meta.env.VITE_BASE_URL_REPORT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onMutate: () => {
      toast.loading("Posting your photos...", {
        id: "save",
      });
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      toast.dismiss("save");
    },
  });
  const capture = useCallback((id: number) => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture((prevPicture) =>
      prevPicture.map((item) =>
        item.id === id ? { ...item, photo: pictureSrc } : item
      )
    );
  }, []);

  const uploadFile = () => {
    const formData = new FormData();
    const random = Math.floor(Math.random() * 1000000);
    picture.map((item) => {
      const file = dataURLtoFile(item.photo, item.name);
      formData.append(item.name, file, `${item.name}-${random}.jpg`);
    });

    mutation.mutate(formData);
  };

  return (
    <div>
      <h2 className="mb-5 text-center font-bold">
        {id === 1 ? "Photo KTP" : id === 2 ? "Photo Orang" : "Photo Tangki"}
      </h2>
      <div className=" flex justify-center items-center">
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          width={400}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="border-2 border-blue-700 rounded-xl"
        />
      </div>
      <div className="w-screen flex flex-col justify-center items-center">
        <div
          onClick={(e) => {
            e.preventDefault();
            capture(id);
            setId(id + 1);
          }}
          className="mt-2 hover:bg-blue-800  flex justify-center items-center bg-blue-400 text-white px-2 py-1 rounded gap-2"
        >
          Capture photo
          <AiFillCamera />
        </div>
        {id > 3 ? (
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="mt-2 hover:bg-blue-800  flex justify-center items-center bg-blue-400 text-white px-2 py-1 rounded gap-2"
          >
            Preview And Upload Photo
            <AiFillAlert />
          </div>
        ) : null}
      </div>
      <Modal upload={uploadFile} data={picture} open={open} setOpen={setOpen} />
      <Toaster />
    </div>
  );
}
