const BASE_URL = "https://delyx-backend.onrender.com";

type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit & RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  // Add Authorization header if token exists
  let token = typeof window !== 'undefined' ? localStorage.getItem("access_token") : null;
  let role = typeof window !== 'undefined' ? localStorage.getItem("user_role") : null;

  // Trim token to remove any whitespace
  if (token) {
    token = token.trim();
  }

  // Debug logs
  console.log('[API Request]', {
    endpoint,
    method: fetchOptions.method || 'GET',
    hasToken: !!token,
    userRole: role,
    tokenLength: token?.length,
    tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
    tokenStartsWithBearer: token?.startsWith('eyJ'),
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  // Handle authentication based on user role
  if (token) {
    if (role === "admin") {
      headers["Authorization"] = `admin ${token}`;
    } else {
      headers["Authorization"] = `bearer ${token}`;
    }
  }

  console.log('[API Headers]', {
    hasAuthorization: !!headers.Authorization,
    authHeaderLength: headers.Authorization?.length,
    authHeaderPreview: headers.Authorization ? `${headers.Authorization.substring(0, 30)}...` : 'none',
    fullAuthHeader: headers.Authorization ? `${role === 'admin' ? 'admin' : 'bearer'} ${token?.substring(0, 20)}...` : 'none',
  });

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('[API Error]', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new ApiError(
      `API error: ${response.statusText}`,
      response.status
    );
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};

// Order API types
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  totalPrice: number;
}

export interface ApiOrder {
  _id: string;
  userId: string;
  status: string;
  otp: string;
  otpUsed: boolean;
  items: OrderItem[];
  totalPrice: number;
  isCancelled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface OrdersResponse {
  orders: ApiOrder[];
}

export interface CreateOrderResponse {
  message: string;
  order: ApiOrder;
}

export interface OrderDetailsResponse {
  order: ApiOrder & {
    deviceId?: {
      lastLocation: { lat: number; lng: number };
      _id: string;
      deviceName: string;
      type: string;
      status: string;
      currentOrder: string;
      isActive: boolean;
      lastSeen: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      id: string;
    };
  };
}

// Device API types
export interface DeviceLocation {
  lat: number;
  lng: number;
}

export interface Device {
  _id: string;
  deviceName: string;
  type: string;
  status: string;
  isActive: boolean;
  lastLocation: DeviceLocation;
  lastSeen: string;
  currentOrder: string;
}

export interface DevicesResponse {
  devices: Device[];
}

// Order API functions
export const ordersApi = {
  getOrders: () => api.get<OrdersResponse>("/orders"),
  
  getOrderById: (orderId: string) =>
    api.get<OrderDetailsResponse>(`/orders/${orderId}`),
  
  createOrder: (data: CreateOrderRequest) => 
    api.post<CreateOrderResponse>("/orders", data),

  markAsDelivered: (orderId: string) =>
    api.patch<{ message: string }>(`/orders/${orderId}/delivered`),

  dispatchOrder: (orderId: string, deviceId: string) =>
    api.patch<{ message: string }>("/orders/dispatch", { orderId, deviceId }),
};

// Device API functions
export const devicesApi = {
  getDevices: () => api.get<DevicesResponse>("/device"),
};
