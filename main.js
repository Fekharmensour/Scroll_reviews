const wrapper =document.querySelector(".wrapper")
const carousel =document.querySelector(".carousel")
const ArrayBtn = document.querySelectorAll(".wrapper .i")
const FirstCardWidth=carousel.querySelector(".card").offsetWidth;
const carouselChildren=[...carousel.children]
let CardPreView = Math.round(carousel.offsetWidth / FirstCardWidth)
let isDragging = false , StartX , StartScrollLeft ,timeoutid;


// this for infinitve scroll left 
carouselChildren.slice(-CardPreView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin" , card.outerHTML);
})
carouselChildren.slice(0 , CardPreView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("beforeEnd", card.outerHTML);
})

//this for autmatic scrolling 
const autoScroll =() =>{
    if(window.innerWidth < 800 ) return;
    timeoutid=setTimeout(()=> carousel.scrollLeft += FirstCardWidth , 2500)
}
autoScroll()


const dragStrat =(e)=>{
    isDragging = true ;
    carousel.classList.add("dragging")
    StartX = e.pageX;
    StartScrollLeft = carousel.scrollLeft;
    // console.log(StartX + "...." + StartScrollLeft);
}

const dragStop =()=>{
    isDragging = false ;
    carousel.classList.remove("dragging")
}

const Dragging = (e) => {
    if(!isDragging)return;
    carousel.scrollLeft=StartScrollLeft - (e.pageX -StartX);
}

const InfinitiveScrolling= ()=>{
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no_transitions")
        carousel.scrollLeft =carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove("no_transitions")
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no_transitions")
        carousel.scrollLeft = carousel.offsetWidth; 
        carousel.classList.remove("no_transitions")
    }
    clearTimeout(timeoutid);
    if(!wrapper.matches(":hover")) autoScroll()
}

carousel.addEventListener("mousedown" , dragStrat)
carousel.addEventListener("mousemove" , Dragging)
document.addEventListener("mouseup" , dragStop)
carousel.addEventListener("scroll" , InfinitiveScrolling)
wrapper.addEventListener("mouseenter" , ()=>clearTimeout(timeoutid) )
wrapper.addEventListener("mouseleave" , autoScroll)

ArrayBtn.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        carousel.scrollLeft += btn.id=="left"? -FirstCardWidth:+FirstCardWidth 
    })
})