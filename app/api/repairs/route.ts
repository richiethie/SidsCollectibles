import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { sendRepairRequestEmails } from '@/server/mail';
import { generateId } from '@/lib/formatting';

// Validation schema for repair requests
const repairRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  itemDescription: z.string().min(1, 'Item description is required'),
  issueDescription: z.string().min(1, 'Issue description is required'),
  preferredContactMethod: z.enum(['email', 'phone']),
  urgency: z.enum(['low', 'medium', 'high']),
});

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = repairRequestSchema.parse(body);
    
    // Generate unique request ID
    const requestId = generateId(12);
    
    // Log the request
    logger.info('Repair request received', {
      requestId,
      customerEmail: validatedData.email,
      urgency: validatedData.urgency,
    });
    
    // Send confirmation and notification emails
    const emailResults = await sendRepairRequestEmails(validatedData, requestId);
    
    // Log email results
    logger.info('Repair request emails sent', {
      requestId,
      customerEmailSent: emailResults.customerEmailSent,
      staffEmailSent: emailResults.staffEmailSent,
    });
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Log API performance
    logger.logApiRequest('POST', '/api/repairs', 200, responseTime);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Repair request submitted successfully',
      requestId,
      emailSent: emailResults.customerEmailSent,
    }, { status: 200 });
    
  } catch (error) {
    // Log the error
    logger.error('Repair request submission failed', error as Error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid request data',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }, { status: 400 });
    }
    
    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Optional: Handle GET requests (e.g., for form validation)
export async function GET() {
  return NextResponse.json({
    message: 'Repair request endpoint',
    method: 'POST',
    requiredFields: [
      'name',
      'email', 
      'phone',
      'itemDescription',
      'issueDescription',
      'preferredContactMethod',
      'urgency'
    ],
  });
}
