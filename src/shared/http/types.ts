export class ExceptionHttpError extends Error {
  status!: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.stack = "ExceptionHttpError";
  }
}

export interface HttpClientOptions {
  /**
   * HTTP method.
   * @default 'POST'
   */
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
}

export interface ResponseError {
  message: string;
  status: number;
  type: string;
}
