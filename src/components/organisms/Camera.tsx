import Webcam from "react-webcam";
import {
  CameraForm,
  videoConstraints,
} from "../../pages/Camera/camera.constant.ts";
import { AiFillAlert, AiFillCamera } from "react-icons/ai";
import { RefObject, useCallback, useRef, useState } from "react";
import Modal from "../Modal.tsx";
import ModalDetail from "../ModalDetail.tsx";
import { useMutation } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { dataURLtoFile } from "../../utils/camera.utils.ts";

export function CameraComponent({ orderId }: { orderId: number }) {
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState(CameraForm);
  const [openDetail, setOpenDetail] = useState(false);
  const capture = useCallback((id: number) => {
    const pictureSrc = webcamRef.current?.getScreenshot();
    setPicture((prevPicture) =>
      prevPicture.map((item) =>
        item.id === id ? { ...item, photo: pictureSrc || "" } : item
      )
    );
  }, []);
  const [id, setId] = useState(1);
  const webcamRef: RefObject<Webcam> = useRef<Webcam>(null);
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post(
        `http://localhost:8080/proof/${orderId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return data;
    },
    onMutate: () => {
      console.log("onMutate");
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

  const uploadFile = () => {
    const RANDOM = 1_000;
    const formData = new FormData();
    const random = Math.floor(Math.random() * RANDOM);
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
      <div className="">
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
        <div className="w-full flex justify-center p-2">
          <div className="w-[30vh] flex flex-col">
            <button
              className="mt-2 hover:bg-blue-800  flex justify-center items-center bg-blue-400 text-white px-2 py-1 rounded gap-2"
              onClick={() => {
                setOpenDetail(true);
              }}
            >
              Preview Data
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                capture(id);
                setId(id + 1);
              }}
              className="mt-2 hover:bg-blue-800  flex justify-center items-center bg-blue-400 text-white px-2 py-1 rounded gap-2"
            >
              Capture photo
              <AiFillCamera />
            </button>
            {id > 3 ? (
              <button
                onClick={() => {
                  setOpen(!open);
                }}
                className="mt-2 hover:bg-blue-800  flex justify-center items-center bg-blue-400 text-white px-2 py-1 rounded gap-2"
              >
                Preview And Upload Photo
                <AiFillAlert />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <Modal upload={uploadFile} data={picture} open={open} setOpen={setOpen} />
      <ModalDetail
        open={openDetail}
        setOpen={setOpenDetail}
        id={Number(orderId)}
      />
    </div>
  );
}
