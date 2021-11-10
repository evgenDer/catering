import notFoundImage from 'assets/smile.png';
import './ErrorPage.scss';

const ErrorPage = () => (
  <div className='error-page'>
    <img src={notFoundImage} alt="404 error" className="image"></img>
    <h3>404</h3>
    <p>Страница не найдена</p>
  </div>
);

export default ErrorPage;