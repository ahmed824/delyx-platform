let links = document.querySelectorAll(".navigation a");

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});



window.addEventListener("scroll", function () {
        let header = document.querySelector(".header");

        if (window.scrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });


window.addEventListener("load", () => {
            document.body.classList.add("loaded");
            });


/* ====== DATA ====== */
let reviews = [
  {name:"Ahmed",email:"ahmed@example.com", rating:5, comment:"Amazing service!" ,charAvatar:"images/ahmed.png"},
  {name:"Sara",email:"sara@example.com", rating:4, comment:"Very good experience",charAvatar:"images/sara.png"},
  {name:"Ali",email:"ali@example.com", rating:5, comment:"Perfect 👌",charAvatar:"images/ali.png"},
  // {name:"Mona",email:"mona@example.com", rating:3, comment:"It's okay",charAvatar:"images/mona.png"},
  // {name:"Ahmed",email:"ahmed@example.com", rating:5, comment:"Amazing service!" ,charAvatar:"images/ahmed.png"},
  // {name:"Sara",email:"sara@example.com", rating:4, comment:"Very good experience",charAvatar:"images/sara.png"},
  // {name:"Ali",email:"ali@example.com", rating:5, comment:"Perfect 👌",charAvatar:"images/ali.png"},
  // {name:"Mona",email:"mona@example.com", rating:3, comment:"It's okay",charAvatar:"images/mona.png"}

];

/* ====== CALCULATE RATINGS ====== */
function updateRatings(){
  const total = reviews.length;
  const sum = reviews.reduce((a,r)=>a+r.rating,0);
  const avg = (sum/total).toFixed(1);

  document.getElementById("avgNumber").textContent = avg;
  document.getElementById("totalRatings").textContent = total;
  const starsContainer = document.getElementById("avgStars");
starsContainer.innerHTML = "";

const rounded = Math.round(avg);

for (let i = 1; i <= 5; i++) {
  const star = document.createElement("span");
  star.textContent = i <= rounded ? "★" : "☆";
  starsContainer.appendChild(star);
}

  const breakdown = document.getElementById("ratingBreakdown");
  breakdown.innerHTML = "";

  for(let i=5;i>=1;i--){
  const count = reviews.filter(r=>r.rating===i).length;
  const percent = (count/total)*100;

  const ratingWords = ["Zero","One","Two","Three","Four","Five"];

  breakdown.innerHTML += `
    <div class="rating-row">
      <span class="rating-word">${ratingWords[i]} <i class="fa-solid fa-star"></i></span>
      
      <div class="bar">
        <div class="fill" style="width:${percent}%"></div>
      </div>

      <span>${count}</span>
    </div>
  `;
}
}

/* ====== RENDER SLIDER ====== */
function renderSlider(){
  const slider = document.getElementById("slider");
  slider.innerHTML = "";

  reviews.forEach(r=>{
    slider.innerHTML += `
      <div class="card-review">
        <div class="card-row"> 
          <div class="avatar">
            <img src="${r.charAvatar}" alt="${r.name}">
          </div>
          <div class="content">
            <div class="name_stars">
              <h4>${r.name}</h4>
              <div class="stars">${Array(r.rating).fill('<i class="fa-solid fa-star"></i>').join('')}</div>
            </div>
            <div class="email">
              <p><span>${r.email || "No email"}</span></p>
            </div>
          </div>
        </div>
        <div class="comment">
          <p>${r.comment}</p>
        </div>
      </div>
    `;
  });
}
/* </img>
<h4>${r.name}</h4>
<div class="stars">${"★".repeat(r.rating)}</div>
<p><span>${r.email || "No email"}</span></p>
<p>${r.comment}</p> */

/* ====== STAR SELECT ====== */
let selectedRating = 0;
document.querySelectorAll("#starSelect span").forEach(star=>{
  star.addEventListener("click", function(){
    selectedRating = this.dataset.value;
    document.querySelectorAll("#starSelect span").forEach(s=>s.classList.remove("active"));
    for(let i=0;i<selectedRating;i++){
      document.querySelectorAll("#starSelect span")[i].classList.add("active");
    }
  });
});

/* ====== ADD REVIEW ====== */
document.getElementById("submitReview").addEventListener("click", ()=>{
  const name = document.getElementById("name").value;
  const comment = document.getElementById("comment").value;

  if(!name || !comment || selectedRating==0){
    alert("Please complete all fields");
    return;
  }

  reviews.unshift({name, rating:Number(selectedRating), comment});

  updateRatings();
  renderSlider();

  document.getElementById("name").value="";
  document.getElementById("comment").value="";
});

/* ====== AUTO PLAY ====== */
setInterval(()=>{
  document.getElementById("slider").scrollBy({
    left:300,
    behavior:"smooth"
  });
},3000);

/* INIT */
updateRatings();
renderSlider();
