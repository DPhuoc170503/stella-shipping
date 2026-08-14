import React, { useState } from 'react'

const css = `
  .chat-widget {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }
  
  .chat-btn {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
    text-decoration: none;
    position: relative;
  }
  
  .chat-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  }

  /* Tooltip */
  .chat-btn::before {
    content: attr(data-tooltip);
    position: absolute;
    right: 100%;
    margin-right: 12px;
    background: #0f2b57;
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateX(10px);
    transition: all 0.3s;
    font-family: 'Be Vietnam Pro', sans-serif;
  }
  .chat-btn::after {
    content: '';
    position: absolute;
    right: 100%;
    margin-right: 4px;
    border: 6px solid transparent;
    border-left-color: #0f2b57;
    opacity: 0;
    pointer-events: none;
    transform: translateX(10px);
    transition: all 0.3s;
  }
  .chat-btn:hover::before,
  .chat-btn:hover::after {
    opacity: 1;
    transform: translateX(0);
  }

  .chat-zalo { background: #0068ff; }
  .chat-messenger { background: linear-gradient(45deg, #00B2FF, #006AFF); }
  .chat-phone { background: linear-gradient(135deg, #f36c1f, #e05a10); }

  /* Animation for main toggle button */
  .chat-toggle {
    background: #0f2b57;
    border: none;
    outline: none;
  }
  .chat-toggle svg {
    transition: transform 0.3s;
  }
  .chat-toggle.active svg {
    transform: rotate(45deg);
  }

  .chat-menu {
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px) scale(0.8);
    transform-origin: bottom center;
  }
  .chat-menu.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }
  
  @media (max-width: 768px) {
    .chat-widget { bottom: 20px; right: 20px; }
    .chat-btn { width: 50px; height: 50px; }
    .chat-btn::before, .chat-btn::after { display: none; }
  }
`

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="chat-widget">
      <style>{css}</style>
      
      <div className={`chat-menu ${isOpen ? 'open' : ''}`}>
        <a href="tel:19006868" className="chat-btn chat-phone" data-tooltip="Gọi Hotline">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>
        
        <a href="https://m.me/stellashipping" target="_blank" rel="noopener noreferrer" className="chat-btn chat-messenger" data-tooltip="Chat Messenger">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="#fff">
            <path d="M16 2.667C8.637 2.667 2.667 8.156 2.667 14.933c0 3.882 1.94 7.348 4.965 9.615v4.785l4.524-2.482c1.233.342 2.537.525 3.844.525 7.363 0 13.333-5.489 13.333-12.266S23.363 2.667 16 2.667zm1.385 16.326l-3.52-3.757-6.863 3.757 7.558-8.016 3.633 3.757 6.75-3.757-7.558 8.016z" />
          </svg>
        </a>
        
        <a href="https://zalo.me/0912345678" target="_blank" rel="noopener noreferrer" className="chat-btn chat-zalo" data-tooltip="Chat Zalo">
          <svg width="34" height="34" viewBox="0 0 2500 2500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1250 2500c690.356 0 1250-559.644 1250-1250S1940.356 0 1250 0 0 559.644 0 1250s559.644 1250 1250 1250z" fill="#0068ff"/>
            <path d="M1649.95 1060.03c-28.7-27.16-72.93-41.97-133.02-41.97h-284.15c-15.19 0-27.5 12.31-27.5 27.5v447.88c0 15.19 12.31 27.5 27.5 27.5h103.11c15.19 0 27.5-12.31 27.5-27.5v-274.63h137.93c126.79 0 200.7-56.12 200.7-160.06 0-41.22-19.14-76.43-52.07-98.72z" fill="#fff"/>
            <path d="M1363.89 1218.78h-117.8c-10.02 0-18.15-8.13-18.15-18.15v-109.9c0-10.02 8.13-18.15 18.15-18.15h117.8c66.72 0 102.6 25.04 102.6 73.1s-35.88 73.1-102.6 73.1z" fill="#0068ff"/>
            <path d="M834.7 1520.94H722.95c-15.19 0-27.5-12.31-27.5-27.5v-447.88c0-15.19 12.31-27.5 27.5-27.5H834.7c15.19 0 27.5 12.31 27.5 27.5v447.88c0 15.19-12.31 27.5-27.5 27.5z" fill="#fff"/>
            <path d="M1105.74 1515.65c-20.95 5.6-46.06 8.35-76.12 8.35-154.2 0-221.73-67.62-221.73-195.4v-114.73c0-128.06 67.53-195.84 221.73-195.84 30.12 0 55.22 2.75 76.12 8.35v108.62c-20.06-9.82-45.74-14.88-78.07-14.88-66.97 0-101.44 26.6-101.44 86.84v128.6c0 60.15 34.47 86.66 101.44 86.66 32.33 0 58.01-5.06 78.07-14.88v108.31z" fill="#fff"/>
          </svg>
        </a>
      </div>

      <button className={`chat-btn chat-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12"></path>
          ) : (
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          )}
        </svg>
      </button>
    </div>
  )
}
