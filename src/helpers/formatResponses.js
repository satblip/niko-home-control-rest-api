var success = function (response) {
  return {
    success: true,
    cmd: response.cmd,
    data: response.data
  };
};

var error = function (error) {
  return {
    success: false,
    data: error.message
  };
};

module.exports = {
  success: success,
  error: error
};
