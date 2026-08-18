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
        <a href="tel:0901048137" className="chat-btn chat-phone" data-tooltip="Gọi Hotline">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </a>

        <a href="https://m.me/stellashipping" target="_blank" rel="noopener noreferrer" className="chat-btn chat-messenger" data-tooltip="Chat Messenger">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="#fff">
            <path d="M16 2.667C8.637 2.667 2.667 8.156 2.667 14.933c0 3.882 1.94 7.348 4.965 9.615v4.785l4.524-2.482c1.233.342 2.537.525 3.844.525 7.363 0 13.333-5.489 13.333-12.266S23.363 2.667 16 2.667zm1.385 16.326l-3.52-3.757-6.863 3.757 7.558-8.016 3.633 3.757 6.75-3.757-7.558 8.016z" />
          </svg>
        </a>

        <a href="https://zalo.me/0901048137" target="_blank" rel="noopener noreferrer" className="chat-btn chat-zalo" data-tooltip="Chat Zalo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z" />
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
