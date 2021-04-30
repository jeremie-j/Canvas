const slider = document.querySelector("#animations_wrapper")
const body = document.querySelector("body")
const indexAnimations = document.querySelectorAll("#animations_wrapper>div").length - 1
var index = 0;
function Slide(i){
    index += i;
    if (index < 0){
        index = indexAnimations;
    }else if (index > indexAnimations){
        index = 0;
    }
    slider.scroll({
        left:(index*700),
        behavior: 'smooth'})
    clearInterval(interval)
    var fileref=document.querySelector('.canvasAnim')
    fileref.parentNode.removeChild(fileref);
    
    var newscript=document.createElement('script')
    newscript.setAttribute("src", "./js/canvas"+(index+1)+".js")
    newscript.classList.add('canvasAnim')
    body.appendChild(newscript)
    // fileref.setAttribute("src", "canvas"+(index+1)+".js")
}
