function counterFun(){
    let element = document.querySelector("#loaderText h1 span")

    let initial = " - 100";
    element.textContent = initial;
    let count = 0
    let counter = setInterval(()=>{
        if (count == 100){
            clearInterval(counter)
            return
        }
        count ++;
        element.textContent = `${count}${initial}`
    },40)
}
function loaderEngage(){
    let fl = gsap.timeline()

fl.from("#loader #loaderText h1",{
    y:100,
    duration: 1,
    delay:0.1,
    stagger:0.3
})

fl.from("#subtleText",{
    x:50,
    duration: 0.5,
    opacity:0
})

fl.to("#loader",{
    delay:2.2,
    display:"none",
    duration:0.5,
})
fl.to("#page1",{
    display:"block",
})
fl.from("#page1",{
    y:1000,
    duration:0.5,
    ease: "power2.in",
    onComplete(){
        document.querySelector("#page2").style.display = "block"
        document.querySelector("#page3").style.display = "block"
    }
})

    fl.from("#main-text #line h1",{
        y:100,
        duration: 0.2,
        delay:0.1,
        stagger:0.3
    })
    fl.from("#hero-page1-main>h1",{
        x:-100,
        duration: 1,
        delay:0.5,
        opacity:0
    })
}
function sheryEffects(){
    Shery.makeMagnet("#nav-part2 h1", {
        //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
      });
    
    Shery.makeMagnet(".ri-menu-fold-4-fill", {
    //Parameters are optional.
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
    
}

function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
// locomotive()
counterFun()
loaderEngage()
sheryEffects()


var element = document.querySelector(".hoverEffect");
var element2 = document.querySelector(".hoverEffect2");
var divColorEffects = document.querySelector("#doublecolourEffects");
var allElements = [ element, element2]
allElements.forEach(item => {
    item.addEventListener('mouseenter', function() {
        gsap.to("#mouseFollower", {
            opacity:0
          });
          item.style.borderBottom = "1px solid #ff6347"; // Border on hover
          item.style.webkitTextStroke = "0.5px #ff6347"; // Text stroke on hover
          item.style.color = "transparent"; // Make text color transparent so stroke is visible
          item.addEventListener("mousemove", function(e) {
            // Move the divColorEffects based on mouse coordinates
            divColorEffects.style.top = `${e.clientY - 50}px`;
            divColorEffects.style.opacity = 1;
            divColorEffects.style.left = `${e.clientX - 10}px`;
        });
    });
    
    item.addEventListener('mouseleave', function() {
    
        item.style.borderBottom = "1px solid transparent"; // Remove the border
        item.style.webkitTextStroke = ""; // Remove text stroke
        item.style.color = ""; // Reset text color
        divColorEffects.style.opacity = 0;
        gsap.to("#mouseFollower", {
            opacity:1
          });
    });
    
})

var navElements = document.querySelectorAll("#nav-part2 h1")
navElements.forEach(item => {
    item.addEventListener("mouseenter",()=>{
        gsap.to("#mouseFollower",{
            duration:0.5,
            scale:2.0,
            ease: "bounce.out"
        })
    })
    item.addEventListener("mouseleave",()=>{
        gsap.to("#mouseFollower",{
            duration:0.5,
            scale:1.0,
            ease: "bounce.out"
        })
    })
})

var logoEffects = document.querySelector(".ri-menu-fold-4-fill")
logoEffects.addEventListener("mouseenter",()=>{
    gsap.to("#mouseFollower",{
        duration:0.5,
        scale:2.0,
        ease: "bounce.out"
    })
})
logoEffects.addEventListener("mouseleave",()=>{
    gsap.to("#mouseFollower",{
        duration:0.5,
        scale:1.0,
        ease: "bounce.out"
    })
})



document.addEventListener("mousemove",(e) => {

    gsap.to("#mouseFollower", {
        duration: 0.5,
        x: e.clientX + window.scrollX,
        y: e.clientY + + window.scrollY,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)"
      });
})






const videoCotainerFollwer = document.querySelector("#videoContainer");
const videoContainerFollwerElement = document.querySelector("#playFollower");
const videoPlayer = document.querySelector("#videoContainer video")
const imagePlayer = document.querySelector("#videoContainer img")
let currentAnimation;
console.log(imagePlayer)
let flag  = 0
videoCotainerFollwer.addEventListener("click",() => {
    if (flag){
        imagePlayer.style.opacity = 1
        videoContainerFollwerElement.innerHTML = `<i class="ri-play-line"></i>`
        videoPlayer.pause()
        flag = 0
    }else{
        imagePlayer.style.opacity = 0
        videoPlayer.play()
        videoContainerFollwerElement.innerHTML = `<i class="ri-pause-line"></i>`
        flag = 1
    }
   
})

const handlerMover = (e) => {
    const rect = videoCotainerFollwer.getBoundingClientRect();
      const offsetX = e.clientX - rect.left; // Mouse position relative to div
      const offsetY = e.clientY - rect.top;  // Mouse position relative to div


      // Animate the mouse follower position based on the mouse's position inside the div
       gsap.to("#playFollower", {
        x: offsetX - videoContainerFollwerElement.offsetWidth / 2, // Offset to center the follower
        y: offsetY - videoContainerFollwerElement.offsetHeight / 2, // Offset to center the follower
        opacity: 1,  // Ensure the follower is visible
        duration: 0.3,
        ease: "power3.out", // Smooth easing
      });

}

videoCotainerFollwer.addEventListener('mouseenter', function() {
    gsap.to("#mouseFollower", {
        opacity:0
      });
    videoCotainerFollwer.addEventListener("mousemove",handlerMover)

});



videoCotainerFollwer.addEventListener('mouseleave', function() {
    gsap.to("#mouseFollower", {
        opacity:1
      });
    
      gsap.to("#playFollower", {
        x:0,y:0,duration: 0.3,
        ease: "power3.out", 
      })
    videoCotainerFollwer.removeEventListener("mousemove",handlerMover)

});