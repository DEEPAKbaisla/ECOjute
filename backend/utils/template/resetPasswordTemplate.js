export const resetPasswordTemplate = (name, resetUrl) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Reset Your Password</title>
</head>

<body style="margin:0;padding:0;background:#f5f7f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f5f7f5;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 18px rgba(0,0,0,.08);">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,#1B5E20,#388E3C);padding:35px;text-align:center;">

<h1 style="margin:0;color:#ffffff;font-size:32px;">
🔒 EcoJute
</h1>

<p style="margin-top:10px;color:#E8F5E9;font-size:15px;">
Password Reset Request
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#1B5E20;">
Hello ${name},
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">
We received a request to reset the password for your <strong>EcoJute</strong> account.
</p>

<p style="font-size:16px;color:#555;line-height:28px;">
Click the button below to create a new password.
</p>

<div style="text-align:center;margin:40px 0;">

<a
href="${resetUrl}"
style="
background:#2E7D32;
color:#ffffff;
text-decoration:none;
padding:15px 36px;
border-radius:8px;
display:inline-block;
font-size:16px;
font-weight:bold;
">
Reset Password
</a>

</div>

<p style="font-size:15px;color:#666;line-height:26px;">
This password reset link will expire in <strong>10 minutes</strong> for your security.
</p>

<p style="font-size:15px;color:#666;line-height:26px;">
If the button above doesn't work, copy and paste this link into your browser:
</p>

<p style="word-break:break-all;font-size:13px;color:#2E7D32;">
${resetUrl}
</p>

<div style="
margin-top:35px;
padding:18px;
background:#FFF8E1;
border-left:5px solid #F9A825;
border-radius:8px;
">

<p style="margin:0;font-size:14px;color:#555;">
<b>Didn't request this?</b><br>
If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
</p>

</div>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#F8F8F8;padding:30px;text-align:center;border-top:1px solid #eeeeee;">

<p style="margin:0;color:#2E7D32;font-size:18px;font-weight:bold;">
🌿 EcoJute
</p>

<p style="margin-top:10px;color:#777;font-size:14px;">
Eco-Friendly • Sustainable • Reusable
</p>

<p style="margin-top:15px;color:#999;font-size:13px;">
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
