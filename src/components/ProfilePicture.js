import {MAIN_BG_LIGHT} from "../scripts/COLORS.js"

export default function ProfilePicture({ picture, alt}) {
  return <img className={`${MAIN_BG_LIGHT} text-black object-scale-down w-28 h-36 rounded`} src={picture} alt={alt}/>
}
