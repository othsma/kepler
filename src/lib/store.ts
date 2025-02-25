import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

interface UserState {
  language: 'en' | 'es' | 'fr';
  setLanguage: (language: 'en' | 'es' | 'fr') => void;
}

export const useUserStore = create<UserState>((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}));

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

interface ClientsState {
  clients: Client[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
}

export const useClientsStore = create<ClientsState>((set) => ({
  clients: [],
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  addClient: (client) =>
    set((state) => ({
      clients: [
        ...state.clients,
        {
          ...client,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  updateClient: (id, updatedClient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? { ...client, ...updatedClient } : client
      ),
    })),
}));

interface Ticket {
  id: string;
  clientId: string;
  deviceType: string;
  issue: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  cost: number;
  technicianId: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketsState {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTicket: (id: string, ticket: Partial<Ticket>) => void;
  filterStatus: 'all' | 'pending' | 'in-progress' | 'completed';
  setFilterStatus: (status: 'all' | 'pending' | 'in-progress' | 'completed') => void;
}

export const useTicketsStore = create<TicketsState>((set) => ({
  tickets: [],
  filterStatus: 'all',
  setFilterStatus: (status) => set({ filterStatus: status }),
  addTicket: (ticket) =>
    set((state) => ({
      tickets: [
        ...state.tickets,
        {
          ...ticket,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),
  updateTicket: (id, updatedTicket) =>
    set((state) => ({
      tickets: state.tickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...updatedTicket,
              updatedAt: new Date().toISOString(),
            }
          : ticket
      ),
    })),
}));

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  description: string;
  imageUrl: string;
}

interface ProductsState {
  products: Product[];
  categories: string[];
  searchQuery: string;
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  updateStock: (id: string, quantity: number) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  categories: ['Phones', 'Tablets', 'Laptops', 'Accessories'],
  searchQuery: '',
  selectedCategory: 'all',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          ...product,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      ),
    })),
  updateStock: (id, quantity) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock + quantity }
          : product
      ),
    })),
}));

interface CartItem {
  productId: string;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  clientId: string;
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  createOrder: (clientId: string, total: number) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  cart: [],
  addToCart: (productId, quantity) =>
    set((state) => ({
      cart: [
        ...state.cart.filter((item) => item.productId !== productId),
        { productId, quantity },
      ],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),
  clearCart: () => set({ cart: [] }),
  createOrder: (clientId, total) =>
    set((state) => ({
      orders: [
        ...state.orders,
        {
          id: Math.random().toString(36).substr(2, 9),
          items: [...state.cart],
          total,
          status: 'pending',
          clientId,
          createdAt: new Date().toISOString(),
        },
      ],
      cart: [],
    })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
}));