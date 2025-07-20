import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

// Mock publishers
const publishers = [
    { value: 'prthom-alo', label: 'Prthom Alo' },
    { value: 'daily-star', label: 'Daily Star' },
    { value: 'bdnews24', label: 'BDNews24' },
    { value: 'jugantor', label: 'Jugantor' },
];

// Mock tags list
const tagsOptions = [
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health' },
];

// Mock articles data
const articlesMock = [
    {
        _id: '1',
        title: 'Politics in Bangladesh: A New Era',
        image: 'https://via.placeholder.com/300x180?text=Politics',
        publisher: 'prthom-alo',
        description: 'A detailed look at the political landscape in Bangladesh.',
        tags: ['politics', 'education'],
        isPremium: false,
    },
    {
        _id: '2',
        title: 'Latest Advances in Technology',
        image: 'https://via.placeholder.com/300x180?text=Technology',
        publisher: 'daily-star',
        description: 'Technology trends shaping the future.',
        tags: ['technology'],
        isPremium: true,
    },
    {
        _id: '3',
        title: 'Bangladesh wins gold in South Asian Games',
        image: 'https://via.placeholder.com/300x180?text=Sports',
        publisher: 'bdnews24',
        description: 'An unexpected victory in regional sports.',
        tags: ['sports'],
        isPremium: false,
    },
    {
        _id: '4',
        title: 'Education Reform Policy 2025',
        image: 'https://via.placeholder.com/300x180?text=Education',
        publisher: 'jugantor',
        description: 'What the new reforms mean for students.',
        tags: ['education'],
        isPremium: true,
    },
];

const AllArticles = () => {
    const navigate = useNavigate();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    const filteredArticles = useMemo(() => {
        return articlesMock.filter(article => {
            if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (selectedPublisher && article.publisher !== selectedPublisher.value) return false;
            if (selectedTags.length > 0) {
                const tagSet = new Set(article.tags);
                for (let tag of selectedTags) {
                    if (!tagSet.has(tag.value)) return false;
                }
            }
            return true;
        });
    }, [searchTerm, selectedPublisher, selectedTags]);

    const getPublisherName = (val) => {
        const found = publishers.find(p => p.value === val);
        return found ? found.label : val;
    };

    const handleDetailsClick = (article) => {
        if (article.isPremium && !isSubscribed) {
            alert('You need a subscription to view premium articles.');
            return;
        }
        navigate(`/articles/${article._id}`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-green-50 rounded-lg mt-10">
            <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">All Articles</h1>

            {/* Simulate subscription */}
            <div className="mb-6 flex justify-center gap-4 items-center">
                <label className="font-semibold text-green-800">Subscription:</label>
                <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`px-4 py-2 rounded-full font-semibold transition ${isSubscribed ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                        }`}
                >
                    {isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                <input
                    type="text"
                    placeholder="Search by article title..."
                    className="border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-1/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="w-full md:w-1/4">
                    <Select
                        options={publishers}
                        value={selectedPublisher}
                        onChange={setSelectedPublisher}
                        isClearable
                        placeholder="Filter by publisher"
                        className="text-green-900"
                    />
                </div>
                <div className="w-full md:w-1/3">
                    <Select
                        options={tagsOptions}
                        value={selectedTags}
                        onChange={setSelectedTags}
                        isMulti
                        placeholder="Filter by tags"
                        className="text-green-900"
                    />
                </div>
            </div>

            {/* Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.length === 0 ? (
                    <p className="text-center col-span-full text-green-700 text-lg font-semibold">
                        No articles found matching your criteria.
                    </p>
                ) : (
                    filteredArticles.map(article => (
                        <div
                            key={article._id}
                            className={`relative rounded-xl overflow-hidden flex flex-col transition transform hover:scale-[1.02] ${article.isPremium
                                ? 'border-2 border-green-500 bg-green-100 shadow-[0_0_20px_rgba(34,197,94,0.5)]'
                                : 'border border-green-300 bg-white shadow-md'
                                }`}
                        >
                            {/* Premium Badge */}
                            {article.isPremium && (
                                <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                                    PREMIUM
                                </div>
                            )}
                            <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />
                            <div className="p-4 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold text-green-900 mb-2">{article.title}</h2>
                                <p className="text-green-700 mb-2 font-medium">
                                    Publisher: {getPublisherName(article.publisher)}
                                </p>
                                <p className="text-green-800 flex-grow">{article.description}</p>
                                <button
                                    onClick={() => handleDetailsClick(article)}
                                    disabled={article.isPremium && !isSubscribed}
                                    className={`mt-4 rounded-full py-2 font-semibold transition w-full
                                        ${article.isPremium
                                            ? (isSubscribed
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-green-200 text-green-700 cursor-not-allowed')
                                            : 'bg-green-700 text-white hover:bg-green-800'
                                        }
                                    `}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AllArticles;
