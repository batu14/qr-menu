import React, { useState, useEffect } from "react";
import TextAreaCom from "../../../../Components/TextAreaCom";
import Button from "../../../../Components/Button";
import Filter from "../../../../Components/Filter";

const ReviewInbox = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  // API'den yorumları çekme
  const getReviews = () => {
    const formdata = new FormData();
    formdata.append("action", "get_reviews");
    formdata.append("token", localStorage.getItem("token"));
    fetch(`${import.meta.env.VITE_API_URL}Api/General.php`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setReviews(data.data);
        }
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  // Mobil görünüm kontrolü
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize(); // İlk yükleme kontrolü
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    const updatedReviews = reviews.map((review) =>
      review.id === selectedReview.id
        ? { ...review, status: "replied", reply: replyText }
        : review
    );
    setReviews(updatedReviews);
    setReplyText("");
  };

  const filterOptions = [
    { label: "Tümü", value: "all" },
    { label: "Yeni", value: "new" },
    { label: "Yanıtlanmış", value: "replied" },
    { label: "Okunmuş", value: "read" },
  ];

  const filteredReviews = reviews.filter((review) => {
    return (
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className={`flex flex-col md:flex-row min-h-[calc(100vh-100px)] w-full ${isMobileView && selectedReview ? 'h-screen' : ''}`}>
      {/* Sol Panel - Yorum Listesi */}
      <div className={`${
        isMobileView && selectedReview ? 'hidden' : 'w-full'
      } md:w-1/4 md:border-r p-4 overflow-y-auto`}>
        <div className="mb-4 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Müşteri Yorumları</h2>
            {isMobileView && selectedReview && (
              <button
                onClick={() => setSelectedReview(null)}
                className="text-blue-500"
              >
                Geri
              </button>
            )}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              onClick={() => {
                setSelectedReview(review);
                if (isMobileView) {
                  document.body.style.overflow = 'hidden';
                }
              }}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedReview?.id === review.id
                  ? "bg-blue-50 border-blue-200"
                  : "hover:bg-gray-50 border-gray-200"
              } border`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{review.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {review.comment}
                  </p>
                </div>
                <div className="flex text-yellow-400">
                  {Array(parseInt(review.rating))
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center text-sm">
                <span className="text-gray-500">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Panel - Detay Görünümü */}
      <div className={`${
        isMobileView && !selectedReview ? 'hidden' : 'w-full'
      } md:flex-1 p-4 overflow-y-auto`}>
        {selectedReview ? (
          <div className="space-y-6">
            {isMobileView && (
              <button
                onClick={() => {
                  setSelectedReview(null);
                  document.body.style.overflow = 'auto';
                }}
                className="mb-4 text-blue-500 flex items-center"
              >
                ← Listeye Dön
              </button>
            )}
            <div className="space-y-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedReview.name}
                  </h2>
                  <p className="text-gray-500">{selectedReview.mail}</p>
                </div>
                <div className="flex text-yellow-400 text-xl">
                  {selectedReview &&
                    Array(parseInt(selectedReview.rating))
                      .fill(0)
                      .map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{selectedReview.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {selectedReview.date}
                </p>
              </div>
            </div>
          </div>
        ) : (
          !isMobileView && (
            <div className="h-full flex items-center justify-center text-gray-500">
              Detayları görüntülemek için bir yorum seçin
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ReviewInbox;
