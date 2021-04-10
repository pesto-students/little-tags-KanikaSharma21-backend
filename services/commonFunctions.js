var md5 = require("md5");
module.exports.generateCheckSum = function CheckSum(checksum, amount, txnTime) {
  let tempString = amount.toString() + txnTime.toString() + "@p$1o";
  if (md5(tempString) != checksum) return false;
  return true;
};
