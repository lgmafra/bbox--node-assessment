import { Request, Response } from "express";
import User from "../entity/User";

interface CustomRequest<T> extends Request {
  body: T;
}

interface UserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export default class UserController {
  async create({ body }: CustomRequest<UserRequestBody>, res: Response) {
    const user: User = User.create(body);
    await user.save();
    res.status(201).json({ id: user.uuid });
  }

  async list(req: Request, res: Response) {
    const users = await User.find();
    res.status(200).json(users);
  }

  async show(req: Request, res: Response) {
    const user: User = await User.findOne({ uuid: req.params.id });
    if (user) {
      res.status(200).json(user);
    } else res.status(404).json({ message: "User not found!" });
  }

  async delete(req: Request, res: Response) {
    const user: User = await User.findOne({ uuid: req.params.id });
    if (user) {
      User.delete(user);
      res.sendStatus(204);
    } else res.status(404).json({ message: "User not found!" });
  }
}