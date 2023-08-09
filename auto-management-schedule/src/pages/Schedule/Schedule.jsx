import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ScheduleForm from "../../components/ScheduleForm/ScheduleForm";
import Navbar from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";

const Schedule = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://65.108.79.164:4000/api/schedule/");
      const transformedEvents = response.data.map((item) => {
        const start = moment(item.dateTimePicker).toDate();
        const end = moment(start.getTime() + 60 * 60 * 1000).toDate(); // Adding 1 hour
        const title = item.fullname;

        return {
          start,
          end,
          title,
        };
      });
      setEvents(transformedEvents)
    };
    fetchData();
  },[<ScheduleForm/>]);
  const localizer = momentLocalizer(moment);
  return (
    <>
    <Navbar/>
    <div style={{ height: "80vh", marginTop: '50px', marginBottom: '50px'}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
    <ScheduleForm/>
    <Footer/>
    </>
  );
};

export default Schedule;
