// driver.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class DriverGateway {
  @WebSocketServer()
  server: Server;

  broadcastCoordinates(driverId: string, coords: { latitude: string; longitude: string }) {
    this.server.emit('locationUpdate', { driverId, ...coords });
  }
}
