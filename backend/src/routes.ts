import AppointmentController from './controllers/appointments.controller';
import CodeController from './controllers/code.controller';
import MedicationController from './controllers/medication.controller';
import NotificationController from './controllers/notifications.controller';
import PatientController from './controllers/patients.controller';
import SessionController from './controllers/session.controller';
import UserController from './controllers/user.controller';
import AppointmentsRoutes from './routes/appointment.routes';
import CodeRoutes from './routes/code.routes';
import IndexRoute from './routes/index.route';
import MedicationRoutes from './routes/medication.routes';
import NotificationsRoutes from './routes/notifications.routes';
import PatientRoutes from './routes/patient.routes';
import UserRoutes from './routes/user.routes';

const routes = [
    new IndexRoute(),
    new UserRoutes(new UserController(), new SessionController()),
    new AppointmentsRoutes(new AppointmentController()),
    new MedicationRoutes(new MedicationController()),
    new CodeRoutes(new CodeController()),
    new NotificationsRoutes(new NotificationController()),
    new PatientRoutes(new PatientController()),
];

export default routes;
