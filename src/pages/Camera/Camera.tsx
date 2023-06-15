import { useParams } from "react-router-dom";
import { DetailOrder } from "../../components/templates/DetailOrder.tsx";
import { CameraComponent } from "../../components/organisms/Camera.tsx";
import { AddPhoto } from "../../components/molecules/AddPhoto.tsx";
import ModalTemplate from "../../components/atoms/ModalTemplate.tsx";
import { RefObject, useCallback, useRef, useState } from "react";
import { CameraDetail, CameraForm } from "./camera.constant.ts";
import Webcam from "react-webcam";
import { dataURLtoFile } from "../../utils/camera.utils.ts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { addNotification } from "../../utils/notification.utils.ts";
import { getTransactionById } from "../../api/transaction.service.api.ts";

export function CameraReact() {
  const { orderId } = useParams<{ orderId: string }>();
  const [picture, setPicture] = useState<CameraDetail[]>(CameraForm);
  const [openPetugas, setOpenPetugas] = useState(false);
  const [openKtp, setOpenKtp] = useState(false);
  const [openTangki, setOpenTangki] = useState(false);
  const webcamRef: RefObject<Webcam> = useRef<Webcam>(null);
  const queryClient = useQueryClient();
  const [isTransactionDone, setIsTransactionDone] = useState(false);
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

  const { data: TransactionDetail } = useQuery({
    queryKey: ["detail-order", orderId],
    queryFn: () => getTransactionById(Number(orderId)),
    onSuccess: (data) => {
      if (data.data.status === "done") {
        setIsTransactionDone(true);
        console.log("done");
      } else {
        console.log(data.data.status);
        console.log("halah");
      }
    },
  });

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
      addNotification("info", "Uploading your transaction proof");
    },
    onSuccess: () => {
      addNotification("success", "Transaction uploaded successfully").then(
        () => {
          setIsTransactionDone(true);
          queryClient.invalidateQueries(["detail-order", orderId]);
        }
      );
    },
    onError: () => {
      addNotification("error", "Failed to upload transaction");
    },
  });
  const uploadFile = (picture: CameraDetail[]) => {
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
    <div className="grid grid-cols-2">
      <div>
        <DetailOrder id={Number(orderId)} />
      </div>
      <main>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-5">
            {!picture[0].photo ? (
              <AddPhoto setOpen={setOpenPetugas} title={"Foto Petugas"} />
            ) : (
              <img
                onClick={() => {
                  setOpenPetugas(true);
                }}
                className="rounded w-40 h-40"
                src={picture[0].photo}
                alt={picture[0].name}
              />
            )}
            {!picture[1].photo ? (
              <AddPhoto setOpen={setOpenKtp} title={"Foto KTP"} />
            ) : (
              <img
                className="rounded w-40 h-40 hover:scale-105 hover:duration-100"
                onClick={() => {
                  setOpenKtp(true);
                }}
                src={picture[1].photo}
                alt={picture[1].name}
              />
            )}
            {!picture[2].photo ? (
              <AddPhoto setOpen={setOpenTangki} title={"Foto Tangki"} />
            ) : (
              <>
                <img
                  onClick={() => {
                    setOpenTangki(true);
                  }}
                  className="rounded w-40 h-40"
                  src={picture[2].photo}
                  alt={picture[2].name}
                />
              </>
            )}
          </div>
        </div>
        {isTransactionDone ? (
          <button
            className="bg-[#D9D9D9] rounded p-2 px-4 hover:bg-slate-500 hover:text-white hover:scale-105 duration-100 ml-14 mt-6"
            type="reset"
          >
            Generate Invoice
          </button>
        ) : (
          <button
            onClick={() => {
              if (
                picture[0].photo === "" ||
                picture[1].photo === "" ||
                picture[2].photo === ""
              ) {
                addNotification("error", "Please upload all photos");
              } else {
                console.log("masuk");
                uploadFile(picture);
              }
            }}
            className="bg-[#D9D9D9] rounded p-2 px-4 hover:bg-slate-500 hover:text-white hover:scale-105 duration-100 ml-14 mt-6"
          >
            Upload Foto
          </button>
        )}
      </main>
      <ModalTemplate
        open={openPetugas}
        setOpen={setOpenPetugas}
        innerComponent={
          <CameraComponent
            setCloseModal={setOpenPetugas}
            id={1}
            capture={capture}
            webcamRef={webcamRef}
          />
        }
      />
      <ModalTemplate
        open={openKtp}
        setOpen={setOpenKtp}
        innerComponent={
          <CameraComponent
            setCloseModal={setOpenKtp}
            id={2}
            capture={capture}
            webcamRef={webcamRef}
          />
        }
      />
      <ModalTemplate
        open={openTangki}
        setOpen={setOpenTangki}
        innerComponent={
          <CameraComponent
            setCloseModal={setOpenTangki}
            id={3}
            capture={capture}
            webcamRef={webcamRef}
          />
        }
      />
    </div>
  );
}
