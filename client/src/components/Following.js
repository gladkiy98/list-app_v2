import React from 'react';
import axios from 'axios';
import { Table,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import FollowingUsers from './FollowingUsers';

export default class Following extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('jwt');
    axios.get('/api/follows', {
      headers: {
        'Authorization' : token
      }
    })
    .then(response => {
      this.setState({ users:response.data });
    });
  }

  unFollow = (i, user) => () =>{
    let users = [...this.state.users];
    users.splice(i, 1);
    this.setState({ users });
    let token = localStorage.getItem('jwt');
    axios.delete(`/api/follows/${user.id}`,
    { headers: {
        'Authorization' : token
      }
    });
  }

  render() {
    return (
      <div>
        <Link to="/dashboard"><Button>To Main Page</Button></Link>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>unfollow</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, i) => (
              <FollowingUsers i={i} key={user.id} unFollow={this.unFollow} user={user} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
