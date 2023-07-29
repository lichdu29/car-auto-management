import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";
import Maps  from "../../components/Map/Map";
import Navbar from "../../components/Nav/Nav";
import Review from "../../components/Review/Review";
import ScheduleLink from "../../components/ScheduleForm/ScheuleLink";

const AboutUs = () => {
    return (
        <div style={{minHeight: '100vh'}}>
            <Navbar/>
            <About/>
            <Review/>
            <ScheduleLink/>
            <Maps/>
            <Footer/>
        </div>
    )
}

export default AboutUs;