import { Routes, Route, Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
    <div className="grid grid-cols-4 gap-4">
      {['Revenue', 'Orders', 'Customers', 'Products'].map(k => (
        <div key={k} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">{k}</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
        </div>
      ))}
    </div>
  </div>
);

const Products = () => <div className="p-8">Products Management</div>;
const Orders = () => <div className="p-8">Orders Management</div>;

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-gray-800">AQ Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium">Dashboard</Link>
          <Link to="/products" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium">Products</Link>
          <Link to="/orders" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium">Orders</Link>
          <Link to="/customers" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 font-medium">Customers</Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">Logout</button>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
