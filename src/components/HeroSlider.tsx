// "use client"

// import React from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/swiper.min.css"
// import { Navigation, Pagination, Autoplay } from "swiper/modules"
// import Link from "next/link"
// import Image from "next/image"

// const HeroSlider = () => {
//   const slides = [
//     {
//       title: "Discover Stylish Furniture For Your Home",
//       description: "Transform your living space with our curated collection",
//       imageUrl: "/hero-image-1.jpg",
//       link: "/products",
//     },
//     {
//       title: "Comfort and Luxury",
//       description: "Redefine your home with our modern collection",
//       imageUrl: "/hero-image-2.jpg",
//       link: "/products",
//     },
//     {
//       title: "Elegant Design for Every Room",
//       description: "Find your perfect furniture to fit your space",
//       imageUrl: "/hero-image-3.jpg",
//       link: "/products",
//     },
//   ]

//   return (
//     <section className="relative">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={0}
//         slidesPerView={1}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         navigation
//         pagination={{ clickable: true }}
//         loop={true}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index} className="relative">
//             <div className="absolute inset-0 bg-black opacity-40"></div>
//             <Image
//               src={slide.imageUrl}
//               alt={slide.title}
//               layout="fill"
//               objectFit="cover"
//               className="object-cover"
//             />
//             <div className="absolute inset-0 flex justify-center items-center text-center px-4 sm:px-8">
//               <div className="text-white">
//                 <h2 className="text-4xl sm:text-5xl font-bold mb-4">{slide.title}</h2>
//                 <p className="text-lg sm:text-xl mb-6">{slide.description}</p>
//                 <Link
//                   href={slide.link}
//                   className="bg-teal-500 text-white px-8 py-3 rounded-md hover:bg-teal-600 transition-colors"
//                 >
//                   Shop Now
//                 </Link>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   )
// }

// export default HeroSlider
