// import { OrderStatus } from '@prisma/client';


export interface OrderWithProducts {
  OrderItem: {
      name: any;
      productId: number;
      quantity: number;
      price: number;
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: string;
  paid: boolean;
  paidAt: Date;
  createdAt: Date;
  updatedAt: Date;
}