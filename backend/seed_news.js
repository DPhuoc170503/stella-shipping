const pool = require('./db');

async function seedNews() {
  const news = [
    {
      title: 'VILOG 2026: Kiến tạo chuỗi cung ứng thông minh và bền vững',
      desc: 'Triển lãm Quốc tế Logistics Việt Nam lần thứ 4 (VILOG 2026) diễn ra tại TP.HCM với sự tham gia của 450 doanh nghiệp toàn cầu.',
      fullDesc: 'Từ ngày 30/7 đến 01/8/2026, Triển lãm Quốc tế Logistics Việt Nam lần thứ 4 (VILOG 2026) đã diễn ra tại TP. Hồ Chí Minh với chủ đề "Kiến tạo thông minh và bền vững". <br/><br/>Sự kiện thu hút hơn 450 doanh nghiệp từ 22 quốc gia và vùng lãnh thổ, trở thành diễn đàn quan trọng để kết nối các giải pháp công nghệ, chuyển đổi số và thúc đẩy phát triển logistics xanh tại Việt Nam. Trọng tâm của triển lãm năm nay là ứng dụng trí tuệ nhân tạo (AI) và tự động hóa trong quản lý kho bãi, đáp ứng xu hướng Net-Zero toàn cầu.',
      category: 'Sự kiện',
      author: 'Ban Tin Tức',
      img: '/Chacracter.jpg',
      readTime: '3 phút',
      status: 'published'
    },
    {
      title: 'Kim ngạch xuất nhập khẩu tăng trưởng 27.1%: Ngành Logistics hưởng lợi',
      desc: 'Nửa đầu năm 2026 chứng kiến sự tăng tốc ngoạn mục của xuất nhập khẩu, tạo đà phục hồi mạnh mẽ cho các doanh nghiệp logistics.',
      fullDesc: 'Trong 6 tháng đầu năm 2026, tổng kim ngạch xuất nhập khẩu hàng hóa của Việt Nam đạt gần 550 tỷ USD, tăng 27,1% so với cùng kỳ năm trước. <br/><br/>Việc các thị trường chủ lực như Mỹ và châu Âu phục hồi sức mua đã giúp các hãng tàu, công ty giao nhận và quản lý chuỗi cung ứng ghi nhận sản lượng vận chuyển tăng đột biến. Tuy nhiên, tình trạng thiếu hụt container cục bộ đang bắt đầu xuất hiện tại một số cảng chính do thời gian xoay vòng container bị kéo dài bởi ảnh hưởng từ khu vực Biển Đỏ.',
      category: 'Thị trường',
      author: 'Phòng Phân Tích',
      img: '/Shippinglines.jpg',
      readTime: '4 phút',
      status: 'published'
    },
    {
      title: 'Xu hướng Logistics Xanh 2026: Bắt buộc để hội nhập',
      desc: 'Áp lực từ quy định EU ETS và các tiêu chuẩn ESG quốc tế buộc doanh nghiệp logistics Việt Nam phải nhanh chóng chuyển đổi xanh.',
      fullDesc: 'Ngành logistics Việt Nam hiện được tái định vị là hạ tầng kinh tế chiến lược và vận hành theo ba trụ cột chính, trong đó Logistics Xanh đóng vai trò then chốt.<br/><br/>Trước áp lực từ các quy định quốc tế (như cơ chế EU ETS cho vận tải biển áp dụng thuế carbon), các doanh nghiệp Việt Nam đang đẩy mạnh sử dụng phương tiện tiết kiệm nhiên liệu, đầu tư xe tải điện cho chặng giao hàng cuối (last-mile) và điện mặt trời áp mái tại các kho bãi. Việc tuân thủ các tiêu chuẩn quốc tế về môi trường và an toàn hàng hóa giờ đây không còn là lựa chọn, mà là yêu cầu bắt buộc để tham gia sâu vào chuỗi cung ứng toàn cầu.',
      category: 'Bền vững',
      author: 'Ban Phát Triển Bền Vững',
      img: '/INTERMODA.jpg',
      readTime: '5 phút',
      status: 'published'
    }
  ];

  for (const n of news) {
    await pool.query(
      `INSERT INTO articles (title, description, full_content, category, author, img, read_time, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [n.title, n.desc, n.fullDesc, n.category, n.author, n.img, n.readTime, n.status]
    );
  }
  console.log('Thêm tin tức thành công!');
  process.exit(0);
}
seedNews();
