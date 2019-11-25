import React, { Component } from 'react';
import Nav from '../components/Nav';

export default class Home extends Component {
  render() {
    return (
      <div style={{ height: '100%' }}>
        <Nav />
        <div style={{ height: '80%' }}>
          <div className="row h-100">
            <div className="col-sm-12 my-auto">
              <div className="w-auto mx-auto">
                <h3 className="text-muted text-center pt-20 pb-20">
                  Thanks for using Trello.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default class SignOut extends Component {
//   state = {
//     redirectToSignIn: false,
//     redirectToSignUp: false,
//   };

//   setRedirectToSignin = () => {
//     this.setState({
//       redirectToSignIn: true,
//     });
//   };

//   setRedirectToSignUp = () => {
//     this.setState({
//       redirectToSignUp: true,
//     });
//   };

//   renderRedirectToSignIn = () => {
//     if (this.state.redirectToSignIn) {
//       return <Redirect to="/signin" />;
//     }
//   };

//   renderRedirectToSignUp = () => {
//     if (this.state.redirectToSignUp) {
//       return <Redirect to="/signup" />;
//     }
//   };

//   render() {
//     return (
//       <div>
//         Thanks for using Trello.
//         {this.renderRedirectToSignIn()}
//         {this.renderRedirectToSignUp()}
//         <input
//           type="button"
//           value="Log In"
//           onClick={this.setRedirectToSignin}
//         />
//         <input
//           type="button"
//           value="Sign Up"
//           onClick={this.setRedirectToSignUp}
//         />
//       </div>
//     );
//   }
// }
