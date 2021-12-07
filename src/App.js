import { useState, useEffect, useCallback } from 'react'
import { BiArchive } from 'react-icons/bi';

import AddAppointment from './components/AddAppointment'
import Search from './components/Search';
import AppointmentInfo from './components/AppointmentInfo';

function App() {
  let [ appointmentList, setAppointmentList ] = useState([]);

  const fetchData = useCallback(() => {
    const url = './data.json';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      });
  }, [])

  useEffect(() => {
    fetchData()
  }, [ fetchData ])

  return (
    <div className="App container mx-auto px-20 mt-3 font-thin">
      <h1 className="text-5xl">
        <BiArchive className="inline-block text-red-400" />Your Appointments
      </h1>
      <AddAppointment />
      <Search />

      <ul className="divide-y divide-gray-200">
        { appointmentList
          .map(appointment => {
            return (
              <AppointmentInfo
                key={ appointment.id }
                appointment={ appointment }
                onDeleteAppointment={
                  appointmentId =>
                    setAppointmentList(appointmentList.filter(appointment =>
                      appointment.id !== appointmentId))
                }
              />
            )
          })
        }
      </ul>
    </div>
  );
}

export default App;