import {Link} from "react-router-dom";
import {Fragment, useContext} from "react";
import {AuthContext} from "./AuthProvider.tsx";

export default function NavBar() {
    const auth = useContext(AuthContext)

    const handleLogOut = async (e: { preventDefault: () => void; }) => {
        e.preventDefault;
        auth.setToken(null)
        auth.setUser(null)
        //navigate("/");
    }

    return(
        <nav className="rounded bg-[#0F0F0F] text-white px-2 py-2.5 sm:px-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link to="/"
                      className="block rounded py-2 pr-4 pl-3 text-white"
                      aria-current="page">Home
                </Link>
                <div className="hidden w-full md:block md:w-auto">
                    <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                        {/*<li>*/}
                        {/*    <Link to="/"*/}
                        {/*          className="block rounded py-2 pr-4 pl-3 text-white"*/}
                        {/*          aria-current="page">Home*/}
                        {/*    </Link>*/}
                        {/*</li>*/}

                        {auth.user?(
                            <Fragment>
                                <li>
                                    <div className="block rounded py-2 pr-4 pl-3 text-white"
                                         aria-current="page">Vitaj {auth.user.name}
                                    </div>
                                </li>
                                <li>
                                    <button type={"button"} onClick={handleLogOut} className="block rounded py-2 pr-4 pl-3 text-white"
                                         aria-current="page">Logout
                                    </button>
                                </li>
                            </Fragment>

                        ) : (
                            <Fragment>
                                <li>
                                    <Link to="/login"
                                          className="block rounded py-2 pr-4 pl-3 text-white"
                                          aria-current="page">Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register"
                                          className="block rounded py-2 pr-4 pl-3 text-white"
                                          aria-current="page">Register
                                    </Link>
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
