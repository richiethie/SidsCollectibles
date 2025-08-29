import { env } from './env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  error?: Error;
}

class Logger {
  private isDevelopment = env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    const timestamp = entry.timestamp;
    const level = entry.level.toUpperCase().padEnd(5);
    const message = entry.message;
    
    let logString = `[${timestamp}] ${level} ${message}`;
    
    if (entry.data) {
      logString += ` | Data: ${JSON.stringify(entry.data, null, 2)}`;
    }
    
    if (entry.error) {
      logString += ` | Error: ${entry.error.message}`;
      if (this.isDevelopment && entry.error.stack) {
        logString += `\nStack: ${entry.error.stack}`;
      }
    }
    
    return logString;
  }

  private log(level: LogLevel, message: string, data?: any, error?: Error) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      error,
    };

    const formattedLog = this.formatLog(entry);

    switch (level) {
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedLog);
        }
        break;
      case 'info':
        console.info(formattedLog);
        break;
      case 'warn':
        console.warn(formattedLog);
        break;
      case 'error':
        console.error(formattedLog);
        break;
    }

    // In production, you might want to send errors to an external service
    if (level === 'error' && !this.isDevelopment) {
      // TODO: Send to external logging service (e.g., Sentry, LogRocket)
      this.sendToExternalService(entry);
    }
  }

  private sendToExternalService(entry: LogEntry) {
    // Placeholder for external logging service integration
    // Example: Sentry.captureException(entry.error);
  }

  debug(message: string, data?: any) {
    this.log('debug', message, data);
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: any) {
    this.log('error', message, data, error);
  }

  // Specialized logging methods
  logApiRequest(method: string, url: string, statusCode: number, duration: number) {
    const message = `API ${method} ${url} - ${statusCode} (${duration}ms)`;
    const level = statusCode >= 400 ? 'error' : statusCode >= 300 ? 'warn' : 'info';
    this.log(level, message, { method, url, statusCode, duration });
  }

  logShopifyRequest(operation: string, success: boolean, duration: number, error?: Error) {
    const message = `Shopify ${operation} - ${success ? 'SUCCESS' : 'FAILED'} (${duration}ms)`;
    const level = success ? 'info' : 'error';
    this.log(level, message, { operation, success, duration }, error);
  }

  logUserAction(action: string, userId?: string, data?: any) {
    const message = `User Action: ${action}`;
    this.info(message, { action, userId, ...data });
  }

  logPerformance(operation: string, duration: number, metadata?: any) {
    const message = `Performance: ${operation} took ${duration}ms`;
    this.info(message, { operation, duration, ...metadata });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export the class for testing purposes
export { Logger };
