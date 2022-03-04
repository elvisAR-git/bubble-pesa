const mpesa = require("../../config/environment").mpesa;
const axios = require("axios");

/**
 * @description - This function is used to generate the base64 encoded string
 *
 * @param {string} username - The username of the mpesa api
 * @param {string} password - The password of the mpesa api
 *
 */
module.exports = class AuthBasic {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  getHeaders() {
    return {
      Authorization:
        "Basic " +
        Buffer.from(this.username + ":" + this.password).toString("base64"),
    };
  }

  /**
   *
   * @returns {Promise<AxiosResponse<any>>}
   * @memberof AuthBasic
   *
   * @description
   * This method is used to request access token from mpesa
   */
  async requestAccessToken() {
    const url = mpesa.auth_url;
    const headers = this.getHeaders();

    try {
      let response = await axios.get(url, { headers });
      const { access_token, expires_in } = response.data;
      return { access_token, expires_in, message: "access granted" };
    } catch (err) {
      return err;
    }
  }
};
