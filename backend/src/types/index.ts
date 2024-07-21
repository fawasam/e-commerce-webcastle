export interface ErrorType {
  message?: string;
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  keyValue?: object;
  name?: string;
  code?: number;
  stack?: string;
}
