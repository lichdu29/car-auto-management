import { Image } from "antd";
import "./Process.css";

const Process = () => {
  return (
    <div className="process-container">
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
      <div
        style={{
          margin: "0 auto",
          fontSize: "48px",
          marginTop: "30px",
        }}
      >
        3 Steps To Start Maintain Your Car
      </div>
      <div
        style={{
          height: "5px",
          margin: "0 auto",
          marginTop: "30px",
          display: "flex",
          gap: "32px",
        }}
      >
        <div
          style={{
            height: "294px",
            width: "286px",
            margin: "0 auto",
            marginTop: "30px",
            backgroundColor: "white",
            padding: "20px",
            display: 'flex',
            flexDirection: 'column',
            gap: "20px",
            borderRadius: "40px"
          }}
        >
          <Image
            src="../../../public/Illustration Card.png"
            height={80}
            width={80}
          />
          <div>1. Schedule for free</div>
          <p>
            Submit your details and get an instant estimated price for your car
            before booking an appointment
          </p>
        </div>
        <div
          style={{
            height: "294px",
            width: "286px",
            margin: "0 auto",
            marginTop: "30px",
            backgroundColor: "white",
            padding: "20px",
            display: 'flex',
            flexDirection: 'column',
            gap: "20px",
            borderRadius: "40px"
          }}
        >
          <Image
            src="../../../public/Frame.png"
            height={80}
            width={80}
          />
          <div>2. Check the status and receive the request</div>
          <p>
            Our skilled inspectors will conduct a <br></br> 175-point check and make you an offer.
          </p>
        </div>
        <div
          style={{
            height: "294px",
            width: "286px",
            margin: "0 auto",
            marginTop: "30px",
            backgroundColor: "white",
            padding: "20px",
            display: 'flex',
            flexDirection: 'column',
            gap: "20px",
            borderRadius: "40px"
          }}
        >
          <Image
            src="../../../public/Key.png"
            height={80}
            width={80}
          />
          <div>3. Discharge</div>
          <p>
          Satisfied with our offer? You can pay with cash or code scan either ways
          </p>
        </div>
      </div>
    </div>
  );
};

export default Process;
