import React from 'react';
import axios from 'axios';
import { Table,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../actions/setLists';
import User from './User';

const searchingFor= term => {
  return function(x){
    return x.username.toLowerCase().includes(term.toLowerCase()) || !term;
  };
};

export class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      term: '',
      lists: [],
   };
 }

  componentDidMount() {
    let token = localStorage.getItem('jwt');
    axios.get('/api/users.json', {
      headers: {
        'Authorization' : token
      }
    })
    .then(response => {
      this.setState({
        users:response.data
      });
    });
  }

  handleSearch = (event) => {
    this.setState({term: event.target.value});
  }

  handleShowLists = (user) => () => {
    let token = localStorage.getItem('jwt');
    axios.get('/api/userlists',{
      params:{
        id: user.id
      }
    },
    { headers: {
        'Authorization' : token
      }
    })
    .then(response => {
      this.props.setLists(response.data);
    });
  }

  follow = (user) => () => {
    let token = localStorage.getItem('jwt');
    axios.post('/api/follows',{
      followed_id: user.id
    },
    { headers: {
      'Authorization' : token
      }
    });
  }

  render() {
    return (
      <div>
        <Link to='/dashboard'><Button>Back</Button></Link>
        <form>
          <input className='search' onChange={this.handleSearch} type="text" />
        </form>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>follow</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.filter(searchingFor(this.state.term)).map((user) => (
              <User follow={this.follow} key={user.id} onHandleShowLists={this.handleShowLists} user={user} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

Follow.propTypes = {
  setLists: PropTypes.func
};

const mapStateToProps = (state) => ({
  list: state.lists
});

export const mapDispatchToProps = (dispatch) => ({
  setLists: data => dispatch(action.setLists(data))
});

Follow.defaultProps = {
  setLists: () => {}
};

export default connect(mapStateToProps,mapDispatchToProps)(Follow);
