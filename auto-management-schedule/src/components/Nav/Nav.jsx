import { Link } from "react-router-dom";
import logoUrl from "../../assets/logo.png";
import "../Nav/Nav.css";
import { PhoneOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <div className="header-navbar">
      <div
        style={{
          backgroundColor: "#f2cc63",
          borderBottomRightRadius: "20px",
          // padding: '10px'
        }}
      >
        <img src={logoUrl} width={140} height={56} />
      </div>
      <div>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-betwwen",
            listStyleType: "none",
            gap: "20px",
            fontSize: "16px",
            padding: "0",
            textDecoration: "none",
            color: "black",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/"
          >
            <li>Home</li>
          </Link>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/schedule"
          >
            <li>Schedule</li>
          </Link>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          fontWeight: "550",
        }}
      >
        <PhoneOutlined rotate={90} />
        <span>098-308-3633</span>
      </div>
    </div>
  );
};

export default Navbar;
