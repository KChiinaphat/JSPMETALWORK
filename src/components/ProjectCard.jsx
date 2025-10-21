import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Projectcard.css"

const ProductCard = ({
  _id,
  name,
  description,
  images = [],
  price,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const formattedPrice = price
    ? new Intl.NumberFormat("th-TH").format(price)
    : "N/A";

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-green-soft/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slider */}
      <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-accent-orange/80 text-gray-700 text-xs font-medium rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
        )}

        {images.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="h-64 w-full bg-gray-100"
          >
            {images.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="flex items-center justify-center bg-gray-100 h-64"
              >
                <img
                  src={img?.url || "/placeholder.png"}
                  alt={`${name} - ${idx + 1}`}
                  className={`h-64 w-auto object-contain object-center mx-auto my-auto transition-transform duration-500 ${
                    isHovered ? "scale-105" : "scale-100"
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            ไม่มีรูปภาพ
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-green-primary/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to={`/project/${_id}`}
            className="w-10 h-10 rounded-full bg-white text-green-primary flex items-center justify-center hover:bg-accent-orange hover:text-white transition-colors"
            title={t("view", "View details")}
          >
            <FaEye />
          </Link>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-green-primary mb-2 hover:text-accent-orange transition-colors">
          <Link to={`/project/${_id}`}>{name}</Link>
        </h3>

        <p className="text-sm text-green-secondary mb-4 line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between">
  <Link
    to={`/project/${_id}`}
    className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium transition-all bg-accent-orange rounded-lg hover:bg-accent-orange-dark group"
  >
    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-green-primary duration-300 translate-x-full group-hover:translate-x-0 ease">
      <FaEye />
    </span>
    <span className="absolute flex items-center justify-center w-full h-full text-green-primary transition-all duration-300 transform group-hover:-translate-x-full ease">
      {t("details", "รายละเอียด")}
    </span>
    <span className="relative invisible">
      {t("details", "รายละเอียด")}
    </span>
  </Link>
</div>
      </div>
    </div>
  );
};

export default ProductCard;
