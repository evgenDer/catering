import axios from 'axios';
import { config } from 'constants/api';

export const presignedUploadUrl = async (fileName) => {
  try {
    const response = await axios.post(
      `${config.apiBaseUrl}presignedUrl`,
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
