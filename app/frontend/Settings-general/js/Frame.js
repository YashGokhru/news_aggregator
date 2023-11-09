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
          <div className="frame-item" />
          <div className="frame-inner" />
          <button className="upload-new-photo">Upload new photo</button>
          <button className="save-changes">Save changes</button>
          <button className="remove-photo">Remove photo</button>
          <button className="reset">Reset</button>
          <button className="cancel">Cancel</button>
          <div className="username">Username</div>
          <div className="name">Name</div>
          <div className="e-mail">E-mail</div>
          <div className="rectangle-div" />
          <div className="frame-child1" />
          <div className="frame-child2" />
          <input className="xyaz" placeholder="xyaz" type="text" />
          <input className="xyaz1" placeholder="xyaz" type="text" />
          <input
            className="xyazgmailcom"
            placeholder="xyaz@gmail.com"
            type="email"
          />
        </div>
        <img className="ellipse-icon" alt="" src="/ellipse-1@2x.png" />
      </div>
    </div>
  );
};

export default Frame;
