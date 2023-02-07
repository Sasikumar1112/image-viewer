let displayImage=document.querySelector('img[id="display-image"]');
let slideInput=document.getElementById('slideInput');
let slide=document.querySelector('div.slide');
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
    displayImage.src=images[index];
    change();
    }

window.onload=function(){
            // File input
    let input=document.querySelectorAll('input');
    input.forEach(ip=>{
        ip.addEventListener('change',()=>{
            const curFiles=ip.files;
            if(curFiles.length===0){
                alert('No file selected');
            }
            else{
                for(const file of curFiles){
                    addImage(file);
                }
                displayImage.src=images[index];
                change();
            }
        });
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
    // let lt=document.getElementById("previous");
    // lt.addEventListener('click',previous);
    // let gt=document.getElementById("next");
    // gt.addEventListener('click',next);
}


function addImage(file){
    //Add images in slides
    const container=document.createElement('div');
    container.className="container";
    const slideImages =document.createElement('img');
    slideImages.alt=file.name;
    let url=URL.createObjectURL(file);
    slideImages.src=url;
    slideImages.style.backgroundImage="url('"+url+"')"
    // slideImages.style.back="blur(3px)";
    images.push(url);
    container.appendChild(slideImages);
        //click event
    slideImages.addEventListener('click',()=>{
        index=images.indexOf(slideImages.src);
        displayImage.src=images[index];
        change();
    });
        
    const crossDiv =document.createElement('div');
    crossDiv.className='crossBar';
    const name =document.createElement('label');
    name.textContent=file.name;
    crossDiv.append(name);
    //remove button
    const remove =document.createElement('button');
    const i=document.createElement('i');
    i.className="fa fa-close";
    remove.value=url;
    remove.append(i);
    crossDiv.append(remove);
    container.appendChild(crossDiv);
    slide.insertBefore(container,slideInput);
        //Removing an displayImage
    remove.addEventListener('click',()=>{
        let previousLength=images.length;
        const removeIndex=images.indexOf(remove.value);
        images.splice(removeIndex,1);
        slide.removeChild(container);
        if(removeIndex===previousLength-1){
            index=0;
        }
        //if previous displayImage is deleted
        else if(removeIndex<index){
            index--;
        }
        displayImage.src=images[index];
        change();
    });
}

function change(){
        //Changing appearance of selected and not selected      
    let currentImg=document.querySelectorAll('div.container img');
    for(let i=0;i<currentImg.length;i++){
        if(currentImg[i].src===images[index]){
            // currentImg[i].focus();
            currentImg[i].style.borderColor="yellow";
        }
        else{
            currentImg[i].style.borderColor="inherit";
        }
    }
    let input1=document.getElementById("inputImage");
    if(images.length===0){
        input1.disabled=false;
        displayImage.title="Upload Image or Drag and Drop";
        displayImage.style.height="400px";84,90
        displayImage.style.width="745px";
        displayImage.src="https://static.vecteezy.com/system/resources/previews/009/992/364/non_2x/add-icon-sign-symbol-design-free-png.png";
        index=0;
    }
    else{
        displayImage.title="";
        displayImage.style.height="455px";//95-95
        displayImage.style.width="785px";
        input1.disabled=true;
        //add lt gt button
    }
}
        //Slide moves
function previous(){
    const l=images.length;
    if(index===0){
        index=l;
    }
    index--;
    displayImage.src=images[index];
    change();
}
function next(){
    if(index===images.length-1){
        index=-1;
    }
    index++;
    displayImage.src=images[index];
    change();
}
