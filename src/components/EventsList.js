// [TODO]
// - possibilità di completare le task dal calendario
import React, { useMemo, useEffect, useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import EventsListEntry from "../components/EventsListEntry.js"
import { labelsNames, labelsAccent, labelsBackground } from "../scripts/COLORS.js"
import dayjs from "dayjs"
import * as colors from "../scripts/COLORS.js"

export default function EventsList({ events }) {

  var { user, allEvents, dispatchEvent, selectedDay, showEventsList, showEventModal, setShowEventModal, setShowEventsList, setSelectedEvent, filters, setFilters, shownCalendarType, setShownCalendarType, showCompletedTasks, setShowCompletedTasks } = useContext(GlobalContext);

  const [ showFilters, setShowFilters ] = useState(false)

  const handleChangeCalendarType = (e) => {
    console.log(e.target.value);
    setShownCalendarType(e.target.value);
  }

  const allFilters = () => {
    for (let label of Object.keys(filters)) {
      if (!filters[label]) return false;
    }
    return true;
  }

  useEffect(() => {
   if (!allFilters()) setShowFilters(true) 
  }, [])

  const handleResetFilters = () => {
    setShowFilters(false);
    const resetted_filters = { white: true, red: true, orange: true, yellow: true, green: true, cyan: true, blue: true };
    setFilters(resetted_filters);
  }
  
  const handleClearFilters = () => {
    const cleared_filters = { white: false, red: false, orange: false, yellow: false, green: false, cyan: false, blue: false };
    setFilters(cleared_filters);
  }


  const handleCheckboxChange = (filter_label) => {
    var updated_filters = {}
    for (let label of Object.keys(filters)) {
      updated_filters[label] = filter_label === label ? !filters[label] : filters[label]
    }
    setFilters(updated_filters)
  }

  return (
    <>
    <div className="w-full max-w-sm h-full mt-8">
      <div className="flex justify-right items-right">
        <form className={`${colors.CALENDAR_BG_MEDIUM} rounded-lg`}>
          <header className={`border-b ${colors.CALENDAR_BG_MEDIUM}`}>
            <div className="pb-2 text-center items-center flex space-x-4 justify-between items-center mx-4 mt-2">
              { !showEventModal && <button
                onClick={() => { setShowEventModal(true); setSelectedEvent(null) }}
                className="h-12 w-12 material-symbols-outlined text-white text-4xl border-2 rounded-full hover:bg-white hover:text-green-700"
                title="crea evento"
              > Add
              </button>}
              <p className="text-xl">{selectedDay.format("dddd D MMMM YYYY")}</p>
              <button
                onClick={() => {setShowEventsList(false); setShowEventModal(false)}}
                className="material-symbols-outlined text-white rounded text-3xl"
                title="chiudi"
              >
                Close
              </button>
            </div>
          </header>
          <div className="border-b px-2 mt-2 flex justify-between">
            <div className="flex items-center space-x-2">
              <select className="rounded" defaultValue={shownCalendarType} onChange={handleChangeCalendarType}>
                <option value="tutti">Mostra</option>
                <option value="tutti">Tutti</option>
                <option value="eventi">Eventi</option>
                <option value="attività">Attività</option>
              </select>
              { shownCalendarType !== "eventi" ?
                <>
                <input type="checkbox" value={showCompletedTasks} onChange={(e) => setShowCompletedTasks(e.target.checked)}/>
                </>
                :
                <>
                </>
              }
            </div>
            <div className="">
              { !showFilters ?
                <span onClick={() => setShowFilters(true)} className="cursor-pointer material-symbols-outlined">filter_alt</span>
                :
                <>
                <span title="togli tutti" className="cursor-pointer material-symbols-outlined" onClick={handleClearFilters}>clear_all</span>
                <span className="mx-3 inline-flex space-x-2">
                  {labelsNames.map((label, i) => (
                    <div key={i} className={`${!filters[label] ? labelsBackground[label] : ""}`}>
                      <input
                        type="checkbox"
                        checked={filters[label]}
                        onChange={() => handleCheckboxChange(label)}
                        className={`w-5 h-5 ${labelsAccent[label]} cursor-pointer`}
                      />
                    </div>
                    ))}
                </span>
                <span onClick={handleResetFilters} className="cursor-pointer material-symbols-outlined">filter_alt_off</span>
                </>
              }
            </div>
          </div>
          <div id="events_container" style={{scrollbarWidth: "thin"}} className="h-[400px] max-w-full mr-3 overflow-auto snap-y ml-4 mt-4 mb-8">
            { events.length > 0 ?
              <ul>
                { events.map((e, i) => <li key={i}><EventsListEntry event={e}/></li>) }
              </ul>
              :
              <>
              { /* TODO: in base a qual è il shownCalendarType cambia la frase */}
              <p className="flex justify-center self-center text-xl mt-4">{"Non ci sono eventi o attività per oggi."}</p>
              </>
            }
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
