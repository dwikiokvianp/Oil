import Webcam from "react-webcam";
import { useCallback, useState, useRef } from "react";
import { AiFillAlert, AiFillCamera } from "react-icons/ai";
import { useEffect } from "react";
import Modal from "../../components/Modal.tsx";
import { useMutation } from "react-query";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
export function CameraReact() {
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState([
    {
      id: 1,
      name: "photo_ktp",
      photo: "",
    },
    {
      id: 2,
      name: "photo_orang",
      photo: "",
    },
    {
      id: 3,
      name: "photo_tangki",
      photo: "",
    },
  ]);
  const [id, setId] = useState(1);
  const webcamRef: any = useRef(null);
  const capture = useCallback(
    (id: number) => {
      const pictureSrc = webcamRef.current.getScreenshot();
      setPicture((prevPicture) =>
        prevPicture.map((item) =>
          item.id === id ? { ...item, photo: pictureSrc } : item
        )
      );
      console.log(picture);
    },
    [picture]
  );
  useEffect(() => {
    console.log(id);
  }, [id]);

  const uploadPhotosMutation = useMutation(
    (photos: Blob[]) => {
      const formData = new FormData();
      photos.forEach((photo) => {
        formData.append("files", photo, "photo.jpg");
      });

      return fetch("http://13.250.44.129:8081/api/trans", {
        method: "POST",
        body: formData,
      });
    },
    {
      onMutate: () => {
        console.log("onMutate");
      },
      onSuccess: (data) => {
        console.log("onSuccess");
        console.log(data);
      },
      onError: (error) => {
        console.log("onError");
        console.log(error);
      },
    }
  );

  const handleUpload = () => {
    const photosToUpload = picture
      .map((item) => item.photo)
      .filter((photo) => photo !== null);

    if (photosToUpload.length === 3) {
      const blobPhotos = photosToUpload.map((photo) => {
        const base64Data = photo.replace(/^data:image\/jpeg;base64,/, "");
        return base64ToBlob(base64Data, "image/jpeg");
      });

      uploadPhotosMutation.mutate(blobPhotos);
    } else {
      console.log("Please capture all three photos before uploading.");
    }
  };

  const base64ToBlob = (base64Data: string, contentType: string) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([byteArrays], { type: contentType });
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
      <button
        onClick={(e) => {
          e.preventDefault();
          capture(id);
          setId(id + 1);
        }}
      >
        <div className="w-screen flex flex-col justify-center items-center">
          <div className="mt-2 hover:bg-blue-800  flex justify-center items-center bg-blue-400 text-white px-2 py-1 rounded gap-2">
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
              Preview Photo
              <AiFillAlert />
            </div>
          ) : null}
        </div>
        <button
          onClick={() => {
            handleUpload();
          }}
        >
          Upload
        </button>
        <Modal data={picture} open={open} setOpen={setOpen} />
      </button>
    </div>
  );
}
