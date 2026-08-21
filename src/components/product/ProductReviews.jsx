import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, ThumbsUp, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export const ProductReviews = ({ product }) => {
  const [reviews, setReviews] = useState(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  
  const { success, error } = useToast();
  const { user } = useAuth();

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const nameToUse = user?.name || reviewerName.trim();
    if (!nameToUse) {
      error('Vui lòng nhập họ và tên của bạn');
      return;
    }
    if (!comment.trim()) {
      error('Vui lòng viết nội dung nhận xét');
      return;
    }

    const newRev = {
      id: Date.now(),
      author: nameToUse,
      rating: Number(rating),
      date: new Date().toISOString().split('T')[0],
      comment: comment.trim(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setComment('');
    setShowReviewForm(false);
    success('Cảm ơn bạn! Đánh giá đã được gửi thành công.');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      {/* Top Header & Average Rating */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Đánh giá từ khách hàng</h3>
          <p className="text-xs text-slate-500 mt-0.5">Dựa trên nhận xét từ người mua thực tế</p>
        </div>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl text-xs font-bold transition-colors"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>{showReviewForm ? 'Đóng form đánh giá' : 'Viết đánh giá của bạn'}</span>
        </button>
      </div>

      {/* Rating Overview Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-xl bg-slate-50 border border-slate-100 items-center">
        <div className="text-center md:border-r border-slate-200">
          <div className="text-4xl font-black text-slate-900 leading-none">{product.rating}</div>
          <div className="flex justify-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <div className="text-xs text-slate-500 font-medium">{reviews.length} lượt đánh giá</div>
        </div>

        <div className="md:col-span-2 space-y-1.5">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
            const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-2 text-xs">
                <span className="w-8 font-semibold text-slate-600 flex items-center gap-0.5">
                  {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-slate-400 font-medium">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Form Drawer */}
      {showReviewForm && (
        <form onSubmit={handleReviewSubmit} className="p-5 rounded-2xl bg-brand-50/50 border border-brand-200/60 space-y-4 animate-slide-up">
          <h4 className="font-bold text-slate-800 text-sm">Gửi đánh giá trải nghiệm của bạn</h4>
          
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">Chọn mức đánh giá:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1.5 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 self-center ml-2">
                {rating === 5 ? 'Tuyệt vời, rất hài lòng!' : rating >= 4 ? 'Hài lòng' : 'Bình thường'}
              </span>
            </div>
          </div>

          {!user && (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Họ và tên của bạn:</label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Nhận xét chi tiết:</label>
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ cảm nhận về thiết kế, thời lượng pin, camera, độ mượt..."
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/50 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gửi đánh giá</span>
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-white transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">
                  {rev.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{rev.author}</span>
                    {rev.verified && (
                      <span className="flex items-center text-[10px] text-emerald-600 font-medium">
                        <CheckCircle className="w-3 h-3 mr-0.5" /> Đã mua tại TechZone
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= Math.round(rev.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed pl-10">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
