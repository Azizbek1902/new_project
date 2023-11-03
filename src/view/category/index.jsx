import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { AiOutlineCloseCircle, AiFillDelete } from "react-icons/ai";
import Config from "../../condig";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [subData, setSubData] = useState([]);
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
        alert("Yangi ma'lumot qo'shildi");
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
    if (window.confirm("Delete the item?")) {
      axios
        .delete(`${Config.URL}/categorys/${id}`, addData)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
    <div className="wrap mt-5">
      <div className="nav d-flex justify-content-around">
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
      <div className="category_content text-center mt-5">
        <div
          className="ico"
          onClick={() =>
            changeModal("d-inline cat_con d-flex justify-content-center")
          }
        >
          <HiOutlineDocumentAdd className="text-primary" />
        </div>
        <div className="cat d-flex justify-content-around">
          <div className="left">
            <h1>Bo'limlar</h1>
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
          <div className="right">
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
