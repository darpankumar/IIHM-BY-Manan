// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import { Scissors, Users, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

// const Home = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const services = [
//     {
//       icon: <Scissors className="w-12 h-12" />,
//       title: 'Hair Services',
//       description: 'Professional hair cutting, styling, coloring, and treatments for all hair types.',
//       color: 'from-amber-500 to-orange-500'
//     },
//     {
//       icon: <Users className="w-12 h-12" />,
//       title: 'Male & Female Grooming',
//       description: 'Complete grooming solutions including skincare, facials, and spa treatments.',
//       color: 'from-rose-500 to-pink-500'
//     },
//     {
//       icon: <Sparkles className="w-12 h-12" />,
//       title: 'Bridal & Party Makeup',
//       description: 'Stunning bridal makeup and party looks for your special occasions.',
//       color: 'from-purple-500 to-indigo-500'
//     },
//     {
//       icon: <GraduationCap className="w-12 h-12" />,
//       title: 'Beauty Academy',
//       description: 'Professional training courses in hair, makeup, and beauty treatments.',
//       color: 'from-blue-500 to-cyan-500'
//     }
//   ];

//   return (
//     <div>
//       <Navbar />
      
//       {/* Hero Section */}
//       <div 
//         className="hero-section fade-in"
//         style={{
//           backgroundImage: `url('https://res.cloudinary.com/drnjbdxae/image/upload/v1769858278/salon_tc4tks.avif')`
//         }}
//         data-testid="hero-section"
//       >
//         <div className="hero-overlay" />
//         <div className="hero-content max-w-4xl">
//           <h1 className="text-5xl md:text-7xl font-bold mb-6" data-testid="hero-title">
//             Welcome to IIHM By Manan
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 text-gray-100">
//             Ambala's Premier Salon & Beauty Academy
//           </p>
//           <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-gray-200">
//             Experience luxury grooming, stunning bridal makeup, and professional beauty education
//             at one of Ambala City's most trusted salons.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {/* <Link to="/booking" className="btn-primary" data-testid="hero-book-btn">
//               Book Appointment
//             </Link> */}
//             <a 
//               href="https://wa.me/917206975263?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn-secondary"
//               data-testid="hero-whatsapp-btn"
//             >
//               Chat on WhatsApp
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="py-20 bg-gray-50" data-testid="services-section">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Our Services
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Discover our comprehensive range of professional beauty and grooming services
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {services.map((service, index) => (
//               <div
//                 key={index}
//                 className="service-card bg-white rounded-2xl p-8 shadow-lg"
//                 data-testid={`service-card-${index}`}
//               >
//                 <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
//                   {service.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
//                 <p className="text-gray-600 mb-6">{service.description}</p>
//                 <Link
//                   to="/services"
//                   className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 transition-colors"
//                 >
//                   Learn More <ArrowRight className="w-4 h-4 ml-2" />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 bg-gradient-to-br from-amber-700 to-amber-900 text-white" data-testid="cta-section">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             Ready for Your Transformation?
//           </h2>
//           <p className="text-xl mb-10 text-gray-100">
//             Book your appointment today and experience the best in beauty and grooming
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {/* <Link to="/booking" className="btn-primary" data-testid="hero-book-btn">
//               Book Appointment
//             </Link> */}
//             <a 
//               href="https://wa.me/917206975263?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn-secondary"
//               data-testid="hero-whatsapp-btn"
//             >
//               Book Your Appointment
//             </a>
//           </div>
//           {/* <Link to="/booking" className="btn-secondary inline-block" data-testid="cta-book-btn">
//             Book Your Appointment
//           </Link> */}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Scissors, Users, Sparkles, GraduationCap, ArrowRight } from 'lucide-react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Scissors className="w-12 h-12" />,
      title: 'Hair Services',
      description: 'Professional hair cutting, styling, coloring, and treatments for all hair types.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Male & Female Grooming',
      description: 'Complete grooming solutions including skincare, facials, and spa treatments.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'Bridal & Party Makeup',
      description: 'Stunning bridal makeup and party looks for your special occasions.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Beauty Academy',
      description: 'Professional training courses in hair, makeup, and beauty treatments.',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div>
      <Navbar />

      {/* ================= HERO SECTION (FIXED) ================= */}
      <section className="relative w-full min-h-screen overflow-hidden" data-testid="hero-section">
        
        {/* Background Image */}
        <img
          src="https://res.cloudinary.com/drnjbdxae/image/upload/v1769858278/salon_tc4tks.avif"
          alt="IIHM By Manan Salon"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="hero-overlay absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 text-white">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
            Welcome to IIHM By Manan
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Ambala's Premier Salon & Beauty Academy
          </p>

          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-gray-200">
            Experience luxury grooming, stunning bridal makeup, and professional beauty education
            at one of Ambala City's most trusted salons.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/917206975263?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              data-testid="hero-whatsapp-btn"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <div className="py-20 bg-gray-50" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of professional beauty and grooming services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-white rounded-2xl p-8 shadow-lg"
                data-testid={`service-card-${index}`}
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="py-20 bg-gradient-to-br from-amber-700 to-amber-900 text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Transformation?
          </h2>
          <p className="text-xl mb-10 text-gray-100">
            Book your appointment today and experience the best in beauty and grooming
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/917206975263?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Book Your Appointment
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
