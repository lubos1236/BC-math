import {Link,useNavigate} from "react-router-dom";
import {Fragment, useContext} from "react";
import {AuthContext} from "./AuthProvider.tsx";
import {Role} from "../utils/Role.tsx";


export default function NavBar() {
    const auth = useContext(AuthContext)
    const navigate=useNavigate();

    const handleLogOut = async (e: { preventDefault: () => void; }) => {
        e.preventDefault;
        fetch('http://localhost:8000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
            },
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Logout failed');
                return res.json();
            })
            .then(data => {
                console.log(data.message); // Successfully logged out
                auth.setToken(null);
                auth.setUser(null);
                navigate('/login'); // presmerovanie na login
            })
            .catch(err => {
                console.error('Logout error:', err);
            });

    }
    const handleLink = () => {
        navigate("/me");
    }

    return(
        <nav className="rounded bg-card text-white px-2 mb-4 sm:px-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between">
                <Link to="/"
                      className="block rounded py-2 pr-4 pl-3 text-white"
                      aria-current="page">Domov
                </Link>
                <div className="hidden w-full md:block md:w-auto">
                    <ul className="mt-4 flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
                        {auth.user?(
                            <Fragment>
                                {[Role.Admin].includes(auth.user?.role as Role) && (
                                    <li>
                                        <Link to="/users"
                                              className="block rounded py-2 pr-4 pl-3 text-white"
                                              aria-current="page">Uživatelia
                                        </Link>
                                    </li>
                                )}
                                {[Role.Admin,Role.Manager].includes(auth.user?.role as Role) && (
                                    <li>
                                        <Link to="/assignments"
                                              className="block rounded py-2 pr-4 pl-3 text-white"
                                              aria-current="page">Zadania
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <button type={"button"} onClick={handleLink} className="block rounded py-2 pr-4 pl-3 text-white"
                                         aria-current="page">Vitaj {auth.user.name}
                                    </button>
                                </li>
                                <li>
                                    <button type={"button"} onClick={handleLogOut} className="block rounded py-2 pr-4 pl-3 text-white"
                                         aria-current="page">Odhlásiť sa
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
