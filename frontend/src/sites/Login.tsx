import {Fragment, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../components/AuthProvider.tsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]=useState("")
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const data = {email, password};
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }).catch(()=>{setError("Database conection error")});

        const json = await response?.json();
        if (json.error == "Unauthorized")
            setError("You have entered an invalid email or password")
        else{
            auth.setToken(json.access_token)
            auth.setUser(json.user)
            navigate("/");
        }
    };


    return (
        <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
            <div className="container mx-auto">
                <div className="mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="
                        relative
                        mx-auto
                        max-w-[525px]
                        overflow-hidden
                        rounded-lg
                        bg-white
                        py-5
                        px-16
                        text-center
                        sm:px-12
                        md:px-[60px]
                        ">
                            {error ? (
                                <div className="flex visible">
                                    <span className="text-red-400 text-base  bg-amber-200 w-full h-6 ">{error}</span>
                                </div>

                            ) : (
                                <Fragment>
                                    <div className="flex invisible">
                                        <span className="text-red-400 text-base  bg-amber-200 w-full h-6 "></span>
                                    </div>
                                </Fragment>
                            )}

                            <div className="mb-10 text-center md:mb-16">Login</div>

                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="
                                        border-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-[#FCFDFE]
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus:border-primary
                                        focus-visible:shadow-none
                                        "
                                    />
                                    {/*<div className="flex">*/}
                                    {/*    <span className="text-red-400 text-sm m-2 p-2">error</span>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="
                                        border-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-[#FCFDFE]
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus:border-primary
                                        focus-visible:shadow-none
                                        "
                                    />
                                    {/*<div className="flex">*/}
                                    {/*    <span className="text-red-400 text-sm m-2 p-2">error</span>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="mb-10">
                                    <button
                                        type="submit"
                                        className="
                                        w-full
                                        px-4
                                        py-3
                                        bg-indigo-500
                                        hover:bg-indigo-700
                                        rounded-md
                                        text-white
                                        "
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                            <Link to="/forgot-password"
                                  className="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline">
                                Forgot Password?
                            </Link>
                            <p className="text-base text-[#adadad]">
                                Not a member yet?
                                <Link to="/register" className="text-primary hover:underline"> Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
)
}
