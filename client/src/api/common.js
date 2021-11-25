import { http } from './config';

export const presignedUploadUrl = async (fileName) => {
  try {
    const response = await http.post(
      'presignedUrl',
      {
        fileName,
      },
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
