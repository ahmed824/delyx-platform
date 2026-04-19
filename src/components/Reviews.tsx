"use client";

import { useState, useRef, useEffect } from 'react';

type Review = {
  name: string;
  email?: string;
  rating: number;
  comment: string;
  charAvatar: string;
};

const initialReviews: Review[] = [
  {name:"Ahmed", email:"ahmed@example.com", rating:5, comment:"Amazing service!" ,charAvatar:"/images/ahmed.png"},
  {name:"Sara", email:"sara@example.com", rating:4, comment:"Very good experience", charAvatar:"/images/sara.png"},
  {name:"Ali", email:"ali@example.com", rating:5, comment:"Perfect 👌", charAvatar:"/images/ali.png"},
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedRating, setSelectedRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  
  const sliderRef = useRef<HTMLDivElement>(null);

  const total = reviews.length;
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  const avg = total > 0 ? (sum / total).toFixed(1) : "0.0";
  const roundedAvg = Math.round(Number(avg));

  const ratingWords = ["Zero", "One", "Two", "Three", "Four", "Five"];

  const handleSubmit = () => {
    if(!name || !comment || selectedRating === 0) {
      alert("Please complete all required fields");
      return;
    }
    const newReview: Review = {
      name,
      email,
      rating: selectedRating,
      comment,
      charAvatar: "/images/Logo.png" // placeholder avatar
    };
    
    setReviews([newReview, ...reviews]);
    setName('');
    setEmail('');
    setComment('');
    setSelectedRating(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollBy({
          left: 300,
          behavior: "smooth"
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="reviews">
        <div className="container">
          <h2>See What Users Are Saying</h2>

          <div className="reviews-top">
            <div className="rating-breakdown">
              {[5, 4, 3, 2, 1].map((i) => {
                const count = reviews.filter(r => r.rating === i).length;
                const percent = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div className="rating-row" key={i}>
                    <span className="rating-word">{ratingWords[i]} <i className="fa-solid fa-star"></i></span>
                    <div className="bar">
                      <div className="fill" style={{ width: `${percent}%` }}></div>
                    </div>
                    <span>{count}</span>
                  </div>
                );
              })}
            </div>

            <div className="average-rating">
              <h2>{avg}</h2>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>{i <= roundedAvg ? "★" : "☆"}</span>
                ))}
              </div>
              <p><span>{total}</span> Ratings</p>
            </div>
          </div>

          <div className="slider-container">
            <button className="arrow prev" onClick={() => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}>‹</button>
            <div className="review-cards" ref={sliderRef}>
              {reviews.map((r, idx) => (
                <div className="card-review" key={idx}>
                  <div className="card-row"> 
                    <div className="avatar">
                      <img src={r.charAvatar} alt={r.name} />
                    </div>
                    <div className="content">
                      <div className="name_stars">
                        <h4>{r.name}</h4>
                        <div className="stars">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                          ))}
                        </div>
                      </div>
                      <div className="email">
                        <p><span>{r.email || "No email"}</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="comment">
                    <p>{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="arrow next" onClick={() => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}>›</button>
          </div>

          <div className="form-review">
            <div className="title">
              <h2>We’d Love Your Feedback</h2>
              <p className="feedback">Your feedback helps us build a better, smarter delivery system.</p>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="star-select">
              {[1, 2, 3, 4, 5].map((i) => (
                <span 
                  key={i} 
                  className={i <= selectedRating ? 'active' : ''} 
                  onClick={() => setSelectedRating(i)}
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fa-solid fa-star"></i>
                </span>
              ))}
            </div>

            <textarea id="comment" placeholder="What Can We Do To Improve Your Experience?" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

            <button className="submit-btn" onClick={handleSubmit}>Submit Your Feedback</button>
          </div>
        </div>
      </div>
    </section>
  );
}
