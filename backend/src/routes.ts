import AppointmentsRoutes from './routes/appointment.routes';
import CodeRoutes from './routes/code.routes';
import IndexRoute from './routes/index.route';
import MedicationRoutes from './routes/medication.routes';
import NotificationsRoutes from './routes/notifications.routes';
import PatientRoutes from './routes/patient.routes';
import UserRoutes from './routes/user.routes';

const routes = [
    new IndexRoute(),
    new UserRoutes(),
    new AppointmentsRoutes(),
    new MedicationRoutes(),
    new CodeRoutes(),
    new NotificationsRoutes(),
    new PatientRoutes(),
];

export default routes;
