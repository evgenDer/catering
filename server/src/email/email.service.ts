import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/user.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendQuestionEmail(user: User, message): void {
    this.mailerService
      .sendMail({
        to: user.profile.organization.email,
        subject: 'Вопрос от пользователей приложения',
        html: `<h2>Добрый день!</h2>
        <p>Дайте ответ на вопрос ниже пользователя
          <span style="font-weight: 700;">
            ${user.profile.name} ${user.profile.surname}
          </span>
          ${user.email}
        </p>
        <br>
        <p style="font-style: italic;">${message}</p>
        <img src="https://www.fluentu.com/blog/chinese/wp-content/uploads/2017/08/chinese-question-words-1024x683.jpg" alt="image">`,
      })
      .then(() => {
        console.log('Email has been sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
