const errorMessages = {
  FULLNAME_REQUIRED: 'Full name is required',
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Email is invalid',
  PASSWORD_REQUIRED: 'Password is required',
  INVALID_PASSWORD: 'Password must be at least 8 characters and include 1 upper case letter (A-Z) and 1 number (0-9).',
  PW_CONFIRMATION_REQUIRED: 'Password Confirmation is required.',
  PW_CONFIRMATION_NOT_MATCH: 'Password Confirmation isn’t match.',
  PERSONAL_EMAIL_REQUIRED: 'Personal email is required.',
  PERSONAL_EMAIL_INVALID: 'Personal email is invalid.',
  PERSONAL_EMAIL_EXIST: 'Personal email already exists.',
  AUTH_FAILED: 'Authentication failed! Please try again.',

  USER_EXIST: 'User already exists.',
  UNKNOWN_ERROR: 'An unknown error occurred, Please contact support!',
  INVALID_REFRESH_TOKEN: 'Refresh token is invalid.',
};

const errorCodes = {
  INPUT_VALIDATION_FAILED: 422,
  AUTH_FAILED: 401,
  PERSONAL_EMAIL_NOT_VERIFIED: 403,

  USER_EXIST: 409,
  PASSWORDS_NOT_MATCH: 400,
  INVALID_PASSWORD: 400,
  PERSONAL_EMAIL_EXIST: 409,
  UNKNOWN_ERROR: 500,
  INVALID_REFRESH_TOKEN: 401,
};

export { errorMessages, errorCodes };
