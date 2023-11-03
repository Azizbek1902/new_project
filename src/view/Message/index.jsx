import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Config from "../../condig";

function Message() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
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
  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div class="loader"></div>
      </div>
    );
  }
  return (
    <div className="mt-5">
      <div className="nav mb-5 d-flex justify-content-around">
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
      <div className="d-flex justify-content-center w-100 align-items-center message">
        <form className="w-25 rounded p-3 shadow" onSubmit={sendData}>
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
