import "./Frame.css";

const Frame = () => {
  return (
    <div className="account-settings-parent">
      <b className="account-settings">Account Settings</b>
      <div className="frame-parent">
        <div className="general-parent">
          <a className="general">General</a>
          <a className="change-password">Change Password</a>
          <a className="forgot-password">Forgot Password</a>
          <a className="info">Info</a>
        </div>
        <div className="rectangle-parent">
          <div className="frame-child" />
          <button className="save-changes">Save changes</button>
          <button className="cancel">Cancel</button>
          <div className="enter-your-registered">
            Enter your Registered Mail id
          </div>
          <div className="enter-otp">Enter OTP</div>
          <div className="new-password">New Password</div>
          <div className="repeate-new-password">Repeate New Password</div>
          <div className="frame-item" />
          <div className="frame-inner" />
          <div className="rectangle-div" />
          <div className="frame-child1" />
          <input
            className="xyazgmailcom"
            placeholder="xyaz@gmail.com"
            type="email"
          />
          <input className="input" placeholder="0123" type="number" />
          <input className="xyaz1" placeholder="xyaz1" type="password" />
          <input className="xyaz11" placeholder="xyaz1" type="password" />
        </div>
      </div>
    </div>
  );
};

export default Frame;
