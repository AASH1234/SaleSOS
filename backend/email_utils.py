import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_otp_email(receiver_email, otp):
    print(f"[LOG] send_otp_email called with receiver_email: {receiver_email}, otp: {otp}")
    
    sender_email = "worksalesos@gmail.com"  # Replace with your actual email
    sender_password = "ibkv xobp lxzz rbui"  # Replace with your actual app password

    # Create the email content
    subject = "Complete Your Registration - Verification Code"
    body = f"""
Hello,

Thank you for registering with SaleSOS!

Your verification code is: {otp}

This code will expire in 10 minutes. Please enter this code to complete your registration.

If you did not request this code, please ignore this email.

Best regards,
SaleSOS Team
    """

    # Construct the email
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    # Send the email using Gmail's SMTP server
    try:
        print(f"[LOG] Attempting to send email to {receiver_email}...")
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()  # Upgrade the connection to secure
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        print("OTP email sent successfully!")
    except Exception as e:
        print(f"[LOG] Failed to send email: {e}")