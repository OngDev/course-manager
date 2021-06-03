import { useForm } from 'react-hook-form';
import FormItem from '@components/FormItem';
import { useRef, useState } from 'react';
import axios from 'axios';
import styles from './index.module.css';

export interface RegisterFormData {
  username: string;
  password: string;
  retypedPassword: string;
  email: string;
  fullname: string;
}

export default function RegisterModal() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<RegisterFormData>();
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const password = useRef({});
  password.current = watch('password', '');

  const submitForm = async (data: RegisterFormData) => {
    try {
      console.log(data);
      // TODO: call api to server
      const { retypedPassword, ...body } = data;
      const response = await axios.post(
        'http://localhost:3456/auth/register',
        body
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleLoginPage = () => {};

  return (
    <>
      <div className={styles.blurBg} />
      <form id={styles.registerForm} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.formHeader}>Sign Up</div>
        <div className={styles.loginNavigator}>
          I have an account!{' '}
          <span
            tabIndex={0}
            role="button"
            onClick={toggleLoginPage}
            onKeyDown={toggleLoginPage}
          >
            Click here
          </span>
        </div>
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
          labelName="Fullname"
          name="fullname"
          placeholder="Enter your fullname"
          inputId="fullnameInput"
          type="text"
          error={errors.fullname}
          register={register('fullname', {
            required: 'Fullname is required'
          })}
        />
        <FormItem
          isFirstVisit={isFirstVisit}
          labelName="Email"
          name="email"
          placeholder="Enter your email"
          inputId="emailInput"
          type="text"
          error={errors.email}
          register={register('email', {
            required: {
              value: true,
              message: 'Email is required'
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
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
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters'
            }
          })}
        />
        <FormItem
          isFirstVisit={isFirstVisit}
          labelName="RetypedPassword"
          name="retypedPassword"
          placeholder="Enter your password"
          inputId="retypedPasswordInput"
          type="password"
          error={errors.retypedPassword}
          register={register('retypedPassword', {
            required: 'Username is required',
            minLength: {
              value: 8,
              message: 'Username must have at least 8 characters'
            },
            validate: value =>
              value === password.current || 'The passwords do not match'
          })}
        />
        <input
          className={styles.submitButton}
          onClick={() => {
            setIsFirstVisit(false);
          }}
          type="submit"
          value="Sign Up"
        />
      </form>
    </>
  );
}
