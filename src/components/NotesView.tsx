import {useContext, useEffect, useState} from "react";
import GlobalContext from "../context/GlobalContext";
import {getNotes} from "../API/note";
import {NoteModel} from "../API/model/note";
import * as colors from "../scripts/COLORS";
import NoteEntry from "./NoteEntry.js";
import dayjs from "dayjs";
import useCheckForUser from "../hooks/useCheckForUser.js"

export const NotesView = () => {
    
    useCheckForUser()

    const {user} = useContext(GlobalContext) || {};

    const [notes, setNotes] = useState<NoteModel[]>([]);

    useEffect(() => {
        // @ts-ignore
        getNotes({token: user.token}).then((value) => {
            const notes = value?.data || [];
            console.log(notes);
            setNotes(notes || []);
        });
    }, [user]);

    if (notes.length < 1) {
        return <div>Loading...</div>;
    }

    const sortedNotes = notes.sort((a, b) => {
        const update_diff = dayjs(b.edit_date).diff(dayjs(a.edit_date));
        const create_diff = dayjs(b.edit_date).diff(dayjs(a.edit_date));
        return update_diff !== 0 ? update_diff : create_diff;
    });

    return (
        <div
            className={`${colors.MAIN_BG_DARK} ${colors.MAIN_BORDER_LIGHT} w-screen h-screen p-6 md:basis-1/2 overflow-auto overscroll-none`}
            style={{scrollbarWidth: "none"}}>
            <div className="flex flex-col justify-center items-center w-full">
                {(sortedNotes || [])?.length === 0 ?
                    <div className={`${colors.MAIN_TEXT_LIGHT}`}>
                        <p className="p-6 text-4xl text-center">Non hai mai creato una nota.</p>
                        <p className="p-6 text-4xl text-center">Vai nella sezione dedicata.</p>
                    </div>
                    :
                    <div> {(sortedNotes || [])?.map(n => <NoteEntry key={n._id} note={n}/>)} </div>
                }
            </div>
        </div>
    )
}
