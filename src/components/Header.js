import GlobalContext from "../context/GlobalContext.js"
import { useState, useEffect, useContext } from "react"
import useCheckForUser from "../hooks/useCheckForUser.js"
import { useNavigate, Link } from "react-router-dom";
import * as colors from "../scripts/COLORS.js"

//TODO la notifica non funziona benissimo, il timer si sfancula un po' (nel video dei tips & tricks sistemava questa cosa)
export default function Header() {

  useCheckForUser();

  const navigate = useNavigate();
  var { user, notification, setNotification, showNotification, setShowNotification, notify } = useContext(GlobalContext); 

  const [dropped, setDropped ] = useState(false);

  const DropDown = () => {
    setDropped(!dropped)
  }

  const li_css = () => {
    let css = "block py-2 px-3 "
    css += "text-white "
    css += `transparent md:p-0 ${colors.MAIN_HOVER_TEXT}`
    return css;
  }

  return (
    <>
    {/* TODO renderla responsive, no dropdown, ma flex fatto bene */}
    <nav className="flex justify-center">
      <div className={`max-w-fit flex space-x-4 justify-items-start justify-start px-2 border rounded ${colors.MAIN_BORDER_LIGHT}`}>
        <Link to="/home" className="flex items-start space-x-3">
            <img src={user?.picture || "https://img.freepik.com/premium-photo/sloth-touches-camera-taking-selfie-funny-selfie-portrait-animal_323015-1968.jpg?w=360"} className="rounded-full h-8 bg-gray-50" alt="Selfie logo" />
            <span className={`self-center text-2xl font-semibold whitespace-nowrap ${colors.MAIN_HOVER_TEXT} text-white`}>Selfie</span>
        </Link>
        <div className={`border-l ${colors.MAIN_BORDER_LIGHT} items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user`}>
          <ul className={`ml-4 flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 md:flex-row md:mt-0 ${colors.MAIN_BORDER_LIGHT}`}>
            <li> <Link to="/calendar" className={li_css()}>Calendario</Link> </li>
            <li> <Link to="/notes" className={li_css()}>Note</Link> </li>
            <li> <Link to="/pomodoro" className={li_css()}>Pomodoro</Link> </li>
            <li> <Link to="/profile" className={li_css()}>Profilo</Link> </li>
            <li className={`${showNotification || "hidden"} flex items-center`}>
              { notification?.type === "error" && <span className="text-red-500">Errore: {notification?.message}</span>}
              { notification?.type === "warning" && <span className="text-yellow-500">Attenzione: {notification?.message}</span>}
              { (notification?.type !==  "error" && notification?.type !== "warning") && 
                <span className={`${colors.MAIN_TEXT_MEDIUM}`}>{notification?.type}{notification?.type && ":"} {notification?.message}</span>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}
