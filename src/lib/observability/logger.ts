interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
  }

  debug(message: string, context?: Record<string, any>) {
    if (this.isDev) {
      console.log(this.formatLog({ level: 'debug', message, timestamp: new Date().toISOString(), context }));
    }
  }

  info(message: string, context?: Record<string, any>) {
    console.log(this.formatLog({ level: 'info', message, timestamp: new Date().toISOString(), context }));
  }

  warn(message: string, context?: Record<string, any>) {
    console.warn(this.formatLog({ level: 'warn', message, timestamp: new Date().toISOString(), context }));
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    console.error(this.formatLog({ level: 'error', message, timestamp: new Date().toISOString(), context }));
    if (error) {
      console.error(error);
    }
  }
}

export const logger = new Logger();
