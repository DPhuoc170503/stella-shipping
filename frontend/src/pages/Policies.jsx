import React, { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

/* ─── Scroll-reveal hook ─── */
function useScrollReveal(deps = []) {
  const containerRef = useRef(null)
  useEffect(() => {
    if (!containerRef.current) return
    // Remove previous reveal classes so new content can animate in
    containerRef.current.querySelectorAll('.rvd').forEach(el => el.classList.remove('rvd'))
    // Small delay to let React re-render, then observe new elements
    const timer = setTimeout(() => {
      if (!containerRef.current) return
      const els = containerRef.current.querySelectorAll('.rv:not(.rvd)')
      if (!els.length) return
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('rvd'); io.unobserve(e.target) }
        }),
        { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
      )
      els.forEach((el) => io.observe(el))
    }, 50)
    return () => clearTimeout(timer)
  }, deps)
  return containerRef
}

const t_ui = {
  vi: {
    privacy: {
      kicker: 'CHÍNH SÁCH BẢO MẬT',
      title: 'Chính sách Bảo mật',
      updated: 'Cập nhật lần cuối: 01/08/2026',
      sections: [
        { h: '1. Thu thập thông tin', p: 'Chúng tôi thu thập các thông tin cá nhân mà bạn cung cấp khi sử dụng dịch vụ, bao gồm: họ tên, email, số điện thoại, địa chỉ, thông tin lô hàng và các dữ liệu liên quan đến giao dịch vận tải. Thông tin này được thu thập khi bạn đăng ký tài khoản, yêu cầu báo giá, liên hệ tư vấn hoặc sử dụng các dịch vụ trên website.' },
        { h: '2. Sử dụng thông tin', p: 'Thông tin thu thập được sử dụng để: xử lý yêu cầu báo giá và đơn hàng; cung cấp dịch vụ vận tải và logistics; liên lạc về trạng thái lô hàng; gửi thông báo dịch vụ và chương trình khuyến mãi (khi được đồng ý); cải thiện chất lượng dịch vụ và trải nghiệm người dùng; tuân thủ các yêu cầu pháp lý.' },
        { h: '3. Bảo vệ thông tin', p: 'Stella Shipping áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu cá nhân khỏi truy cập trái phép, mất mát, tiết lộ hoặc thay đổi. Chúng tôi sử dụng mã hóa SSL/TLS cho tất cả truyền tải dữ liệu, kiểm soát truy cập nghiêm ngặt và đánh giá bảo mật định kỳ.' },
        { h: '4. Chia sẻ thông tin', p: 'Chúng tôi không bán, trao đổi hay cho thuê thông tin cá nhân của bạn cho bên thứ ba. Thông tin chỉ được chia sẻ với đối tác vận tải trực tiếp liên quan đến việc thực hiện dịch vụ, cơ quan hải quan khi có yêu cầu pháp lý, và nhà cung cấp dịch vụ CNTT hỗ trợ vận hành hệ thống (theo thỏa thuận bảo mật nghiêm ngặt).' },
        { h: '5. Cookie', p: 'Website sử dụng cookie để cải thiện trải nghiệm duyệt web. Cookie giúp chúng tôi ghi nhớ tùy chọn ngôn ngữ, phân tích lưu lượng truy cập và tối ưu hóa nội dung. Bạn có thể quản lý cookie thông qua cài đặt trình duyệt.' },
        { h: '6. Quyền của bạn', p: 'Bạn có quyền: truy cập và xem lại dữ liệu cá nhân; yêu cầu chỉnh sửa thông tin không chính xác; yêu cầu xóa dữ liệu (trong phạm vi pháp luật cho phép); rút lại sự đồng ý cho các mục đích tiếp thị; khiếu nại với cơ quan bảo vệ dữ liệu.' },
        { h: '7. Liên hệ', p: 'Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ: Email: stella@stellashipping.com.vn | Hotline: 0901 048 137 | Địa chỉ: Số 26 Đường T2, Phường Long Bình, TP. Thủ Đức, TP.HCM' },
      ]
    },
    terms: {
      kicker: 'ĐIỀU KHOẢN SỬ DỤNG',
      title: 'Điều khoản Sử dụng',
      updated: 'Cập nhật lần cuối: 01/08/2026',
      sections: [
        { h: '1. Chấp nhận điều khoản', p: 'Bằng việc truy cập và sử dụng website stellashipping.com.vn, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản sử dụng sau đây. Nếu không đồng ý với bất kỳ điều khoản nào, vui lòng không tiếp tục sử dụng website.' },
        { h: '2. Dịch vụ', p: 'Stella Shipping cung cấp thông tin và dịch vụ vận tải quốc tế bao gồm vận tải biển, hàng không, đường bộ, kho bãi và thủ tục hải quan. Báo giá trên website mang tính tham khảo; giá chính thức sẽ được xác nhận qua hợp đồng dịch vụ riêng.' },
        { h: '3. Trách nhiệm người dùng', p: 'Người dùng cam kết cung cấp thông tin chính xác khi yêu cầu báo giá hoặc sử dụng dịch vụ. Không sử dụng website cho mục đích bất hợp pháp. Không cố gắng truy cập trái phép vào hệ thống. Không sao chép, phân phối nội dung mà không có sự đồng ý bằng văn bản.' },
        { h: '4. Sở hữu trí tuệ', p: 'Toàn bộ nội dung trên website bao gồm văn bản, hình ảnh, logo, thiết kế, mã nguồn thuộc quyền sở hữu của Stella Shipping hoặc các bên cấp phép. Việc sao chép, sử dụng lại mà không có sự cho phép bằng văn bản là vi phạm pháp luật sở hữu trí tuệ.' },
        { h: '5. Giới hạn trách nhiệm', p: 'Stella Shipping không chịu trách nhiệm cho: thiệt hại phát sinh từ việc sử dụng thông tin trên website; gián đoạn dịch vụ do nguyên nhân kỹ thuật hoặc bất khả kháng; nội dung của các website bên thứ ba được liên kết. Trách nhiệm vận chuyển cụ thể được quy định trong từng hợp đồng dịch vụ.' },
        { h: '6. Luật áp dụng', p: 'Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp phát sinh sẽ được giải quyết tại tòa án có thẩm quyền tại Thành phố Hồ Chí Minh, Việt Nam.' },
      ]
    },
    cookie: {
      kicker: 'CHÍNH SÁCH COOKIE',
      title: 'Chính sách Cookie',
      updated: 'Cập nhật lần cuối: 01/08/2026',
      sections: [
        { h: '1. Cookie là gì?', p: 'Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi truy cập website. Cookie giúp website hoạt động hiệu quả hơn và cung cấp thông tin cho chủ sở hữu website.' },
        { h: '2. Các loại cookie chúng tôi sử dụng', p: 'Cookie cần thiết: Bắt buộc để website hoạt động, bao gồm ghi nhớ phiên đăng nhập và tùy chọn ngôn ngữ. Cookie phân tích: Thu thập thông tin ẩn danh về cách người dùng sử dụng website (số trang xem, thời gian truy cập) để cải thiện trải nghiệm. Cookie chức năng: Ghi nhớ tùy chọn cá nhân như ngôn ngữ hiển thị và khu vực.' },
        { h: '3. Cookie của bên thứ ba', p: 'Chúng tôi có thể sử dụng dịch vụ phân tích của bên thứ ba (ví dụ: Google Analytics) để hiểu cách người dùng tương tác với website. Các dịch vụ này có thể đặt cookie riêng theo chính sách bảo mật của họ.' },
        { h: '4. Quản lý cookie', p: 'Bạn có thể kiểm soát và xóa cookie thông qua cài đặt trình duyệt. Lưu ý rằng việc vô hiệu hóa cookie có thể ảnh hưởng đến chức năng của một số tính năng trên website. Hướng dẫn cụ thể cho từng trình duyệt: Chrome: Cài đặt > Quyền riêng tư và bảo mật > Cookie. Firefox: Tùy chọn > Quyền riêng tư & Bảo mật. Safari: Tùy chọn > Quyền riêng tư.' },
        { h: '5. Đồng ý sử dụng cookie', p: 'Bằng việc tiếp tục sử dụng website sau khi được thông báo về cookie, bạn đồng ý cho phép chúng tôi sử dụng cookie như mô tả trong chính sách này.' },
        { h: '6. Cập nhật chính sách', p: 'Chúng tôi có thể cập nhật chính sách cookie theo thời gian. Mọi thay đổi sẽ được đăng tải trên trang này với ngày cập nhật mới. Vui lòng kiểm tra định kỳ để nắm bắt thông tin mới nhất.' },
      ]
    }
  },
  en: {
    privacy: {
      kicker: 'PRIVACY POLICY',
      title: 'Privacy Policy',
      updated: 'Last updated: August 1, 2026',
      sections: [
        { h: '1. Information Collection', p: 'We collect personal information that you provide when using our services, including: full name, email, phone number, address, shipment details, and data related to shipping transactions. This information is collected when you register an account, request a quote, contact us for consultation, or use services on our website.' },
        { h: '2. Use of Information', p: 'Collected information is used to: process quote requests and orders; provide transportation and logistics services; communicate shipment status; send service notifications and promotions (with consent); improve service quality and user experience; comply with legal requirements.' },
        { h: '3. Information Protection', p: 'Stella Shipping implements appropriate technical and organizational security measures to protect personal data from unauthorized access, loss, disclosure, or alteration. We use SSL/TLS encryption for all data transmission, strict access controls, and regular security assessments.' },
        { h: '4. Information Sharing', p: 'We do not sell, exchange, or rent your personal information to third parties. Information is only shared with transportation partners directly involved in service delivery, customs authorities when legally required, and IT service providers supporting system operations (under strict confidentiality agreements).' },
        { h: '5. Cookies', p: 'Our website uses cookies to improve browsing experience. Cookies help us remember language preferences, analyze traffic, and optimize content. You can manage cookies through your browser settings.' },
        { h: '6. Your Rights', p: 'You have the right to: access and review your personal data; request correction of inaccurate information; request data deletion (within legal bounds); withdraw consent for marketing purposes; file complaints with data protection authorities.' },
        { h: '7. Contact Us', p: 'If you have questions about our privacy policy, please contact us: Email: stella@stellashipping.com.vn | Hotline: 0901 048 137 | Address: No 26 Street T2, Long Binh Ward, Thu Duc City, HCMC' },
      ]
    },
    terms: {
      kicker: 'TERMS OF USE',
      title: 'Terms of Use',
      updated: 'Last updated: August 1, 2026',
      sections: [
        { h: '1. Acceptance of Terms', p: 'By accessing and using the stellashipping.com.vn website, you agree to comply with and be bound by the following terms of use. If you do not agree with any of these terms, please discontinue use of the website.' },
        { h: '2. Services', p: 'Stella Shipping provides information and international transportation services including ocean freight, air freight, road transport, warehousing, and customs clearance. Quotes on the website are for reference only; official pricing will be confirmed through individual service contracts.' },
        { h: '3. User Responsibilities', p: 'Users agree to provide accurate information when requesting quotes or using services. Do not use the website for illegal purposes. Do not attempt unauthorized access to systems. Do not copy or distribute content without written consent.' },
        { h: '4. Intellectual Property', p: 'All content on the website including text, images, logos, design, and source code is owned by Stella Shipping or its licensors. Copying or reuse without written permission constitutes a violation of intellectual property law.' },
        { h: '5. Limitation of Liability', p: 'Stella Shipping is not liable for: damages arising from the use of information on the website; service interruptions due to technical issues or force majeure; content of linked third-party websites. Specific transport liability is governed by individual service contracts.' },
        { h: '6. Governing Law', p: 'These terms are governed by Vietnamese law. Any disputes will be resolved at the competent court in Ho Chi Minh City, Vietnam.' },
      ]
    },
    cookie: {
      kicker: 'COOKIE POLICY',
      title: 'Cookie Policy',
      updated: 'Last updated: August 1, 2026',
      sections: [
        { h: '1. What are Cookies?', p: 'Cookies are small text files stored on your device when you visit a website. Cookies help the website function more efficiently and provide information to website owners.' },
        { h: '2. Types of Cookies We Use', p: 'Necessary Cookies: Required for website operation, including session management and language preferences. Analytics Cookies: Collect anonymous information about how users interact with the website (pages viewed, visit duration) to improve experience. Functional Cookies: Remember personal preferences such as display language and region.' },
        { h: '3. Third-Party Cookies', p: 'We may use third-party analytics services (e.g., Google Analytics) to understand how users interact with our website. These services may set their own cookies according to their privacy policies.' },
        { h: '4. Managing Cookies', p: 'You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of some website features. Browser-specific instructions: Chrome: Settings > Privacy and security > Cookies. Firefox: Options > Privacy & Security. Safari: Preferences > Privacy.' },
        { h: '5. Cookie Consent', p: 'By continuing to use the website after being notified about cookies, you consent to our use of cookies as described in this policy.' },
        { h: '6. Policy Updates', p: 'We may update our cookie policy from time to time. Any changes will be posted on this page with a new update date. Please check periodically for the latest information.' },
      ]
    }
  }
}

const css = `
  .rv{opacity:0;transform:translateY(36px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1);will-change:opacity,transform}
  .rvd{opacity:1!important;transform:translateY(0) translateX(0) scale(1)!important}
  .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}

  .pol-page{font-family:'Inter',sans-serif;color:#1a2744}

  /* Hero */
  .pol-hero{
    position:relative;min-height:320px;display:flex;align-items:center;
    background:linear-gradient(135deg,#061e2d 0%,#0f2b57 55%,#1e3f7a 100%);
    color:#fff;overflow:hidden;
  }
  .pol-hero::before{
    content:'';position:absolute;top:-30%;right:-10%;width:550px;height:550px;
    background:radial-gradient(circle,rgba(243,108,31,.12) 0%,transparent 70%);border-radius:50%;
  }
  .pol-hero-inner{position:relative;z-index:1;max-width:820px;margin:0 auto;text-align:center;padding:72px 28px 48px}
  .pol-hero .kicker{
    display:inline-block;color:#f36c1f;font-weight:700;letter-spacing:3px;font-size:12px;
    border:1px solid rgba(243,108,31,.4);padding:5px 16px;border-radius:20px;margin-bottom:18px;
    font-family:'Be Vietnam Pro',sans-serif;
  }
  .pol-hero h1{font-size:40px;font-weight:800;margin:0 0 12px;line-height:1.15;font-family:'Be Vietnam Pro',sans-serif}
  .pol-hero .updated{font-size:14px;color:rgba(255,255,255,.5)}

  /* Tabs */
  .pol-tabs{
    max-width:900px;margin:-28px auto 0;position:relative;z-index:10;padding:0 24px;
  }
  .pol-tabs-inner{
    display:flex;gap:4px;background:#fff;border-radius:14px;padding:6px;
    box-shadow:0 12px 40px rgba(10,20,40,.08);
  }
  .pol-tab{
    flex:1;padding:12px;border-radius:10px;border:none;background:transparent;
    font-size:14px;font-weight:700;color:#5a6f82;cursor:pointer;
    transition:all .25s;font-family:'Be Vietnam Pro',sans-serif;
  }
  .pol-tab.active{background:linear-gradient(135deg,#f36c1f,#e05a10);color:#fff;box-shadow:0 4px 14px rgba(243,108,31,.2)}
  .pol-tab:hover:not(.active){background:#f5f7fa}

  /* Content */
  .pol-main{max-width:900px;margin:0 auto;padding:48px 24px 80px}
  .pol-section{margin-bottom:36px}
  .pol-section h2{
    font-size:20px;font-weight:800;margin:0 0 12px;color:#0f2b57;
    font-family:'Be Vietnam Pro',sans-serif;
    padding-bottom:12px;border-bottom:2px solid #f0f4f8;
  }
  .pol-section p{
    font-size:15px;line-height:1.8;color:#3a4a5c;margin:0;
  }

  /* ToC sidebar on desktop */
  .pol-layout{display:flex;gap:40px;align-items:flex-start}
  .pol-toc{
    position:sticky;top:100px;width:240px;flex-shrink:0;
    background:#f9fafb;border-radius:14px;padding:20px;
    border:1px solid #edf1f7;
  }
  .pol-toc-title{font-size:12px;font-weight:700;color:#8a9ab5;letter-spacing:2px;text-transform:uppercase;margin:0 0 14px}
  .pol-toc a{
    display:block;font-size:13px;color:#5a6f82;text-decoration:none;
    padding:6px 10px;border-radius:6px;margin-bottom:4px;
    transition:all .2s;font-weight:500;
  }
  .pol-toc a:hover{background:#edf1f7;color:#0f2b57}
  .pol-toc a.active{background:rgba(243,108,31,.08);color:#f36c1f;font-weight:700}
  .pol-content{flex:1;min-width:0}

  @media(max-width:800px){
    .pol-hero h1{font-size:28px}
    .pol-layout{flex-direction:column}
    .pol-toc{width:100%;position:static}
    .pol-tabs-inner{flex-direction:column}
  }
`

export default function Policies() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'vi'
  const [activeTab, setActiveTab] = React.useState('privacy')
  const containerRef = useScrollReveal([activeTab])

  const data = t_ui[lang][activeTab]
  const tabs = [
    { key: 'privacy', label: lang === 'en' ? '🔒 Privacy Policy' : '🔒 Bảo mật' },
    { key: 'terms', label: lang === 'en' ? '📋 Terms of Use' : '📋 Điều khoản' },
    { key: 'cookie', label: lang === 'en' ? '🍪 Cookie Policy' : '🍪 Cookie' },
  ]

  return (
    <div className="pol-page" ref={containerRef}>
      <SEO title={data.title} />
      <style>{css}</style>

      {/* Hero */}
      <section className="pol-hero">
        <div className="pol-hero-inner">
          <span className="kicker rv">{data.kicker}</span>
          <h1 className="rv d1">{data.title}</h1>
          <div className="updated rv d2">{data.updated}</div>
        </div>
      </section>

      {/* Tabs */}
      <div className="pol-tabs rv d2">
        <div className="pol-tabs-inner">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`pol-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pol-main">
        <div className="pol-layout">
          {/* Table of Contents */}
          <nav className="pol-toc rv">
            <p className="pol-toc-title">{lang === 'en' ? 'Contents' : 'Mục lục'}</p>
            {data.sections.map((s, i) => (
              <a key={i} href={`#section-${i}`} onClick={e => {
                e.preventDefault()
                document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}>
                {s.h}
              </a>
            ))}
          </nav>

          {/* Sections */}
          <div className="pol-content">
            {data.sections.map((s, i) => (
              <div key={`${activeTab}-${i}`} id={`section-${i}`} className={`pol-section rv d${Math.min(i + 1, 3)}`}>
                <h2>{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
