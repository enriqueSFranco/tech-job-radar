class LocalLogger {
  constructor(private file: string) {}

  writeLog(message: string) {
    console.log(`[${this.file} LOG] ${message}`)
  }

  wirteInfo(message: string) {
    console.info(`[${this.file} ℹ️INFO] ${message}`);
  }

  writeDebug(message: string) {
    console.debug(`[${this.file} 🐛DEBUG] ${message}`);
  }

  writeWarn(message: string) {
    console.warn(`[${this.file} ⚠️WARNING] ${message}`);
  }

  writeError(message: string) {
    console.error(`[${this.file} ❌ERROR] ${message}`);
  }
}
