const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

// ✅ OTP email — Forget Password ke liye
const sendOtpEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"VocalLocal" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🔐 Password Reset OTP - VocalLocal',
    html: `
      <div style="font-family:sans-serif; max-width:420px; margin:auto; background:#0f172a; padding:32px; border-radius:16px;">
        <h2 style="color:#f59e0b; margin-bottom:8px;">VocalLocal 🔐</h2>
        <p style="color:#94a3b8; font-size:15px;">Aapne password reset request ki hai.</p>
        <div style="background:#1e293b; border-radius:12px; padding:24px; text-align:center; margin:24px 0;">
          <p style="color:#64748b; font-size:13px; margin-bottom:8px;">Aapka OTP:</p>
          <h1 style="color:#fff; letter-spacing:12px; font-size:36px; margin:0;">${otp}</h1>
        </div>
        <p style="color:#64748b; font-size:13px;">⏰ Ye OTP sirf <b style="color:#f59e0b;">10 minutes</b> tak valid hai.</p>
        <p style="color:#64748b; font-size:12px; margin-top:16px;">Agar aapne ye request nahi ki toh is email ko ignore kar dein.</p>
        <hr style="border-color:#1e293b; margin:24px 0;"/>
        <p style="color:#334155; font-size:11px; text-align:center;">VocalLocal — Pilibhit ka apna service marketplace</p>
      </div>
    `
  });
};

// ✅ Booking notification — Professional ke liye
const sendBookingEmail = async (professionalEmail, customer, bookingData) => {
  if (!professionalEmail) return;

  await transporter.sendMail({
    from: `"VocalLocal" <${process.env.EMAIL_USER}>`,
    to: professionalEmail,
    subject: '🔔 Naya Booking Request - VocalLocal',
    html: `
      <div style="font-family:sans-serif; max-width:480px; margin:auto; background:#0f172a; padding:32px; border-radius:16px;">
        <h2 style="color:#f59e0b;">🎉 Aapko naya booking mila!</h2>
        <p style="color:#94a3b8;">Ek customer ne aapki service book ki hai:</p>
        <div style="background:#1e293b; border-radius:12px; padding:20px; margin:20px 0;">
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">👤 Customer</td>
                <td style="padding:8px 0; color:#fff; font-weight:bold;">${customer?.name}</td></tr>
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">📞 Phone</td>
                <td style="padding:8px 0; color:#fff;">${customer?.phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">🔧 Service</td>
                <td style="padding:8px 0; color:#fff;">${bookingData.service}</td></tr>
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">📅 Date</td>
                <td style="padding:8px 0; color:#fff;">${bookingData.date}</td></tr>
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">⏰ Time</td>
                <td style="padding:8px 0; color:#fff;">${bookingData.time}</td></tr>
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">📍 Address</td>
                <td style="padding:8px 0; color:#fff;">${bookingData.address}</td></tr>
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">📝 Problem</td>
                <td style="padding:8px 0; color:#fff;">${bookingData.description || '-'}</td></tr>
            <tr><td style="padding:8px 0; color:#64748b; font-size:13px;">💰 Rate</td>
                <td style="padding:8px 0; color:#f59e0b; font-weight:bold;">₹${bookingData.price}/hr</td></tr>
          </table>
        </div>
        <p style="color:#64748b; font-size:12px;">Customer se contact karo aur time pe pahuncho! 💪</p>
        <hr style="border-color:#1e293b; margin:20px 0;"/>
        <p style="color:#334155; font-size:11px; text-align:center;">VocalLocal — Pilibhit ka apna service marketplace</p>
      </div>
    `
  });
};

module.exports = { sendOtpEmail, sendBookingEmail };