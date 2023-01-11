import { ROLES } from "./enums/ROLES.enum";

const checkIsInRole =
  (...ROLES) =>
  (req, res, next) => {
    const hasRole = ROLES.find((role) => req.user.role === role);
    if (!hasRole) {
      res.status(401).json({ msg: 'Unauthorized'});
    } else {
      next();
    }
  };
export { checkIsInRole };
