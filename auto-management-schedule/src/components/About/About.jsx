import { Image } from "antd";
import "./About.css";
import Review1 from "../../../public/Review1.png";
import Review2 from "../../../public/Review2.png";
import QualityIcon from "../../../public/qualitycheckicon.png";
import Standard1 from "../../../public/Standard1.png";
import Standard2 from "../../../public/Standard2.png";
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
            Chúng tôi là xưởng sửa chữa xe chuyên nghiệp với đội ngũ kỹ thuật
            viên giàu kinh nghiệm và đam mê xe hơi. Với hơn 15 năm hoạt động
            trong ngành, chúng tôi tự tin cung cấp các dịch vụ bảo trì, sửa
            chữa, và thay thế linh kiện chất lượng cao cho mọi loại xe. Đồng
            hành cùng sứ mệnh đem đến sự an toàn và tiện nghi cho khách hàng,
            chúng tôi cam kết sử dụng công nghệ hiện đại và dịch vụ chuyên
            nghiệp để đáp ứng mọi yêu cầu của bạn và xe của bạn.
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
            Chúng tôi mong muốn trở thành một xưởng sửa chữa xe hàng đầu, mang
            lại niềm tin và hài lòng tuyệt đối cho khách hàng thông qua chất
            lượng dịch vụ xuất sắc, sáng tạo và cam kết vì sự hoàn thiện của mỗi
            chiếc xe.
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
            Sứ mệnh của chúng tôi không chỉ dừng lại ở việc sửa chữa xe, mà còn
            đặt trọng tâm vào việc xây dựng mối quan hệ lâu dài với khách hàng.
            Chúng tôi hướng đến việc tạo dựng niềm tin và sự hài lòng bằng cách
            cung cấp dịch vụ chất lượng cao, uy tín, và giá trị vượt trội. Đội
            ngũ chuyên nghiệp của chúng tôi luôn sẵn lòng lắng nghe và tư vấn,
            để từng chiếc xe luôn hoạt động ổn định và an toàn trên mọi cung
            đường.
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
              <span>Truy cap trang web</span>
              <p>
                Bạn chỉ cần truy cập trang web của chúng tôi thông qua đường dẫn
              </p>
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
              <span>Đặt lịch hẹn</span>
              <p>
                Chọn Tab Lịch hẹn để có thể xem các lịch trống tại xưởng của
                chúng tôi và tiến hành đặt xe theo khung giờ của bạn
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
              <span>Sửa chữa và bảo hành</span>
              <p>
                Chúng tôi cam kết sử dụng các công nghệ mới nhất để có thể cải
                thiện tình trạng xe của bạn và luôn đảm bảo về chất lượng cũng
                như giá cả.
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
          Chúng tôi sử dụng những công nghệ và thiết bị mới nhất trên thị trường
          để có thể đem đến trải nghiệm tuyệt vời nhất cho khách hàng
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
              <span>Bảo hành đẩy đủ</span>
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
              <span>Linh kiện mới</span>
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
              <span>Công nghệ tiên tiến</span>
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
              Kiểm định chuyên nghiệp
            </span>
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Những xe mang tích xanh là những chiếc xe đó đã vượt qua quy trình
              kiểm định khắt khe gồm 175 tiêu chí kỹ thuật{" "}
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
              Chuyên viên giàu kinh nghiệm
            </span>
            <p
              style={{
                fontWeight: "500",
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Đội ngũ chuyên viên kiểm định giàu kinh nghiệm và được đào tạo bài
              bản sẽ chịu trách nhiệm kiểm tra tình trạng từng chiếc xe một cách
              kĩ càng nhất trước khi bàn giao lại cho bạn{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
