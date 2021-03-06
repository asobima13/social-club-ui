import "./Login.css"
import { useRef, useContext } from 'react'
import { LoginCall } from  "../../APICalls"
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from '@material-ui/core'

export default function Login() {

    const email = useRef()
    const password = useRef()
    const { isFetching, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        LoginCall({ email: email.current.value, password: password.current.value }, dispatch)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">The Social Club</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on The Social Club.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                        <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password}/>
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px" /> : "Login"}</button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton">{isFetching ? <CircularProgress color="white" size="20px" /> : "Create a New Account"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
