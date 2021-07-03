import "./Register.css"
import { useRef } from 'react'
import axios from "axios"
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

export default function Register() {

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords don't match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login")
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">The Social Club</h3>
                    <span className="registerDesc">
                        Connect with friends and the world around you on The Social Club.
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input placeholder="Username" minLength="3" required ref={username} className="registerInput" />
                        <input placeholder="Email" type="email" required ref={email} className="registerInput" />
                        <input placeholder="Password" minLength="6" type="password" required ref={password} className="registerInput" />
                        <input placeholder="Password again" minLength="6" type="password" required ref={passwordAgain} className="registerInput" />
                        <button className="registerButton" type="submit">Sign Up</button>
                        <Link to="/login">
                            <button className="registerRegisterButton">
                                Log into your accout
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
