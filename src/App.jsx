import React, { useState } from 'react';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { Printer, Mail, Loader2, X } from 'lucide-react';

const initialData = {
  personal: {
    fullName: 'NIYOGISUBIZO jeremie',
    nationality: '',
    residentOf: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    email: '',
    phone: ''
  },
  experience: [
    {
      period: '',
      title: '',
      company: '',
      location: '',
      summary: '',
      responsibilities: '' // Will store as newline separated text
    }
  ],
  education: [
    {
      date: '',
      institution: '',
      location: '',
      degree: '',
      details: ''
    }
  ],
  skills: [
    { name: '', level: '', years: '' }
  ],
  languages: [
    { name: '', listening: '', reading: '', writing: '', speaking: '' }
  ],
  hobbies: [
    { name: '' }
  ],
  references: [
    { name: '', position: '', phone: '', email: '' }
  ]
};

function App() {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handlePrint = () => {
    window.print();
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const emailData = {
      service_id: 'service_4apqlns',
      template_id: 'template_ooiwovl',
      user_id: 'd8WlbgVwm_iYobtTB',
      template_params: {
        from_name: contactForm.name,
        reply_to: contactForm.email,
        message: contactForm.message,
        to_name: 'Jeremie'
      }
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setShowModal(false);
        setContactForm({ name: '', email: '', message: '' });
      } else {
        const err = await response.text();
        throw new Error(err);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Professional CV Builder</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <p className="app-subtitle" style={{ margin: 0 }}>by Jeremie Template</p>
          <button className="btn-glow" onClick={() => setShowModal(true)}>
            <Mail size={16} /> Get in touch with Jeremie
          </button>
        </div>
      </header>

      <CVForm data={data} updateData={setData} />
      <CVPreview data={data} />

      <button className="btn-print" onClick={handlePrint}>
        <Printer size={20} />
        {data.personal.fullName ? `Print ${data.personal.fullName}'s CV` : 'Print CV'}
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}><X size={24} /></button>
            <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Get in touch with Jeremie</h2>
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  required 
                  value={contactForm.name} 
                  onChange={e => setContactForm({...contactForm, name: e.target.value})} 
                  placeholder="Your Name" 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  required 
                  type="email" 
                  value={contactForm.email} 
                  onChange={e => setContactForm({...contactForm, email: e.target.value})} 
                  placeholder="Your Email" 
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                  required 
                  rows="4" 
                  value={contactForm.message} 
                  onChange={e => setContactForm({...contactForm, message: e.target.value})} 
                  placeholder="Hi Jeremie..." 
                />
              </div>
              <button 
                type="submit" 
                disabled={isSending} 
                style={{ 
                  width: '100%', 
                  padding: '0.8rem', 
                  background: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: isSending ? 'not-allowed' : 'pointer',
                  opacity: isSending ? 0.7 : 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
