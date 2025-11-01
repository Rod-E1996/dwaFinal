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

export function useTableData() {
  const paginatedTableData: IPaginatedTableData[] = [
    {
      picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'Jane Cooper',
      role: 'Admin',
      created: 'Jan 12, 2021',
      status: 'Active',
      statusColor: 'green',
    },
    {
      picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      name: 'John Doe',
      role: 'User',
      created: 'Feb 5, 2021',
      status: 'Inactive',
      statusColor: 'red',
    },
  ];

  const wideTableData: IWideTableData[] = [
    {
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      title: 'Regional Paradigm Technician',
      title2: 'Optimization',
      status: 'Active',
      role: 'Admin',
    },
    {
      name: 'Cody Fisher',
      email: 'cody.fisher@example.com',
      title: 'Product Directives Officer',
      title2: 'Intranet',
      status: 'Active',
      role: 'Owner',
    },
  ];

  return {
    paginatedTableData,
    wideTableData,
  };
}
