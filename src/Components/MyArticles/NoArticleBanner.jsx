import { useNavigate } from "react-router-dom";

const NoArticlesBanner = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 mt-24 mb-12">
            <div className="bg-green-100 border border-green-300 rounded-lg p-16 max-w-xl w-full shadow-md">
                <div className="text-6xl mb-6 select-none">📝</div>
                <h3 className="text-3xl font-semibold text-green-800 mb-4">
                    No Articles Found
                </h3>
                <p className="text-green-700 mb-6">
                    You don’t have any articles posted yet. Start adding your content now!
                </p>
                <button
                    onClick={() => navigate("/addArticle")}
                    className="btn bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
                >
                    + Add Article
                </button>
            </div>
        </div>
    );
};

export default NoArticlesBanner;
