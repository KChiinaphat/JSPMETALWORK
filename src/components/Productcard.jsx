import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart, FaSearch, FaStar } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const ProductCard = ({ id, name, description, imageUrl, price, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('th-TH').format(price);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-green-soft/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-64">
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-accent-orange/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}
        
        {/* Product Image */}
        <img 
          src={imageUrl} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`} 
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-green-primary/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link 
            to={`/products/${id}`} 
            className="w-10 h-10 rounded-full bg-white text-green-primary flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
            title={t("view", "View details")}
          >
            <FaEye />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">


        {/* Product Name */}
        <h3 className="text-lg font-semibold text-green-primary mb-2 hover:text-accent-orange transition-colors">
          <Link to={`/products/${id}`}>
            {name}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-green-secondary mb-4 line-clamp-2 flex-grow">{description}</p>

        {/* Price and Button Row */}
        <div className="mt-auto flex items-center justify-between">
          <p className="text-xl font-bold text-green-primary">{formattedPrice} บาท</p>
          <Link 
            to={`/products/${id}`}
            className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-accent-orange rounded-lg hover:bg-accent-orange-dark group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-primary duration-300 translate-x-full group-hover:translate-x-0 ease">
              <FaEye />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-green-primary transition-all duration-300 transform group-hover:-translate-x-full ease">
              {t("details", "รายละเอียด")}
            </span>
            <span className="relative invisible">{t("details", "รายละเอียด")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;