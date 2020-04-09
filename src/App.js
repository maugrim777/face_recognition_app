import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import RecoverPassword from './components/RecoverPassword/RecoverPassword'
import './App.css';
import particlesOptions from './particlesOptions.json'
import 'tachyons';


const initialState = {
  input:'',
  imageURL: '',
  box : {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id : '',
    name : '',
    email: '',
    entries: 0,
    faces: 0,
    joined: ''
  }
}

class App extends Component{
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id : data.id,
      name : data.name,
      email: data.email,
      entries: data.entries,
      faces: data.faces,
      joined: data.joined
    }})
  }

  componentDidMount() {
    fetch('https://smart-brain-maugrim777.herokuapp.com/')
    .then(response => response.json())
    .then(data => console.log(data));
  }

  calculateFaceLocation = (data) => {
    let clarifai =[]
    for (let i=0; i< data.outputs[0].data.regions.length; i++) {
      clarifai.push(data.outputs[0].data.regions[i])}

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    let boxes = []
    for (let i=0; i< clarifai.length; i++) {
      let clariface = clarifai[i].region_info.bounding_box
      boxes.push({
        leftCol: clariface.left_col * width,
        topRow: clariface.top_row * height,
        rightCol: width - (clariface.right_col * width),
        bottomRow: height - (clariface.bottom_row * height)       
      })
    }
    return boxes
  }

  displayFaceBox = (boxes) => {
    this.setState({box: boxes})
    fetch('https://smart-brain-maugrim777.herokuapp.com/faces', {
            'method': 'PUT',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({
                id: this.state.user.id,
                facesFound: boxes.length 
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {faces: count}))
          })
          .catch(console.log)
    console.log(this.state.user.faces)
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
      fetch('https://smart-brain-maugrim777.herokuapp.com/imageurl', {
        'method': 'POST',
        'headers': {'Content-Type': 'application/json'},
        'body': JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (typeof response === 'object') {
          fetch('https://smart-brain-maugrim777.herokuapp.com/image', {
            'method': 'PUT',
            'headers': {'Content-Type': 'application/json'},
            'body': JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
          this.displayFaceBox(this.calculateFaceLocation(response))
        } else {
          console.log('Please submit an URL!')
        }
        
      }
      )      
      .catch(err => console.log(err))
    }

  onRouteChange = (route) => {
    if (route==='signout') {
      this.setState(initialState)
    } else if (route==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  } 

  render () {
    const {isSignedIn, route, box, imageURL} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions} 
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} faces={this.state.user.faces} />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageURL={imageURL}/>
            </div>
          : (
            route === 'register'
            ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : route=== 'recoverPassword' 
            ?<RecoverPassword loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
           
        }
       </div>
  
    );
  }
}

export default App;
