import { Outlet, useLocation } from "react-router";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Navbar from "./navbar";
import './style.css'
export default function Layout() {

  let location = useLocation()
  return (
    <>
      <Navbar />

      <SwitchTransition>
        <CSSTransition timeout={300} classNames="fade" key={location.pathname}>
          <section className="max-w-[1200px] mx-auto">
            <Outlet />
          </section>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
