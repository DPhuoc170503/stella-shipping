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

-- Pricing Rates table (Thêm DROP TABLE để làm sạch bảng cũ thiếu cột)
DROP TABLE IF EXISTS pricing_rates;

CREATE TABLE IF NOT EXISTS pricing_rates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  origin VARCHAR(255),
  destination VARCHAR(255),
  service VARCHAR(100),
  service_type VARCHAR(100),
  price VARCHAR(100),
  unit VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- Seed admin users
TRUNCATE TABLE admin_users;
INSERT INTO admin_users (username, password, name, role) VALUES
('admin', 'admin123', 'Admin', 'Quản trị viên'),
('editor', 'editor123', 'Editor', 'Biên tập viên');

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