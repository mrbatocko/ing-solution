import React from 'react';
import Modal from 'react-modal';
import { Formik, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import { getSections } from '@/services/sections/sectionsServices';
import { createPost } from '@/services/posts/postsServices';

Modal.setAppElement('#root');

const modalStyles = {
  content: {
    top: '4rem',
    left: '50%',
    transform: 'translate3d(-50%, 0, 0)',
    maxHeight: '80vh'
  }
}

class PostForm extends React.Component {

  state = {
    modal: false,
    sections: []
  }

  componentDidMount () {
    const fetch = async () => {
      const response = await getSections();
      if (response.data) {
        this.setState({ sections: response.data.data.sections });
      }
    }
    fetch();
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  validate = values => {
    const errors = {};
    if (!values.section) {
      errors.section = 'Post must belong to a section';
    }
    if (!values.title) {
      errors.title = 'Give this post a title';
    }
    if (!values.content) {
      errors.content = 'Insert some content';
    }
    return errors;
  }

  addPost = async values => {
    const { error } = await createPost({ ...values, timestamp: Date.now() });
    if (!error) {
      this.toggleModal();
      this.props.getPosts();
    }
  }

  render () {
    const { sections } = this.state;
    const { noPosts } = this.props;
    return (
      <div>
        <div className={noPosts ? 'flex justify-center' : ''}>
          <button
            className="border border-width-2 text-bold border-green-dark green-dark pl-2 pb-1 pr-2 flex items-center"
            onClick={this.toggleModal}>
            <span className="text-lg mr-1">
              &#x2b;
            </span>
            <span style={{ paddingTop: '5px' }}>
              Post Something
            </span>
          </button>
        </div>
        <Modal
          isOpen={this.state.modal}
          style={modalStyles}
          onRequestClose={this.toggleModal}>
          <div className="font-base">
            <h2 className="black text-center text-thin mb-3">Add New Post</h2>
            <Formik
              initialValues={{
                title: '',
                content: '',
                section: null
              }}
              validate={this.validate}
              onSubmit={this.addPost}>
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
                        <label className="mb-1 black block">Section</label>
                        <Select
                          options={sections.map(s => {
                            return { label: s.name, value: s._id }
                          })}
                          onChange={obj => props.setFieldValue('section', { sectionId: obj.value, name: obj.label })}
                        />
                        <div className="red pl-1 text-sm" style={{ paddingTop: '6px' }}>
                          <ErrorMessage name="section" />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="mb-1 black block">Title</label>
                        <input
                          name="title"
                          onChange={props.handleChange}
                          className="border-rounded border border-grey-dark p-1 full-width block"
                        />
                        <div className="red pl-1 text-sm" style={{ paddingTop: '6px' }}>
                          <ErrorMessage name="title" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 black block">Content</label>
                        <textarea
                          name="content"
                          onChange={props.handleChange}
                          style={{ resize: 'none' }}
                          className="border-rounded border border-grey-dark pt-1 pb-1 pl-1 pr-1 full-width block"
                          rows="4"
                        />
                        <div className="red pl-1 text-sm" style={{ paddingTop: '6px' }}>
                          <ErrorMessage name="content" />
                        </div>
                      </div>
                      <div className="pt-3 text-right">
                        <button
                          onClick={this.toggleModal}
                          type="button"
                          className="bg-transparent black border-none">
                          Cancel
                        </button>
                        <button
                          disabled={props.isSubmitting}
                          style={submitButtonStyles}
                          type="submit"
                          className="ml-2 border-rounded bg-green-dark white border-none pt-1 pb-1 pl-2 pr-2">
                          Post
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

export default PostForm;