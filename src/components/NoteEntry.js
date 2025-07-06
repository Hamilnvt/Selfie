import { useNavigate } from "react-router-dom"
import * as colors from "../scripts/COLORS.js"

export default function NoteEntry({note})
{
    const navigate = useNavigate()

    const goToNote = (n) => navigate("/notes");

    const truncateLongText = (text, max_chars) => (text || "")?.length <= max_chars ? text : (text || "")?.slice(0, max_chars) + "..."

    return (
        <div className={`w-screen px-3`}>
            <div className={`flex flex-col border ${colors.MAIN_BORDER_LIGHT} rounded-lg overflow-hidden mb-4`}
                 style={{scrollbarWidth: "none"}}>
                <div className={`py-2 ${colors.MAIN_BG_DARK}`}>
                    <div className="flex flex-col items-center">
                        <div className={`mb-1 ${colors.MAIN_TEXT_LIGHT}`}>
                            <div className="flex items-center space-x-2">
                                <span
                                    className="text-xl font-bold cursor-pointer hover:underline underline-offset-4 w-fit"
                                    onClick={goToNote}>{truncateLongText(note.title, 50)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-center">{truncateLongText(note.content, 200)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

