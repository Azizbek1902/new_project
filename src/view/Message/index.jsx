import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../condig";
import { CgMenu } from "react-icons/cg";

function Message() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [openNavbar, setOpenNavbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const sendData = (e) => {
    setLoading(true);
    e.preventDefault();
    let data = {
      message: message,
    };
    axios
      .post(`${Config.URL}/users/sendMessage`, data)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setMessage("");
  };
  const handleClik = () => {
    setOpenNavbar(!openNavbar);
  };
  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="mt-5">
      
      <div className="nav navbarItem mb-5 flex-column flex-md-row align-items-start gap-md-0  gap-3 justify-content-md-around justify-content-center ms-md-0 ms-5">
        <div
          className="menu_item btn btn-primary"
          onClick={() => navigate("/category")}
        >
          Bo'limlar
        </div>
        <div
          className="menu_item btn btn-primary"
          onClick={() => navigate("/user")}
        >
          Foydalanuvchi
        </div>
        <div
          className="menu_item btn btn-primary"
          onClick={() => navigate("/test")}
        >
          Testlar
        </div>
        <div
          className="menu_item btn btn-primary"
          onClick={() => navigate("/message")}
        >
          Habar jo'natish
        </div>
      </div>
      <div className="d-md-none align-items-center d-flex justify-content-center mb-3 my">
        <div
          style={{ height: openNavbar ? "200px" : "50px", transition: "0.5s" }}
          className="bg-white overflow-hidden rounded-2 w-75 border border-secondary px-4"
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <h2
              className="pt-2 text-info"
              onClick={() => {
                navigate("/message");
                setOpenNavbar(false);
              }}
            >
              Habar jo'natish
            </h2>
            <button
              className="bg-white border border-0"
              onClick={() => handleClik()}
            >
              <CgMenu size={24} className="text-info"/>
            </button>
          </div>
          <h2 className=" text-info" onClick={() => navigate("/category")}>
            Bo'limlar
          </h2>
          <h2 className="mt-3 text-info" onClick={() => navigate("/test")}>
            Testlar
          </h2>
          <h2 className="mt-3 text-info" onClick={() => navigate("/user")}>
            Foydalanuvchi
          </h2>
        </div>
      </div>
      <div className="d-flex justify-content-center w-100 align-items-center message">
        <form className="rounded p-3 shadow" onSubmit={sendData}>
          <h3 className="text-center my-2 mb-3">Habar jo'natish</h3>
          <textarea
            className="text-black ps-2 rounded pt-2"
            name="message"
            id="message"
            value={message}
            onChange={handleChange}
            cols="41"
            placeholder="Message"
            rows="2"
          ></textarea>
          <div className="d-flex justify-content-center mt-2">
            <button className="btn btn-primary">Jo'natish</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Message;
