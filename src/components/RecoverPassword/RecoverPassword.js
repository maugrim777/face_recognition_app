import React from 'react';

class RecoverPassword extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            submitted: false
        }
    }



    onEmailChange = (event) => {
        this.setState({email : event.target.value })
        
    }



    onEmailSubmit = () => {

        fetch('https://smart-brain-maugrim777.herokuapp.com/recoverPassword', {
            'method': 'POST',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({
                email: this.state.email,
            })
        }).then(this.setState({submitted: true})).catch(err=> console.log(err))
        
        
    }
    
    render() {        
        return(    
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="recover_password" className="ba b--transparent ph0 mh0">                    
                        <div className="mt3">
                            
                            { this.state.submitted === false
                            ? <div>  
                            
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Please enter your email address below and we will send a link to reset your password</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                />
                                </div>
                            : <label className="db fw6 lh-copy f5" htmlFor="email-address">The recovery email was successfully sent! Please check your inbox.</label>                            
                            }
                            
                        </div>
                        
                        </fieldset>

                        {(()=> {
                            switch(this.state.submitted) {
                                case false: 
                                    return (
                                        <div className="">
                                        <input 
                                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                            type="submit" 
                                            value="Submit" 
                                            onClick={this.onEmailSubmit}/>
                                        </div>);
                                default: return(null);        
                            }
                        })()}
                            
                        
                    </div>
                </main>
            </article>
        );
    }
  
}

export default RecoverPassword;




