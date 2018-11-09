import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TestRedux extends Component {
  render(){
    return(
      <div>
      <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map((list, i) => {
              return(
                <tr className="tile" key={list.id} >
                  <td>#{i+1}</td>
                  <td>{list.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

TestRedux.propTypes = {
  list: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    list: state.testReducer.list
  }
}

export default connect (mapStateToProps)(TestRedux);
