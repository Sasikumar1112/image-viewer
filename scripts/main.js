let image=document.querySelector('img[id="display-image"]');
let nav=document.querySelector('nav');
let div=document.querySelector('div');
const images=[];
let index=0;
            // Drag and drop
function dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
}
function drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer;
    var files=data.files;
    for(const file of files){
        addImage(file);
    }
    image.src=images[index];
    change();
    }

window.onload=function(){
            // File input
    let input=document.querySelector('input[id="inputImage"]');
    input.addEventListener('change',()=>{
        const curFiles=input.files;
        if(curFiles.length===0){
            alert('No file selected');
        }
        else{
            for(const file of curFiles){
                addImage(file);
            }
            image.src=images[index];
            change();
        }
    });
    //on keyboard move
    window.addEventListener("keyup",(e)=>{
        if(images.length!==0){
            if(e.key==='ArrowUp' ||e.key==='ArrowLeft' ){
                previous();
            }
            // keydown
            if(e.key==='ArrowDown' || e.key==='ArrowRight'){
                next();
            }
        }
    });
    //lt gt buttons
    let lt=document.getElementById("previous");
    lt.addEventListener('click',previous);
    let gt=document.getElementById("next");
    gt.addEventListener('click',next);
}


function addImage(file){
    //Add images in slides
    const imgSlide =document.createElement('img');
    imgSlide.className="slide";
    imgSlide.alt=file.name;
    let url=URL.createObjectURL(file);
    imgSlide.src=url;
    images.push(url);
    div.appendChild(imgSlide);
        //click event
    imgSlide.addEventListener('click',()=>{
        index=images.indexOf(imgSlide.src);
        image.src=images[index];
        change();
    });
        //remove button
    const remove =document.createElement('button');
    const i=document.createElement('i');
    i.className="fa fa-trash";
    remove.value=url;
    remove.className='remove';
    div.append(remove);
    remove.append(i);
        //Removing an image
    remove.addEventListener('click',()=>{
        let previousLength=images.length;
        const removeIndex=images.indexOf(remove.value);
        images.splice(removeIndex,1);
        div.removeChild(imgSlide);
        remove.removeChild(i);
        div.removeChild(remove);
        if(removeIndex===previousLength-1){
            index=0;
        }
        //if previous image is deleted
        if(removeIndex<=index){
            index--;
        }
        image.src=images[index];
        change();
    });
}

function change(){
        //Changing appearance of selected and not selected      
    let currentImg=document.querySelectorAll('img.slide');
    for(let i=0;i<currentImg.length;i++){
        if(currentImg[i].src===images[index]){
            currentImg[i].style.height="90px";
            currentImg[i].style.width="90px";
            currentImg[i].style.marginBottom="20px";
            currentImg[i].style.borderColor="green";
            // currentImg[i].focus();
        }
        else{
            currentImg[i].style.height="70px";
            currentImg[i].style.width="70px";
            currentImg[i].style.borderColor="white";
        }
    }
    if(images.length===0){
        image.src="images/image.png";
    }

}
        //Slide moves
function previous(){
    console.log("At previous");
    console.log(images);
    const l=images.length;
    console.log(l);
    console.log(index===0);
    if(index===0){
        index=l;
    }
    index--;
    console.log(index);
    image.src=images[index];
    change();
}
function next(){
    if(index===images.length-1){
        index=-1;
    }
    index++;
    image.src=images[index];
    change();
}
