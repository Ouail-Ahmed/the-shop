import { verifyAccessToken } from "../helper/jwtHelper.mjs";

// 401 means "we do not know who you are": no token, a bad token or an
// expired one. On success it sets req.user for the next handler.
export default function verifyJwt(req, res, next) {
  const [scheme, token] = (req.headers.authorization ?? "").split(" ");
  if (scheme !== "Bearer" || !token) {
    res.set("WWW-Authenticate", "Bearer");
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    res.set("WWW-Authenticate", 'Bearer error="invalid_token"');
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
