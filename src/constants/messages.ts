export const MESSAGES = {
  // Auth validation errors
  EMAIL_REQUIRED: "Email is required",
  EMAIL_INVALID: "Please enter a valid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters",
  CONFIRM_PASSWORD_REQUIRED: "Confirm password is required",
  PASSWORDS_NOT_MATCH: "Passwords do not match",

  // Auth API errors & success
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Unauthorized",
  REGISTRATION_SUCCESS: "Registration successful",

  // Expense validation errors
  TITLE_REQUIRED: "Title is required",
  TITLE_MAX_LENGTH: "Title must be at most 80 characters",
  AMOUNT_REQUIRED: "Amount is required",
  AMOUNT_POSITIVE: "Amount must be a positive number",
  CATEGORY_REQUIRED: "Please choose a category",
  CATEGORY_INVALID: "Invalid category",
  DATE_REQUIRED: "Date is required",
  DATE_FUTURE: "Date cannot be in the future",

  // Expense API errors & success
  EXPENSE_ADDED: "Expense added",
  DUPLICATE_EXPENSE: "Duplicate expense: an expense with the same title, amount and date already exists",
  EXPENSE_NOT_FOUND: "Expense not found",
  NO_EXPENSES_FOUND: "No expenses found",
} as const;
