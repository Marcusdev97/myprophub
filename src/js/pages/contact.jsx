import React, { useState } from 'react';
import { Phone, Mail, Globe, Clock, Send } from 'lucide-react';
import { Container, Section } from '../components/Layout';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Section className="py-4 sm:py-6 md:py-10">
      <Container size="default" className="max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 sm:mb-3">Contact Us</h1>
          <p className="text-center text-gray-600 text-sm sm:text-base max-w-xl px-4 sm:px-0">
            Looking for your dream property in Malaysia? Our professional property consultants 
            are ready to assist you online with all your real estate needs.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-4 sm:gap-6">
          {/* Contact Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex flex-col gap-6">
              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <Phone className="icon" />
                </div>
                <div className="contact-info__content">
                  <h3>Phone / WhatsApp</h3>
                  <p>+60 11-3369 8121</p>
                  <a 
                    href="https://wa.me/601133698121" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-info__link"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <Mail className="icon" />
                </div>
                <div className="contact-info__content">
                  <h3>Email</h3>
                  <a 
                    href="mailto:myprophub.dev@gmail.com"
                    className="contact-info__link"
                  >
                    myprophub.dev@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <Globe className="icon" />
                </div>
                <div className="contact-info__content">
                  <h3>Service Coverage</h3>
                  <p>Online Service Available</p>
                  <p>Throughout Malaysia</p>
                </div>
              </div>

              <div className="contact-info__item">
                <div className="contact-info__icon">
                  <Clock className="icon" />
                </div>
                <div className="contact-info__content">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday</p>
                  <p>10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+60"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Service Required *</label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  >
                    <option value="">Select a service</option>
                    <option value="buy">Buy Property</option>
                    <option value="sell">Sell Property</option>
                    <option value="rent">Rent Property</option>
                    <option value="loan">Loan Service</option>
                  </select>
                </div>
              </div>

              <div className="form-group mb-6">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell us about your property needs..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button type="submit" className="submit-button">
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;