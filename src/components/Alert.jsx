import React, { useContext } from "react";
import EcomContext from "../context/EcomContext";

function Alert() {
  const { alertInfo } = useContext(EcomContext);
  return (
    <div>
      {alertInfo.show && (
        <div
          className={`${
            alertInfo.type === "success" ? "bg-green-500" : "bg-red-500"
          } fixed top-0 z-[30] left-0 right-0 m-auto text-center p-3 max-w-xl translate-y-[20px] duration-500 text-white`}
        >
          {alertInfo.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
