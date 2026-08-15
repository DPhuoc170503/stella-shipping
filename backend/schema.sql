-- Navigation table
CREATE TABLE IF NOT EXISTS navigation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  path VARCHAR(255) NOT NULL,
  position INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE navigation;
INSERT INTO navigation (label, path, position) VALUES
('Trang chủ', '/', 1),
('Dịch vụ', '/services', 2),
('Bảng giá', '/pricing', 3),
('Về chúng tôi', '/about', 4),
('Tin tức', '/news', 5),
('Liên hệ', '/contact', 6);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  full_content TEXT,
  category VARCHAR(100) NOT NULL DEFAULT 'Công ty',
  author VARCHAR(200) NOT NULL DEFAULT '',
  img VARCHAR(500) NOT NULL DEFAULT '/Banner.jpg',
  read_time VARCHAR(50) NOT NULL DEFAULT '3 phút',
  status ENUM('published', 'draft') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(100) NOT NULL DEFAULT 'Biên tập viên',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS pricing_rates;

CREATE TABLE IF NOT EXISTS pricing_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route VARCHAR(255),
  origin VARCHAR(255),
  destination VARCHAR(255),
  service VARCHAR(100),
  service_type VARCHAR(100),
  price VARCHAR(100),
  price_from DECIMAL(12,2),
  transit_time VARCHAR(100),
  unit VARCHAR(50),
  currency VARCHAR(20),
  valid_until VARCHAR(100),
  note TEXT,
  notes TEXT,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- Seed admin users
TRUNCATE TABLE admin_users;
INSERT INTO admin_users (username, password, name, role) VALUES
('admin', '$2b$10$qPxyKJepKzRPBvk47PDkeOE2XOJOM.f8B52TcO1XIzi9DNyOosWQS', 'Admin', 'Quản trị viên');

-- Seed articles
TRUNCATE TABLE articles;
INSERT INTO articles (title, description, full_content, category, author, img, read_time, status) VALUES
('Dự Báo Cước Vận Tải Biển Quý 4/2024: Xu Hướng Tăng Giá Trở Lại',
 'Phân tích chuyên sâu về xu hướng giá cước container tuyến Á-Âu và Á-Mỹ. Tác động từ tình hình Biển Đỏ, nguồn cung tàu mới và nhu cầu peak season cuối năm lên chi phí vận chuyển.',
 'Theo báo cáo mới nhất từ bộ phận phân tích thị trường Stella Shipping, giá cước container tuyến Á-Âu dự kiến tăng 15-20% trong quý 4/2024 do nhu cầu mùa cao điểm và tình trạng tắc nghẽn tại kênh đào Suez.',
 'Thị trường', 'Phòng Phân Tích Thị Trường', '/Shippinglines.jpg', '5 phút', 'published'),

('Stella Shipping Khai Trương Trung Tâm Logistics 5.000m² Tại Bình Dương',
 'Nhằm đáp ứng nhu cầu ngày càng tăng từ khối thương mại điện tử và sản xuất, Stella Shipping đưa vào hoạt động trung tâm logistics hiện đại tại KCN VSIP Bình Dương.',
 'Trung tâm mới được trang bị hệ thống WMS tiên tiến, khu vực cross-docking chuyên dụng và hệ thống kiểm soát nhiệt độ cho hàng cold chain.',
 'Công ty', 'Ban Truyền Thông', '/Logictis.jpg', '4 phút', 'published'),

('Lộ Trình Net-Zero: Stella Triển Khai 50 Xe Điện Giao Nhận Nội Thành',
 'Stella Shipping công bố giai đoạn 1 của chiến lược Net-Zero Logistics, thay thế 30% đội xe giao nhận nội thành bằng xe điện tại TP.HCM và Hà Nội.',
 'Đầu tư hơn 15 tỷ đồng cho 50 xe tải điện và hạ tầng trạm sạc, Stella Shipping kỳ vọng giảm 200 tấn CO2/năm.',
 'Bền vững', 'Ban Phát Triển Bền Vững', '/INTERMODA.jpg', '6 phút', 'published'),

('Ra Mắt Tuyến Vận Tải Đa Phương Thức Việt Nam – Trung Quốc Qua Đường Sắt',
 'Kết hợp đường bộ và đường sắt xuyên biên giới, tuyến dịch vụ mới giúp rút ngắn 20% thời gian và giảm 15% chi phí so với đường biển truyền thống.',
 'Tuyến Hà Nội – Nam Ninh – Trùng Khánh hoạt động 2 chuyến/tuần, phục vụ hàng điện tử, linh kiện ô tô và hàng tiêu dùng.',
 'Dịch vụ', 'Phòng Phát Triển Dịch Vụ', '/OURRANGE.jpg', '3 phút', 'published'),

('Track & Trace 2.0: Dự Báo ETA Chính Xác 95% Nhờ AI Và Machine Learning',
 'Nâng cấp lớn cho hệ thống tracking — tích hợp AI phân tích dữ liệu hàng hải, thời tiết và tắc nghẽn cảng để dự báo thời gian đến chính xác hơn.',
 'Hệ thống mới phân tích hơn 50 biến số bao gồm lịch trình tàu, điều kiện thời tiết, mức độ tắc nghẽn cảng.',
 'Công nghệ', 'Phòng Công Nghệ', '/AirFreight.jpg', '4 phút', 'published'),

('Stella Shipping Tại Transport Logistic Southeast Asia 2024',
 'Đội ngũ Stella gặp gỡ hơn 300 đối tác quốc tế, ký kết 5 MOU hợp tác mới và trình diễn nền tảng công nghệ logistics tại triển lãm.',
 'Tại gian hàng #B234, Stella Shipping giới thiệu giải pháp digital freight forwarding và cổng khách hàng trực tuyến.',
 'Sự kiện', 'Phòng Marketing', '/Chacracter.jpg', '3 phút', 'published'),

('Phân Tích: Tác Động Của Biển Đỏ Đến Chuỗi Cung Ứng Việt Nam',
 'Tình hình an ninh tại Biển Đỏ buộc các hãng tàu chuyển tuyến qua Mũi Hảo Vọng, kéo dài transit time 10-14 ngày và đẩy giá cước tăng mạnh.',
 'Báo cáo phân tích chi tiết tác động của cuộc khủng hoảng Biển Đỏ lên 3 tuyến vận tải chính từ Việt Nam.',
 'Thị trường', 'Phòng Phân Tích Thị Trường', '/Banner.jpg', '7 phút', 'published'),

('Stella Shipping Đạt Chứng Nhận AEO — Doanh Nghiệp Ưu Tiên Hải Quan',
 'Trở thành một trong số ít doanh nghiệp logistics Việt Nam được Tổng Cục Hải Quan công nhận AEO, rút ngắn 50% thời gian thông quan.',
 'Chứng nhận AEO cho phép Stella Shipping được hưởng ưu đãi: giảm tỷ lệ kiểm tra hàng hóa xuống dưới 5%.',
 'Công ty', 'Ban Lãnh Đạo', '/Shippinglines.jpg', '3 phút', 'published'),

('Dịch Vụ Cold Chain Logistics: Vận Chuyển Hàng Đông Lạnh Xuyên Biên Giới',
 'Giải pháp trọn gói cho nông sản, thủy sản và dược phẩm — kiểm soát nhiệt độ từ -25°C đến +8°C trên toàn tuyến vận chuyển.',
 'Stella Shipping triển khai fleet reefer container và xe tải lạnh chuyên dụng, kết hợp hệ thống IoT giám sát nhiệt độ real-time.',
 'Dịch vụ', 'Phòng Phát Triển Dịch Vụ', '/INTERMODA.jpg', '4 phút', 'draft');

-- Quotes (Lead Management) table
CREATE TABLE IF NOT EXISTS quotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  origin VARCHAR(255),
  destination VARCHAR(255),
  service VARCHAR(100),
  cargo VARCHAR(255),
  note TEXT,
  status ENUM('new', 'contacted', 'closed', 'rejected') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Settings table for dynamic content
CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

TRUNCATE TABLE categories;
INSERT INTO categories (name, slug, description) VALUES
('Công ty', 'cong-ty', 'Tin tức nội bộ và thông báo của công ty'),
('Thị trường', 'thi-truong', 'Thông tin và phân tích thị trường logistics'),
('Dịch vụ', 'dich-vu', 'Cập nhật về các dịch vụ vận tải'),
('Công nghệ', 'cong-nghe', 'Ứng dụng công nghệ trong chuỗi cung ứng'),
('Bền vững', 'ben-vung', 'Các sáng kiến logistics xanh và Net-Zero'),
('Sự kiện', 'su-kien', 'Sự kiện, hội thảo và triển lãm');