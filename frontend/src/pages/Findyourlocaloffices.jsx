import React from 'react'

export default function FindYourLocalOffices() {
  const offices = [
    {
      city: 'Hà Nội',
      address: 'Tầng 5, Tòa nhà ABC, 123 Đường Láng, Hà Nội',
      phone: '+84 24 1234 5678',
      email: 'hanoi@stellashipping.example',
      map: 'https://www.google.com/maps',
      img: '/Banner.jpg'
    }
  ]

  return (
    <div className="container">
      <section className="page-title">
        <div className="kicker">VĂN PHÒNG</div>
        <h1>Tìm văn phòng của chúng tôi tại Việt Nam</h1>
        <p className="lead">Chúng tôi có mạng lưới văn phòng phủ khắp để hỗ trợ dịch vụ logistics, khai báo hải quan và giải pháp vận tải cho doanh nghiệp.</p>
      </section>

      <section style={{ display: 'grid', gap: 20, marginTop: 18 }}>
        {offices.map((o) => (
          <article key={o.city} style={{ display: 'flex', gap: 18, alignItems: 'center', padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 6px 18px rgba(10,20,35,0.04)' }}>
            <img src={o.img} alt={o.city} style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 6 }} />
            <div>
              <h3 style={{ margin: 0 }}>{o.city}</h3>
              <p style={{ margin: '6px 0' }}>{o.address}</p>
              <p style={{ margin: '6px 0' }}><strong>Điện thoại:</strong> {o.phone} • <strong>Email:</strong> {o.email}</p>
              <div style={{ marginTop: 8 }}>
                <a className="btn" href={o.map} target="_blank" rel="noreferrer" style={{ marginRight: 8 }}>Xem bản đồ</a>
                <a className="btn btn-primary" href="/contact">Liên hệ văn phòng</a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
