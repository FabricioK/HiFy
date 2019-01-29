import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { playButton, search } from '../actions'

class Home extends Component {
    play = () => {
    }
    render() {
        const { playing, error } = this.props;
        return (
            <div>
                {error}
                <br />
                {playing ? "playing" : "not playing"}
                <input name="search" type="text" />
                <a href={`${this.props.auth_api}?response_type=code&client_id=${this.props.client_id}&scope=${encodeURIComponent(this.props.scopes)}&redirect_uri=${encodeURIComponent(this.props.redirect_uri)}`}>Login</a>
                <button onClick={this.play}> Play button</button>
            </div>
        )
    }

}
const mapStateToProps = store => ({
    playing: store.playerState.playing,
    error: store.playerState.error,
    auth_api :  store.authState.auth_api,
    token :  store.authState.token,
    client_id :  store.authState.client_id,
    redirect_uri :  store.authState.redirect_uri,
    scopes : store.authState.scopes
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ playButton,search  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);