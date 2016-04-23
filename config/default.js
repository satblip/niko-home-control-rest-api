var env = process.env;

module.exports = {
  httpPort: env.PORT || 3000,
  niko: {
    homeControl: {
      ip: env.NIKO_HC_IP,
      port: env.NIKO_HC_PORT || 8000,
      timeout: env.NIKO_HC_TIMEOUT || 5000
    }
  }
};
