import { useState, useReducer } from "react"
import dayjs from "dayjs"
import GlobalContext from "./GlobalContext.js"

const userReducer = (state, { type, payload }) => {
  //console.log("Dispatching user: ");
  //console.log("Type:", type);
  //console.log("Payload:", payload);
  switch (type) {
    case "REGISTER": 
    case "LOGIN": 
    case "SET":
    case "MODIFY": 
      return payload;

    case "LOGOUT": 
    case "DELETE":
      return null;

    default: return state;
  }
};

function eventsReducer(state, { type, payload }) {
  //console.log("Reducing events:", state);
  //console.log(" > type:", type);
  //console.log(" > Event to dispatch:", payload);

  switch (type) {
    case "CREATE": return [...state, payload];
    case "MODIFY": {
      const index = state.findIndex(e => e._id === payload._id);
      if (index !== -1) {
        const updatedEvents = [...state];
        updatedEvents[index] = payload;
        return updatedEvents;
      }
      else return [...state, payload];
    }
    case "DELETE": return state.filter(e => e._id !== payload._id);
    case "ALL":
      return payload;  
    default: return state;
  }
}

export default function ContextWrapper({ children })
{
  const [user, dispatchUser] = useReducer(userReducer, null);

  const [ currentDate, setCurrentDate ] = useState(dayjs());
  const [ selectedDay, setSelectedDay ] = useState(dayjs());

  const [ allEvents, dispatchEvent ] = useReducer(eventsReducer, []);
  const [ selectedEvent, setSelectedEvent ] = useState(null);
  const [ showEventModal, setShowEventModal ] = useState(false);
  const [ showEventsList, setShowEventsList ] = useState(false);

  const [ newUser, setNewUser ] = useState(null);
  //TODO poi da togliere, forse
  const [ newFullName, setNewFullName ] = useState("");
  const [ newUsername, setNewUsername ] = useState("");
  const [ newPicture, setNewPicture ] = useState("");
  const [ newBio, setNewBio ] = useState("");

  const [ notification, setNotification ] = useState(null)
  const [ showNotification, setShowNotification ] = useState(false);
  const notify = (type, message) => {
    const notification = { type, message };
    setNotification(notification);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  }

  const [ modifyRepeated, setModifyRepeated] = useState(false);

  const [ filters, setFilters ] = useState({ white: true, red: true, orange: true, yellow: true, green: true, cyan: true, blue: true })

  const [ shownCalendarType, setShownCalendarType ] = useState("tutti");

  const [ showCompletedTasks, setShowCompletedTasks ] = useState(false)

  return (
    <GlobalContext.Provider value={{
      user,
      dispatchUser,

      //TODO togliere?
      newFullName,
      setNewFullName,
      newUsername,
      setNewUsername,
      newPicture,
      setNewPicture,
      newBio,
      setNewBio,

      currentDate,
      setCurrentDate,
      selectedDay,
      setSelectedDay,

      allEvents,
      dispatchEvent,
      showEventModal,
      setShowEventModal,
      showEventsList,
      setShowEventsList,
      selectedEvent,
      setSelectedEvent,

      notification,
      setNotification,
      showNotification,
      setShowNotification,
      notify,

      modifyRepeated,
      setModifyRepeated,

      filters,
      setFilters,

      shownCalendarType,
      setShownCalendarType,

      showCompletedTasks,
      setShowCompletedTasks
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
