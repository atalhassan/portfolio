import queryParams from "../util/queryParams";
import HomeButton from "./HomeButton";
import changeByName from "../util/changeByName";
import api from "../api";
import Cookies from "js-cookie";

/**
 * Show this if we think the user has already been logged in
 */
const AlreadyLoggedIn = ({ onLogOut }) => (
  <div>
    <p> {"It looks like you're already logged in!"} </p>
    <button onClick={onLogOut}> Logout </button>
    <HomeButton>Back</HomeButton>
  </div>
);

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: Cookies.get("session"),
      email: "",
      password: ""
    };

    this.onLogOut = this.onLogOut.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    changeByName(this, event);
  }

  onSubmit() {
    Cookies.set("username", this.state.email)
    
    api.postLogin(this.state.email, this.state.password).then(({data}) => {
      if (!data.valid) {
        console.error("Bad login:", data);
        // TODO Tell the user something went wrong
        return 
      } 

      Cookies.set("session", data.session);
    });
  }

  onLogOut() {
    this.setState({
      session: undefined
    });
    Cookies.remove("session");
  }

  render() {
    if (this.state.session) {
      return <AlreadyLoggedIn onLogOut={this.onLogOut} />;
    }

    return (
      <div>
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          placeholder="george@gmail.com"
          id="email"
          name="email"
          onChange={this.onChange}
        />

        <label htmlFor="password"> Password </label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
          onChange={this.onChange}
        />

        <button onClick={this.onSubmit}>Login</button>
        <HomeButton>Back</HomeButton>
      </div>
    );
  }
}

export default Login;
