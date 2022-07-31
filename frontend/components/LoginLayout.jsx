import React from "react";

export default function LoginLayout(props) {
  const { children } = props;
  return (
    <div className="flex bg-background items-center justify-center w-screen h-screen relative">
      <div className="flex w-[95%] min-h-[85%] md:w-[65%] md:h-[60%] bg-white rounded-t-lg md:rounded-lg shadow-lg absolute mx-auto top-[15%] md:relative ">
        {children}
      </div>
    </div>
  );
}
