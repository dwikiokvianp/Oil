import Webcam from "react-webcam";
import { videoConstraints } from "../../pages/Officer/pages/Camera/camera.constant.ts";
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
        {(() => {
          switch (id) {
            case 1:
              return "Photo Petugas";
            case 2:
              return "Photo KTP";
            case 3:
            case 5:
              return "Photo Tangki";
            case 4:
              return "Photo Kebersihan";
            case 6:
              return "Photo Level Gauge";
            default:
              return "Photo Pompa";
          }
        })()}
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
