/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useForm } from 'react-hook-form';
import FormItem from '@components/FormItem';
import { useRef, useState } from 'react';
import { axios } from 'utils/axios';
import { ModalTypeEnum } from '@components/Layouts';
import styles from './index.module.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'

export interface LoginFormData {
  username: string;
  password: string;
}

type Props = {
  toggleModal: Function;
};

export default function LoginModal({ toggleModal }: Props) {
  const [loading, setLoading] = useState(false);
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
      <form id={styles.registerForm} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.formHeader}>Login</div>
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
        <button
          form={styles.registerForm}
          disabled={loading}
          className={styles.submitButton}
          onClick={() => {
            setIsFirstVisit(false);
          }}
          value="Submit"
          type="submit"
        >
          {loading && (
            <FontAwesomeIcon icon={faSpinner} spin={true}/>
          )}
          {!loading && <span>Login</span>}
        </button>
      </form>
    </>
  );
}
