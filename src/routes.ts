import { Router } from 'express';
import UserController from './controllers/UserController';
import ProjectController from './controllers/ProjectController';
import { validate } from 'express-validation';
import { createUserValidator } from './validators/user/UserValidators';
import { createProjectrValidator } from './validators/project/ProjectValidators';

const routes = Router();

const userController = new UserController();
const projectController = new ProjectController();

routes.post('/users', validate(createUserValidator), userController.create);
routes.get('/users', userController.list);
routes.get('/users/:id', userController.show);
routes.delete('/users/:id', userController.delete);

routes.post('/projects', validate(createProjectrValidator), projectController.create);
routes.get('/projects', projectController.list);
routes.get('/projects/:projectId', projectController.show);
routes.delete('/projects/:projectId', projectController.delete);

export default routes;
