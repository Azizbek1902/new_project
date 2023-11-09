import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import Config from "../../condig";
import { useNavigate } from "react-router-dom";
import { CgMenu } from "react-icons/cg";

const Category = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [openNavbar, setOpenNavbar] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectTitle, setSelectTitle] = useState("Bo'limdi tanlang");
  const [modal, setModal] = useState("d-none");
  const [loading, setLoading] = useState(false);

  const [addData, setAddData] = useState({
    title: "",
    parent: "",
  });

  const changeHandler = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fo = () => {
      axios
        .get(`${Config.URL}/categorys`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fo();
  }, []);
  const subBaza = (id) => {
    axios
      .get(`${Config.URL}/categorys/sub/${id}`)
      .then((res) => {
        setSubData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeModal = (voite) => {
    setModal(voite);
  };
  const sendData = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${Config.URL}/categorys`, addData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const DeleteCategory = (id) => {
    setLoading(true);
    if (window.confirm("Delete the item?")) {
      axios
        .delete(`${Config.URL}/categorys/${id}`, addData)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
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
    <div className="wrap mt-5">
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
                navigate("/category");
                setOpenNavbar(false);
              }}
            >
              Bo'limlar
            </h2>
            <button
              className="bg-white border border-0"
              onClick={() => handleClik()}
            >
              <CgMenu size={24} className="text-info"/>
            </button>
          </div>
          <h2 className=" text-info" onClick={() => navigate("/user")}>
            Foydalanuvchi
          </h2>
          <h2 className="mt-3 text-info" onClick={() => navigate("/test")}>
            Testlar
          </h2>
          <h2 className="mt-3 text-info" onClick={() => navigate("/message")}>
            Habar jo'natish
          </h2>
        </div>
      </div>
      <div className="category_content text-center mt-5">
        <div
          className="ico"
          onClick={() =>
            changeModal("d-inline cat_con d-flex justify-content-center")
          }
        >
          <HiOutlineDocumentAdd className="text-primary" />
        </div>
        <div className="cat d-flex flex-md-row container flex-column justify-content-around">
          <div className="left">
            <h1>Bo'limlar</h1>
            <div className="d-block d-md-none">
              <div className="d-flex justify-content-center">
                <div
                  onClick={() => {
                    setSelectOpen(!selectOpen);
                  }}
                  style={{ height: "50px" }}
                  className={`border px-2 border-secondary w-100 d-flex justify-content-between ${
                    selectOpen
                      ? "border-bottom-0 rounded-bottom-0"
                      : " rounded-2"
                  } align-items-center`}
                >
                  <h5>{selectTitle}</h5>
                  <button className="bg-white border-0">
                    <BiChevronDown size={30} />
                  </button>
                </div>
              </div>
              {selectOpen ? (
                <div className="d-flex mb-4 justify-content-center">
                  <div
                    className={`overflow-y-scroll w-100 border px-2 border-secondary pt-2 ${
                      selectOpen ? "border-top-0 rounded-top-0" : " rounded-2"
                    }`}
                    style={{
                      minHeight: "45vh",
                      maxHeight: "100%",
                      transition: "0.5s",
                      marginTop: selectOpen ? "-15px" : "",
                    }}
                  >
                    {data.map((item, index) => (
                      <div
                        onClick={() => {
                          setSelectOpen(false);
                          setSelectOpen(false);
                          setSelectTitle(item.title);
                        }}
                        className=" w-100 mb-1 d-flex justify-content-between align-items-center"
                      >
                        <h5 className="" onClick={() => subBaza(item._id)}>
                          {index + 1}. {item.title}
                        </h5>
                        <button
                          className="bg-white border-0"
                          onClick={() => DeleteCategory(item._id)}
                        >
                          <AiFillDelete className="text-danger" size={30} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="d-md-block d-none ">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    <h3
                      className="btn btn-success d-inline-block"
                      onClick={() => subBaza(item._id)}
                    >
                      {index + 1}. {item.title}
                    </h3>
                    <span
                      className="del"
                      onClick={() => DeleteCategory(item._id)}
                    >
                      <AiFillDelete className="text-danger" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="right mt-2">
            <h1>Mavzular</h1>
            {subData.map((item, index) => {
              return (
                <div key={index}>
                  <h3 className="btn btn-warning d-inline-block">
                    {index + 1}. {item.title}
                  </h3>
                  <span
                    className="del"
                    onClick={() => DeleteCategory(item._id)}
                  >
                    <AiFillDelete className="text-danger" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={modal}>
          <div className="cat_conten">
            <h1 onClick={() => changeModal("d-none")}>
              <AiOutlineCloseCircle className="text-danger" />
            </h1>
            <form className="text-center" onSubmit={sendData}>
              <input
                className="form-control m-3"
                type="text"
                name="title"
                placeholder="Title"
                value={addData.title}
                onChange={changeHandler}
              />
              <select
                className="form-select m-3"
                name="parent"
                value={addData.parent}
                onChange={changeHandler}
              >
                {[{ title: "Bo'lim tanlang", _id: "null" }]
                  .concat(data)
                  .map((item, index) => {
                    return (
                      <option key={index} value={item._id}>
                        {item.title}
                      </option>
                    );
                  })}
              </select>
              <button className="btn btn-primary m-3">AddCategory</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
