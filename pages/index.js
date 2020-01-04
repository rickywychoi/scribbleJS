import React, { Component, Fragment } from 'react';
import Router from 'next/router';

import Layout from '../containers/Layout';
import Chat from '../components/Chat';

class IndexPage extends Component {
  state = {
    user: null,
    roomID: ''
  }

  handleKeyUp = event => {
    if (event.keyCode === 13) {
      const user = event.target.value;
      this.setState({ user });
    }
  }

  createRoom = () => {
    let url = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 30; i++) {
      url += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    this.setState({ roomID: url });
  }

  toCreatedRoom = (roomID) => {
    let user = this.state.user;
    Router.push(`/room/${roomID}?activeUser=${user}`);
  };

  render() {
    const { user, roomID } = this.state;

    const nameInputStyles = {
      background: 'transparent',
      color: '#999',
      border: 0,
      borderBottom: '1px solid #666',
      borderRadius: 0,
      fontSize: '3rem',
      fontWeight: 500,
      boxShadow: 'none !important',
    };

    if (roomID.length > 0) {
      document.getElementById('createRoomBtn').style.display = 'none';
    }
    
    return (
      <Layout pageTitle="Realtime Chat">
        <main className="container-fluid position-absolute h-100 bg-dark">
          <div className="row position-absolute w-100 h-100">
            <section className="col-md-8 d-flex flex-row flex-wrap align-items-center align-content-center px-5">
              <div className="px-5 mx-5">
                <span className="d-block w-100 h1 text-light">
                  {user ? (
                  <Fragment>
                    <span>
                      <span style={{color: '#999'}}>
                        Hello!
                      </span>
                      &nbsp;{user}
                    </span>
                    <button type="button" id="createRoomBtn" className="btn btn-light mt-5" onClick={this.createRoom} style={{ display: 'block' }}>Create Room</button>
                    { roomID.length > 0 && <button type="button" className="btn btn-outline-primary btn-block mt-5" onClick={()=>this.toCreatedRoom(roomID)}>{window.location.href + `${roomID}` }</button> }
                  </Fragment>
                  ) : 'What is your name?'
                  }
                </span>
                { !user && <input type="text" className="form-control mt-3 px-3 py-2" onKeyUp={this.handleKeyUp} autoComplete="off" style={nameInputStyles} /> }
              </div>
            </section>
            {/* <section className="col-md-4 postion-relative d-flex flex-wrap h-100 align-items-start align-content-between bg-white px-0">
              { user && <Chat activeUser={user} /> }
            </section> */}
          </div>
        </main>
      </Layout>
    );
  }
}

export default IndexPage;