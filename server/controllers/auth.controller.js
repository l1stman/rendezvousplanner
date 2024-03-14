import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import accountSchema from "../models/account.schema.js";
import profileSchema from "../models/profile.schema.js";

const jwtSecretKey = "helloworldàç-Qè_(76QTtqè5445euiGQ745qè-RQ74helloworld";

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: "Nothing provided!" });
  if (password.length < 8)
    return res.json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  let account;
  account = await accountSchema.findOne({ email });
  if (account)
    return res.json({ success: false, message: "email already used!" });

  const hashed = await bcrypt.hash(password, 10);
  const newaccount = new accountSchema({
    email: email,
    password: hashed,
  });
  newaccount.save();
  return res.json({
    success: true,
    message: "Account created successfully!",
    account: newaccount,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ success: false, message: "nothing provided" });

  const account = await accountSchema.findOne({ email });
  if (!account) return res.json({ success: false, message: "Invalid email!" });

  const passwordMatch = await bcrypt.compare(password, account.password);
  if (!passwordMatch)
    return res.json({ success: false, message: "Invalid password!" });
  var data = { _id: account._id, email: account.email };
  const token = jwt.sign(data, jwtSecretKey);
  res.json({ success: true, token: token });

  var profile = await profileSchema.findOne({
    owner: account._id,
  });
  if (!profile) {
    var newprofile = new profileSchema({
      owner: account._id,
    });
    newprofile.save();
  }
};

const protect = async (req, res) => {
  if (!req.tokendata)
    return res.json({ success: false, message: "Invalid Token!" });

  const profile = await profileSchema
    .findOne({ owner: req.tokendata.decoded._id })
    .populate({
      path: "owner",
      select: "-password",
    });
  req.session.account = { _id: profile.owner._id, email: profile.owner.email};
  req.session.save(err => {
    if (err) {
      // handle error
      console.error(err);
      return res.json({ success: false, message: 'Session save error!' });
    }
        res.json({ success: true, profile: profile });
  });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destroy failed:", err);
      res.json({ success: false, message: "Logout failed" });
    } else {
      res.json({ success: true, message: "Logout successful" });
    }
  });
};

const isLogged = async (req, res, next) => {
  if (!req.session.account)
    return res.json({ success: false, message: "No session available!" });
  next();
};

const isProfileOwner = (req, res, next) => {
  if (req.session.account._id.toString() != req.profile.owner._id.toString())
    return res.json({ success: false, message: "You don't have permission!" });
  next();
};
const isPlanOwner = (req, res, next) => {
  if (req.session.account._id.toString() != req.plan.owner._id.toString())
    return res.json({ success: false, message: "You don't have permission!" });
  next();
};
const checkToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({
      success: false,
      message: "Authentication failed. Token not provided.",
    });
  }
  jwt.verify(token.split("Bearer ")[1], jwtSecretKey, async (err, decoded) => {
    if (err) {
      return res.json({
        success: false,
        message: "Authentication failed. Invalid token.",
        err,
      });
    }
    req.tokendata = { token: token, decoded: decoded };
    next();
  });
};

const LoginWithToken = async (req, res, next) => {
  if (!req.tokendata)
    return res.json({ success: false, message: "Invalid Token!" });
  try {
    const profile = await profileSchema
      .findOne({ owner: req.tokendata.decoded._id })
      .populate({
        path: "owner",
        select: "-password",
      });
      if(!profile) return res.json({ success: false, message: "Invalid Token!" })
    req.session.account = { _id: profile.owner._id, email: profile.owner.email};
    next();
  } catch (error) {
    return res.json({ success: false, message: "Internal server error!" });
  }
};

const editaccount = async (req, res) => {
  const { email, password } = req.body;
  if(!password) return res.json({ success: false, message: "Please type a password (new or old)!" });
  try {
    if(req.session.account.email === email) return res.json({ success: false, message: "You already have this email!" });
    let user;
    user = await accountSchema.findOne({ email });
    if (user)
      return res.json({ success: false, message: "email already used!" });

    if (password.length < 8)
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });

    const hashed = await bcrypt.hash(password, 10);

      const account = await accountSchema.findById(req.session.account._id)

    account.email = email ? email : account.email;
    account.password = password ? hashed : account.password;
    account.save();
    req.session.account = { _id: profile.owner._id, email: profile.owner.email};
    return res.json({ success: true, account: account });
  } catch (error) {
    return res.json({ success: true, message: "Internal server error!" });
  }
};

const deleteaccount = async (req, res) => {
  try {
    const deleted = await accountSchema.findByIdAndDelete(
      req.session.account._id
    );
    const deletedprofile = await profileSchema.findOneAndDelete({ owner: req.session.account._id })
    deleted.save()
    deletedprofile.save()
    return res.json({ success: true, account: deleted });
  } catch (error) {
    return res.json({ success: true, message: "Internal server error!" });
  }
};

export default {
  signup,
  signin,
  protect,
  logout,
  isLogged,
  isProfileOwner,
  isPlanOwner,
  checkToken,
  LoginWithToken,
  editaccount,
  deleteaccount
};
