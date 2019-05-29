const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String, 
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    profileImageUrl: {
      type: String
    },
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
      }
    ]
  });

//using bcrypt to hash the password before save to Database
//Pre() - pre save hook 
userSchema.pre("save", async function(next){
    try {
      if(!this.isModified("password")){
        return next(); 
      }
  
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
  
      return next();
    } catch (err) {
      return next(err);
    }
});


userSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
      let isMatch = await bcrypt.compare(candidatePassword, this.password);
      //isMatch: boolean
      return isMatch; 
    } catch (err) {
      return next(err);
    }
  };
  
const User = mongoose.model("User", userSchema);
  
module.exports = User;