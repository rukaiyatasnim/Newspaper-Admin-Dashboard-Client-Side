import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

// const staticTags = [
//     { value: 'politics', label: 'Politics' },
//     { value: 'sports', label: 'Sports' },
//     { value: 'technology', label: 'Technology' },
//     { value: 'education', label: 'Education' },
//     { value: 'health', label: 'Health' },
// ];

const AddArticle = () => {
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            publisher: '',
            tags: [],
            imageFile: null,
        },
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            // Instead of uploading image, use placeholder URL or empty string
            const imageUrl = 'https://via.placeholder.com/150';

            const article = {
                title: data.title,
                description: data.description,
                publisher: data.publisher,
                tags: data.tags, // here tags is a string array (comma separated from input)
                image: imageUrl,
            };

            // For testing, just console.log or fake API call
            console.log('Submitting article:', article);

            // Simulate API call delay
            await new Promise((r) => setTimeout(r, 1000));

            Swal.fire({
                icon: 'success',
                title: 'Article Submitted',
                text: 'Waiting for admin approval.',
            });

            reset();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Submission failed',
                text: error.message || 'Something went wrong',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h2 className="text-3xl font-bold text-green-900 mb-6">Add New Article</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Article Title"
                    className="input input-bordered w-full"
                    {...register('title', { required: 'Title is required' })}
                />
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}

                <textarea
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    {...register('description', { required: 'Description is required' })}
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}

                <input
                    type="text"
                    placeholder="Publisher (text input for testing)"
                    className="input input-bordered w-full"
                    {...register('publisher', { required: 'Publisher is required' })}
                />
                {errors.publisher && <p className="text-red-600">{errors.publisher.message}</p>}

                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    className="input input-bordered w-full"
                    {...register('tags', {
                        required: 'At least one tag required',
                        validate: (val) => val.trim() !== '',
                    })}
                />
                {errors.tags && <p className="text-red-600">{errors.tags.message}</p>}

                <input
                    type="file"
                    accept="image/*"
                    {...register('imageFile')}
                // no preview or upload for testing
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="btn bg-green-700 text-white w-full hover:bg-green-800"
                >
                    {submitting ? 'Submitting...' : 'Submit Article'}
                </button>
            </form>
        </div>
    );
};

export default AddArticle;
