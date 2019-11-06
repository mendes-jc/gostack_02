import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import CheckinController from './app/controllers/CheckinController';

import authMiddleware from './app/middlewares/auth';
import EnrollmentController from './app/controllers/EnrollmentController';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
/**
 * Students
 */
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students', StudentController.index);
/**
 * Plans
 */
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
/**
 * Enrollments
 */
routes.post('/enrollments', EnrollmentController.store);
/**
 * Checkins
 */
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);
export default routes;
