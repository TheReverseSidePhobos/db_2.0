import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Signup.module.scss';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.task);
  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    email: Yup.string().email().required(),
    secondName: Yup.string().required(),
    password: Yup.string().required(),
    checkPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Password mismatch')
      .required()
  });

  const initialValues = {
    firstName: '',
    secondName: '',
    email: '',
    password: '',
    checkPassword: ''
  };
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
    dispatch(registration(values.email, values.password));
    router.push('/');
  };

  const renderError = (message) => <p className={styles.isDanger}>{message}</p>;

  return (
    <Layout>
      {!isLoggedIn ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values);
            resetForm();
          }}
        >
          <Form autoComplete="off">
            <div className={styles.signup}>
              <div className={styles.control}>
                <h1>Sing up</h1>
                <div className={styles.field}>
                  <div className="control">
                    <Field
                      name="firstName"
                      type="text"
                      className="input"
                      placeholder="First name"
                    />
                    <ErrorMessage name="firstName" render={renderError} />
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.control}>
                    <Field
                      name="secondName"
                      type="text"
                      className="input"
                      placeholder="Second name"
                    />
                    <ErrorMessage name="secondName" render={renderError} />
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.control}>
                    <Field
                      name="email"
                      type="text"
                      className="input"
                      placeholder="Email"
                    />
                    <ErrorMessage name="email" render={renderError} />
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.control}>
                    <Field
                      name="password"
                      type="password"
                      className="input"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    <ErrorMessage name="password" render={renderError} />
                  </div>
                </div>
                <div className={styles.field}>
                  <div className={styles.control}>
                    <Field
                      name="checkPassword"
                      type="password"
                      className="input"
                      placeholder="Check Password"
                    />
                    <ErrorMessage name="checkPassword" render={renderError} />
                  </div>
                </div>

                <button type="submit" className="button is-primary">
                  Sign Up
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      ) : (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm();
            }}
          >
            <Form>
              <div className={style.signup}>
                <div className={style.control}>
                  <h1>Sing In</h1>

                  <div className={style.field}>
                    <div className={style.control}>
                      <Field
                        name="email"
                        type="text"
                        className="input"
                        placeholder="Email"
                      />
                      <ErrorMessage name="email" render={renderError} />
                    </div>
                  </div>
                  <div className={style.field}>
                    <div className={style.control}>
                      <Field
                        name="password"
                        type="password"
                        className="input"
                        placeholder="Password"
                      />
                      <ErrorMessage name="password" render={renderError} />
                    </div>
                  </div>

                  <button type="submit" className="button is-primary">
                    Sign In
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </>
      )}
    </Layout>
  );
};

export default Signup;
