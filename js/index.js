// SLIDER
let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(() => { next.click() }, 3200);
function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3200);


}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
})
window.onresize = function (event) {
    reloadSlider();
};
// chatbot
const sendChatBtn = document.querySelector('.chat-input span');
const chatInput = document.querySelector('.chat-input textarea');
const chatBox = document.querySelector(".chatbox")
const chatbotToggler = document.querySelector(".chatbot-toggler")

let userMessage;

const API_KEY = "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";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbol-outlined">mode_comment</span> <p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    }
    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content;
        }).catch((error) => {
            messageElement.textContent = "Oops! something went wrong";
        }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();

    if (!userMessage) return;
    chatInput.value = "";

    chatBox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking ...", "incoming")
        chatBox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
    }, 600);
}

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))
sendChatBtn.addEventListener("click", handleChat);

// sliderbottom
const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper .i");


let isDragStart = false;
let prevPageX, isDragging = false, prevScrollLeft, positionDiff = 0;

const showHiddenIcon = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        let firstWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += index === 0 ? -firstWidth : firstWidth;
        setTimeout(() =>
            showHiddenIcon(), 60
        );
    });
});

const autoSlide = () => {
    if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

    if (isDragStart) return;
    positionDiff = Math.abs(positionDiff);
    let firstWidth = firstImg.clientWidth + 14;
    let valDifference = firstWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLeft) {
        return (carousel.scrollLeft += positionDiff > firstWidth / 3 ? valDifference : -positionDiff);
    }
    carousel.scrollLeft -= positionDiff > firstWidth / 3 ? valDifference : -positionDiff;
};
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.classList.add("dragging");
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHiddenIcon();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

// login-page 

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

document.getElementById('sign').addEventListener("click", function(){
    document.querySelector('.container').classList.add('active')
})
document.querySelector('.x').addEventListener("click", function(){
    document.querySelector('.container').classList.remove('active')
})
document.getElementById('sign').addEventListener('click',function(){
    document.querySelector('.x').classList.add('active')
})
document.querySelector('.x').addEventListener('click',function(){
    document.querySelector('.x').classList.remove('active')
})