import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { playButton, search, setToken } from '../actions'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }
    _play = () => {
        this.props.search({ token: this.props.token, query: this.state.query, type: 'artist' })
    }

    _updateQuery = (event) => {
        this.setState({ query: event.target.value })
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.search({ token: this.props.token, query: this.state.query, type: 'artist' })
        }
    }

    render() {
        const { playing, error, list } = this.props;
        return (
            <div>
                {process.env.API_URL}
                <br/>
                {error}
                <br />
                <input
                    name="search"
                    type="text"
                    onKeyUp={this._handleKeyPress}
                    onChange={this._updateQuery}
                />
                {!this.props.token ?
                    <a href={`${this.props.auth_api}?response_type=token&client_id=${this.props.client_id}&scope=${encodeURIComponent(this.props.scopes)}&redirect_uri=${encodeURIComponent(this.props.redirect_uri)}`}>Login</a>
                    : <button onClick={this._play}>Search</button>
                }
                <ul>{list && list
                    .map((item, index) =>
                        <li key={index}>
                            {item.name} {item.popularity}
                            <br />
                            {item.genres.join(', ')}
                            <br />
                            {
                                item.images[0] ?
                                    <img src={item.images[0].url} width={200} /> : null
                            }

                        </li>
                    )}

                </ul>
            </div>
        )
    }
}
const mapStateToProps = store => ({
    playing: store.playerState.playing,
    error: store.playerState.error,
    list: store.playerState.list,
    auth_api: store.authState.auth_api,
    token: store.authState.token,
    client_id: store.authState.client_id,
    redirect_uri: store.authState.redirect_uri,
    scopes: store.authState.scopes
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ playButton, search, setToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);