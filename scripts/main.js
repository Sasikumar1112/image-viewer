let image=document.querySelector('img');
let btn=document.querySelector('button');
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
                const imgName =document.createElement('a');
                imgName.textContent=file.name;
                imgName.href=URL.createObjectURL(file);
                nav.appendChild(imgName);
                                //Displaying image on click
                let displayImg=document.querySelector('a[href="'+imgName.href+'"]');
                if(displayImg){
                    displayImg.addEventListener('click',()=>{
                        console.log(displayImg);
                        console.log('Link Clicke');
                        image.src=displayImg.href;
                    });
                }
            }
        }
    });
    
}