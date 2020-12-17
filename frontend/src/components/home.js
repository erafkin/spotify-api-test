import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {login, setUserFromLogin} from '../actions';
import { getUser } from '../services/user';
import { withRouter } from 'react-router-dom';


const Home = (props) => {
    useEffect(() => {
        if(window.location.href.includes("#") && !props.user.user) {
            const removeHostFromUrl = window.location.href.split("#");
            const vars = removeHostFromUrl[1].split('&');
            props.setUserFromLogin(vars[0], vars[1], vars[2]);
        } else if (!props.user.user && !props.user.setting_user) {
            props.login();
        } else {
            if(window.location.href.includes("#")) {
                props.history.push('/');
            }
        }
    }, [props.user]);

    
    if(!props.user.user) {
        return(<div>please login</div>);
    }
    return(
        <div>
            Spotify app home page!!! <br/>
            user info: {JSON.stringify(props.user.user)} <br/>
            {props.user.refresh_token? 
            <p>refresh token: {props.user.refresh_token}, 
            <br/> 
            access token: {props.user.access_token}</p>
            : null}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
        dispatch(login());
        },
        setUserFromLogin: (username, access_token, refresh_token) => {
            dispatch(setUserFromLogin(username, access_token, refresh_token));
        },
        getUser: (username,) => {
            dispatch(getUser(username));
        },
    };
};
  
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Home));