let image=document.querySelector('img');
let btn=document.querySelector('button[id="image-submit"]');
let nav=document.querySelector('nav');
window.onload=function(){
    btn.addEventListener('click',() =>{
        console.log("button click");
        const input =document.querySelector('input[type=file]');
        const curFiles=input.files;
        if(curFiles.length===0){
            alert("No Image selected");
        }
        else{
            //Display files in navigation bar
            for(const file of curFiles){
                const br=document.createElement('br');
                nav.append(br);
                const imgName =document.createElement('button');
                imgName.className="nav-button";
                imgName.textContent=file.name;
                imgName.value=URL.createObjectURL(file);
                nav.appendChild(imgName);
                                //Displaying image on click
                let displayImg=document.querySelector('button[value="'+imgName.value+'"]');
                console.log(displayImg);
                if(displayImg){
                    displayImg.addEventListener('click',()=>{
                        console.log(displayImg);
                        console.log('Link Clicke');
                        image.src=displayImg.value;
                    });
                }
            }
        }
    });
    
}