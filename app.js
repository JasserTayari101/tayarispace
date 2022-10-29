const btn = document.getElementById("getPic");
const date = document.getElementById("date");
btn.addEventListener("click",()=>{
    btn.textContent = "Getting data";
    changing(btn);
    const req_date = date.value ? date.value:new Date().toLocaleDateString().split("/").reverse().join("-");
    getPicture(req_date);
})
//------------ Used to simulate loading -----------------------
async function changing(btn){
    if(btn.textContent!="Get Photo of this date: "){
        if(btn.textContent.endsWith("..."))
            btn.textContent = btn.textContent.substring(0,btn.textContent.length-2);
        else
            btn.textContent+=".";
        setTimeout(()=>changing(btn),1000)
    }
}


function getPicture(req_date){
    const api_url = new URL("https://api.nasa.gov/planetary/apod");
    const params = {
        "date":req_date,
        "api_key":"Eo7Vpd0aJ0bOkPhPBI69BSxbf9bSNbDLjNCyequd"
    };
    api_url.search = new URLSearchParams(params).toString();
    fetch(api_url)
    .then(data=>{
        data.json()
        .then(res=>{
            console.log(res);
            btn.textContent = "Get Photo of this date: ";   //reverse the content of button to its original state and stop async loading function 
            var outTitle = document.getElementById("output-title");
            var outImage = document.getElementById("output-image");
            var outVid = document.getElementById("output-vid");
            var outTime = document.getElementById("output-time");
            var expl = document.getElementById("explanation");
            var copyright = document.getElementById("copyright");
            
            outTitle.textContent = res["title"];
            outTime.textContent = (new Date(res["date"])).toDateString();
            if(res["media_type"]=="image"){
                outImage.style.display = "block";
                outImage.setAttribute("src",res["url"]);
                outVid.setAttribute("src","");
                outVid.style.display="none";
            }else if(res["media_type"]=="video"){
                outVid.style.display = "block";
                outVid.setAttribute("src",res["url"]);
                outImage.setAttribute("src","");
                outImage.style.display="none";
            }
            expl.textContent = res["explanation"];
            copyright.innerHTML = res["copyright"]?"&copy;"+res["copyright"]:"No copyright Information";
        })
    })
}
