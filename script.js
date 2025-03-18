let daynight = document.querySelector(".daynight");
let banner = document.querySelector(".banner");

daynight.addEventListener("click",()=>{
    banner.classList.toggle("night")
})

let typingEffect = new Typed("#text", {
    strings: ["Arijeet", "Programmer", "Developer"],
    loop:true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 1000
})