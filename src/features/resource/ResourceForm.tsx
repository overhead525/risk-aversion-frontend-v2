import React from "react";
import { useDispatch } from "react-redux";
import { retrieveSimulationImage } from "./resourceSlice";

const ResourceForm: React.FC = () => {
  const dispatch = useDispatch();

  const handleGetImages = async () => {
    const { accessToken } = JSON.parse(
      localStorage.getItem("persist:authRoot")!
    );

    await dispatch(
      retrieveSimulationImage(
        accessToken,
        "b5e83578-6f28-4d3f-82ea-ed3aeb27fa0b"
      )
    );
  };

  return (
    <div>
      <button onClick={handleGetImages}>Get My Images</button>
    </div>
  );
};

export default ResourceForm;
