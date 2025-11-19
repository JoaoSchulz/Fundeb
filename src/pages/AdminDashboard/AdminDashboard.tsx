export const AdminDashboard = (): JSX.Element => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Administrativo</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-lg">Bem-vindo ao painel administrativo!</p>
        <p className="mt-4 text-gray-600">
          Esta página só é acessível para usuários com role "admin".
        </p>
      </div>
    </div>
  );
};
