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
          <div className="bio">Bio</div>
          <div className="birthday">Birthday</div>
          <div className="frame-item" />
          <div className="frame-inner" />
          <input
            className="you-can-start"
            placeholder="You can start your self-introduction by mentioning your name, experience, occupation and other details to create a positive first impression. Example: “My name is Satish Gupta."
            type="text"
          />
          <input className="may-3-1995" placeholder="May 3, 1995" type="date" />
        </div>
      </div>
    </div>
  );
};

export default Frame;
