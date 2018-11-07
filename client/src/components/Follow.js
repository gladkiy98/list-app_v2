import React from 'react';
import axios from 'axios';
import { Table,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as action from '../actions/setLists';

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

  handleClick = (user) => () => {
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
      <div className='userLists'>
        <Link to='/dashboard'><Button>Back</Button></Link>
        <form>
          <input onChange={this.handleSearch} type="text" />
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
              <tr className="tile" key={user.id} >
                <td>#{user.id}</td>
                <td> <Link onClick={this.handleClick(user)} to='/userlist'>{user.username}</Link></td>
                <td><Button onClick={this.follow(user)}>Follow</Button></td>
              </tr>
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

const mapStateToProps = (state) => {
  return {
    list: state.lists.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLists: data => dispatch(action.setLists(data))
  };
};

Follow.defaultProps = {
  setLists: () => {}
};

export default connect(mapStateToProps,mapDispatchToProps)(Follow);
