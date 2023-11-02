import { useState } from "react"
import Config from '../../condig'
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        login: '',
        password: ''
    })
  
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const sendData = async (e) => {
        e.preventDefault()
        axios.post(`${Config.URL}/admin` , data)
        .then((res)=>{
            localStorage.setItem('token', res.data?.token)
            navigate('/category')
        })
        .catch((err)=>{
            alert('login/password xato')
        })
    }

    return (
        <div className="content mt-5 d-flex justify-content-center align-items-center">
            <div className="cont text-center">
                <form onSubmit={sendData}>
                    <input
                        className="form-control m-3"
                        type="text"
                        name="login"
                        placeholder="Login"
                        value={data.login}
                        onChange={changeHandler}
                    />
                    <input
                        className="form-control m-3"
                        type="text"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={changeHandler}
                    />
                    <button
                        className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login