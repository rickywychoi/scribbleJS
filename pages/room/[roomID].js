import React, { Component, Fragment, createRef } from 'react';
import { withRouter } from 'next/router';

import Layout from '../../containers/Layout'
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
      <Layout>
        <Fragment>
          <main className="container-fluid position-absolute h-100 bg-dark">
            <div className="row position-absolute w-100 h-100">
            <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5">
              <Canvas />
            </section>
            {user && <Chat activeUser={user}/>}
            </div>
          </main>
        </Fragment>
      </Layout>
    );
  }
}

export default withRouter(GameRoom);