export interface APIError {
  success: boolean;
  message: string;
  statusCode: string;
  errorCode: string;
  error: any;
}
