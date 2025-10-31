export interface ISimpleTableData {
  city: string
  totalOrders: string
}

export interface IPaginatedTableData {
  picture: string
  name: string
  role: string
  created: string
  status: string
  statusColor: string
}

export interface IWideTableData {
  name: string
  email: string
  title: string
  title2: string
  status: string
  role: string
}

export interface Producto {
  nombre: string
  cantidad: number
  precio: number
  detalles: string
}

export interface CartItem {
  id: string;
  emailUsuario: string;
  productos: Array<{
    productoId: string;
    nombre: string;
    precio: number;
    cantidad: number;
    total: number;
    fechaAgregado: number;
  }>;
}
