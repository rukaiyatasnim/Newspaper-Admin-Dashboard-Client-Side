import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyArticles = () => {
  const { user } = useAuth();
  const [myArticles, setMyArticles] = useState([]);
  const [editModal, setEditModal] = useState({ open: false, article: null });
  const [reasonModal, setReasonModal] = useState({ open: false, reason: "" });
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/myArticles/${user.email}`)
        .then(res => setMyArticles(res.data))
        .catch(err => console.error(err));
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this article?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/articles/${id}`)
          .then(() => {
            setMyArticles(prev => prev.filter(item => item._id !== id));
            Swal.fire("Deleted!", "Your article has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete article.", "error");
          });
      }
    });
  };

  const handleUpdate = () => {
    axiosSecure.patch(`/articles/${editModal.article._id}`, {
      title: updatedTitle,
      description: updatedDescription
    }).then(() => {
      setMyArticles(prev =>
        prev.map(item =>
          item._id === editModal.article._id
            ? { ...item, title: updatedTitle, description: updatedDescription }
            : item
        )
      );
      setEditModal({ open: false, article: null });
      Swal.fire("Updated!", "Your article has been updated.", "success");
    }).catch(() => {
      Swal.fire("Error!", "Failed to update article.", "error");
    });
  };

  return (
    <div className="p-4 max-w-full">
      <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">My Articles</h2>

      {/* --- TABLE FOR DESKTOP AND LARGE SCREENS --- */}
      <div className="hidden lg:block overflow-x-auto rounded-lg border border-green-300">
        <table className="table-auto w-full min-w-[700px] border-collapse border border-green-300 text-sm sm:text-base">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="border border-green-300 px-3 py-2">#</th>
              <th className="border border-green-300 px-3 py-2">Title</th>
              <th className="border border-green-300 px-3 py-2">Status</th>
              <th className="border border-green-300 px-3 py-2">Premium</th>
              <th className="border border-green-300 px-3 py-2">Details</th>
              <th className="border border-green-300 px-3 py-2">Reason</th>
              <th className="border border-green-300 px-3 py-2">Update</th>
              <th className="border border-green-300 px-3 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {myArticles.map((article, index) => (
              <tr key={article._id} className="text-center border border-green-200">
                <td className="border border-green-200 px-3 py-2">{index + 1}</td>
                <td className="border border-green-200 px-3 py-2">{article.title}</td>
                <td className="border border-green-200 px-3 py-2 capitalize">{article.status}</td>
                <td className="border border-green-200 px-3 py-2">{article.isPremium ? "Yes" : "No"}</td>
                <td className="border border-green-200 px-3 py-2">
                  <Link to={`/articles/${article._id}`}>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition whitespace-nowrap">
                      Details
                    </button>
                  </Link>
                </td>
                <td className="border border-green-200 px-3 py-2">
                  {article.status === "declined" ? (
                    article.declineReason ? (
                      <button
                        onClick={() => setReasonModal({ open: true, reason: article.declineReason })}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition whitespace-nowrap"
                      >
                        Reason
                      </button>
                    ) : (
                      <span className="text-red-500 italic">No reason provided</span>
                    )
                  ) : null}
                </td>
                <td className="border border-green-200 px-3 py-2">
                  <button
                    onClick={() => {
                      setEditModal({ open: true, article });
                      setUpdatedTitle(article.title);
                      setUpdatedDescription(article.description);
                    }}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition whitespace-nowrap"
                  >
                    Update
                  </button>
                </td>
                <td className="border border-green-200 px-3 py-2">
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition whitespace-nowrap"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- CARD/LIST FOR MOBILE & TABLET --- */}
      <div className="block lg:hidden space-y-4">
        {myArticles.map((article, index) => (
          <div
            key={article._id}
            className="bg-white border border-green-300 rounded-lg p-4 shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg truncate max-w-[70%]">{article.title}</h3>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  article.isPremium ? 'bg-yellow-300 text-yellow-900' : 'bg-green-100 text-green-700'
                }`}
              >
                {article.isPremium ? 'Premium' : 'Free'}
              </span>
            </div>

            <p className="mb-1 text-gray-700 capitalize">
              <strong>Status:</strong> {article.status}
            </p>
            <p className="mb-2 text-gray-700">
              <strong>Premium:</strong> {article.isPremium ? "Yes" : "No"}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              <Link to={`/articles/${article._id}`}>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition w-full sm:w-auto">
                  Details
                </button>
              </Link>

              {article.status === "declined" && (
                article.declineReason ? (
                  <button
                    onClick={() => setReasonModal({ open: true, reason: article.declineReason })}
                    className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition w-full sm:w-auto"
                  >
                    Reason
                  </button>
                ) : (
                  <span className="text-red-500 italic text-sm w-full sm:w-auto">No reason provided</span>
                )
              )}

              <button
                onClick={() => {
                  setEditModal({ open: true, article });
                  setUpdatedTitle(article.title);
                  setUpdatedDescription(article.description);
                }}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition w-full sm:w-auto"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(article._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md md:max-w-lg p-6 rounded-2xl shadow-xl relative overflow-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800">Update Article</h2>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                placeholder="Article Title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                placeholder="Article Description"
                className="w-full p-2 border border-gray-300 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end mt-5 space-y-2 sm:space-y-0 sm:space-x-2 flex-wrap">
              <button
                onClick={() => setEditModal({ open: false, article: null })}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full sm:w-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Reason Modal */}
      {reasonModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md md:max-w-lg p-6 rounded-2xl shadow-xl relative overflow-auto max-h-[90vh]">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-600 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-.01-10a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
              <h3 className="text-lg font-bold text-yellow-600">Decline Reason</h3>
            </div>
            <p className="text-gray-700 whitespace-pre-line">{reasonModal.reason}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setReasonModal({ open: false, reason: "" })}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
