import { 
  WebSocketGateway, 
  WebSocketServer, 
  OnGatewayConnection, 
  OnGatewayDisconnect,
  SubscribeMessage 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BusesService } from './buses.service';
import { UpdateLocationDto } from './dto/update-bus.dto';
import { Injectable } from '@nestjs/common';
@WebSocketGateway({
  cors: {
    origin: '*', // Restrict this in production!
  },
  namespace: '/buses' // Optional namespace
})
export class BusesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private  busesService: BusesService) {}

  // When a client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    client.emit('connection_success', { 
      status: 'connected',
      time: new Date().toISOString() 
    });
  }

  // When a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Handle location updates from devices
  @SubscribeMessage('update_location')
  async handleLocationUpdate(
    client: Socket,
    payload: { busId: string; data: UpdateLocationDto }
  ) {
    try {
      // Update database
      const updatedBus = await this.busesService.updateLocation(
        payload.busId, 
        payload.data
      );

      // Broadcast to all clients
      this.server.emit('location_updated', {
        busId: payload.busId,
        data: updatedBus,
        timestamp: new Date().toISOString()
      });

      return { status: 'success', data: updatedBus };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }

  // Get real-time updates for specific bus
  @SubscribeMessage('subscribe_to_bus')
  handleSubscribeToBus(client: Socket, busId: string) {
    client.join(`bus_${busId}`);
    return { status: 'subscribed', busId };
  }

  // Stop receiving updates for a bus
  @SubscribeMessage('unsubscribe_from_bus')
  handleUnsubscribeFromBus(client: Socket, busId: string) {
    client.leave(`bus_${busId}`);
    return { status: 'unsubscribed', busId };
  }
}