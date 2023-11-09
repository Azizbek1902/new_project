import { CgMenu } from "react-icons/cg";
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
  const [openNavbar, setOpenNavbar] = useState(false);

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

  const changeUser = (item) => {
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
    setLoading(true);
    axios
      .put(`${Config.URL}/users/${data._id}`, {
        payment: data.active,
        endDate: momentDate,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
    setOpenModal("d-none");
  };
  const changeModal = (stle) => {
    setOpenModal(stle);
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
    <div className="my-5">
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
                navigate("/user");
                setOpenNavbar(false);
              }}
            >
              Foydalanuvchi
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
          <h2 className="mt-3 text-info" onClick={() => navigate("/message")}>
            Habar jo'natish
          </h2>
        </div>
      </div>
      <div className="user_search">
        <h1>Foydalanuvchilarni qidirish</h1>
        <div className="search_item">
          <form
            onSubmit={SearchFunction}
            className="d-flex flex-column flex-md-row align-items-center justify-content-center"
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
      <div className="user row rowGap">
        {user.length !== 0 ? (
          <h1 className="ps-2 ps-md-5">Foydalanuvchilar soni : {docs}</h1>
        ) : (
          ""
        )}
        {user.map((item, index) => {
          return (
            <div
              className="border rounded cardW p-4 col-12 col-sm-6 col-md-4 col-lg-3"
              key={index}
            >
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
              <h5>
                Sana : <b>{item.endDate}</b>
              </h5>
              <div className="mt-3 d-flex justify-content-center">
                <button
                  onClick={() => changeUser(item)}
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
          <h5>
            Sana : <b>{modalData.endDate}</b>
          </h5>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleData(date)}
          />
          <button
            type="button"
            className="btn mt-md-0 mt-2 ms-3 btn-primary"
            onClick={() => handleTahrirlash(modalData)}
          >
            Tahrirlash
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
