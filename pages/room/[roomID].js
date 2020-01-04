import React, { Component, Fragment, createRef } from 'react';
import { withRouter } from 'next/router';

import Canvas from '../../components/Canvas';
import Chat from '../../components/Chat';

class GameRoom extends Component {
  state = {
    users: []
  }

  // get initial props
  static async getInitialProps() {
    return {}
  }

  componentDidMount() {
    const user = this.props.router.query.activeUser;
    let usersArray = this.state.users;
    usersArray.push(user);
    this.setState({ users: usersArray });
  }

  render() {
    const user = this.state.users[0]

    return(
      <Fragment>
        <Canvas />
        {user && <Chat activeUser={user}/>}
      </Fragment>
    );
  }
}

export default withRouter(GameRoom);