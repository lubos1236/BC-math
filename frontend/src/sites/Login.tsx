import {Fragment, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../components/AuthProvider.tsx";
import Block from "../components/Block.tsx";

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
            credentials: "include",
        }).catch(()=>{setError("Database conection error")});

        const json = await response?.json();
        if (json.error == "Unauthorized")
            setError("You have entered an invalid email or password")
        else{
            auth.setToken(json.access_token)
            auth.setUser(json.user)
            console.log(document.cookie);
            navigate("/");
        }

    };


    return (
        <Block>
            <div className="container mx-auto">
                <div className="mx-4 flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="
                        relative
                        mx-auto
                        max-w-[525px]
                        overflow-hidden
                        rounded-lg
                        py-5
                        px-16
                        text-center
                        sm:px-12
                        md:px-[60px]
                        bg-light-card2
                        dark:bg-dark-card2
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

                            <div className="mb-10 text-center md:mb-16">Prihlásenie</div>

                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        className="
                                        border-black
                                        w-full
                                        rounded-md
                                        border
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        bg-light-card2
                                        dark:bg-dark-card2
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
                                        placeholder="Heslo"
                                        className="
                                        border-black
                                        w-full
                                        rounded-md
                                        bg-light-card2
                                        dark:bg-dark-card2
                                        border
                                        py-3
                                        px-5
                                        text-base text-body-color
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
                                        text-light-text
                                        dark:text-dark-text
                                        "
                                    >
                                        Prihlásenie
                                    </button>
                                </div>
                            </form>
                            {/*<Link to="/forgot-password"*/}
                            {/*      className="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline">*/}
                            {/*    Zabidol si heslo?*/}
                            {/*</Link>*/}
                            <p className="text-base text-light-text dark:text-dark-text">
                                Niesi členom?{" "}
                                <Link to="/register" className="text-primary hover:underline">Registrácia</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
)
}
