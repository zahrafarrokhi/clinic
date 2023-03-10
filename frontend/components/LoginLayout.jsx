import React from "react";

export default function LoginLayout(props) {
  const { children } = props;
  return (
    <div className="flex bg-loginBg items-center justify-center w-screen h-screen relative">
      <div className="flex w-[95%] min-h-[80%]  md:w-[65%] md:min-h-[60%] bg-white rounded-t-3xl md:rounded-3xl shadow-lg absolute mx-auto top-[20%] md:top-0 md:relative ">
        {children}
      </div>
    </div>
  );
}
