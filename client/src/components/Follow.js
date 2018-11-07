import React from 'react';
import axios from 'axios';
import {
  Table,
  Button
  } from 'reactstrap';
import { Link } from 'react-router-dom';
import store from '../store/store';

function searchingFor(term){
  return function(x){
    return x.username.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

export default class Follow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      term: '',
      lists: [],
   };
    this.handleSearch = this.handleSearch.bind(this);
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

  handleSearch(event){
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
        store.dispatch({
          type: 'LISTS_SET',
          list: response.data
        });
      });
    }

    follow = (user) => () =>{
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
          <input onChange={this.handleSearch} type="text"  />
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
            {this.state.users.filter(searchingFor(this.state.term)).map((user) => {
              return(
                <tr className="tile" key={user.id} >
                  <td>#{user.id}</td>
                  <td> <Link onClick={this.handleClick(user)} to='/userlists'>{user.username}</Link></td>
                  <td><Button onClick={this.follow(user)}>Follow</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
