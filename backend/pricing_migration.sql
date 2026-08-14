USE vietlogis_demo;

TRUNCATE TABLE pricing_rates;

-- ── Vận tải biển FCL ──
INSERT INTO pricing_rates (service_type, route, unit, price_from, currency, transit_time, note) VALUES
('sea_fcl', 'TP.HCM → Shanghai (Trung Quốc)', "20' DC", 320, 'USD', '5–7 ngày', 'Giá cước thuần, chưa gồm phụ phí'),
('sea_fcl', 'TP.HCM → Shanghai (Trung Quốc)', "40' HC", 520, 'USD', '5–7 ngày', 'Giá cước thuần, chưa gồm phụ phí'),
('sea_fcl', 'TP.HCM → Busan (Hàn Quốc)', "20' DC", 380, 'USD', '5–6 ngày', 'Giá cước thuần, chưa gồm phụ phí'),
('sea_fcl', 'TP.HCM → Busan (Hàn Quốc)', "40' HC", 620, 'USD', '5–6 ngày', 'Giá cước thuần, chưa gồm phụ phí'),
('sea_fcl', 'TP.HCM → Rotterdam (Hà Lan)', "20' DC", 1200, 'USD', '28–32 ngày', 'Qua kênh đào Suez'),
('sea_fcl', 'TP.HCM → Rotterdam (Hà Lan)', "40' HC", 2100, 'USD', '28–32 ngày', 'Qua kênh đào Suez'),
('sea_fcl', 'TP.HCM → Los Angeles (Mỹ)', "20' DC", 1800, 'USD', '18–22 ngày', NULL),
('sea_fcl', 'TP.HCM → Los Angeles (Mỹ)', "40' HC", 3200, 'USD', '18–22 ngày', NULL),
('sea_fcl', 'Hà Nội → Singapore', "20' DC", 290, 'USD', '4–5 ngày', 'Từ cảng Hải Phòng'),
('sea_fcl', 'Hà Nội → Singapore', "40' HC", 480, 'USD', '4–5 ngày', 'Từ cảng Hải Phòng');

-- ── Vận tải biển LCL ──
INSERT INTO pricing_rates (service_type, route, unit, price_from, currency, transit_time, note) VALUES
('sea_lcl', 'TP.HCM → Shanghai', 'CBM', 28, 'USD', '7–10 ngày', 'Tối thiểu 1 CBM'),
('sea_lcl', 'TP.HCM → Busan', 'CBM', 32, 'USD', '8–10 ngày', 'Tối thiểu 1 CBM'),
('sea_lcl', 'TP.HCM → Rotterdam', 'CBM', 65, 'USD', '30–35 ngày', 'Tối thiểu 1 CBM'),
('sea_lcl', 'TP.HCM → Los Angeles', 'CBM', 82, 'USD', '20–25 ngày', 'Tối thiểu 1 CBM'),
('sea_lcl', 'TP.HCM → Singapore', 'CBM', 18, 'USD', '3–4 ngày', 'Tối thiểu 0.5 CBM'),
('sea_lcl', 'Hà Nội → Nhật Bản', 'CBM', 38, 'USD', '10–12 ngày', 'Từ cảng Hải Phòng');

-- ── Hàng không ──
INSERT INTO pricing_rates (service_type, route, unit, price_from, currency, transit_time, note) VALUES
('air', 'TP.HCM → Seoul (ICN)', 'kg', 3.2, 'USD', '2–3 ngày', 'Tối thiểu 45 kg; charg. weight'),
('air', 'TP.HCM → Tokyo (NRT)', 'kg', 3.8, 'USD', '2–3 ngày', 'Tối thiểu 45 kg'),
('air', 'TP.HCM → Frankfurt (FRA)', 'kg', 5.5, 'USD', '3–4 ngày', 'Tối thiểu 45 kg'),
('air', 'TP.HCM → Los Angeles (LAX)', 'kg', 6.2, 'USD', '4–5 ngày', 'Tối thiểu 100 kg'),
('air', 'TP.HCM → Dubai (DXB)', 'kg', 4.0, 'USD', '2–3 ngày', 'Tối thiểu 45 kg'),
('air', 'Hà Nội → Singapore (SIN)', 'kg', 2.8, 'USD', '1–2 ngày', 'Tối thiểu 45 kg');

-- ── Đường bộ ──
INSERT INTO pricing_rates (service_type, route, unit, price_from, currency, transit_time, note) VALUES
('road', 'TP.HCM → Hà Nội (Full truck)', 'chuyến', 35000000, 'VND', '2–3 ngày', 'Xe 15 tấn; phí cầu đường không bao gồm'),
('road', 'TP.HCM → Đà Nẵng (Full truck)', 'chuyến', 18000000, 'VND', '1–2 ngày', 'Xe 15 tấn'),
('road', 'TP.HCM → Phnom Penh (Full truck)', 'chuyến', 45000000, 'VND', '1–2 ngày', 'Gồm thủ tục biên giới'),
('road', 'Hà Nội → Côn Minh TQ (Full truck)', 'chuyến', 60000000, 'VND', '3–4 ngày', 'Qua cửa khẩu Lào Cai'),
('road', 'TP.HCM → Hà Nội (LTL)', 'tấn', 1800000, 'VND', '3–4 ngày', 'Hàng ghép, tối thiểu 500 kg'),
('road', 'TP.HCM → Bangkok (Full truck)', 'chuyến', 55000000, 'VND', '2–3 ngày', 'Qua cửa khẩu Mộc Bài');
