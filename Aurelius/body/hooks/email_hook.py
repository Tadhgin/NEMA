# email_hook.py
import imaplib
import smtplib
import email
from email.mime.text import MIMEText

class EmailHook:
    def __init__(self, imap_host, smtp_host, user, password):
        self.imap = imaplib.IMAP4_SSL(imap_host)
        self.smtp = smtplib.SMTP_SSL(smtp_host)
        self.user = user
        self.password = password

    def login(self):
        self.imap.login(self.user, self.password)
        self.smtp.login(self.user, self.password)

    def fetch_subjects(self):
        self.imap.select("inbox")
        status, messages = self.imap.search(None, "ALL")
        subjects = []
        for num in messages[0].split()[-5:]:  # last 5 emails
            _, data = self.imap.fetch(num, "(RFC822)")
            msg = email.message_from_bytes(data[0][1])
            subjects.append(msg["subject"])
        return subjects

    def send_email(self, to_address, subject, body):
        msg = MIMEText(body)
        msg["From"] = self.user
        msg["To"] = to_address
        msg["Subject"] = subject
        self.smtp.sendmail(self.user, [to_address], msg.as_string())
