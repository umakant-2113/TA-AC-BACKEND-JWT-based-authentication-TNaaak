let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = new Schema({
  userName: { type: String, required: true,unique:true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  image: { type: String },
  password: { type: String },
  following:{type:Boolean ,default:false},
  followUser:[{type:Schema.Types.ObjectId, ref: "User"}],
});

userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
});

// campare password
userSchema.methods.verifyPassword = async function (password) {
  let result = await bcrypt.compare(password, this.password);
  return result;
};

// generate token

userSchema.methods.verifyToken = async function () {
  let payload = { email: this.email, userId: this.id };
  let token = await jwt.sign(payload, process.env.secret);
  return token;
};

// user JSON data

userSchema.methods.userJSON = function (token) {
  return {
    userName: this.userName,
    email: this.email,
    bio:this.bio,
   image:this.image,
    token:token
  };
};

module.exports = mongoose.model('User', userSchema);
