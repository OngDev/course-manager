/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useForm } from 'react-hook-form';
import FormItem from '@components/FormItem';
import { useRef, useState } from 'react';
import { ModalTypeEnum } from '@components/Layouts';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { axios } from '../../utils/axios';
import styles from './index.module.css';

export interface LoginFormData {
  username: string;
  password: string;
}

type Props = {
  toggleModal: Function;
};

export default function LoginModal({ toggleModal }: Props) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<LoginFormData>();
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const password = useRef({});
  password.current = watch('password', '');

  const submitForm = async (data: LoginFormData) => {
    try {
      setLoading(true);
      // TODO: call api to server
      const response = await axios.post('/auth/login', data, {
        withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      setErrorMessage('Failed to login, please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={styles.blurBg}
        onClick={() => toggleModal(ModalTypeEnum.None)}
      />
      <form id={styles.loginForm} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.formHeader}>Sign In</div>
        <div className={styles.registerNavigator}>
          Don't have an account?{' '}
          <span
            tabIndex={0}
            role="button"
            onClick={() => toggleModal(ModalTypeEnum.Register)}
            onKeyDown={() => toggleModal(ModalTypeEnum.Register)}
          >
            Click here
          </span>
        </div>
        {errorMessage && <span>{errorMessage}</span>}
        <FormItem
          isFirstVisit={isFirstVisit}
          labelName="Username"
          name="username"
          placeholder="Enter your username"
          inputId="usernameInput"
          type="text"
          error={errors.username}
          register={register('username', {
            required: 'Username is required',
            minLength: {
              value: 8,
              message: 'Username must have at least 8 characters'
            }
          })}
        />
        <FormItem
          isFirstVisit={isFirstVisit}
          labelName="Password"
          name="password"
          placeholder="Enter your password"
          inputId="passwordInput"
          type="password"
          error={errors.password}
          register={register('password', {
            required: 'Password is required'
          })}
        />
        <div className={styles.forgotPassword}>
          <span
            tabIndex={0}
            role="button"
            onClick={() => toggleModal(ModalTypeEnum.Register)}
            onKeyDown={() => toggleModal(ModalTypeEnum.Register)}
          >
            Forgot password?
          </span>
        </div>
        <button
          form={styles.loginForm}
          disabled={loading}
          className={styles.submitButton}
          onClick={() => {
            setIsFirstVisit(false);
          }}
          value="Submit"
          type="submit"
        >
          {loading && <FontAwesomeIcon icon={faSpinner} spin />}
          {!loading && <span>Login</span>}
        </button>
      </form>
    </>
  );
}
