import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="row">
        <div className="item col-12 col-lg-3 col-md-6 col-sm-6 text-center">
          <div className="logo-image"></div>
          <div className="logo-name">Cup Coffee</div>
        </div>
        <div className="item col-12 col-lg-3 col-md-6 col-sm-6">
          <p className="footer-title">Thông tin liên hệ</p>
          <p className="footer-link">
            <a target="_blank" href="https://maps.app.goo.gl/e5MGaVqLsHKQn7z76">
              Địa chỉ : Đ. Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội 100000, Việt Nam
            </a>
          </p>
          <p className="footer-link">
            <a href="tel:0987654321">Điện thoại : 1900232422</a>
          </p>
          <p className="footer-link">
            <a href="mailto: abc@example.com">Email : coffeecup@gmail.com</a>
          </p>
          <div className="footer-link d-flex align-items-center">
            <a href="#" className="footer-icon">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="#" className="footer-icon">
              <i className="fab fa-instagram-square"></i>
            </a>
            <a href="#" className="footer-icon">
              <i className="fab fa-twitter-square"></i>
            </a>
          </div>
        </div>
        <div className="item col-12 col-lg-3 col-md-6 col-sm-6">
          <p className="footer-title">Chính sách và quy định</p>
          <p className="footer-link">
            <a href="#">Chính sách & Quy định chung</a>
          </p>
          <p className="footer-link">
            <a href="#">Phương thức thanh toán</a>
          </p>
          <p className="footer-link">
            <a href="#">Quy định đổi trả</a>
          </p>
          <p className="footer-link">
            <a href="#">Chính sách bảo mật thông tin cá nhân</a>
          </p>
          <p className="footer-link">
            <a href="#">Khiếu nại, phản hồi</a>
          </p>
        </div>
        <div className="item col-12 col-lg-3 col-md-6 col-sm-6">
          <p className="footer-title">dịch vụ khách hàng</p>
          <p className="footer-link">
            <a href="#">Giao hàng tận nơi</a>
          </p>
          <p className="footer-link">
            <a href="#">Thanh toán qua ví MoMo</a>
          </p>
          <p className="footer-link">
            <a href="#">Tri ân khách hàng thân thiết</a>
          </p>
          <p className="footer-link">
            <a href="#">Chăm sóc, hậu mãi</a>
          </p>
        </div>
      </div>

      <div className="row">
        
      </div>
    </footer>
  );
};

export default Footer;
