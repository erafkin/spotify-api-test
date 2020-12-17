import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {login, setUser} from '../actions';

const Home = (props) => {

    useEffect(() => {
        if (!props.user) {
            props.login();
        } else {
            props.history.push('/');
        }
    }, [props.user]);

    if(window.location.href.includes("#") && !props.user) {
        const vars = window.location.href.split("#");
        props.setUser(vars[1]);
    }
    return(
    <div>
        Spotify app home page!!! <br/>
        user info = {JSON.stringify(props.user)}
    </div>
    );
}

const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
        dispatch(login());
        },
        setUser: (username, access_token, refresh_token) => {
        dispatch(setUser(username, access_token, refresh_token));
        },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);