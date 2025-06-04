const product = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <p className="text-gray-700 mb-4">
        We offer a wide range of high-quality products designed to meet your needs. Explore our collection below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Card Example */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Product Name</h2>
          <p className="text-gray-600 mb-4">Description of the product goes here.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
        {/* Repeat Product Card as needed */}
      </div>
    </div>
  );
}
export default product;