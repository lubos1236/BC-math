import {Routes,Route} from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Home from "./sites/Home.tsx";
import Login from "./sites/Login.tsx";
import Register from "./sites/Register.tsx";
//import Subject1 from "./sites/Subject1.tsx";
import Test from "./sites/Test.tsx";
import RouterGuard from "./components/RouterGuard.tsx";
import {Fragment, useContext} from "react";
import {AuthContext} from "./components/AuthProvider.tsx";
import Subject1 from "./sites/Subject1.tsx";

function App() {
    const auth = useContext(AuthContext)

  return (
      <div className="bg-[#424242] emin-h-scren">
          {auth.user?(
              <NavBar/>
          ):(
              <Fragment>
              </Fragment>
          )}
          <div className="max-w-7xl mx-auto pt-6 ">
              <Routes>

                  <Route element={<RouterGuard />}>
                      <Route path="/" element={<Home/>}/>
                      <Route path="/tema-1" element={<Subject1/>}/>
                      <Route path="/test" element={<Test/>}/>
                  </Route>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/register" element={<Register/>}/>
                  {/*
                  <Route path="/box-one" element={<Register/>}/>
                  */}
              </Routes>
          </div>
      </div>
  )
}

export default App
