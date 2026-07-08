export const welcomeTemplate = (name) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Welcome to EcoJute</title>
</head>

<body style="margin:0;padding:0;background:#f5f7f5;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f5f7f5;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,.08);">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,#1B5E20,#388E3C);padding:35px;text-align:center;">

<h1 style="margin:0;color:#ffffff;font-size:34px;">
🌿 Welcome to EcoJute
</h1>

<p style="margin-top:10px;color:#E8F5E9;font-size:16px;">
Sustainable Choices. Stylish Living.
</p>

</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#1B5E20;">
Hello, ${name}! 👋
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">
Congratulations! Your email has been successfully verified and your EcoJute account is now active.
</p>

<p style="font-size:16px;color:#555;line-height:28px;">
You're now part of a community that believes in reducing plastic waste and choosing eco-friendly alternatives for everyday life.
</p>

<div style="margin:35px 0;padding:20px;background:#F1F8E9;border-left:5px solid #2E7D32;border-radius:8px;">

<p style="margin:0;font-size:16px;color:#333;">
✔ Browse premium jute products<br>
✔ Save your favourite items<br>
✔ Place secure orders<br>
✔ Support a greener future 🌎
</p>

</div>

<div style="text-align:center;margin:40px 0;">

<a
href="https://ec-ojute-9nt6.vercel.app"
style="
background:#2E7D32;
color:#ffffff;
text-decoration:none;
padding:14px 34px;
border-radius:8px;
font-size:16px;
font-weight:bold;
display:inline-block;
">
Start Shopping
</a>

</div>

<p style="font-size:15px;color:#555;line-height:26px;">
Thank you for choosing EcoJute. Every reusable bag helps reduce plastic waste and contributes to a cleaner, greener planet.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="background:#F8F8F8;padding:30px;text-align:center;border-top:1px solid #eeeeee;">

<p style="margin:0;color:#2E7D32;font-weight:bold;font-size:18px;">
🌿 EcoJute
</p>

<p style="margin-top:10px;color:#777;font-size:14px;">
Eco-Friendly • Reusable • Sustainable
</p>

<p style="margin-top:15px;color:#999;font-size:13px;">
© ${new Date().getFullYear()} EcoJute. All Rights Reserved.
</p>

<p style="margin-top:8px;color:#999;font-size:12px;">
This is an automated email. Please do not reply to this message.
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
