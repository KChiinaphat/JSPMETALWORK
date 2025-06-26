import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-light">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg border border-green-soft/20">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-green-primary">
            ไม่มีสิทธิ์เข้าถึง
          </h2>
          <p className="mt-2 text-sm text-green-secondary">
            คุณไม่มีสิทธิ์เข้าถึงหน้านี้
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link
            to="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-orange hover:bg-accent-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange transition-colors"
          >
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 