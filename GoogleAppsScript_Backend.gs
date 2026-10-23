// PUT YOUR GMAIL ADDRESS HERE:
const NOTIFICATION_EMAIL = "tifactacademy0907@gmail.com"; 

function doPost(e) {
  try {
    const rawData = e.postData.contents;
    const data = JSON.parse(rawData);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date();

    if (data.formType === "mentor") {
      let sheet = ss.getSheetByName("Mentor_Applications");
      if (!sheet) {
        sheet = ss.insertSheet("Mentor_Applications");
        sheet.appendRow([
          "Date & Time", "Full Name", "Email", "Mobile",
          "Address", "Location Link", "Mentor Type", "Expertise", "Notes"
        ]);
        sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
      }
      sheet.appendRow([
        timestamp,
        data.name || "",
        data.email || "",
        data.mobile || "",
        data.address || "",
        data.locationLink || "",
        data.mentorType || "",
        data.expertise || "",
        data.notes || ""
      ]);

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: `🎓 New Mentor Application: ${data.name} (${data.mentorType})`,
        htmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #d97706; margin-top: 0;">New Mentor Application Received</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px; font-weight: bold; width: 35%;">Full Name:</td><td>${data.name}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Email:</td><td>${data.email}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Mobile:</td><td>${data.mobile}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Mentor Type:</td><td style="color: #16a34a; font-weight: bold;">${data.mentorType}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Address:</td><td>${data.address}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Location Link:</td><td><a href="${data.locationLink}" target="_blank">${data.locationLink}</a></td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Expertise:</td><td>${data.expertise || 'N/A'}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Notes:</td><td>${data.notes || 'None'}</td></tr>
            </table>
          </div>
        `
      });

    } else if (data.formType === "enquiry") {
      let sheet = ss.getSheetByName("Enquiries");
      if (!sheet) {
        sheet = ss.insertSheet("Enquiries");
        sheet.appendRow(["Date & Time", "Full Name", "Email", "Mobile", "Course", "Message"]);
        sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
      } else {
        // Automatically check if Mobile column is present; if not, insert it after Email and rename Subject to Course
        const headerRow = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
        const hasMobile = headerRow.some(h => String(h).toLowerCase().includes("mobil") || String(h).toLowerCase().includes("phone"));
        if (!hasMobile) {
          const emailColIdx = headerRow.findIndex(h => String(h).toLowerCase().includes("mail"));
          if (emailColIdx !== -1) {
            sheet.insertColumnAfter(emailColIdx + 1);
            sheet.getRange(1, emailColIdx + 2).setValue("Mobile").setFontWeight("bold");
          } else {
            const nextCol = sheet.getLastColumn() + 1;
            sheet.getRange(1, nextCol).setValue("Mobile").setFontWeight("bold");
          }
          // Rename Subject header to Course if present
          const updatedHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
          for (let col = 0; col < updatedHeaders.length; col++) {
            if (String(updatedHeaders[col]).toLowerCase().includes("subject")) {
              sheet.getRange(1, col + 1).setValue("Course").setFontWeight("bold");
              break;
            }
          }
        }
      }

      const candidateName = data.name || data.fullName || "";
      const candidateEmail = data.email || "";
      const candidateMobile = data.mobile || data.phone || "";
      const selectedCourse = data.course || data.selectedCourse || data.subject || "General";
      const messageContent = data.message || "";

      sheet.appendRow([
        timestamp,
        candidateName,
        candidateEmail,
        candidateMobile,
        selectedCourse,
        messageContent
      ]);

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: `📩 New Enquiry from ${candidateName}: ${selectedCourse}`,
        htmlBody: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #16a34a; margin-top: 0;">New Website Enquiry</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px; font-weight: bold; width: 30%;">From:</td><td>${candidateName} (${candidateEmail})</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Mobile:</td><td>${candidateMobile}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold;">Course:</td><td>${selectedCourse}</td></tr>
              <tr><td style="padding: 6px; font-weight: bold; vertical-align: top;">Message:</td><td style="white-space: pre-wrap;">${messageContent}</td></tr>
            </table>
          </div>
        `
      });

    } else if (data.formType === "newsletter") {
      let sheet = ss.getSheetByName("Newsletter_Subscribers");
      if (!sheet) {
        sheet = ss.insertSheet("Newsletter_Subscribers");
        sheet.appendRow(["Date & Time", "Email Address"]);
        sheet.getRange(1, 1, 1, 2).setFontWeight("bold");
      }
      sheet.appendRow([timestamp, data.email || ""]);

      MailApp.sendEmail({
        to: NOTIFICATION_EMAIL,
        subject: `📬 New Newsletter Subscriber: ${data.email}`,
        htmlBody: `<p>New subscriber registered: <strong>${data.email}</strong></p>`
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
