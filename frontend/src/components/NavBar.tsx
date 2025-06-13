import { Link, useNavigate } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { AuthContext } from "./AuthProvider.tsx";
import { Role } from "../utils/Role.tsx";
import DarkModeToggle from "./DarkModeToggle.tsx";

export default function NavBar() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.token}`,
                },
                credentials: 'include',
            });

            if (!res.ok) throw new Error('Logout failed');

            const data = await res.json();
            console.log(data.message);
            auth.setToken(null);
            auth.setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleLink = () => {
        navigate("/me");
    };

    return (
        <nav className="rounded bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text px-2 sm:px-4 mb-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between py-3">
                <Link to="/" className="text-lg font-semibold">
                    Domov
                </Link>

                {/* Tlačidlo pre zobrazenie menu na mobiloch */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? "×" : "☰"}
                </button>

                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                    <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
                        {auth.user ? (
                            <Fragment>
                                {[Role.Admin].includes(auth.user?.role as Role) && (
                                    <li>
                                        <Link to="/users" className="block py-2">
                                            Uživatelia
                                        </Link>
                                    </li>
                                )}
                                {[Role.Admin, Role.Manager].includes(auth.user?.role as Role) && (
                                    <Fragment>
                                        <li>
                                            <Link to="/assignments" className="block py-2">
                                                Úlohy
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/themes" className="block py-2">
                                                Témy
                                            </Link>
                                        </li>
                                    </Fragment>
                                )}
                                <li>
                                    <button onClick={handleLink} className="block py-2 text-left w-full">
                                        Vitaj {auth.user.name}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleLogOut} className="block py-2 text-left w-full">
                                        Odhlásiť sa
                                    </button>
                                </li>
                                <li>
                                    <DarkModeToggle />
                                </li>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <li>
                                    <Link to="/login" className="block py-2">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register" className="block py-2">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <DarkModeToggle />
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
