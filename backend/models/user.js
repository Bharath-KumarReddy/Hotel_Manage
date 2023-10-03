const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    name : {type: String , require},
    email : {type: String , require},
    password : {type: String , require},
    isAdmin : {type: Boolean , require , default: false},
    resetpasswordToken : {
        type : String
      }
    
} , {
    timestamps : true,
})



userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  

  userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };
  
  
  userSchema.methods.getResetpasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    this.resetpasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
  
      this.resetpasswordExpire = Date.now() + 10 * 60 * 1000;
  
      return resetToken;
  }

module.exports = mongoose.model('users' , userSchema)