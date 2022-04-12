import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Signup.module.scss';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Signin = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.task);
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const initialValues = {
    email: '',
    password: ''
  };
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    debugger;
    console.log(JSON.stringify(values, null, 2));
    dispatch(registration(values.email, values.password));
    router.push('/');
  };

  const renderError = (message) => <p className={styles.isDanger}>{message}</p>;

  return (
    <Layout>
      {
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
                <h1>Sing in</h1>
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
                <button type="submit" className="button is-primary">
                  Sign In
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      }
    </Layout>
  );
};

export default Signin;
