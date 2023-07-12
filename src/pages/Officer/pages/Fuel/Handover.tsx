import { HeaderOfficerTitle } from "../../../../components/molecules/HeaderOfficerTitle.tsx";
import { AddPhoto } from "../../../../components/molecules/AddPhoto.tsx";
import { RefObject, useCallback, useRef, useState } from "react";
import ModalTemplateCamera from "../../../../components/atoms/ModalTemplateCamera.tsx";
import { CameraComponent } from "../../../../components/organisms/Camera.tsx";
import Webcam from "react-webcam";
import { CameraDetail, HandoverForm } from "../Camera/camera.constant.ts";
import { useQuery } from "react-query";
import { getUser } from "../../../../api/users.service.api.ts";

export function Handover() {
  const [openTangki, setOpenTangki] = useState(false);
  const [openKebersihan, setOpenKebersihan] = useState(false);
  const [openLevelGauge, setOpenLevelGauge] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);

  const [picture, setPicture] = useState<CameraDetail[]>(HandoverForm);

  const webcamRef: RefObject<Webcam> = useRef<Webcam>(null);

  const capture = useCallback(
    (id: number) => {
      const pictureSrc = webcamRef.current?.getScreenshot();
      setPicture((prevPicture) =>
        prevPicture.map((item) =>
          item.id === id ? { ...item, photo: pictureSrc || "" } : item
        )
      );
    },
    [setPicture]
  );

  const { data: OfficerList } = useQuery({
    queryKey: "OfficerList",
    queryFn: () =>
      getUser({
        role: 3,
      }),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 m-4">
      <HeaderOfficerTitle title={"Handover Form"} />
      <div>
        <div className="pb-4">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Condition
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setInputHandover((prevInput) => ({
                      ...prevInput,
                      condition: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="message"
                  id="message"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setInputHandover((prevInput) => ({
                      ...prevInput,
                      message: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Officer After
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={(e) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    setInputHandover((prevInput) => ({
                      ...prevInput,
                      officer_id: e.target.value,
                    }));
                  }}
                >
                  {OfficerList?.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="grid grid-cols-2 gap-2 m-4">
          {!picture[0].photo ? (
            <AddPhoto setOpen={setOpenKebersihan} title={"Foto Kebersihan"} />
          ) : (
            <div>
              <p className="text-center text-xs font-bold  mt-6 lg:mt-0">
                Photo Kebersihan
              </p>
              <img
                onClick={() => {
                  setOpenKebersihan(true);
                }}
                className="mt-2 lg:mt-0 rounded object-cover"
                src={picture[0].photo}
                alt={picture[0].name}
              />
            </div>
          )}
          {!picture[1].photo ? (
            <AddPhoto setOpen={setOpenTangki} title={"Foto Tengki"} />
          ) : (
            <div>
              <p className="text-center text-xs font-bold  mt-6 lg:mt-0">
                Photo Tangki
              </p>
              <img
                onClick={() => {
                  setOpenTangki(true);
                }}
                className="mt-2 lg:mt-0 rounded object-cover"
                src={picture[1].photo}
                alt={picture[1].name}
              />
            </div>
          )}
          {!picture[2].photo ? (
            <AddPhoto setOpen={setOpenLevelGauge} title={"Foto Level Gauge"} />
          ) : (
            <div>
              <p className="text-center text-xs font-bold  mt-6 lg:mt-0">
                Photo Level Gauge
              </p>
              <img
                onClick={() => {
                  setOpenLevelGauge(true);
                }}
                className="mt-2 lg:mt-0 rounded object-cover"
                src={picture[2].photo}
                alt={picture[2].name}
              />
            </div>
          )}
          {!picture[3].photo ? (
            <AddPhoto setOpen={setOpenPhoto} title={"Foto Level Gauge"} />
          ) : (
            <div>
              <p className="text-center text-xs font-bold  mt-6 lg:mt-0">
                Photo Pompa
              </p>
              <img
                onClick={() => {
                  setOpenLevelGauge(true);
                }}
                className="mt-2 lg:mt-0 rounded object-cover"
                src={picture[3].photo}
                alt={picture[3].name}
              />
            </div>
          )}
        </div>
        <div className="grid">
          <button className="w-full bg-slate-500 hover:bg-slate-300 text-white col-span-3 rounded-lg py-2 mt-4">
            Assign
          </button>
        </div>
      </main>
      <ModalTemplateCamera
        open={openTangki}
        setOpen={setOpenTangki}
        innerComponent={
          <CameraComponent
            setCloseModal={setOpenTangki}
            id={2}
            capture={capture}
            webcamRef={webcamRef}
          />
        }
      />
      <ModalTemplateCamera
        open={openKebersihan}
        setOpen={setOpenKebersihan}
        innerComponent={
          <CameraComponent
            setCloseModal={setOpenKebersihan}
            id={1}
            capture={capture}
            webcamRef={webcamRef}
          />
        }
      />
      <ModalTemplateCamera
        open={openLevelGauge}
        setOpen={setOpenLevelGauge}
        innerComponent={
          <CameraComponent
            setCloseModal={setOpenLevelGauge}
            id={3}
            capture={capture}
            webcamRef={webcamRef}
          />
        }
      />
      <ModalTemplateCamera
        open={openPhoto}
        setOpen={setOpenPhoto}
        innerComponent={
          <CameraComponent
            setCloseModal={setOpenPhoto}
            id={4}
            capture={capture}
            webcamRef={webcamRef}
          />
        }
      />
    </div>
  );
}
