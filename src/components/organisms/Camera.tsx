import Webcam from "react-webcam";
import { videoConstraints } from "../../pages/Camera/camera.constant.ts";
import { AiFillCamera } from "react-icons/ai";
import { RefObject } from "react";
import { useState } from "react";

export function CameraComponent({
  capture,
  webcamRef,
  id,
  setCloseModal,
}: {
  capture: (id: number) => void;
  webcamRef: RefObject<Webcam>;
  id: number;
  setCloseModal: (value: boolean) => void;
}) {
  const [isCameraReady, setIsCameraReady] = useState(false);
  console.log(isCameraReady);

  return (
    <div>
      <h2 className="mb-5 text-center font-bold">
        {id === 1 ? "Photo Petugas" : id === 2 ? "Photo KTP" : "Photo Tangki"}
      </h2>
      <div className="">
        <div className=" bg-slate-200 flex justify-center items-center">
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            onUserMedia={() => {
              setIsCameraReady(true);
            }}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="border-2 border-blue-700 rounded-xl"
          />
        </div>
        <div className="w-full flex justify-center p-2">
          <div className="w-[30vh] flex flex-col">
            <button
              onClick={(e) => {
                e.preventDefault();
                capture(id);
                setCloseModal(false);
              }}
              className="mt-2 hover:bg-blue-800  flex justify-center items-center bg-blue-400 text-white px-2 py-1 rounded gap-2"
            >
              Capture photo
              <AiFillCamera />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
