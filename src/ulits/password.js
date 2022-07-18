const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const keys = require('../config/key');


class Helper {
  /**
   * @description this function is used to hash the password
   * @param {*} password - password to be hashed
   * @returns {Object} - returns the hashed password
   */
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

//   /**
//    * @description this function is used to compare the password
//    * @param {*} password - password to be compared
//    * @param {*} hash - hashed password
//    * @returns {Object} - returns true if the password matches the hashed password else false
//    */
//   static async comparePassword(password, hash) {
//     const isMatch = await bcrypt.compare(password, hash);
//     return isMatch;
//   }

}
module.exports = Helper;
