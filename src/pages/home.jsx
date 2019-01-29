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
                {error}
                <br />
                <input
                    name="search"
                    type="text"
                    onKeyUp={this._handleKeyPress}
                    onChange={this._updateQuery}
                />
                {!this.props.token ?
                    <a href={`${process.env.auth_api}?response_type=token&client_id=${process.env.client_id}&scope=${encodeURIComponent(process.env.scopes)}&redirect_uri=${encodeURIComponent(process.env.redirect_uri)}`}>Login</a>
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
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ playButton, search, setToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);