export interface IErrorMessage {
  [key: string]: Array<string>;
}

export interface IErrorResponse {
  error?: { invalid_fields?: IErrorMessage };
  statusCode: number;
  message: string;
}
