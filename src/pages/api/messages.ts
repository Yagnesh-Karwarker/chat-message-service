import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Message } from '@/types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const messages = await prisma.message.findMany({
      orderBy: { timestamp: 'asc' },
    });
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const { content } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        content,
        timestamp: new Date(),
      },
    });
    
    // Emit the new message to all connected clients
    if (res.socket.server.io) {
      res.socket.server.io.emit('new-message', newMessage);
    }
    
    res.status(201).json(newMessage);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}