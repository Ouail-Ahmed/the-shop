import jwt from "jsonwebtoken";

const ALGORITHM = "HS256";
const ACCESS_TOKEN_LIFETIME = "15m";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set to at least 32 characters");
  }
  return secret;
}

// Call once at startup so a missing secret stops the server early.
export function assertJwtConfig() {
  getSecret();
}

export function signAccessToken(user) {
  return jwt.sign({ role: user.role }, getSecret(), {
    algorithm: ALGORITHM,
    subject: user.id,
    expiresIn: ACCESS_TOKEN_LIFETIME,
  });
}

// Returns the payload, or throws if the token is invalid or expired.
// Naming the algorithm stops a token from choosing its own, such as "none".
export function verifyAccessToken(token) {
  return jwt.verify(token, getSecret(), { algorithms: [ALGORITHM] });
}
