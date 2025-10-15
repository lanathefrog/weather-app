import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Cookies from "js-cookie";
import {toast} from "react-toastify";
import users from "../data/users.json";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            Cookies.set("loggedIn", "true", { expires: 1 });
            Cookies.set("userEmail", email, { expires: 1 });
            toast.success("You have successfully logged in!", { autoClose: 800 });
            navigate("/dashboard");
        } else {
            toast.error("Incorrect email or password", { autoClose: 2000 });
            setEmail("");
            setPassword("");
        }
    };


    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [showError]);

    return (
       <div className="login-wrapper">
           <div className="login-container">
               <h2>Weather App</h2>
               <form onSubmit={handleSubmit}>
                   <div className="input-group">
                       <label>Email:</label>
                       <input
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                       />
                   </div>

                   <div className="input-group">
                       <label>Password:</label>
                       <input
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                       />
                   </div>

                   <button type="submit">Login</button>
               </form>
           </div>
       </div>
    );
}

export default Login;
