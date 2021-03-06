import React, {Component} from 'react';

import AuthenticatorUI from '../components/AuthenticatorUI';
import firebase from 'react-native-firebase';
import { showMessage } from 'react-native-messages';
import {connect} from 'react-redux';
import {login} from '../actions/user';
import {clearEvents} from '../actions/events';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.props.clearEvents();
    }

    setEmail = (email) => {
        this.setState({
            email: email
        })
    }

    setPassword = (password) => {
        this.setState({
            password: password
        })
    }
    
    login = async () => {
        if (this.state.email && this.state.password){
            try {
                let response = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
                let {user} = response;
                this.props.login(user);
            }catch(err){
                showMessage('La contraseña o el usuario es invalido',{
                    duration:3000,
                    slideAnimationOffset: 10,
                    showAnimationDuration: 600,
                    hideAnimationDuration: 600,
                });
            } 
        }else {
            showMessage('Usuario o contraseña no ingresados',
                {
                    duration:3000,
                    slideAnimationOffset: 10,
                    showAnimationDuration: 600,
                    hideAnimationDuration: 600,
                }
            );
        }
    }
    render(){
        return(
            <AuthenticatorUI 
                setPassword={this.setPassword} 
                setEmail={this.setEmail} 
                mainAction={this.login}
                mainButtonTitle={'Iniciar Sesion'}
                secondaryButtonTitle='No tengo cuenta'
                mainTitle='Inicio de Sesión'
                navigationAction={()=>{
                    this.props.navigation.navigate('SignUp')
                }}
                email={this.state.email}
                pass={this.state.password} 
            />
        );
    }
}

export default connect(
    (state) => ({user: state.user}),
    {
        login:login,
        clearEvents
    }
) (LoginScreen);
