// ── NAV ACTIVE LINK ──
const EMAILJS_CONFIG = {
  serviceId: 'service_dxu6kij',
  templateId: 'template_dk56jum',
  publicKey: 'QtC-46Q0dsIa0AjE4',
  recipient: 'gamithfernando311@gmail.com'
};

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });

  // Hamburger
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
});

function setContactStatus(message, isError) {
  const statusEl = document.getElementById('contactStatus');
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#ff6b35' : 'var(--text-dim)';
}

function getContactValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

async function sendMail() {
  const name = getContactValue('contactName');
  const email = getContactValue('contactEmail');
  const subject = getContactValue('contactSubject');
  const message = getContactValue('contactMessage');
  const button = document.querySelector('.btn-primary');

  if (!name || !email || !subject || !message) {
    setContactStatus('Please fill in all fields.', true);
    return;
  }

  if (!window.emailjs) {
    setContactStatus('Email service is unavailable. Please try again later.', true);
    return;
  }

  try {
    setContactStatus('Sending message...', false);
    if (button) button.disabled = true;

    window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

    await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
      from_name: name,
      from_email: email,
      reply_to: email,
      subject: subject,
      message: message
    });

    setContactStatus('Message sent successfully!', false);
    const nameEl = document.getElementById('contactName');
    const emailEl = document.getElementById('contactEmail');
    const subjectEl = document.getElementById('contactSubject');
    const messageEl = document.getElementById('contactMessage');
    if (nameEl) nameEl.value = '';
    if (emailEl) emailEl.value = '';
    if (subjectEl) subjectEl.value = '';
    if (messageEl) messageEl.value = '';
  } catch (error) {
    setContactStatus('Message failed to send. Please try again.', true);
    console.error('EmailJS error:', error);
  } finally {
    if (button) button.disabled = false;
  }
}
