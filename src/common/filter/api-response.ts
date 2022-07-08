class ApiResponse {
  statusCode: number;
  message: any;
  data: any;
  constructor(statusCode = 500, message: any, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
