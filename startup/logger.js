const config = require("config");
const { ApiLog } = require("../models/apiLog");

module.exports = function (req, res, next) {
  if (config.get("environment") === "dev") {
    console.log({
      host: req.headers["host"],
      contentType: req.headers["content-type"],
      Authorization: req.headers["Authorization"],
      method: req.method,
      url: req.url,
      body: req.body,
    });
  }

  const cleanup = () => {
    res.removeListener("finish", loggerFunction);
    res.removeListener("close", loggerFunction);
    res.removeListener("error", loggerFunction);
  };

  const loggerFunction = async () => {
    cleanup();
    try {
      if (res.req.apiId) {
        let endTimeMilli = new Date();
        let responseTimeMilli = endTimeMilli - req.startTimeMilli;
        let email = "";
        let role = "";
        let subrole = "";

        if (req.jwtData) {
          email = req.jwtData.email;
          role = req.jwtData.role;
        }

        await logApis(
          req.apiId,
          req.method,
          req.reqUserId,
          req.originalUrl,
          req.baseUrl + req.route.path,
          req.baseUrl,
          req.query,
          req.params,
          email,
          role,
          subrole || "NA",
          req.body,
          req.startTimeMilli,
          endTimeMilli,
          responseTimeMilli,
          res.statusCode,
          res.errorMessage
        );
      }
    } catch (Ex) {
      console.log("Exception in logging: ", Ex);
    }
  };

  res.on("finish", loggerFunction); // successful pipeline (regardless of its response)
  res.on("close", loggerFunction); // aborted pipeline
  res.on("error", loggerFunction); // pipeline internal error

  next();
};

async function logApis(
  apiId,
  method,
  userId,
  completeUrl,
  url,
  baseUrl,
  query,
  params,
  email,
  role,
  subrole,
  body,
  startTimeMilli,
  endTimeMilli,
  responseTimeMilli,
  statusCode,
  errorMessage
) {
  let apiLog = new ApiLog({
    apiId,
    method,
    userId,
    completeUrl,
    url,
    baseUrl,
    query,
    params,
    email,
    role,
    subrole,
    body,
    startTimeMilli,
    endTimeMilli,
    responseTimeMilli,
    statusCode,
    errorMessage,
  });

  if (Object.keys(apiLog.body).length != 0) {
    if (apiLog.body.password != "") {
      apiLog.body.password = "";
    }
  }

  await apiLog.save();
}
