import React from "react";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className={style.errorPage}>
      <h2 className={style.errorPage_title}>404</h2>
      <button
        onClick={() => navigate("/", { replace: true })}
        className={style.errorPage_btn}
      >
        GO BACK
      </button>
    </div>
  );
}
