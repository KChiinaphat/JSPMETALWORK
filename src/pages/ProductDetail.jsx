import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

const ProductDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // 🔁 โหลดสินค้าจาก backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการโหลดสินค้า', err);
        setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการโหลดสินค้า');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // 📧 ติดต่อสอบถาม
  const handleInquiry = () => {
    const subject = encodeURIComponent(`สอบถามเกี่ยวกับ ${product.name}`);
    const body = encodeURIComponent(`สวัสดีครับ/ค่ะ\n\nต้องการสอบถามเกี่ยวกับผลิตภัณฑ์: ${product.name}\n\nรายละเอียดเพิ่มเติม:\n- `);
    window.open(`mailto:info@yourcompany.com?subject=${subject}&body=${body}`, '_blank');
  };

  // 📱 Share สินค้า
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} - ผลิตภัณฑ์จากโรงงานของเรา`,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('การแชร์ถูกยกเลิก');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์แล้ว!');
    }
  };

  // 📄 ดาวน์โหลดแคตตาล็อก
  const handleDownloadCatalog = () => {
    // สมมติว่ามีไฟล์ PDF catalog
    const catalogUrl = product.catalogUrl || '/catalogs/product-catalog.pdf';
    window.open(catalogUrl, '_blank');
  };

  // 🔄 Loading Component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary"></div>
      <span className="ml-3 text-gray-600">กำลังโหลด...</span>
    </div>
  );

  // ❌ Error Component
  const ErrorMessage = ({ message }) => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">เกิดข้อผิดพลาด</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-primary text-white rounded-lg hover:bg-green-600 transition"
          >
            ลองใหม่
          </button>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            กลับไปหน้าผลิตภัณฑ์
          </button>
        </div>
      </div>
    </div>
  );

  // 🚫 Product Not Found Component
  const ProductNotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">🏭</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ไม่พบผลิตภัณฑ์</h2>
        <p className="text-gray-600 mb-6">ผลิตภัณฑ์ที่คุณค้นหาไม่มีอยู่ในระบบ</p>
        <Link
          to="/products"
          className="inline-block px-6 py-2 bg-green-primary text-white rounded-lg hover:bg-green-600 transition"
        >
          ดูผลิตภัณฑ์ทั้งหมด
        </Link>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ProductNotFound />;

  const { name, description, price, images, category, specifications, features, applications } = product;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-green-primary">หน้าหลัก</Link>
        <span>›</span>
        <Link to="/products" className="hover:text-green-primary">ผลิตภัณฑ์</Link>
        <span>›</span>
        <span className="text-gray-800">{name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* รูปภาพ */}
        <div className="space-y-4">
          {images && images.length > 0 ? (
            <>
              {/* Main Image Swiper */}
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs]}
                  navigation
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  loop={true}
                  className="rounded-xl overflow-hidden shadow-lg"
                  onSlideChange={(swiper) => setSelectedImageIndex(swiper.realIndex)}
                >
                  {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img.url}
                        alt={`${name}-${idx}`}
                        className="w-full h-[500px] object-contain bg-white"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition"
                  title="แชร์ผลิตภัณฑ์"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>

              {/* Thumbnail Swiper */}
              {images.length > 1 && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[Thumbs]}
                  className="thumbnail-swiper"
                >
                  {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className={`cursor-pointer rounded-lg overflow-hidden ${
                        selectedImageIndex === idx ? 'ring-2 ring-green-primary' : ''
                      }`}>
                        <img
                          src={img.url}
                          alt={`${name}-thumb-${idx}`}
                          className="w-full h-20 object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          ) : (
            <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center text-gray-500 rounded-xl">
              <div className="text-center">
                <div className="text-4xl mb-2">🏭</div>
                <p>{t('no_image', 'ไม่มีรูปภาพ')}</p>
              </div>
            </div>
          )}
        </div>

        {/* รายละเอียดผลิตภัณฑ์ */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">{name}</h1>
            
            {category && (
              <span className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm rounded-full">
                {category}
              </span>
            )}

            <p className="text-gray-600 leading-relaxed text-lg mb-6">{description}</p>
          </div>

          {/* คุณสมบัติเด่น */}
          {features && features.length > 0 && (
            <div className="bg-green-50 p-5 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                คุณสมบัติเด่น
              </h3>
              <ul className="space-y-2">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ข้อมูลทางเทคนิค */}
          {specifications && (
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                ข้อมูลทางเทคนิค
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="text-gray-600 font-medium">{key}:</span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* การใช้งาน */}
          {applications && applications.length > 0 && (
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                </svg>
                การใช้งาน
              </h3>
              <ul className="space-y-2">
                {applications.map((app, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ปุ่มการดำเนินการ */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <button
              onClick={handleInquiry}
              className="flex-1 bg-green-primary text-white py-3 px-6 rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.83 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>ติดต่อสอบถาม</span>
            </button>
            
            <button
              onClick={handleDownloadCatalog}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>ดาวน์โหลดแคตตาล็อก</span>
            </button>
          </div>

          {/* ข้อมูลบริษัท */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">ผลิตโดย</h4>
            <p className="text-gray-600 text-sm">
              บริษัท ชื่อบริษัทของคุณ จำกัด<br />
              โรงงานผลิตคุณภาพสูง มาตรฐาน ISO 9001:2015<br />
              ติดต่อ: 02-XXX-XXXX | info@yourcompany.com
            </p>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-primary transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('back_to_products', 'กลับไปหน้าผลิตภัณฑ์')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;