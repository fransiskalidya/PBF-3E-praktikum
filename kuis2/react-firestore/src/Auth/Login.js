import { useRef, useState } from "react";
import { login } from "../Firebase";


export default function Login(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");

    async function handleSubmit (e){
        // setLoading(true)
        try{
        await login(emailRef.current.value,passwordRef.current.value);
        alert("Selamat datang")
        props.history.push('/')
        } catch(e){
            setError(e.message);
            // alert(error);
        }
        // setLoading(false);

    }
    return (
        <div className="container">
            <div className="card bg-light mb-3 text-center" style={{maxWidth: "30rem", marginTop:"100px", marginLeft:"300px"}}>
                <div className="card-header">
                    <h2>Login</h2>
                    </div>
                <div className="card-body">
                    <form>
                    <div style={{color:"red"}}>
                            {error}
                        </div>
                        <div class="form-group text-left">
                            <label for="email">Email</label>
                            <input ref={emailRef} type="email" class="form-control" id="email" placeholder="Email" />
                        </div>
                        <div class="form-group text-left">
                            <label for="password">Password</label>
                            <input ref={passwordRef} type="password" class="form-control" id="password" placeholder="Password" />
                        </div>
                        <div>
                        <div className="container text-left" style={{padding:"0px"}}>
                            <div className="btn1">
                                <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button></div>
                            <br></br>
                            <p className="forgot-password text-right">
                                Data belum pernah terdaftar <a href="/register">Register ?</a>
                            </p>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}