const User = require("../model/UserModel");

const Profile = async(req, res) => {
    try{
        const userid = req.user.id;
        const user = await User.findById(userid);
        res.render("ProfilePage",{user});
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    Profile
  };