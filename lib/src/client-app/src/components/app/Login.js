import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, ErrorMessage } from 'formik';
import Logo from '../helpers/logo/Logo';
import { login } from '@/services/auth/authServices';

Modal.setAppElement('#root');

const modalStyles = {
  content: {
    width: '400px',
    top: '4rem',
    bottom: 'auto',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)'
  }
}

class Login extends React.Component {

  validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Please enter username';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  }

  login = async (values, actions) => {
    const { error, data } = await login(values);
    if (!error) {
      this.props.authenticate(data.data.token);
    } else {
      actions.setSubmitting(false);
    }
  }

  render () {
    return (
      <div>
        <Modal
          isOpen={true}
          style={modalStyles}
          onRequestClose={this.props.onClose}>
          <div className="font-base">
            <div className="flex items-end mb-3 pb-1 border-bottom border-grey-dark">
              <Logo />
              <h2 className="text-center text-thin mb-2">Login to Your Account</h2>
            </div>
            <Formik
              initialValues={{
                username: '',
                password: ''
              }}
              validate={this.validate}
              onSubmit={this.login}>
              {props => {
                const submitButtonStyles = {};
                if (!props.isValid || props.isSubmitting) {
                  submitButtonStyles.opacity = '.5';
                  submitButtonStyles.cursor = 'not-allowed';
                }
                return (
                  <Form>
                    <div>
                      <div className="mb-3">
                        <label className="mb-1 black block">Username</label>
                        <input
                          name="username"
                          onChange={props.handleChange}
                          className="border-rounded border border-grey-dark p-1 full-width block"
                        />
                        <div className="red pl-1 text-sm" style={{ paddingTop: '6px' }}>
                          <ErrorMessage name="username" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 black block">Password</label>
                        <input
                          type="password"
                          name="password"
                          onChange={props.handleChange}
                          className="border-rounded border border-grey-dark pt-1 pb-1 pl-1 pr-1 full-width block"
                          rows="4"
                        />
                        <div className="red pl-1 text-sm" style={{ paddingTop: '6px' }}>
                          <ErrorMessage name="password" />
                        </div>
                      </div>
                      <div className="pb-2 border-bottom border-grey-dark pt-3 mb-2 text-right">
                        <button
                          onClick={this.props.onClose}
                          type="button"
                          className="bg-transparent black border-none">
                          Cancel
                        </button>
                        <button
                          disabled={props.isSubmitting}
                          style={submitButtonStyles}
                          type="submit"
                          className="ml-2 border-rounded bg-blue-dark white border-none pt-1 pb-1 pl-2 pr-2">
                          Login
                        </button>
                      </div>
                      <div className="text-center">
                        <span className="black-light mr-1">
                          Not a member?
                        </span>
                        <span
                          className="cursor-pointer underline"
                          onClick={this.props.goToRegisterFromLogin}>
                          Join Us
                        </span>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Login;