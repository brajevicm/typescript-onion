export interface Mailer {
  send(): Promise<void>;
}
