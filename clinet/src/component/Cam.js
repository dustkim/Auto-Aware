import React, { useRef, useEffect } from "react";

const Cam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("error: ", error);
      }
    };

    startCam();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let stream = videoRef.current.srcObject;
        let tracks = stream.getTracks();

        tracks.forEach((tracks) => {
          tracks.stop();
        });
      }
    };
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", zIndex: 10 }}>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default Cam;
