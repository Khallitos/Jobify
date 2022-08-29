import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthorised-request.js";

const authmiddleware = (req, res, next) => {
  const headers = req.headers;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const {userId}= jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId};
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  next();
};

export default authmiddleware;
