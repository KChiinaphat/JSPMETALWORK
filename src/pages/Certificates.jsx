import { useState } from "react";


const Certificates = () => {
    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Certificates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
            <div key={certificate.id} className="bg-white shadow-md rounded-lg p-4">
                <img src={certificate.imageUrl} alt={certificate.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />
                <h2 className="text-xl font-semibold">{certificate.title}</h2>
                <p className="text-gray-600">{certificate.description}</p>
            </div>
            ))}
        </div>
        </div>
    );
    }
export default Certificates;
