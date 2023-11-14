import { Button, Checkbox, FormControlLabel } from "@mui/material";
import "./Thumbnail.css";

const Thumbnail = () => {
  return (
    <form className="thumbnail">
      <img className="thumbnail-child" alt="" src="/rectangle-9637@2x.png" />
      <div className="thumbnail-item" />
      <div className="not-registered-yet-parent">
        <div className="not-registered-yet">Not Registered Yet?</div>
        <a className="create-an-account">Create an account</a>
      </div>
      <img className="thumbnail-inner" alt="" src="/group-1686550876.svg" />
      <div className="frame-parent">
        <div className="frame-group">
          <div className="login-to-your-account-wrapper">
            <b className="login-to-your">Login to your Account</b>
          </div>
          <Button sx={{ width: 420 }} className="primary-button" variant="contained">
        Continue with Google
      </Button>
        </div>
        <Button className="or-sign-in" color="primary" variant="contained">
        ------------- or Sign in with Email ------------- 
      </Button>
        <div className="frame-group">
          <div className="frame-div">
            <div className="email-parent">
              <div className="email">Email</div>
              <input className="frame-child" type="text" />
            </div>
            <div className="frame-parent1">
              <div className="email-parent">
                <div className="email">Password</div>
                <input className="frame-child" type="text" />
              </div>
              <div className="checkbox-parent">
                <div className="checkbox">
                  <FormControlLabel
                    className="or-sign-in"
                    label=""
                    control={<Checkbox color="primary" />}
                  />
                  <div className="remember-me">Remember Me</div>
                </div>
                <a className="forgot-password">Forgot Password?</a>
              </div>
            </div>
          </div>
          <Button sx={{ width: 420 }} className="primary-button1" color="primary" variant="contained">
        Login
      </Button>
        </div>
      </div>
    </form>
  );
};

export default Thumbnail;
