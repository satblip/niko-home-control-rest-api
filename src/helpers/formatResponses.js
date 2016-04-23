var success = function (data) {
  return {
    success: true,
    data: data
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
