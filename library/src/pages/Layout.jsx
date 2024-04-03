import { Outlet, useLocation } from "react-router";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Navbar from "./navbar";
import './style.css'
import useTheme from "../hooks/useTheme";
import { useEffect } from "react";
export default function Layout() {

  let {isDark} = useTheme()
  let location = useLocation()

  useEffect(() => {
    let body = document.body
    if(isDark){
body.classList.add("bg-dBg");
body.classList.remove("bg-lBg");
    }
    else{
  body.classList.remove("bg-dBg");
  body.classList.add("bg-lBg");
    
    }
  }, [isDark])
  return (
    <>
      <div className={`${isDark ? "bg-dBg" : "bg-lBg"} `}>
        <Navbar />

        <SwitchTransition>
          <CSSTransition
            timeout={300}
            classNames="fade"
            key={location.pathname}
          >
            <section className="max-w-[1200px] mx-auto mt-[120px]">
              <Outlet />
            </section>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}
