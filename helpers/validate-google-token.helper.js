const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,
  });

  const { name, email, picture } = ticket.getPayload();
  return { name, email, picture };
};

module.exports = {
  verifyGoogleToken,
};
