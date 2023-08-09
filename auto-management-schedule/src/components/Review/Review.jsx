import { Image } from "antd";
import "./Review.css";
import Customer1 from '../../assets/Customer1.png'
import Customer2 from '../../assets/Customer2.png'
import Customer3 from '../../assets/Customer3.png'

const Review = () => {
  const data = [
    {
      image: Customer1,
      name: "Nguyen Thinh",
      comment:
        "Tôi có một trải nghiệm rất tuyệt tại BestStop, đội ngũ chuyên nghiệp giúp quá trình diễn ra được thuận lợi và nhanh chóng. Trước khi đến đây tôi đã đặt lịch trước nên không cần lo về thời gian...",
    },
    {
      image: Customer2,
      name: "Quang Phat",
      comment:
        "Tôi có một trải nghiệm rất tuyệt tại BestStop, đội ngũ chuyên nghiệp giúp quá trình diễn ra được thuận lợi và nhanh chóng. Trước khi đến đây tôi đã đặt lịch trước nên không cần lo về thời gian...",
    },
    {
      image: Customer3,
      name: "Phuong Ho",
      comment:
        "Tôi có một trải nghiệm rất tuyệt tại BestStop, đội ngũ chuyên nghiệp giúp quá trình diễn ra được thuận lợi và nhanh chóng. Trước khi đến đây tôi đã đặt lịch trước nên không cần lo về thời gian...",
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
            <Image src={items.image} preview={false} />
            
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
