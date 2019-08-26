import React from 'react';
import { Formik, Form } from 'formik';
import { answerOnPost } from '@/services/posts/postsServices';

class AnswerForm extends React.Component {

  onSubmit = async (values, actions) => {
    const { getPost, postId } = this.props;
    const data = {
      content: values.content,
      timestamp: Date.now()
    }
    const { error } = await answerOnPost(postId, data);
    if (!error) {
      actions.resetForm();
      getPost();
    }
  }

  render () {
    return (
      <Formik
        initialValues={{ content: '' }}
        onSubmit={this.onSubmit}>
        {props => {
          return (
            <Form>
              <textarea
                name="content"
                onChange={props.handleChange}
                rows="4"
                style={{ resize: 'none' }}
                className="mb-1 border-rounded border border-grey-dark p-1 full-width block"
                placeholder="Post your answer here..."
              />
              <div className="text-right">
                <button
                  type="submit"
                  className="cursor-pointer border-rounded full-width bg-green-dark white border-none pt-1 pb-1 pl-2 pr-2">
                  Post
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
}

export default AnswerForm;