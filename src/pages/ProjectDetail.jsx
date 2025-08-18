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

const ProjectDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการโหลดโปรเจกต์', err);
        setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-primary"></div>
      <span className="ml-3 text-gray-600">กำลังโหลด...</span>
    </div>
  );

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
            onClick={() => navigate('/project')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            กลับไปหน้าโปรเจกต์
          </button>
        </div>
      </div>
    </div>
  );

  const ProjectNotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-gray-400 text-6xl mb-4">🏭</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ไม่พบโปรเจกต์</h2>
        <p className="text-gray-600 mb-6">โปรเจกต์ที่คุณค้นหาไม่มีอยู่ในระบบ</p>
        <Link
          to="/project"
          className="inline-block px-6 py-2 bg-green-primary text-white rounded-lg hover:bg-green-600 transition"
        >
          ดูโปรเจกต์ทั้งหมด
        </Link>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!project) return <ProjectNotFound />;

  const { name, description, location, category, images } = project;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-green-primary">หน้าหลัก</Link>
        <span>›</span>
        <Link to="/project" className="hover:text-green-primary">โปรเจกต์</Link>
        <span>›</span>
        <span className="text-gray-800">{name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* รูปภาพ */}
        <div className="space-y-4">
          {images && images.length > 0 ? (
            <>
              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Thumbs]}
                  navigation
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  loop
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
              </div>

              {images.length > 1 && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode
                  watchSlidesProgress
                  modules={[Thumbs]}
                >
                  {images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div
                        className={`cursor-pointer rounded-lg overflow-hidden ${
                          selectedImageIndex === idx ? 'ring-2 ring-green-primary' : ''
                        }`}
                      >
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

        {/* รายละเอียดโปรเจกต์ */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{name}</h1>
          {category && (
            <span className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm rounded-full">
              {category}
            </span>
          )}
          <p className="text-gray-600 leading-relaxed text-lg">{description}</p>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">สถานที่</h4>
            <p className="text-gray-700">{location}</p>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Link
              to="/project"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-green-primary transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{t('back_to_projects', 'กลับไปหน้าโปรเจกต์')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
