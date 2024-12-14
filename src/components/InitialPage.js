import { useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import GlobalContext from "../context/GlobalContext.js"
import Button from "../components/Button.js"
import * as colors from "../scripts/COLORS.js"

export default function InitialPage()
{
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    if (user) navigate("/home")
  }, [user])

  return <>
  <div className={`${colors.MAIN_BG_DARK} flex flex-col md:flex-row space-y-5 md:space-x-10 place-content-center place-items-center h-screen`}>
    <h1 className={`${colors.MAIN_TEXT_LIGHT} md:pt-12 text-4xl md:text-6xl text-center md:leading-normal`}>Benvenuto<br/>in<br/>Selfie</h1>
    <img src="https://img.freepik.com/premium-photo/sloth-touches-camera-taking-selfie-funny-selfie-portrait-animal_323015-1968.jpg?w=360"
         className="h-[400px] md:h-[600px] rounded" alt="Selfie logo" />
    <h2 className={`${colors.MAIN_TEXT_LIGHT} my-40 screen text-center text-xl leading-normal`}>
      <Button label="Accedi" click={() => navigate("/login")} otherCss="py-px"/> o <Button label="Registrati" click={() => navigate("/register")} otherCss="py-px"/>
      <br/>per continuare
    </h2>
  </div>
  </>
}
