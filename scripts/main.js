let image=document.querySelector('img');
let nav=document.querySelector('nav');
let images=[];
let index=0;
window.onload=function(){
    let input=document.querySelector('input[id="inputImage"]');
    input.addEventListener('change',()=>{
        const curFiles=input.files;
        if(curFiles.length===0){
            alert('No file selected');
        }
        else{
            for(const file of curFiles){
                const br=document.createElement('br');
                nav.append(br);
                    //imagename as button
                const imgName =document.createElement('button');
                imgName.className="nav-button";
                imgName.textContent=file.name;
                let url=URL.createObjectURL(file);
                imgName.value=url;
                images.push(imgName.value);
                nav.appendChild(imgName);
                    //click event
                imgName.addEventListener('click',()=>{
                    console.log('Link Clicked');
                    index=images.indexOf(imgName.value);
                    image.src=images[index];
                    change();
                });
                    //remove button
                const remove =document.createElement('button');
                remove.textContent='X';
                remove.value=url;
                remove.className='remove';
                nav.append(remove);
                    //Removing an image
                remove.addEventListener('click',()=>{
                    console.log("Remove clicked");
                    const removeIndex=images.indexOf(remove.value);
                    images.splice(removeIndex,1);
                    nav.removeChild(imgName);
                    nav.removeChild(remove);
                    nav.removeChild(br);
                });
            }
        }
    });
    //on keyboard move
    window.addEventListener("keyup",(e)=>{
        if(images.length!==0){
            if(e.key==='ArrowUp' ||e.key==='ArrowLeft' ){
            if(index===0){
                index=images.length;
            }
            index--;
            }
            // keydown
            if(e.key==='ArrowDown' || e.key==='ArrowRight'){
                if(index===images.length-1){
                    index=-1;
                }
                index++;
            }
            image.src=images[index];
            change();
        }
    });
}
function change(){
    let currentImg=document.getElementsByClassName('nav-button');
    for(let i=0;i<currentImg.length;i++){
        if(currentImg[i].value===images[index]){
            currentImg[i].style.color="white";
        }
        else{
            currentImg[i].style.color="blueviolet";
        }
    }
}
