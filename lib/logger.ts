/**
 * 로깅 유틸리티
 * 개발 환경에서는 콘솔에, 프로덕션에서는 외부 서비스로 전송 가능
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const isDevelopment = process.env.NODE_ENV === 'development'

const logger = {
  debug: (message: string, data?: unknown) => {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data)
    }
  },

  info: (message: string, data?: unknown) => {
    console.info(`[INFO] ${message}`, data)
  },

  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data)
  },

  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error)
    // TODO: 프로덕션에서 Sentry, LogRocket 등으로 전송
  },
}

export { logger }
