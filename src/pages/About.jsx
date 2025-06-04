import logo from '../assets/JSP_Logo.jpg';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <img src={logo} alt="Logo" className="h-32 mb-6 rounded shadow" />
      <div className="text-xl font-semibold text-center text-black">รับออกแบบตู้ไฟฟ้า</div>
      <h1 className="mt-10  text-3xl font-bold mb-6">About Us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to our company! We are dedicated to providing the best services and products to our customers.
      </p>
      <p className="text-gray-700 mb-4">
        Our team is composed of experienced professionals who are passionate about their work and committed to excellence.
      </p>
      <p className="text-gray-700">
        Thank you for visiting our website. We look forward to serving you!
      </p>
    
    </div>
  );
}   
export default About;