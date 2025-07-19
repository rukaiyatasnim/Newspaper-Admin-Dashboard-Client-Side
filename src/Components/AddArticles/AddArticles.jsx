import React, { useState } from 'react';
import Select from 'react-select';

const staticPublishers = [
    { value: 'prthom-alo', label: 'Prthom Alo' },
    { value: 'daily-star', label: 'Daily Star' },
    { value: 'bdnews24', label: 'BDNews24' },
    { value: 'jugantor', label: 'Jugantor' },
];

const staticTags = [
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Health' },
];

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [publisher, setPublisher] = useState(null);
    const [tags, setTags] = useState([]);
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !imageFile || !publisher || tags.length === 0 || !description) {
            alert('Please fill all the fields');
            return;
        }

        setSubmitting(true);
e

        const articleData = {
            title,
            imageFile,
            publisher: publisher.value,
            tags: tags.map(tag => tag.value),
            description,
        };

        console.log('Article Data to submit:', articleData);

        setTimeout(() => {
            alert('Article submitted! (Simulation)');
            setSubmitting(false);
            // Reset form
            setTitle('');
            setImageFile(null);
            setImagePreview(null);
            setPublisher(null);
            setTags([]);
            setDescription('');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold mb-6 text-green-900">Add New Article</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block font-semibold text-green-800 mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter article title"
                        required
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block font-semibold text-green-800 mb-2" htmlFor="image">
                        Upload Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-green-900"
                        required
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-3 max-h-48 rounded-md object-contain"
                        />
                    )}
                </div>

                {/* Publisher Dropdown */}
                <div>
                    <label className="block font-semibold text-green-800 mb-2">Publisher</label>
                    <Select
                        options={staticPublishers}
                        value={publisher}
                        onChange={setPublisher}
                        placeholder="Select Publisher"
                        isClearable
                        className="text-green-900"
                    />
                </div>

                {/* Tags Multi-Select */}
                <div>
                    <label className="block font-semibold text-green-800 mb-2">Tags</label>
                    <Select
                        options={staticTags}
                        value={tags}
                        onChange={setTags}
                        isMulti
                        placeholder="Select tags"
                        className="text-green-900"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold text-green-800 mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows="5"
                        className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write your article description here..."
                        required
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-green-700 text-white py-3 rounded-full font-semibold hover:bg-green-800 transition-colors disabled:opacity-60"
                >
                    {submitting ? 'Submitting...' : 'Submit Article'}
                </button>
            </form>
        </div>
    );
};

export default AddArticle;
