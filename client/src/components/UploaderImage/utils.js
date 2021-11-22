import { ACCEPTABLE_FILE_EXTENSIONS, MAX_FILE_SIZE } from './constants';

export const validateFileExtension = (fileName) => {
  const regex = new RegExp(`(${ACCEPTABLE_FILE_EXTENSIONS.join('|')})$`);
  const lowerFileName = fileName.toLowerCase();
  return regex.test(lowerFileName);
};

export const validateFileSize = (fileSize) => fileSize < MAX_FILE_SIZE;
