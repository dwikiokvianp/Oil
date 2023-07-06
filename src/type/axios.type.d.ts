export interface CustomErrorType {
  message: string;
  error: string;
  response: {
    data: {
      message: string;
    };
  };
}
