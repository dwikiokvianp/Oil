import axios from "axios";
import Webcam from "react-webcam";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
import { useRef, useCallback } from "react";

export function CameraReact() {
  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const blobData = await (await fetch(imageSrc)).blob();

    const formData = new FormData();
    formData.append("images", blobData);
    const { data } = await axios.post(
      "http://localhost:1921/upload",
      formData,
      {
        headers: "multipart/form-data",
      }
    );
    console.log(data);
  }, [webcamRef]);
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/png"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
}
