import axios from "axios";
import { useState } from "react";
import Config from "../../condig";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { AiOutlineCloseCircle } from "react-icons/ai";

const User = () => {
  const navigate = useNavigate();
  const [pageLenght, setPageLenght] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [momentDate, setMomentDate] = useState(moment(new Date()));
  const [modalData, setModalData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [docs, setDocs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState("d-none");
  const [data, setData] = useState({
    phone: "",
    limit: 20,
    page: pageNum,
  });
  const [user, setUser] = useState([]);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const SearchFunction = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${Config.URL}/users/phone`, data)
      .then((res) => {
        if (res.data.length !== 0) {
          setUser(res?.data?.docs);
          setDocs(res?.data?.totalDocs);
          setPageLenght(res?.data?.totalPages);
        } else {
          alert("Bunday foydalanuvchi topilmadi");
        }
      })
      .catch((err) => {
        alert("Tizimda hatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeUser = (item, check) => {
    setModalData(item);
    changeModal("d-inline cat_con d-flex justify-content-center");
  };
  let paginationArray = [];
  for (let i = 1; i <= pageLenght; i++) {
    paginationArray.push(i);
  }
  const handlePage = (num) => {
    setLoading(true);
    setPageNum(num);
    let sendData = {
      category: data.category,
      subCategory: data.subCategory,
      limit: data.limit,
      page: num,
    };
    axios
      .post(`${Config.URL}/users/phone`, sendData)
      .then((res) => {
        if (res.data.length !== 0) {
          setUser(res?.data?.docs);
          setPageLenght(res?.data?.totalPages);
          setDocs(res?.data?.totalDocs);
        } else {
          alert("Bunday foydalanuvchi topilmadi");
        }
      })
      .catch((err) => {
        alert("Tizimda hatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleNext = () => {
    if (pageLenght > pageNum) {
      setPageNum(pageNum + 1);
    }
  };
  const handlePrevious = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };
  const handleData = (date) => {
    setStartDate(date);
    setMomentDate(moment(date).format("YYYY-MM-DD"));
  };
  const handleTahrirlash = (data) => {
    axios
      .put(`${Config.URL}/users/${data._id}`, {
        payment: data.active,
        endDate: momentDate,
      })
      .then((res) => {
        if (data.active) {
          alert("Foydalanuvchiga ruhsat berildi");
        } else {
          alert("Foydalanuvchiga cheklov qo'yildi");
        }
        window.location.reload();
      })
      .catch((err) => {
        alert("Xatolik yuz berdi");
      });
    setOpenModal("d-none");
  };
  const changeModal = (stle) => {
    setOpenModal(stle);
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
    <div className="my-5">
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
      <div className="user_search">
        <h1>Foydalanuvchilarni qidirish</h1>
        <div className="search_item">
          <form
            onSubmit={SearchFunction}
            className="d-flex justify-content-center"
          >
            <input
              className="form-control m-3 w-50"
              type="text"
              name="phone"
              value={data.phone}
              onChange={changeHandler}
              placeholder="901234567"
            />
            <button className="btn m-3 btn-primary">Search</button>
          </form>
        </div>
      </div>
      {pageLenght >= 2 ? (
        <div className="d-flex mt-3 justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePrevious()}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {paginationArray.map((item, ind) => {
                return (
                  <li className="page-item" key={ind + 1}>
                    <a
                      className="page-link "
                      href="#"
                      onClick={() => handlePage(item)}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}

              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handleNext()}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <></>
      )}
      <div className="user row d-flex mx-2 gap-3 justify-content-center">
        {user.length !== 0 ? (
          <h1 className="ps-5">Foydalanuvchilar soni : {docs}</h1>
        ) : (
          ""
        )}
        {user.map((item, index) => {
          return (
            <div className="border rounded cardW p-4 col-md-3" key={index}>
              <h5>
                F.I.SH : <b>{item.username}</b>
              </h5>
              <h5>
                Telefon raqami : <b>{item.phone}</b>
              </h5>
              <h5>
                Manzil : <b>{item.address}</b>
              </h5>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={item.payment}
                  // {item.payment?"checked":""}
                />
                <label
                  className="form-check-label"
                  for="flexSwitchCheckChecked"
                >
                  Botdan foydalanish ruxsati
                </label>
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <button
                  onClick={() => changeUser(item, true)}
                  className="btn btn-primary mx-2"
                >
                  Tahrirlash
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={openModal}>
        <div className="modalUser">
          <h1 onClick={() => changeModal("d-none")} className="closeBtn">
            <AiOutlineCloseCircle className="text-danger" />
          </h1>
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            F.I.SH : <b>{modalData?.username}</b>
          </h1>
          <h5 className="mt-3">
            Telefon raqami : <b>{modalData?.phone}</b>
          </h5>
          <h5 className="mt-3">
            Manzil : <b>{modalData?.address}</b>
          </h5>
          <div className="form-check mt-3 mb-3 form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={modalData.payment}
              // {item.payment?"checked":""}
            />
            <label className="form-check-label" for="flexSwitchCheckChecked">
              Botdan foydalanish ruxsati
            </label>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleData(date)}
          />
          <button
            type="button"
            className="btn ms-3 btn-primary"
            onClick={() => handleTahrirlash(modalData)}
          >
            Tahrirlash
          </button>
        </div>
      </div>
      {/* <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                F.I.SH : <b>{modalData?.username}</b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>
                Telefon raqami : <b>{modalData?.phone}</b>
              </h5>
              <h5>
                Manzil : <b>{modalData?.address}</b>
              </h5>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={modalData.payment}
                  // {item.payment?"checked":""}
                />
                <label
                  className="form-check-label"
                  for="flexSwitchCheckChecked"
                >
                  Botdan foydalanish ruxsati
                </label>
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => handleData(date)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="btn btn-primary"
                onClick={() => handleTahrirlash(modalData)}
              >
                Tahrirlash
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default User;
