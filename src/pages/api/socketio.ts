import { Server } from 'socket.io';
import type { NextApiRequest } from 'next';
import { Server as NetServer } from 'http';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    const io = new Server(httpServer, {
      path: '/api/socketio',
    });

    io.on('connection', (socket) => {
      socket.on('send-message', (message) => {
        io.emit('new-message', message);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;