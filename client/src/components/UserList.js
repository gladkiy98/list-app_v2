import React from 'react';
import {
  Table
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserLists = (props) => {
  return (
    <div>
      <Link to='/follow'>Back</Link>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {props.list.map((list, i) => {
            return(
              <tr className="tile" key={list.id}>
                <td>#{i+1}</td>
                <td>{list.title}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

UserLists.propTypes = {
  list: PropTypes.array
};

const mapStateToProps = (state) => ({
  list: state.lists.list
});

export default connect (mapStateToProps)(UserLists);
