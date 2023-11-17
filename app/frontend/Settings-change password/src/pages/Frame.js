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
          <div className="current-password">Current Password</div>
          <div className="new-password">New Password</div>
          <div className="repeate-new-password">Repeate New Password</div>
          <div className="frame-item" />
          <div className="frame-inner" />
          <div className="rectangle-div" />
          <input className="xyaz" placeholder="xyaz" type="password" />
          <input className="xyaz1" placeholder="xyaz1" type="password" />
          <input className="xyaz11" placeholder="xyaz1" type="password" />
        </div>
      </div>
    </div>
  );
};

export default Frame;
