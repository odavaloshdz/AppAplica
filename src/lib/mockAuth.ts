// Mock authentication service for development
const MOCK_USERS = [
  {
    email: 'superadmin@example.com',
    password: 'superadmin123',
    roles: ['superadmin'],
    tenantId: 'system',
    name: 'Super Admin'
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    roles: ['admin'],
    tenantId: 'default',
    name: 'Admin User'
  },
  {
    email: 'user@example.com',
    password: 'user123',
    roles: ['user'],
    tenantId: 'default',
    name: 'Regular User'
  },
];

export const mockLogin = async (email: string, password: string) => {
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Create a mock JWT token payload
  const tokenPayload = {
    sub: crypto.randomUUID(),
    email: user.email,
    name: user.name,
    roles: user.roles,
    tenantId: user.tenantId,
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
  };

  // Convert the payload to base64 to simulate a JWT
  const accessToken = btoa(JSON.stringify(tokenPayload));
  const refreshToken = crypto.randomUUID();

  return { accessToken, refreshToken, user: tokenPayload };
};