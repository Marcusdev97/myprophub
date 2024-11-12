// src/js/services/emailService.js
export const sendContactEmail = async (formData) => {
    // 这里用 formsubmit.co 服务，它是免费的而且不需要后端
    const endpoint = 'https://formsubmit.co/myprophub.dev@gmail.com';  // 替换成你的邮箱
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _template: 'table' // 使用表格模板
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      return { success: true };
    } catch (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }
  };