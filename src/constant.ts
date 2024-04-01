export * as bcrypt from 'bcrypt';
export * as jwt from 'jsonwebtoken';

export const MESSAGES = {
  EMAIL_IN_USE:
    'Email or UserName is already in use please use another mail or name',
  REGISTERED: 'ADMIN REGISTERED SUCCESSFULLY ',
  UNEXPECTED_ERROR: 'An Unexpected error occured',
  USER_NOT_FOUND: 'User not found',
  PASSWORD_INCORRECT: 'Password is incorrect.',
  LOGIN: 'ADMIN LOGIN SUCCESSFULLY',
  STUDENT_REGISTERED: 'Student Registered Successfully',
  TOKEN_REQUIRED: 'TOKEN IS REQUIRED',
  STUDENT_NOT_FOUND: 'Student not found',
  TOKEN_INCORRECT: 'Token is incorrect for senderId or recipientId',
  NOT_ALLOWED: 'You are not allowed to update or delete the chat',
  ALL_STUDENTS: 'All students',
  SINGLE_STUDENT: 'Student Details',
  STUDENT_DATA_UPDATED: 'Student data updated successfully',
  STUDENT_DATA_DELETED: 'student data deleted successfully',
  STUDENT_NOT_EXIST: 'Student not exist',
  STUDENT_LOGIN_SUCCESSFULLY: 'Student login successfully',
  PARENT_ADDED_SUCCESSFULLY: 'Parent added successfuly',
  GET_PARENT: 'Parent Details',
  PARENT_NOT_FOUND: 'Parent not found',
  PARENT_DATA_UPATED: 'parent data updated successfully',
  PARENT_DELETED: 'parent deleted successfully',
  UNAUTHORIZED: 'unauthorized user',
  PASSWORD_RESET: 'password is Updated',
};
export const HTTP_STATUSCODE = {
  BAD_REQUEST: 400,
  SUCCESS: 200,
  CREATED: 201,
  SERVER_ERROR: 500,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};
