import nodemailer from 'nodemailer';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';
import { RepairRequest } from '@/types/shopify';

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

// Email templates
const getRepairRequestConfirmationEmail = (repairRequest: RepairRequest, requestId: string) => ({
  subject: 'Repair Request Confirmation - Sid\'s Collectibles',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Repair Request Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0ea5e9; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .request-id { background-color: #e0f2fe; padding: 10px; border-radius: 5px; margin: 20px 0; }
        .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Sid's Collectibles</h1>
          <h2>Repair Request Confirmation</h2>
        </div>
        
        <div class="content">
          <p>Thank you for submitting your repair request. We've received your submission and will review it shortly.</p>
          
          <div class="request-id">
            <strong>Request ID:</strong> ${requestId}
          </div>
          
          <div class="details">
            <h3>Request Details:</h3>
            <div class="detail-row">
              <span class="label">Name:</span> ${repairRequest.name}
            </div>
            <div class="detail-row">
              <span class="label">Email:</span> ${repairRequest.email}
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span> ${repairRequest.phone}
            </div>
            <div class="detail-row">
              <span class="label">Item Description:</span> ${repairRequest.itemDescription}
            </div>
            <div class="detail-row">
              <span class="label">Issue Description:</span> ${repairRequest.issueDescription}
            </div>
            <div class="detail-row">
              <span class="label">Preferred Contact Method:</span> ${repairRequest.preferredContactMethod}
            </div>
            <div class="detail-row">
              <span class="label">Urgency:</span> ${repairRequest.urgency}
            </div>
          </div>
          
          <p>We will contact you within 24-48 hours to discuss your repair request and provide an estimate.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
        
        <div class="footer">
          <p>Sid's Collectibles<br>
          Phone: (555) 123-4567<br>
          Email: info@sidscollectibles.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Repair Request Confirmation - Sid's Collectibles
    
    Thank you for submitting your repair request. We've received your submission and will review it shortly.
    
    Request ID: ${requestId}
    
    Request Details:
    - Name: ${repairRequest.name}
    - Email: ${repairRequest.email}
    - Phone: ${repairRequest.phone}
    - Item Description: ${repairRequest.itemDescription}
    - Issue Description: ${repairRequest.issueDescription}
    - Preferred Contact Method: ${repairRequest.preferredContactMethod}
    - Urgency: ${repairRequest.urgency}
    
    We will contact you within 24-48 hours to discuss your repair request and provide an estimate.
    
    If you have any questions, please don't hesitate to contact us.
    
    Sid's Collectibles
    Phone: (555) 123-4567
    Email: info@sidscollectibles.com
  `,
});

const getRepairRequestNotificationEmail = (repairRequest: RepairRequest, requestId: string) => ({
  subject: `New Repair Request - ${requestId}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Repair Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .urgent { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
        .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Repair Request</h1>
          <h2>Request ID: ${requestId}</h2>
        </div>
        
        <div class="content">
          ${repairRequest.urgency === 'high' ? '<div class="urgent"><strong>⚠️ URGENT REQUEST</strong></div>' : ''}
          
          <div class="details">
            <h3>Customer Information:</h3>
            <div class="detail-row">
              <span class="label">Name:</span> ${repairRequest.name}
            </div>
            <div class="detail-row">
              <span class="label">Email:</span> ${repairRequest.email}
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span> ${repairRequest.phone}
            </div>
            <div class="detail-row">
              <span class="label">Preferred Contact:</span> ${repairRequest.preferredContactMethod}
            </div>
          </div>
          
          <div class="details">
            <h3>Repair Details:</h3>
            <div class="detail-row">
              <span class="label">Item Description:</span> ${repairRequest.itemDescription}
            </div>
            <div class="detail-row">
              <span class="label">Issue Description:</span> ${repairRequest.issueDescription}
            </div>
            <div class="detail-row">
              <span class="label">Urgency Level:</span> ${repairRequest.urgency.toUpperCase()}
            </div>
          </div>
          
          <p><strong>Action Required:</strong> Please review this request and contact the customer within 24 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    New Repair Request - ${requestId}
    
    ${repairRequest.urgency === 'high' ? '⚠️ URGENT REQUEST ⚠️' : ''}
    
    Customer Information:
    - Name: ${repairRequest.name}
    - Email: ${repairRequest.email}
    - Phone: ${repairRequest.phone}
    - Preferred Contact: ${repairRequest.preferredContactMethod}
    
    Repair Details:
    - Item Description: ${repairRequest.itemDescription}
    - Issue Description: ${repairRequest.issueDescription}
    - Urgency Level: ${repairRequest.urgency.toUpperCase()}
    
    Action Required: Please review this request and contact the customer within 24 hours.
  `,
});

// Send repair request confirmation email to customer
export async function sendRepairRequestConfirmation(
  repairRequest: RepairRequest,
  requestId: string
): Promise<boolean> {
  try {
    const transporter = createTransporter();
    const emailContent = getRepairRequestConfirmationEmail(repairRequest, requestId);
    
    await transporter.sendMail({
      from: `"Sid's Collectibles" <${env.SMTP_USER}>`,
      to: repairRequest.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Repair request confirmation email sent', { requestId, customerEmail: repairRequest.email });
    return true;
  } catch (error) {
    logger.error('Failed to send repair request confirmation email', error as Error, { requestId });
    return false;
  }
}

// Send repair request notification email to staff
export async function sendRepairRequestNotification(
  repairRequest: RepairRequest,
  requestId: string,
  staffEmail: string = env.SMTP_USER || 'admin@sidscollectibles.com'
): Promise<boolean> {
  try {
    const transporter = createTransporter();
    const emailContent = getRepairRequestNotificationEmail(repairRequest, requestId);
    
    await transporter.sendMail({
      from: `"Sid's Collectibles" <${env.SMTP_USER}>`,
      to: staffEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Repair request notification email sent to staff', { requestId, staffEmail });
    return true;
  } catch (error) {
    logger.error('Failed to send repair request notification email', error as Error, { requestId });
    return false;
  }
}

// Send both confirmation and notification emails
export async function sendRepairRequestEmails(
  repairRequest: RepairRequest,
  requestId: string,
  staffEmail?: string
): Promise<{ customerEmailSent: boolean; staffEmailSent: boolean }> {
  const customerEmailSent = await sendRepairRequestConfirmation(repairRequest, requestId);
  const staffEmailSent = await sendRepairRequestNotification(repairRequest, requestId, staffEmail);
  
  return { customerEmailSent, staffEmailSent };
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Email configuration verification failed', error as Error);
    return false;
  }
}
