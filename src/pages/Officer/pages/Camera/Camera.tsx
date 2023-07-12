import { useParams } from "react-router-dom";
import { DetailOrder } from "../../../../components/templates/DetailOrder.tsx";
import { CameraComponent } from "../../../../components/organisms/Camera.tsx";
import { AddPhoto } from "../../../../components/molecules/AddPhoto.tsx";
import React, { RefObject, useCallback, useRef, useState } from "react";
import { CameraDetail, CameraForm } from "./camera.constant.ts";
import Webcam from "react-webcam";
import { dataURLtoFile } from "../../../../utils/camera.utils.ts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addNotification } from "../../../../utils/notification.utils.ts";
import {
  getProofByTransactionId,
  getTransactionById,
} from "../../../../api/transaction.service.api.ts";
import ModalTemplateCamera from "../../../../components/atoms/ModalTemplateCamera.tsx";
import SignatureCanvas from "react-signature-canvas";
import { HeaderOfficerTitle } from "../../../../components/molecules/HeaderOfficerTitle.tsx";
import { uploadProof } from "../../../../api/proof.api.service.ts";

export function CameraReact() {
  const { orderId } = useParams<{ orderId: string }>();
  const [openSignature, setOpenSignature] = useState(false);
  const [picture, setPicture] = useState<CameraDetail[]>(CameraForm);
  const [openPetugas, setOpenPetugas] = useState(false);
  const [openKtp, setOpenKtp] = useState(false);
  const [openTangki, setOpenTangki] = useState(false);
  const queryClient = useQueryClient();
  const [isTransactionDone, setIsTransactionDone] = useState(false);
  const [signature, setSignature] = useState<SignatureCanvas>();
  const [signatureUrl, setSignatureUrl] = useState("");
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

  useQuery({
    queryKey: ["detail-order", orderId],
    queryFn: () => getTransactionById(Number(orderId)),
    onSuccess: (data) => {
      if (data.data.status === "done") {
        setIsTransactionDone(true);
      }
    },
  });

  const { data: Proof } = useQuery({
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
    },
  });

  const mutation = useMutation({
    mutationFn: uploadProof,
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

    formData.set("signature", orderId as string);
    mutation.mutate(formData);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 m-4">
      <HeaderOfficerTitle title={"Upload Proof"} />
      <div>
        <DetailOrder id={Number(orderId)} />
      </div>
      <main>
        <div className="flex justify-center lg:justify-start lg:ml-16">
          <div className="grid grid-cols-3 gap-2">
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
            {!signatureUrl ? (
              <div className="col-span-3">
                <AddPhoto title={"Signature"} setOpen={setOpenSignature} />
              </div>
            ) : (
              <div className="col-span-3 border-2 rounded-xl">
                <p className="text-center text-md font-bold  mt-6 lg:mt-0">
                  Signature
                </p>
                <img
                  onClick={() => {
                    setOpenSignature(true);
                  }}
                  className="mt-2 lg:mt-0 rounded object-cover col-span-3"
                  src={signatureUrl}
                  alt="signature"
                />
              </div>
            )}
          </div>
        </div>
        {isTransactionDone ? (
          <button
            className={`bg-[#D9D9D9] w-full rounded p-2 px-4 hover:bg-slate-500 hover:text-white hover:scale-105 duration-100 ml-0 lg:ml-14 mt-6`}
            type="reset"
          >
            <a href={Proof?.data.invoice_url} className="href">
              Generate Invoice
            </a>
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
                uploadFile(picture);
              }
            }}
            className={`bg-[#D9D9D9] w-full rounded p-2 px-4 hover:bg-slate-500 hover:text-white hover:scale-105 duration-100 ml-0 lg:ml-14 mt-6`}
          >
            Upload Bukti
          </button>
        )}
      </main>

      <ModalTemplateCamera
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
      <ModalTemplateCamera
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
      <ModalTemplateCamera
        open={openSignature}
        setOpen={setOpenSignature}
        innerComponent={
          <InnerSignature
            signature={signature as SignatureCanvas}
            setSignature={setSignature}
            setUrl={setSignatureUrl}
            setOpenSignature={setOpenSignature}
          />
        }
      />
      <ModalTemplateCamera
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

function InnerSignature({
  signature,
  setSignature,
  setUrl,
  setOpenSignature,
}: {
  signature: SignatureCanvas;
  setSignature: React.Dispatch<SignatureCanvas>;
  setUrl: React.Dispatch<string>;
  setOpenSignature: React.Dispatch<boolean>;
}) {
  return (
    <div>
      <div className="h-[20vh]">
        <h1 className="font-semibold text-center">Sign Your Signature</h1>
        <div className="h-[150px] border-2">
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 400, height: 150, className: "sigCanvas" }}
            ref={(ref) => {
              setSignature(ref as SignatureCanvas);
            }}
          />
        </div>
      </div>
      <div>
        <button
          className="bg-[#D9D9D9] w-full rounded p-2 px-4 hover:bg-slate-500 hover:text-white hover:scale-105 duration-100 ml-0 lg:ml-14 mt-6"
          onClick={() => {
            setUrl(signature.toDataURL());
            setOpenSignature(false);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
