import { Server, Socket } from 'socket.io';
import { Server as httpServerType } from 'http';
import { logger } from './logger';
import { ORIGIN } from '@/config';

class SocketServer {
    public static io(server: httpServerType) {
        return new Server(server, {
            cors: {
                origin: ORIGIN,
                methods: ['GET', 'POST'],
            },
        });
    }
    public static SocketInitiator(initiator: Server) {
        try {
            initiator.on('connection', (socket: Socket) => {
                socket.on('disconnect', () => {});
            });
        } catch (error) {
            logger.error('Connection error to the socket', error);
        }
    }
}

export default SocketServer;
