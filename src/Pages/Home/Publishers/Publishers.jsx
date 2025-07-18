import React from 'react';

const Publishers = () => {
    return (
        <section className="py-16 bg-gray-50 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                    Popular News Publishers We've Collaborated With
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {publishers.map(({ name, desc, img }, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            <figure className="flex justify-center mb-4">
                                <img
                                    src={img}
                                    alt={name}
                                    className="h-20 object-contain rounded-xl"
                                />
                            </figure>
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-700 mb-1">{name}</h3>
                                <p className="text-gray-500 text-sm">{desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// 🔖 Add logos/links later — now placeholder texts only
const publishers = [
    {
        name: 'Prothom Alo',
        img: '', // add logo URL later
        desc: 'Leading Bangladeshi newspaper known for nationwide coverage and digital reach.',
    },
    {
        name: 'Daily Star',
        img: '',
        desc: 'English-language daily featuring news, analysis, and opinion pieces.',
    },
    {
        name: 'Ittefaq',
        img: '',
        desc: 'Historic Bangla daily newspaper contributing to political and social journalism.',
    },
    {
        name: 'Jugantor',
        img: '',
        desc: 'Popular for its political, social, and investigative news coverage.',
    },
    {
        name: 'Kaler Kantho',
        img: '',
        desc: 'Part of Bashundhara Group; known for rich features and nationwide reporting.',
    },
    {
        name: 'Bdnews24.com',
        img: '',
        desc: 'One of the first online news platforms in Bangladesh, delivering real-time news.',
    },
    {
        name: 'Bangla Tribune',
        img: '',
        desc: 'Digital-first news portal known for fast updates and modern presentation.',
    },
    {
        name: 'Somoy News',
        img: '',
        desc: '24/7 TV and online news channel offering up-to-date bulletins and reports.',
    },
    {
        name: 'Desh Rupantor',
        img: '',
        desc: 'Emerging daily gaining popularity through youth-focused content.',
    },
];

export default Publishers;
