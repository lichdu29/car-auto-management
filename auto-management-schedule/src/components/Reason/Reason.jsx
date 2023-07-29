import { Image } from "antd";
import "./Reason.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faCalendarXmark, faCoins, faTools, faClock
} from "@fortawesome/free-solid-svg-icons";
// import antd from ''

const Reason = () => {
  return (
    <div className="reason-container">
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
        Reason To Maintain At Autocar
      </div>
      <div 
        style={
          {
            width: "696px",
            marginTop: '80px',
            marginLeft: '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px'
          }
        }
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              padding: "10px",
              width: "320px",
              height: "136px",
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <FontAwesomeIcon icon={faCalendarXmark} style={{width: '20px'}}/>
            <div style={{fontWeight: '600', fontSize: '16px', lineHeight: '24px'}}>Free to check your car</div>
            <p style = {{margin: '0', fontSize: '14px', lineHeight:'20px'}}>
              You don't have to pay service fee when you check your car's
              condition before repare with our service
            </p>
          </div>
          <div
            style={{
              padding: "10px",
              width: "320px",
              height: "136px",
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <FontAwesomeIcon icon={faCoins} style={{width: '20px'}}/>
            <div style={{fontWeight: '600', fontSize: '16px', lineHeight: '24px'}}>Free to check your car</div>
            <p style = {{margin: '0', fontSize: '14px', lineHeight:'20px'}}>
              You don't have to pay service fee when you check your car's
              condition before repare with our service
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              padding: "10px",
              width: "320px",
              height: "136px",
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <FontAwesomeIcon icon={faTools} style={{width: '20px'}}/>
            <div style={{fontWeight: '600', fontSize: '16px', lineHeight: '24px'}}>Free to check your car</div>
            <p style = {{margin: '0', fontSize: '14px', lineHeight:'20px'}}>
              You don't have to pay service fee when you check your car's
              condition before repare with our service
            </p>
          </div>
          <div
            style={{
              padding: "10px",
              width: "320px",
              height: "136px",
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <FontAwesomeIcon icon={faClock} style={{width: '20px'}}/>
            <div style={{fontWeight: '600', fontSize: '16px', lineHeight: '24px'}}>Free to check your car</div>
            <p style = {{margin: '0', fontSize: '14px', lineHeight:'20px'}}>
              You don't have to pay service fee when you check your car's
              condition before repare with our service
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reason;
