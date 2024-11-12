import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, Clock, Send } from 'lucide-react';
import { Container, Section } from '../components/Layout';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

// Constants
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_g6ux03n',
  TEMPLATE_ID: 'template_imwzixi',
  PUBLIC_KEY: '7uF-2B6L1vWtfD5sy'
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 初始化 EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const toastId = toast.loading('Sending your message...');
    
    try {
      const templateParams = {
        to_email: 'myprophub.dev@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: `New ${formData.subject} Inquiry from MyPropHub`,
        message: formData.message,
        service_type: formData.subject
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      // 发送成功后清空表单
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      toast.success('Message sent successfully! We will contact you soon.', {
        id: toastId,
        duration: 5000
      });

    } catch (error) {
      // 发送失败
      console.error('Email error:', error);
      
      // 显示错误信息
      toast.error('Failed to send message. Please try WhatsApp instead.', {
        id: loadingToast,
        duration: 5000,
        icon: '❌'
      });

      // 可以自动打开 WhatsApp
      setTimeout(() => {
        const whatsappURL = `https://wa.me/601133698121?text=Hi,%20I%20tried%20to%20send%20a%20message%20through%20your%20website%20but%20encountered%20an%20error.%20My%20name%20is%20${formData.name}`;
        window.open(whatsappURL, '_blank');
      }, 3000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Section className="py-4 sm:py-6 md:py-10">
    <Toaster 
      position="top-center"
      toastOptions={{
        success: {
          style: {
            background: '#10B981',
            color: 'white',
          },
        },
        error: {
          style: {
            background: '#EF4444',
            color: 'white',
          },
        },
        loading: {
          style: {
            background: '#3B82F6',
            color: 'white',
          },
        },
      }}
    />
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+60"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Required *
                  </label>
                  <select
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    disabled={isSubmitting}
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell us about your property needs..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  disabled={isSubmitting}
                />
              </div>
                {/* 更新提交按钮 */}
                <button 
                type="submit" 
                className={`submit-button w-full flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary-dark'
                } text-white py-3 px-6 rounded-lg transition-colors`}
                disabled={isSubmitting}
                >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Contact;