import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setToken ,loadUser} from '../actions'
import { Redirect } from 'react-router-dom'
import qs from 'query-string'
import { withRouter } from "react-router";

class Callback extends Component {

    componentDidMount() {
        const { access_token } = qs.parse(this.props.location.hash);
        if (access_token){
            this.props.setToken(access_token);
            this.props.loadUser({ token: access_token });
        }

    }

    render() {
        return (<Redirect to="/" />)
    }

}
const mapStateToProps = store => ({
    token: store.authState.token
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ setToken,loadUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Callback));