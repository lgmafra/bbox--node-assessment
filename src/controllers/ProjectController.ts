import { Request, Response } from 'express';
import User from '@entity/User';
import Project from '@entity/Project';

interface CustomRequest<T> extends Request {
  body: T;
}

interface ProjectRequestBody {
  userId: string;
  description: string;
}

interface ProjectFilter {
  where?: Object;
}

export default class ProjectController {
  async create ({ body }: CustomRequest<ProjectRequestBody>, res: Response) {
    try {
      const user: User = await User.findOne({ uuid: body.userId });
      const project: Project = Project.create({
        description: body.description,
        owner: user
      });
      await project.save();
      res.status(201).json({ id: project.uuid });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async list (req: Request, res: Response) {
    const { userId } = req.query;
    const filter: ProjectFilter = {};
    if (userId) {
      filter.where = { owner: userId };
    }
    const projects: Project[] = await Project.find(filter);
    res.status(200).json(projects);
  }

  async show (req: Request, res: Response) {
    const { projectId } = req.params;
    const projects: Project = await Project.findOne({
      where: { uuid: projectId }
    });
    res.status(200).json(projects);
  }

  async delete (req: Request, res: Response) {
    const { projectId } = req.params;
    const project: Project = await Project.findOne({
      where: { uuid: projectId }
    });
    if (project) {
      Project.delete(project);
      res.sendStatus(204);
    } else res.status(404).json({ message: 'User not found!' });
  }
}
