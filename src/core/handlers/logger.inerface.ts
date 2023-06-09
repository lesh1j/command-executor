export interface Ilogger {
  log(...args: any[]): void;
  error(...args: any[]): void;
  end(): void;
}
