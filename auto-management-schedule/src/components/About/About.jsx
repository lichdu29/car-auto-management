import { Image } from "antd";
import "./About.css";
import Review1 from "../../assets/Review1.png";
import Review2 from "../../assets/Review2.png";
import QualityIcon from "../../assets/qualitycheckicon.png";
import Standard1 from "../../assets/Standard1.png";
import Standard2 from "../../assets/Standard2.png";
const About = () => {
  return (
    <div className="about-container">
      <div className="about-fcomp-container">
        <div
          style={{
            height: "8px",
            backgroundColor: "orange",
            borderRadius: "40px",
            width: "80px",
            margin: "0 auto",
            marginTop: "50px",
            position: "relative",
          }}
        ></div>
        <div
          style={{
            position: "relative",
            textAlign: "center",
            margin: "0 auto",
            padding: "50px",
            height: "132px",
          }}
        >
          <span
            style={{
              fontWeight: "500",
              fontSize: "48px",
              lineHeight: "56px",
              color: "white",
            }}
          >
            About Us
          </span>
          <p
            style={{
              fontWeight: "500",
              fontSize: "28px",
              lineHeight: "36px",
              color: "white",
            }}
          >
            Choose, trust and fast with us
          </p>
        </div>
      </div>
      <div className="about-scomp-container">
        <div
          style={{
            height: "807px",
            width: "575px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              weght: "600",
              lineHeight: "44px",
            }}
          >
            Who are we?
          </span>
          <p
            style={{
              fontSize: "16px",
              weght: "500",
              lineHeight: "24px",
            }}
          >
            We are a professional car repair workshop with a team of experienced
            and passionate technicians. With over 15 years of experience in the
            industry, we are confident in providing high-quality maintenance,
            repair, and replacement services for all types of vehicles. Aligned
            with the mission to bring safety and convenience to our customers,
            we are committed to using modern technology and professional
            services to meet all your needs and those of your vehicle.
          </p>
          <Image
            style={{ borderRadius: "10px" }}
            src={Review1}
            preview={false}
          />
        </div>
        <div
          style={{
            height: "939px",
            width: "575px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Image
            style={{ borderRadius: "10px" }}
            src={Review2}
            preview={false}
          />
          <span
            style={{
              fontSize: "36px",
              weght: "600",
              lineHeight: "44px",
            }}
          >
            Vision
          </span>
          <p
            style={{
              fontSize: "16px",
              weght: "500",
              lineHeight: "24px",
            }}
          >
            We aspire to become a leading car repair workshop, instilling
            absolute trust and satisfaction in customers through excellent
            service quality, innovation, and a commitment to the perfection of
            every vehicle.
          </p>
          <span
            style={{
              fontSize: "36px",
              weght: "600",
              lineHeight: "44px",
            }}
          >
            Mission
          </span>
          <p
            style={{
              fontSize: "16px",
              weght: "500",
              lineHeight: "24px",
            }}
          >
            Our mission extends beyond just car repairs; it revolves around
            cultivating long-term relationships with customers. We aim to build
            trust and satisfaction by delivering high-quality, reliable, and
            exceptional value services. Our professional team is always ready to
            listen and advise, ensuring that each vehicle operates smoothly and
            safely on every road.
          </p>
        </div>
      </div>
      <div className="about-tcomp-container">
        <div
          style={{
            height: "8px",
            backgroundColor: "orange",
            borderRadius: "40px",
            width: "80px",
            margin: "0 auto",
            marginTop: "50px",
          }}
        ></div>
        <span
          style={{
            margin: "0 auto",
            fontSize: "48px",
            marginTop: "30px",
          }}
        >
          Services
        </span>
        <p
          style={{
            margin: "0 auto",
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: "500",
            marginTop: "20px",
          }}
        >
          Easy to schedule and maintain
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "70px",
          }}
        >
          <div
            style={{
              height: "258px",
              width: "413px",
              backgroundColor: "#DCE4FF",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                height: "258px",
                width: "333px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span>Access the website.</span>
              <p>You just need to access our website through the link.</p>
            </div>
          </div>
          <div
            style={{
              height: "258px",
              width: "413px",
              backgroundColor: "#FEF5D7",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                height: "258px",
                width: "333px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span>Schedule an appointment.</span>
              <p>
                Select the 'Schedule' tab to view available slots at our
                workshop and proceed to book your vehicle according to your
                preferred time.
              </p>
            </div>
          </div>
          <div
            style={{
              height: "258px",
              width: "413px",
              backgroundColor: "#EDDCFF",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                height: "258px",
                width: "333px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span>Repairs and Warranty</span>
              <p>
                We are committed to using the latest technologies to improve the
                condition of your vehicle and always ensure quality and pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="about-4comp-container">
        <div
          style={{
            height: "8px",
            backgroundColor: "orange",
            borderRadius: "40px",
            width: "80px",
            margin: "0 auto",
            marginTop: "50px",
          }}
        ></div>
        <span
          style={{
            margin: "0 auto",
            fontSize: "48px",
            marginTop: "30px",
          }}
        >
          Meet quality standards
        </span>
        <p
          style={{
            margin: "0 auto",
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: "500",
            marginTop: "20px",
          }}
        >
          We utilize the latest technologies and equipment on the market to
          provide the best possible experience for our customers.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "100px",
            marginTop: "70px",
          }}
        >
          <div
            style={{
              height: "124px",
              width: "159px",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                // height: "258px",
                // width: "333px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Image
                style={{ width: "80px", height: "80px" }}
                preview={false}
                src={QualityIcon}
              />
              <span>Fully Warranty</span>
            </div>
          </div>
          <div
            style={{
              height: "124px",
              width: "159px",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                // height: "258px",
                // width: "333px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Image
                style={{ width: "80px", height: "80px" }}
                preview={false}
                src={QualityIcon}
              />
              <span>New Components</span>
            </div>
          </div>
          <div
            style={{
              height: "124px",
              width: "159px",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                // height: "258px",
                // width: "333px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Image
                style={{ width: "80px", height: "80px" }}
                preview={false}
                src={QualityIcon}
              />
              <span>Advanced Technology</span>
            </div>
          </div>
        </div>
      </div>
      <div className="about-5comp-container">
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            height: "453px",
            justifyContent: "center",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <div
            style={{
              height: "132px",
              width: "500px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
                fontSize: "28px",
                lineHeight: "36px",
              }}
            >
              Professional Inspection
            </span>
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              The green-label vehicles are those that have passed a rigorous
              inspection process consisting of 175 technical criteria{" "}
            </p>
          </div>
          <Image style={{ height: "453px" }} preview={false} src={Standard1} />
        </div>
        <div
          style={{
            margin: "0 auto",
            display: "flex",
            height: "453px",
            justifyContent: "center",
            alignItems: "center",
            gap: "100px",
          }}
        >
          <Image style={{ height: "453px" }} preview={false} src={Standard2} />
          <div
            style={{
              height: "132px",
              width: "500px",
            }}
          >
            <span
              style={{
                fontWeight: "600",
                fontSize: "28px",
                lineHeight: "36px",
              }}
            >
              Experienced specialists
            </span>
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Our team of experienced and professionally trained specialists
              will be responsible for thoroughly inspecting and repairing each
              vehicle before handing it back to you.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
