import { type Request, type Response } from "express";
import Server from "./config/server.js";

const server = new Server();
export default (req: Request, res: Response) => {
  server.app(req, res);
};