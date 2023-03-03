const axios = require("axios");

const removeDefaultUser = (id) => {
  axios.delete(`http://localhost:3001/users/${id}`).catch(() => {});
};

exports.removeDefaultUser = removeDefaultUser;
