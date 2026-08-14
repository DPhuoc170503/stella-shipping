const pool = require('../backend/db');

async function setupSettings() {
  try {
    console.log('Creating settings table...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS settings (
        setting_key VARCHAR(100) PRIMARY KEY,
        setting_value JSON NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    
    console.log('Inserting default home_page JSON...');
    await pool.query(`
      INSERT IGNORE INTO settings (setting_key, setting_value) VALUES (
        'home_page',
        '{
          "hero": {
            "eyebrow": "ĐỐI TÁC LOGISTICS TIN CẬY",
            "title_line1": "Vận chuyển ",
            "title_hl1": "an toàn",
            "title_line2": ",\\nnhanh chóng và ",
            "title_hl2": "toàn diện",
            "title_line3": "\\ncho doanh nghiệp của bạn",
            "lead": "Kết nối 120+ quốc gia — giải pháp vận tải biển, hàng không, đường bộ và kho bãi tối ưu chi phí cho chuỗi cung ứng của bạn. Cam kết giao hàng đúng hẹn 98%."
          },
          "services": [
            { "img": "/Shippinglines.jpg", "badge": "SHIPPING", "title": "Vận tải biển (FCL & LCL)", "desc": "Booking container tuyến toàn cầu, đàm phán giá cước cạnh tranh với 50+ hãng tàu hàng đầu. Hỗ trợ hàng nguy hiểm, quá khổ, reefer và project cargo.", "link": "/services/shipping-lines" },
            { "img": "/AirFreight.jpg", "badge": "AIR FREIGHT", "title": "Vận tải hàng không", "desc": "Giải pháp air freight cho hàng khẩn cấp và giá trị cao. Kết nối 80+ sân bay quốc tế với thời gian transit nhanh nhất thị trường.", "link": "/services/scheduled-flights" },
            { "img": "/INTERMODA.jpg", "badge": "INTERMODAL", "title": "Vận tải đa phương thức", "desc": "Kết hợp linh hoạt đường biển – bộ – sắt – hàng không. Tối ưu chi phí và thời gian cho từng tuyến vận chuyển cụ thể.", "link": "/services/intermodal" },
            { "img": "/Logictis.jpg", "badge": "LOGISTICS", "title": "Kho bãi & Phân phối", "desc": "Hệ thống kho 15.000m² với WMS hiện đại. Cross-docking, pick-pack, quản lý tồn kho và dịch vụ last-mile delivery.", "link": "/services/logistics" },
            { "img": "/OURRANGE.jpg", "badge": "CUSTOMS", "title": "Thủ tục Hải quan", "desc": "Đội ngũ chuyên viên hải quan giàu kinh nghiệm. Tư vấn mã HS, C/O, xử lý hồ sơ XNK. Cam kết thông quan trong 24 giờ.", "link": "/services/dedicated" },
            { "img": "/Chacracter.jpg", "badge": "CONSULTING", "title": "Tư vấn chuỗi cung ứng", "desc": "Phân tích và tối ưu toàn bộ supply chain: lộ trình, chi phí, rủi ro. Thiết kế giải pháp SCM tùy chỉnh cho từng ngành hàng.", "link": "/services/charters" }
          ],
          "why_choose_us": [
            { "icon": "🌐", "title": "Mạng lưới toàn cầu", "desc": "Đối tác đại lý tại 120+ quốc gia. Kết nối liền mạch từ cảng xuất đến kho nhận hàng cuối cùng." },
            { "icon": "💰", "title": "Chi phí tối ưu", "desc": "Hợp đồng dài hạn với hãng tàu & hãng bay. Cam kết giá cước cạnh tranh nhất thị trường." },
            { "icon": "📊", "title": "Công nghệ hiện đại", "desc": "Cổng khách hàng online, tracking real-time, API tích hợp ERP. Quản lý lô hàng mọi lúc, mọi nơi." },
            { "icon": "⏰", "title": "Phản hồi nhanh 2h", "desc": "Đội ngũ chuyên viên response trong 2 giờ làm việc. Account Manager riêng cho mỗi khách hàng." },
            { "icon": "🛡️", "title": "An toàn & Bảo hiểm", "desc": "Bảo hiểm hàng hóa toàn trình. Quy trình đóng gói, xếp dỡ và vận chuyển đạt chuẩn quốc tế." },
            { "icon": "📋", "title": "Chứng chỉ quốc tế", "desc": "ISO 9001, ISO 14001, AEO, FIATA, IATA. Đảm bảo chất lượng dịch vụ ở tiêu chuẩn cao nhất." },
            { "icon": "🌱", "title": "Logistics xanh", "desc": "Cam kết Net-Zero 2035. Ưu tiên phương tiện thân thiện môi trường và tối ưu carbon footprint." },
            { "icon": "🤝", "title": "Đồng hành dài hạn", "desc": "Tư vấn chiến lược SCM, không chỉ xử lý đơn hàng. Mối quan hệ đối tác thay vì giao dịch ngắn hạn." }
          ],
          "process": [
            { "num": "01", "title": "Yêu cầu báo giá", "desc": "Gửi thông tin lô hàng qua form, email hoặc hotline. Nhận báo giá chi tiết trong 2 giờ." },
            { "num": "02", "title": "Xác nhận & Booking", "desc": "Chốt phương án vận chuyển, xác nhận lịch trình và booking slot tàu/máy bay." },
            { "num": "03", "title": "Vận chuyển & Tracking", "desc": "Lô hàng được xử lý chuyên nghiệp. Theo dõi real-time qua cổng khách hàng." },
            { "num": "04", "title": "Giao hàng & Báo cáo", "desc": "Nhận hàng đúng hẹn. Báo cáo chi tiết về chi phí, thời gian và hiệu suất." }
          ]
        }'
      );
    `);
    
    console.log('Settings initialized successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

setupSettings();
