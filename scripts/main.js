var fReader = new FileReader();
let image=document.querySelector('img');
let btn=document.querySelector('button');
window.onload=function(){
    btn.addEventListener('click',() =>{
        console.log("button click");
        const input =document.querySelector('input[type=file]');
        console.log(input.files);
        image.src=window.URL.createObjectURL(input.files[0]);
        //[0] is important
    });
}