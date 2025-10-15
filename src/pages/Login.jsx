import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();

    const users = [
        { email: "mark5@gmail.com", password: "mark5" },
        { email: "natalia3@gmail.com", password: "natalia3" },
        { email: "bublyk@gmail.com", password: "bublyk" }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            setError("");
            setShowError(false);
            document.cookie = "loggedIn=true; path=/; max-age=3600";
            navigate("/dashboard");
        } else {
            setError("Incorrent email or password");
            setShowError(true);
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

                   {error && (
                       <p className={`error ${showError ? "visible" : "hidden"}`}>
                           {error}
                       </p>
                   )}

                   <button type="submit">Login</button>
               </form>
           </div>
       </div>
    );
}

export default Login;
