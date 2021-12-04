import { http } from './config';

export const sendQuestionEmail = async (content) => {
  try {
    const response = await http.post(
      'email',
      content,
    );

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
