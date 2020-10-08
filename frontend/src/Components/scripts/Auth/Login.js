









import React, { Component } from "react";
import { connect } from "react-redux";
import { onLogin } from "../../Redux/Authentication/AuthAction";
import { withRouter } from "react-router-dom";
import { Alert } from '@material-ui/lab';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }
  componentDidMount(){
    const {isAuthenticated} = this.props.auth
    if(isAuthenticated){
      this.props.history.push('/dashboard')
    }
  }

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onSubmit = () => {
    const { email, password } = this.state;
    const newUser = {
      email,

      password,
    };
    // console.log(newUser);
    this.props.onLogin(newUser, this.props.history);
  };
  render() {
    const { email, password } = this.state;
    return (
      <React.Fragment>
         {this.props.auth.error ? (
         <div className="mt-3">
          <Alert variant="outlined" severity="warning">{this.props.auth.error.msg}</Alert>
         {/* { console.log("failed")} */}
           </div>
       ) : null}
        <br />
        <div className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="text-center">Login</h3>

                  <input
                    type="email"  placeholder="Enter Email"
                    value={email}
                    name="email"
                    onChange={this._onHandleChange}
                  />

                  <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    name="password"
                    onChange={this._onHandleChange}
                  />
                  <button className="btn-primary" onClick={this._onSubmit}>
                    Login
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    //fetching data from AuthReducer
    auth: state.auth,

  };
}


export default connect(mapStateToProps, { onLogin })(withRouter(Login));













// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { onLogin } from "../../Redux/Authentication/AuthAction";
// import { withRouter } from "react-router-dom";
// import { Alert } from '@material-ui/lab';



// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
      
//     };
//   }
//   componentDidMount(){
//     const {authenticated} = this.props.auth;
//   if(authenticated){
//       this.props.history.push('/dashboard')
//     }
   
  
  
//   }

//   _onHandleChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   _onSubmit = () => {
//     const { email, password } = this.state;
    
//     const newUser = {
//       email,

//       password,
    
//     };
//     // console.log(newUser);
//     this.props.onLogin(newUser, this.props.history);
//   }
  
//   render() {
//     const { email, password } = this.state;
//     return (
//       <React.Fragment>
//         {this.props.auth.error ? (
//           <div className="mt-3">
//             <Alert severity="warning">{this.props.auth.error.msg}</Alert>
//            {/* { console.log("failed")} */}
//             </div>
//         ) : null}
//         <br />
//         <div className="container">
//           <div className="row">
//             <div className="col-md-4" />
//             <div className="col-md-4">
//               <div className="card">
//                 <div className="card-body">
//                   <h3 className="text-center">Login</h3>

//                   <input
//                     type="email"  placeholder="Enter Email"
//                     value={email}
//                     name="email"
//                     onChange={this._onHandleChange}
//                   />

//                   <input
//                     type="password"
//                     placeholder="Enter Password"
//                     value={password}
//                     name="password"
//                     onChange={this._onHandleChange}
//                   />
//                   <button className="btn-primary" onClick={this._onSubmit}>
//                     Login
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4" />
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// function mapStateToProps(state) {

//   return {
//     //fetching data from AuthReducer
    
//     auth: state.auth,
    
//   };


  
  
// }


// export default connect(mapStateToProps, { onLogin })(withRouter(Login));
