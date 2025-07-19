import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

// Mock publishers (replace later with real data)
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
        id: 1,
        title: 'Politics in Bangladesh: A New Era',
        image: 'https://via.placeholder.com/300x180?text=Politics',
        publisher: 'prthom-alo',
        description: 'A detailed look at the political landscape in Bangladesh.',
        tags: ['politics', 'education'],
        isPremium: false,
    },
    {
        id: 2,
        title: 'Latest Advances in Technology',
        image: 'https://via.placeholder.com/300x180?text=Technology',
        publisher: 'daily-star',
        description: 'Technology trends shaping the future.',
        tags: ['technology'],
        isPremium: true,
    },
    // More articles ...
];

const AllArticles = () => {
    const navigate = useNavigate();

    // Simulate user subscription status
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Filters & search
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPublisher, setSelectedPublisher] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

    // Filter articles based on search, publisher, and tags
    const filteredArticles = useMemo(() => {
        return articlesMock.filter(article => {
            if (searchTerm && !article.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }
            if (selectedPublisher && article.publisher !== selectedPublisher.value) {
                return false;
            }
            if (selectedTags.length > 0) {
                const articleTagsSet = new Set(article.tags);
                for (const tag of selectedTags) {
                    if (!articleTagsSet.has(tag.value)) return false;
                }
            }
            return true;
        });
    }, [searchTerm, selectedPublisher, selectedTags]);

    // Get publisher label by value
    const getPublisherName = val => {
        const found = publishers.find(p => p.value === val);
        return found ? found.label : val;
    };

    const handleDetailsClick = (article) => {
        if (article.isPremium && !isSubscribed) {
            alert('You need a subscription to view premium articles.');
            return;
        }
        navigate(`/articles/${article.id}`);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-green-50 rounded-lg mt-10">
            <h1 className="text-4xl font-bold text-green-900 mb-8 text-center">All Articles</h1>

            {/* Simulate subscription toggle */}
            <div className="mb-6 flex justify-center gap-4 items-center">
                <label className="font-semibold text-green-800">Simulate Subscription:</label>
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

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.length === 0 ? (
                    <p className="text-center col-span-full text-green-700 text-lg font-semibold">
                        No articles found matching your criteria.
                    </p>
                ) : (
                    filteredArticles.map(article => (
                        <div
                            key={article.id}
                            className={`border rounded-lg shadow-md overflow-hidden flex flex-col ${article.isPremium ? 'border-yellow-500 bg-yellow-50' : 'border-green-300 bg-white'
                                }`}
                        >
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
                                        ${article.isPremium && !isSubscribed
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
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
