export interface INavigate {
  navigate: (route: string) => void;
}

export interface ICartItems {
  id: number;
  clicks: number;
  name: string;
  price: number;
  type: string;
  dateEntry: string;
  Increment: () => void;
  Decrement: () => void;
  Delete: () => void;

  // image: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  type: string;
  dateEntry: string;
}

export interface orderItems {
  qty: number;
  product: IProduct;
}

export interface orderData {
  userId: any;
  client: string;
  products: orderItems[];
  status: string;
  dateEntry: any;
}
export interface TimeCounterProps {
  dateEntry: string;
  isCounting: boolean;
}

export interface TimeDifferenceProps {
  dateProcessed: string;
  dateEntry: string;
}
export interface IAddedToList {
  userId: any;
  id: number;
  client: string;
  products: orderItems[];
  status: string;
  dateEntry: any;
  dateProcessed: any;
}
