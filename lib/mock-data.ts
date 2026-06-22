export const mockProjects = [
  { id: 'proj_001', name: 'Karuppar Statue', type: 'Deity statue', status: 'completed', score: 91, createdAt: '2024-07-01', imageUrl: null },
  { id: 'proj_002', name: 'MiniMe Chibi Figure', type: 'Chibi figure', status: 'completed', score: 85, createdAt: '2024-07-03', imageUrl: null },
  { id: 'proj_003', name: 'Deity Bust', type: 'Bust', status: 'processing', score: null, createdAt: '2024-07-05', imageUrl: null },
  { id: 'proj_004', name: 'Custom Keychain', type: 'Keychain', status: 'completed', score: 94, createdAt: '2024-07-06', imageUrl: null },
  { id: 'proj_005', name: 'Product Prototype', type: 'Product model', status: 'failed', score: null, createdAt: '2024-07-07', imageUrl: null },
  { id: 'proj_006', name: 'Miniature Warrior', type: 'Miniature figure', status: 'completed', score: 78, createdAt: '2024-07-08', imageUrl: null },
]

export const mockUser = {
  id: 'user_001',
  name: 'Demo User',
  email: 'demo@phototostlpro.com',
  plan: 'Creator',
  creditsUsed: 6,
  creditsTotal: 30,
  storageUsed: 2.4,
  storageTotal: 5,
}

export const mockSteps = [
  { id: 1, name: 'Image uploaded', status: 'done' },
  { id: 2, name: 'Background removed', status: 'done' },
  { id: 3, name: 'Image enhanced', status: 'done' },
  { id: 4, name: 'Depth estimated', status: 'processing' },
  { id: 5, name: '3D mesh generated', status: 'pending' },
  { id: 6, name: 'Mesh cleaned', status: 'pending' },
  { id: 7, name: 'Holes filled', status: 'pending' },
  { id: 8, name: 'Non-manifold fixed', status: 'pending' },
  { id: 9, name: 'Thin parts thickened', status: 'pending' },
  { id: 10, name: 'Floating parts connected', status: 'pending' },
  { id: 11, name: 'Base added', status: 'pending' },
  { id: 12, name: 'STL exported', status: 'pending' },
  { id: 13, name: 'Printability report ready', status: 'pending' },
]
