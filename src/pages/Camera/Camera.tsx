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
import {
  getProofByTransactionId,
  getTransactionById,
} from "../../api/transaction.service.api.ts";

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
      } else {
        console.log(data.data.status);
      }
    },
  });

  const { data: PhotoProof } = useQuery({
    queryKey: ["proof", orderId],
    queryFn: () => getProofByTransactionId(Number(orderId)),
    onSuccess: (data) => {
      setPicture((prevPicture) => {
        return prevPicture.map((item) => {
          if (item.id === 1) {
            return { ...item, photo: data.data.photo_ktp_url };
          } else if (item.id === 2) {
            return { ...item, photo: data.data.photo_orang_url };
          } else if (item.id === 3) {
            return { ...item, photo: data.data.photo_tangki_url };
          } else {
            return item;
          }
        });
      });
      console.log(picture, "ini dari setpicture");
    },
  });

  console.log(TransactionDetail, "ini dari transaction detail");
  console.log(PhotoProof, "ini dari photo proof");
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
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <DetailOrder id={Number(orderId)} />
      </div>
      <main>
        <div className="flex justify-center lg:justify-start lg:ml-16">
          <div className="grid grid-cols-3 gap-5">
            {!picture[0].photo ? (
              <AddPhoto setOpen={setOpenPetugas} title={"Foto Petugas"} />
            ) : (
              <div>
                <p className="text-center text-xs font-bold  mt-6 lg:mt-0">
                  Photo Petugas
                </p>
                <img
                  onClick={() => {
                    setOpenPetugas(true);
                  }}
                  className="mt-2 lg:mt-0 rounded object-cover"
                  src={picture[0].photo}
                  alt={picture[0].name}
                />
              </div>
            )}
            {!picture[1].photo ? (
              <AddPhoto setOpen={setOpenKtp} title={"Foto KTP"} />
            ) : (
              <div>
                <p className="text-center text-xs font-bold  mt-6 lg:mt-0">
                  Photo KTP
                </p>
                <img
                  className="mt-2 lg:mt-0 rounded object-cover"
                  onClick={() => {
                    setOpenKtp(true);
                  }}
                  src={picture[1].photo}
                  alt={picture[1].name}
                />
              </div>
            )}
            {!picture[2].photo ? (
              <AddPhoto setOpen={setOpenTangki} title={"Foto Tangki"} />
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
                  src={picture[2].photo}
                  alt={picture[2].name}
                />
              </div>
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
            className="bg-[#D9D9D9] rounded p-2 px-4 hover:bg-slate-500 hover:text-white hover:scale-105 duration-100 ml-0 lg:ml-14 mt-6"
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
