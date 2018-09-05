import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuidv1 from 'uuid';
import { addArticle } from '../actions/addArticle';
import PropTypes from 'prop-types';

const mapDispatchToProps = dispatch => {
  return {
    addArticle: article => dispatch(addArticle(article))
  };
};

class ConnectedForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleChange = (event) => () => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = (event) => () => {
    event.preventDefault();
    const { title } = this.state;
    const id = uuidv1();
    this.props.addArticle({ title, id });
    this.setState({ title: '' });
  }

  render() {
    const { title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input className="form-control" id="title" onChange={this.handleChange} type="text" value={title} />
        </div>
        <button className="btn btn-success btn-lg" type="submit">
          SAVE
        </button>
      </form>
    );
  }
}

ConnectedForm.propTypes = {
  addArticle: PropTypes.function.isRequired
};

export default const Form = connect(null, mapDispatchToProps)(ConnectedForm);
