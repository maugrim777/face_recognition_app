import React from 'react';
import Particles from 'react-particles-js';
import particlesOptions from './particlesOptions.json'
import 'tachyons';

class ResetPassword extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            password : '',
            confirm: '',
            hash: props.match.params.hash,
            reset: false
        }
    }

    
    onPasswordChange = (event) => {
        this.setState({password : event.target.value })
    }

    onPasswordConfirm = (event) => {
        this.setState({confirm : event.target.value })
    }
    onSubmitReset = () => {
        if (this.state.password=== this.state.confirm) {
            fetch('https://smart-brain-maugrim777.herokuapp.com/reset', {
                'method': 'POST',
                'headers': {'Content-Type': 'application/json'},
                'body': JSON.stringify({
                    hash: this.state.hash,
                    password: this.state.password
                    })
            }).then(response => response.json()).then(response=> console.log(response)).then(this.setState({reset: true})).catch(err=> console.log(err))
            
            
        } else {
            alert('Passwords do not match! Please enter again.')
        }
       
        
    }
    

    render() {        
        return(  
            <div className="ResetPassword">
                <Particles className="particles" params={particlesOptions} />
            
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        {this.state.reset=== false
                        ? <div className='reset'>
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Reset Password</legend>
                        
                        
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">New Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                                autoComplete='new-password'
                                autoFocus
                            />
                        </div>

                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Confirm New Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordConfirm}
                                autoComplete='new-password'                                
                            />
                        </div>


                        </fieldset>
                        <div className="center">

                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Reset Password" 
                            onClick={this.onSubmitReset}/>
                        </div>
                        </div>
                        : <div className='reseted'>
                            <h3 className="f3 tc fw6 ph0 mh0" htmlFor="email-address">Your password was successfully updated!</h3>   
                            <div className="center">
                                <a href="https://face-recognition-maugrim777.herokuapp.com/" className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib link black ' >Go back to site</a>
                                
                            </div> 
                        </div>
                        }
                    </div>
                </main>
            </article>
            </div>  
        );
    }
  
}

export default ResetPassword;