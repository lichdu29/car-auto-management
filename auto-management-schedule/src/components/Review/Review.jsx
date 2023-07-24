import { Image } from "antd";
import "./Review.css";

const Review = () => {
  const data = [
    {
      image: "path",
      name: "Nguyen Thinh",
      comment:
        "Tôi có một trải nghiệm rất tuyệt tại OTOCITY, đội ngũ chuyên nghiệp giúp quá trình diễn ra được thuận lợi và nhanh chóng. Trước khi đến đây tôi đã đặt lịch trước nên không cần lo về thời gian...",
    },
    {
      image: "path",
      name: "Quang Phat",
      comment:
        "Tôi có một trải nghiệm rất tuyệt tại OTOCITY, đội ngũ chuyên nghiệp giúp quá trình diễn ra được thuận lợi và nhanh chóng. Trước khi đến đây tôi đã đặt lịch trước nên không cần lo về thời gian...",
    },
    {
      image: "path",
      name: "Phuong Ho",
      comment:
        "Tôi có một trải nghiệm rất tuyệt tại OTOCITY, đội ngũ chuyên nghiệp giúp quá trình diễn ra được thuận lợi và nhanh chóng. Trước khi đến đây tôi đã đặt lịch trước nên không cần lo về thời gian...",
    },
  ];
  return (
    <div className="review-container">
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
        Review By Customer
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: '3rem', marginTop: '100px'}}>
        {data.map((items) => (
          <div
            style={{
              height: "428px",
              width: "392px",
              backgroundColor: '#FFFFFF'
            }}
          >
            <Image src="../../../public/Customer1.png" preview={false} />
            
            <div style={{
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: '24px',
                padding: '10px',
                fontFamily: 'SVN-Gilroy'
            }}>{items.name}</div>
            <p style={{
                fontSize: '14px',
                padding: '10px',
                margin: '0',
                fontFamily: 'SVN-Gilroy'
            }}>{items.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
