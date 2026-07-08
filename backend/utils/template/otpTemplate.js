export const otpTemplate = (fullname, otp) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Verify Your Email</title>
</head>

<body style="margin:0;padding:0;background:#f4f7f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,.08);">

<!-- Header -->
<tr>
<td
style="background:linear-gradient(135deg,#1B5E20,#2E7D32);padding:30px;text-align:center;">

<h1 style="margin:0;color:#ffffff;font-size:32px;">
🌿 EcoJute
</h1>

<p style="margin-top:8px;color:#dcedc8;font-size:15px;">
Eco-Friendly • Sustainable • Reusable
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#1B5E20;">
Email Verification
</h2>

<p style="font-size:16px;color:#444;">
Hello <strong>${fullname}</strong>,
</p>

<p style="font-size:16px;color:#555;line-height:28px;">
Thank you for joining <strong>EcoJute</strong>.
To complete your registration, please verify your email address using the One-Time Password (OTP) below.
</p>

<div
style="
margin:35px auto;
background:#1B5E20;
color:#ffffff;
width:220px;
padding:18px;
text-align:center;
font-size:34px;
font-weight:bold;
letter-spacing:8px;
border-radius:10px;
">
${otp}
</div>

<p style="text-align:center;color:#666;font-size:15px;">
This OTP is valid for
<strong>5 minutes</strong>.
</p>

<p style="color:#555;font-size:15px;line-height:26px;">
If you did not create an EcoJute account, you can safely ignore this email. No changes will be made to your account.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td
style="background:#f8f8f8;padding:25px;text-align:center;border-top:1px solid #eeeeee;">

<p style="margin:0;color:#666;font-size:14px;">
Thank you for supporting a greener future 🌱
</p>

<p style="margin-top:10px;color:#999;font-size:13px;">
© ${new Date().getFullYear()} EcoJute. All Rights Reserved.
</p>

<p style="margin-top:8px;color:#999;font-size:12px;">
This is an automated email. Please do not reply.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};
