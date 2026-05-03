"use client";

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';


type Review = {
  name: string;
  email?: string;
  rating: number;
  comment: string;
  charAvatar: string;
};

const initialReviews: Review[] = [
  {name:"Ahmed", email:"ahmed@example.com", rating:5, comment:"Amazing service!" ,charAvatar:"/images/ahmed.png"},
  {name:"Walaa", email:"walaa@example.com", rating:5, comment:"Very good experience", charAvatar:"/images/user1.png"},
  {name:"Sara", email:"sara@example.com", rating:4, comment:"Very good experience", charAvatar:"/images/sara.png"},
  {name:"Ali", email:"ali@example.com", rating:5, comment:"Perfect 👌", charAvatar:"/images/ali.png"},
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [selectedRating, setSelectedRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  
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

  // Swiper handles autoplay/navigation now

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
            <button ref={null} className="swiper-custom-prev" aria-label="Previous slide" style={{background:'none',border:'none'}} />
            {/* custom prev/next refs wired into Swiper below */}
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{}}
              onBeforeInit={(swiper) => {
                // assign custom elements when swiper initializes
                // refs are attached after first render, so access via DOM selectors
                const prev = document.querySelector('.swiper-custom-prev') as HTMLElement | null;
                const next = document.querySelector('.swiper-custom-next') as HTMLElement | null;
                if (prev && next) {
                  // @ts-ignore
                  swiper.params.navigation.prevEl = prev;
                  // @ts-ignore
                  swiper.params.navigation.nextEl = next;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
            >
              {reviews.map((r, idx) => (
                <SwiperSlide key={idx}>
                  <div className="card-review">
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
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-custom-next" aria-label="Next slide" style={{background:'none',border:'none'}} />
            {/* SVGs for custom arrows */}
            <style jsx>{`
              .swiper-custom-prev, .swiper-custom-next { cursor: pointer; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; }
              .swiper-custom-prev svg, .swiper-custom-next svg { width: 13px; height: 24px; }
            `}</style>
            <div style={{ display: 'none' }} aria-hidden>
              {/* left arrow (prev) */}
              <svg id="swiper-prev-svg" width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.6081 23.6242C12.8488 23.3834 12.9839 23.057 12.9839 22.7166C12.9839 22.3762 12.8488 22.0498 12.6081 21.8091L3.24642 12.4474L12.6081 3.08571C12.7307 2.96733 12.8285 2.8256 12.8958 2.66902C12.9631 2.51244 12.9985 2.34405 13 2.1735C13.0014 2.00309 12.9689 1.83499 12.9044 1.67729C12.8399 1.51955 12.7446 1.37624 12.624 1.25571C12.5035 1.13519 12.3602 1.03982 12.2024 0.975333C12.0447 0.910855 11.8756 0.878322 11.7052 0.879817C11.5348 0.881287 11.3663 0.916743 11.2097 0.983919C11.0531 1.0512 10.9114 1.14998 10.793 1.2726L0.52382 11.5418C0.283108 11.7826 0.148004 12.1089 0.148004 12.4493C0.148004 12.7897 0.283108 13.1161 0.52382 13.3569L10.793 23.6262C11.0337 23.8668 11.3602 24.002 11.7006 24.002C12.041 24.002 12.3674 23.8668 12.6081 23.6262Z" fill="#5C5B5A"/>
              </svg>
              {/* right arrow (next) - mirrored */}
              <svg id="swiper-next-svg" width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.391885 0.375837C0.151237 0.616557 0.016048 0.943001 0.016048 1.28338C0.016048 1.62376 0.151237 1.9502 0.391885 2.19092L9.75358 11.5526L0.391885 20.9143C0.269283 21.0327 0.171491 21.1744 0.104216 21.331C0.0369408 21.4876 0.00152957 21.656 4.8467e-05 21.8265C-0.00143264 21.9969 0.0310458 22.166 0.0955891 22.3237C0.160132 22.4815 0.255448 22.6248 0.375974 22.7453C0.496499 22.8658 0.639822 22.9612 0.797579 23.0257C0.955335 23.0902 1.12437 23.1227 1.29481 23.1212C1.46525 23.1198 1.63369 23.0843 1.7903 23.0171C1.94692 22.9498 2.08856 22.852 2.20697 22.7294L12.4762 12.4602C12.7169 12.2194 12.852 11.893 12.852 11.5526C12.852 11.2122 12.7169 10.8858 12.4762 10.6451L2.20697 0.375837C1.96625 0.135189 1.63981 0 1.29943 0C0.959049 0 0.632606 0.135189 0.391885 0.375837Z" fill="#5C5B5A"/>
              </svg>
            </div>
            <script dangerouslySetInnerHTML={{__html: `
              // copy SVGs into buttons for visual rendering
              (function(){
                const prevBtn = document.querySelector('.swiper-custom-prev');
                const nextBtn = document.querySelector('.swiper-custom-next');
                const prevSvg = document.getElementById('swiper-prev-svg');
                const nextSvg = document.getElementById('swiper-next-svg');
                if(prevBtn && prevSvg) prevBtn.appendChild(prevSvg.cloneNode(true));
                if(nextBtn && nextSvg) nextBtn.appendChild(nextSvg.cloneNode(true));
              })();
            `}} />
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
