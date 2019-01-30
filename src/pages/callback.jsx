import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { setToken } from '../actions'
import { Redirect} from 'react-router-dom'
import qs from 'query-string'

class Callback extends Component {
    
    componentWillMount() {
        const { access_token } = qs.parse(this.props.location.hash);
        if (access_token)
            this.props.setToken(access_token);
    }

    render() {
        return (<Redirect to="/"/>)
    }

}
const mapStateToProps = store => ({   
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ setToken  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Callback);