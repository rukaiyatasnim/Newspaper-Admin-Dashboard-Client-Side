import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const articles = [
    {
        title: "🌿 Govt Approves New Green Policy",
        desc: "Bangladesh's new environmental policy aims to reduce carbon emissions by 45% before 2040. Experts are calling this a big leap toward climate resilience.",
        btn: "Read Full Article",
        link: "/news/green-policy",
    },
    {
        title: "💧 Clean Water Tech Expands in Rural Areas",
        desc: "New filtration systems have been installed across 20 villages, providing safe drinking water to over 50,000 residents with low maintenance cost.",
        btn: "Learn More",
        link: "/news/clean-water-expansion",
    },
    {
        title: "📚 National Reading Month Begins",
        desc: "Libraries across the country are hosting events, book fairs, and digital reading campaigns throughout July to celebrate Reading Month.",
        btn: "View Events",
        link: "/news/reading-month",
    },
    {
        title: "🚲 Dhaka to Launch Green Cycle Roads",
        desc: "New bike lanes in Gulshan & Banani will encourage eco-commuting. Over 12km of protected green lanes are under construction.",
        btn: "See Details",
        link: "/news/bike-roads",
    },
    {
        title: "🌍 Climate Summit 2025 Announced",
        desc: "The upcoming summit will focus on Asia’s role in global emissions, clean energy transitions, and community-based solutions.",
        btn: "Summit Info",
        link: "/news/climate-summit",
    },
    {
        title: "🔌 Solar Panel Subsidy Renewed",
        desc: "Households installing rooftop solar will now get up to 60% subsidy. Applications open until September 15, 2025.",
        btn: "Apply Now",
        link: "/news/solar-subsidy",
    },
];

const TrendingArticlesSlider = () => (
    <div className="w-full mt-6 bg-[#e8f5e9] dark:bg-[#1e3b2b]">
        <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4500 }}
            pagination={{ clickable: true }}
            loop
        >
            {articles.map(({ title, desc, btn, link }, i) => (
                <SwiperSlide key={i}>
                    <div className="h-[320px] flex flex-col justify-center items-center text-center px-6 md:px-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-100 mb-3">
                            {title}
                        </h2>
                        <p className="text-green-700 dark:text-green-300 max-w-3xl text-base md:text-lg mb-5 leading-relaxed">
                            {desc}
                        </p>
                        <a
                            href={link}
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-5 py-2 rounded-full transition"
                        >
                            {btn}
                        </a>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
);

export default TrendingArticlesSlider;
