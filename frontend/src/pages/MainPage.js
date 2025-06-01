import React from "react";
import MainCon from "../containers/MainCon";

function MainPage() {
  const accessToken = localStorage.getItem("accessToken");
  return (
    <>
    <MainCon accessToken={accessToken}/>
    </>
    );
}
export default MainPage;