import { useForm } from 'react-hook-form';
import styles from './index.module.css';

export interface RegisterFormData {
  username: string;
  password: string;
  retypedPassword: string;
  email: string;
  fullName: string;
}

export default function RegisterModal() {
  const { register, handleSubmit } = useForm<RegisterFormData>();

  const submitForm = async (data: RegisterFormData) => {
    console.log(data);
  };

  const toggleLoginPage = () => {};

  return (
    <>
      <div className={styles.blurBg} />
      <form id={styles.registerForm} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.formHeader}>Sign Up</div>
        <div className={styles.loginNavigator}>
          I have an account! <span onClick={toggleLoginPage}>Click here</span>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="usernameInput"> Username:</label>
          <input
            id="usernameInput"
            {...register('username', { required: true })}
            name="username"
            type="text"
          />
        </div>
        <div className={styles.formItem}>
          <label> Password:</label>
          <input
            {...register('password', { required: true })}
            name="password"
            type="password"
          />
        </div>
        <div className={styles.formItem}>
          <label> Retyped Password:</label>
          <input
            {...register('retypedPassword', { required: true })}
            name="retypedPassword"
            type="password"
          />
        </div>
        <div className={styles.formItem}>
          <label> Email:</label>
          <input
            {...register('email', { required: true })}
            name="email"
            type="email"
          />
        </div>
        <div className={styles.formItem}>
          <label> Full Name:</label>
          <input
            {...register('fullName', { required: true })}
            name="fullName"
            type="text"
          />
        </div>
        <input className={styles.submitButton} type="submit" />
      </form>
    </>
  );
}
