import { Button } from "antd";
import "./ScheduleLink.css";
import { Link } from "react-router-dom";

const ScheduleLink = () => {
  return (
    <div className="scheduleLinkContainer">
      <div
        style={{
          filter: "none",
          color: "white",
          position: "relative",
          width: "513px",
          height: "auto",
          padding: "200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "36px",
            lineHeight: "44px",
            width: "513px",
            textAlign: "center",
          }}
        >
          Schedule For The Fastest And The Best Support!
        </div>
        <div
          style={{
            margin: "0 auto",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Link to="/schedule">
            <Button
              style={{
                background: "yellow",
                color: "black",
                textAlign: "center",
              }}
            >
              Schedule For Free Immediately !
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScheduleLink;
