//Type guard to check if an error is an instance of Error
export const isError = (error: unknown): error is Error =>
  error instanceof Error;
