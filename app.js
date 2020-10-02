const TypeWriter = function(textElement,job,wait=3000){
    this.textElement = textElement;
    this.job = job;
    this.txt = "";
    this.wordIndex = 0;
    this.type();
    
    this.wait = parseInt(wait,10);
    
    this.isDeleting = false;
    
}
TypeWriter.prototype.type = function(){
    const current = this.wordIndex % this.job.length;
    const textfull = this.job[current];
    console.log(current)
    if(this.isDeleting){
      this.txt   = textfull.substring(0,this.txt.length - 1)
    }else{
      this.txt   = textfull.substring(0,this.txt.length + 1)
    }
    this.textElement.innerHTML = this.txt;
    let speedType = 300;
    if(this.isDeleting){
        speedType /= 2;
        
    }
    if(!this.isDeleting && this.txt === textfull){
        this.isDeleting = true;
        speedType = this.wait;
    }else if(this.isDeleting && this.txt === ""){
        this.isDeleting = false;
        this.wordIndex++;
        speedType = 500;
    }
    setTimeout(()=>this.type(),speedType);
}
document.addEventListener("DOMContentLoaded",init)

function init(){
    const textElement = document.querySelector('.data-type');
    const job = JSON.parse(textElement.getAttribute("data-job"));
    const wait = textElement.getAttribute("data-wait");
    new TypeWriter(textElement,job,wait);  
}
