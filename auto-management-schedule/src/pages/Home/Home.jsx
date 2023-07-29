import { Image, Layout } from 'antd'
import Navbar from '../../components/Nav/Nav'
import Process from '../../components/Process/Process'
import Schedule from '../Schedule/Schedule'
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm'
import Reason from '../../components/Reason/Reason'
import Review from '../../components/Review/Review'
import ScheduleLink from '../../components/ScheduleForm/ScheuleLink'
import Footer from '../../components/Footer/Footer'

const Home = () => {
    return (
        <div style={{ minHeight: '100vh' }} >
            <Navbar/>
            <Process/>
            <Reason/>
            {/* <Schedule/>
            <ScheduleForm/> */}
            <Review/>
            <ScheduleLink/>
            <Footer/>
        </div>
    )
}

export default Home