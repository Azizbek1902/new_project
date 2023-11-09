import axios from "axios";
import { useState, useEffect } from "react";
import Config from "../../condig";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { CgMenu } from "react-icons/cg";
const Testlar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [baza, setBaza] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [pageLenght, setPageLenght] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(false);
  const [newData, setNewData] = useState({
    category: "",
    subCategory: "",
  });
  const [sendDate, setSendDate] = useState({
    category: "",
    subCategory: "",
    limit: 20,
    page: pageNum,
  });
  const [modal, setModal] = useState("d-none");
  const changeModal = (voite) => {
    setModal(voite);
  };
  const [sub, setSub] = useState([]);

  const [sub2, setSub2] = useState([]);

  const changeHandler = (e) => {
    if (e.target.name == "category") {
      let foo = data.filter((a) => {
        return a.parent == e.target.value;
      });
      setSub(foo);
    }
    setSendDate({ ...sendDate, [e.target.name]: e.target.value });
  };
  const changeHandler2 = (e) => {
    if (e.target.name == "category") {
      let foo = data.filter((a) => {
        return a.parent == e.target.value;
      });
      setSub2(foo);
    }
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fo = () => {
      axios
        .get(`${Config.URL}/categorys/all`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fo();
  }, []);

  const sendBack = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${Config.URL}/questions/filter`, sendDate)
      .then((res) => {
        setBaza(res?.data?.docs);
        setPageLenght(res?.data?.totalPages);
      })
      .catch((err) => {
        alert("Tizimda hatolik");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      // Excel fayldagi birinchi sayt
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      // JSONga o'tkazish
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      setQuestions(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const addTest = (e) => {
    setLoading(true);
    axios
      .post(`${Config.URL}/questions/many`, {
        ...newData,
        questions: questions,
      })
      .then((res) => {})
      .catch((err) => {
        alert("Testlar formati to'g'ri kemadi");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const DeleteQuestion = (id) => {
    setLoading(true);
    axios
      .delete(`${Config.URL}/questions/${id}`, {
        ...newData,
        questions: questions,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        alert("Ma'lumot o'chirishda hatolik");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const { register, handleSubmit } = useForm();
  const [modal2, setModal2] = useState("d-none");

  const changeModal2 = (voite) => {
    setModal2(voite);
  };

  const [pid, setPid] = useState("");
  const idSave = (id) => {
    setPid(id);
    setModal2("pht_wrap");
  };
  const handlePage = (num) => {
    setLoading(true);
    setPageNum(num);
    let data = {
      category: sendDate.category,
      subCategory: sendDate.subCategory,
      limit: sendDate.limit,
      page: num,
    };
    axios
      .post(`${Config.URL}/questions/filter`, data)
      .then((res) => {
        setBaza([...res?.data?.docs]);
        // setBaza(res?.data?.docs);
        setPageLenght(res?.data?.totalPages);
      })
      .catch((err) => {
        alert("Tizimda hatolik");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.file[0]);
    axios
      .post(`${Config.URL}/questions/addPhoto/${pid}`, formData)
      .then((res) => {
        changeModal2("d-none");
        let senddata = {
          category: sendDate.category,
          subCategory: sendDate.subCategory,
          limit: sendDate.limit,
          page: pageNum,
        };
        axios
          .post(`${Config.URL}/questions/filter`, senddata)
          .then((res) => {
            setBaza([...res?.data?.docs]);
            setPageLenght(res?.data?.totalPages);
          })
          .catch((err) => {
            alert("Tizimda hatolik");
            console.log(err);
          });
      })
      .catch((err) => {
        alert("Eror not upload");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const changeModal3 = (voite) => {
    setModal3(voite);
  };

  const [modal3, setModal3] = useState("d-none");
  const [rasm, setRasm] = useState(null);
  const Img = (id, path) => {
    setRasm({ ...rasm, id: id, path: path });
    setModal3("images_mod");
  };

  const DeleteImg = (id) => {
    setLoading(true);
    if (window.confirm("Delete Image")) {
      axios
        .delete(`${Config.URL}/questions/deleteimg/${id}`)
        .then(() => {
          changeModal2("d-none");
          let senddata = {
            category: sendDate.category,
            subCategory: sendDate.subCategory,
            limit: sendDate.limit,
            page: pageNum,
          };
          axios
            .post(`${Config.URL}/questions/filter`, senddata)
            .then((res) => {
              setBaza([...res?.data?.docs]);
              setPageLenght(res?.data?.totalPages);
            })
            .catch((err) => {
              alert("Tizimda hatolik");
              console.log(err);
            });
        })
        .catch((err) => {
          alert("Error not found");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Error not found");
      window.location.reload();
    }
    changeModal3("d-none");
  };
  let paginationArray = [];
  for (let i = 1; i <= pageLenght; i++) {
    paginationArray.push(i);
  }

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
    <div className="mt-5 asd">
      <div className={modal3}>
        <h1 onClick={() => changeModal3("d-none")}>
          <AiOutlineCloseCircle className="text-danger" />
        </h1>
        <div className="img_con">
          <img crossOrigin="anonymous" src={rasm?.path} alt="" />
        </div>
        <h1 className="text-danger" onClick={() => DeleteImg(rasm?.id)}>
          <AiFillDelete className="text-danger" />
        </h1>
      </div>
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
                navigate("/test");
                setOpenNavbar(false);
              }}
            >
              Testlar
            </h2>
            <button
              className="bg-white border border-0"
              onClick={() => handleClik()}
            >
              <CgMenu size={24} className=" text-info" />
            </button>
          </div>
          <h2 className=" text-info" onClick={() => navigate("/category")}>
            Bo'limlar
          </h2>
          <h2 className="mt-3 text-info" onClick={() => navigate("/user")}>
            Foydalanuvchi
          </h2>
          <h2 className="mt-3 text-info" onClick={() => navigate("/message")}>
            Habar jo'natish
          </h2>
        </div>
      </div>
      <div
        className="ico text-end my-3"
        onClick={() =>
          changeModal("d-inline cat_con d-flex justify-content-center")
        }
      >
        <HiOutlineDocumentAdd className="text-primary" />
      </div>
      <div className="questions_search">
        <form
          onSubmit={sendBack}
          className="d-flex justify-content-md-around align-items-center flex-column flex-md-row  gap-md-0  gap-3"
        >
          <select
            name="category"
            value={sendDate.category}
            onChange={changeHandler}
            className="form-select m-2"
            id=""
          >
            {[{ title: "Bo'lim tanlang", _id: "0" }]
              .concat(data)
              .filter((a) => {
                return a?.parent == null;
              })
              .map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.title}
                  </option>
                );
              })}
          </select>
          <select
            name="subCategory"
            value={sendDate.subCategory}
            onChange={changeHandler}
            className="form-select m-2"
            id=""
          >
            {[{ title: "Bo'lim tanlang", _id: "0" }]
              .concat(sub)
              .map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.title}
                  </option>
                );
              })}
          </select>
          <button className="btn btn-primary m-2">Qidirish</button>
        </form>
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
      <div className="res_question my-5">
        {baza.length !== 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <td scope="col">#</td>
                <td scope="col">Savol</td>
                <td scope="col">Variant-1</td>
                <td scope="col">Variant-2</td>
                <td scope="col">Variant-3</td>
                <td scope="col">Variant-4</td>
                <td scope="col">To'g'ri javob</td>
                <td colSpan={2}></td>
              </tr>
            </thead>
            <tbody>
              {baza.map((item, index) => {
                return (
                  <tr key={index}>
                    <td scope="row">
                      {pageNum > 1 ? (
                        <>{pageNum * 20 - 19 + index}</>
                      ) : (
                        <>{index + 1}</>
                      )}
                      {item.photo ? (
                        <img
                          className="img_ich"
                          src={item.photo}
                          onClick={() => Img(item._id, item.photo)}
                          crossOrigin="anonymous"
                          width={100}
                          height={100}
                        />
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{item.question}</td>
                    <td>{item.option1}</td>
                    <td>{item.option2}</td>
                    <td>{item.option3}</td>
                    <td>{item.option4}</td>
                    <td>{item.answer}</td>
                    <td className="d-flex flex-column">
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => DeleteQuestion(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => idSave(item._id)}
                        className="btn btn-success mx-2"
                      >
                        Image
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>

      <div className={modal}>
        <div className="cat_conten text-center">
          <h1 onClick={() => changeModal("d-none")}>
            <AiOutlineCloseCircle className="text-danger" />
          </h1>
          <form className="text-center" onSubmit={addTest}>
            <select
              name="category"
              value={newData.category}
              onChange={changeHandler2}
              className="form-select m-2"
              id=""
            >
              {[{ title: "Bo'lim tanlang", _id: "0" }]
                .concat(data)
                .filter((a) => {
                  return a?.parent == null;
                })
                .map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.title}
                    </option>
                  );
                })}
            </select>
            <select
              name="subCategory"
              value={newData.subCategory}
              onChange={changeHandler2}
              className="form-select m-2"
              id=""
            >
              {[{ title: "Mavzuni tanlang", _id: "0" }]
                .concat(sub2)
                .map((item, index) => {
                  return (
                    <option key={index} value={item._id}>
                      {item.title}
                    </option>
                  );
                })}
            </select>
            <input
              type="file"
              className="form-control"
              onChange={handleFileUpload}
            />
            <button className="btn btn-primary m-3">AddTests</button>
          </form>
        </div>
      </div>

      {/* Modal shu yerga yozorasz */}
      <div className={modal2}>
        <div className="mod_photo text-center">
          <h1 onClick={() => changeModal2("d-none")}>
            <AiOutlineCloseCircle className="text-danger" />
          </h1>
          <h3>Rasm yuklash</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="file"
              className="form-control my-3"
              {...register("file")}
            />
            <input
              type="submit"
              className="btn btn-primary"
              value="Send"
              readOnly
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Testlar;
