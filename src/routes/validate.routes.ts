import * as express from "express";
import * as uuid from "uuid";

const validateInput = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const params = { id: req.url.split("/")[2] };
  if (req.method === "POST" || req.method === "PUT"){
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: "Request body can't be empty" });
    }
  }
  if (req.method === "DELETE" || req.method === "PUT"){
    if (!params.id) {
      return res.status(400).send({ message: "Id is required" });
    }
    if (!uuid.validate(params.id)){
      return res.status(400).send({ message: "Id must be a valid uuid" });
    }
  }
  if (req.method === "GET" && params.id){
    if (!uuid.validate(params.id)){
      return res.status(400).send({ message: "Id must be a valid uuid" });
    }
  }
  next();
};
export { validateInput };
