var fReader = new FileReader();
let image=document.querySelector('img');
let btn=document.querySelector('button');
window.onload=function(){
    btn.addEventListener('click',() =>{
        var input=document.querySelector('input').files[0];
        fReader.readAsDataURL(input);
        console.log("button clicked");
        console.log(fReader);
        image.setAttribute('src',fReader);
    });
}