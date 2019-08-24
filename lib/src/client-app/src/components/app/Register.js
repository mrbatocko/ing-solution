import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, ErrorMessage } from 'formik';
import Logo from '../helpers/logo/Logo';
import { register } from '@/services/auth/authServices';

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

class Register extends React.Component {

  validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Please enter username';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    if (values.password !== values.repeat_password) {
      errors.repeat_password = 'Passwords do not match';
    }
    return errors;
  }

  register = async values => {
    const response = await register(values);
    if (!response.error) {
      this.props.goToLoginFromRegister();
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
              <h2 className="text-center text-thin mb-2">Become a Member</h2>
            </div>
            <Formik
              initialValues={{
                username: '',
                password: '',
                repeat_password: ''
              }}
              validate={this.validate}
              onSubmit={this.register}>
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
                      <div className="mb-3">
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
                      <div>
                        <label className="mb-1 black block">Repeat Password</label>
                        <input
                          type="password"
                          name="repeat_password"
                          onChange={props.handleChange}
                          className="border-rounded border border-grey-dark pt-1 pb-1 pl-1 pr-1 full-width block"
                          rows="4"
                        />
                        <div className="red pl-1 text-sm" style={{ paddingTop: '6px' }}>
                          <ErrorMessage name="repeat_password" />
                        </div>
                      </div>
                      <div className="pt-3 text-right">
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
                          Register
                        </button>
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

export default Register;