const User = require("../model/UserModel");

const myProfile = async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid);
    res.render("myprofile", { user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const Profile = async (req, res) => {
  const reqid = req.params._id;
  console.log(reqid);
  try {
    const userid = req.user.id;
    const user = await User.findById(reqid);
    
    console.log(userid.toString() === reqid.toString());
    if (userid.toString() === reqid.toString()) { 
      res.render("myprofile", { user });
    }
    res.render("ProfilePage", { user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  myProfile,
  Profile,
};
