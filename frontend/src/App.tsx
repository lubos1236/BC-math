import {Routes,Route} from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./sites/Home.tsx";
import Login from "./sites/Login.tsx";
import Register from "./sites/Register.tsx";
import Test from "./sites/Test.tsx";
import Me from "./sites/Me.tsx";
import AdminPanel from "./sites/AdminPanel.tsx";
import Assignments from "./sites/Assignments.tsx";
import GuardedRoute from "./components/GuardedRoute.tsx";
import GuestOnlyRoute from "./components/GuestOnlyRoute.tsx";
import {Fragment, useContext} from "react";
import {AuthContext} from "./components/AuthProvider.tsx";
import Subject from "./sites/Subject.tsx";
import Result from "./sites/Result.tsx";
import {Role} from "./utils/Role.tsx";

function App() {
    const auth = useContext(AuthContext)

  return (
      <div className="bg-background text-white min-h-screen font-sans m-0 p-5 ">
          {auth.user?(
              <NavBar/>
          ):(
              <Fragment>
                  <div className="m-[10%]"></div>
              </Fragment>
          )}
          <div>
              <Routes>

                  <Route element={<GuardedRoute />}>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/tema-1" element={<Subject/>}/>
                      <Route path="/tema-2" element={<Subject/>}/>
                      <Route path="/tema-3" element={<Subject/>}/>
                      <Route path="/tema-4" element={<Subject/>}/>
                      <Route path="/result" element={<Result/>}/>
                      <Route path="/test" element={<Test/>}/>
                      <Route path="/me" element={<Me/>}/>
                  </Route>
                  <Route element={<GuardedRoute role={[Role.Admin]} />}>
                      <Route path="/users" element={<AdminPanel/>}/>
                  </Route>
                    <Route element={<GuardedRoute role={[Role.Admin, Role.Manager]} />}>
                        <Route path="/assignments" element={<Assignments/>}/>
                    </Route>
                  <Route element={<GuestOnlyRoute/>}>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                  </Route>
                    <Route path="*" element={<h1>404 Not Found</h1>}/>
              </Routes>
          </div>
      </div>
  )
}

export default App
