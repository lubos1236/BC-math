import {Fragment, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../components/AuthProvider.tsx";
import Block from "../components/Block.tsx";

export default function Register() {
    const [name, setName] = useState("tt");
    const [email, setEmail] = useState("a@a.com");
    const [password, setPassword] = useState("password");
    const [password_confirmation, setPassword_confirmation] = useState("password");
    const [error, setError]=useState<string[]>(['','','','']);
    const navigate = useNavigate();
    const auth = useContext(AuthContext)
    const handleRegister = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const data = {name, email, password, password_confirmation};
        const response = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),

        }).catch(()=>{setError(["Cannot connect to database","","",""])});

        const json = await response?.json();
        if (json.errors != null)
            setError([error[0],
                json.errors.name==null?'':JSON.stringify(json.errors.name).substring(2,JSON.stringify(json.errors.name).length-2),
                json.errors.email==null?'':JSON.stringify(json.errors.email).substring(2,JSON.stringify(json.errors.email).length-2),
                json.errors.password==null?'':JSON.stringify(json.errors.password).substring(2,JSON.stringify(json.errors.password).length-2)]);
        else {
            auth.setToken(json.access_token)
            auth.setUser(json.user)
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
                        bg-light-card2
                        dark:bg-dark-card2
                        py-5
                        px-16
                        text-center
                        sm:px-12
                        md:px-[60px]
                        ">
                            {error[0]!="" ? (
                                <div className="flex visible">
                                    <span className="text-red-400 text-base  bg-amber-200 w-full h-6 ">{error[0]}</span>
                                </div>

                            ) : (
                                <Fragment>
                                    <div className="flex invisible">
                                        <span className="text-red-400 text-base  bg-amber-200 w-full h-6 "></span>
                                    </div>
                                </Fragment>
                            )}

                            <div className="mb-10 text-center md:mb-16">Registrácia</div>

                            <form onSubmit={handleRegister}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Meno"
                                        autoComplete={"off"}
                                        className="
                                        border-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-light-card2
                                        dark:bg-dark-card2
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus:border-primary
                                        focus-visible:shadow-none
                                        "
                                    />
                                    <div className="flex">
                                        <span className="text-red-400 text-sm m-2 p-2">{error[1]}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        autoComplete={"off"}
                                        className="
                                        border-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-light-card2
                                        dark:bg-dark-card2
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus:border-primary
                                        focus-visible:shadow-none
                                        "
                                    />
                                    <div className="flex">
                                        <span className="text-red-400 text-sm m-2 p-2">{error[2]}</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Heslo"
                                        autoComplete={"off"}
                                        className="
                                        border-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-light-card2
                                        dark:bg-dark-card2
                                        py-3
                                        px-5
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus:border-primary
                                        focus-visible:shadow-none
                                        "
                                    />
                                    <div className="flex">
                                        <span className="text-red-400 text-sm m-2 p-2">{error[3]}</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        value={password_confirmation}
                                        onChange={(e) => setPassword_confirmation(e.target.value)}
                                        placeholder="Potvrdenie hesla"
                                        autoComplete={"off"}
                                        className="
                                        border-[#E9EDF4]
                                        w-full
                                        rounded-md
                                        border
                                        bg-light-card2
                                        dark:bg-dark-card2
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
                                        text-light-text
                                        dark:text-dark-text
                                        "
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="text-base text-light-text dark:text-dark-text">
                                Už si členom?{' '}
                                <Link to="/login" className="text-primary hover:underline">Príhlás sa</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Block>
    )
}
