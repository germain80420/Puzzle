

	
var isMobile=false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        
    isMobile=true;
    
}
function randomInt(mini, maxi)
{
     var nb = mini + (maxi+1-mini)*Math.random();
     return Math.floor(nb);
}
Array.prototype.shuffle = function(n)
{
     if(!n)
          n = this.length;
     if(n > 1)
     {
          var i = randomInt(0, n-1);
          var tmp = this[i];
          this[i] = this[n-1];
          this[n-1] = tmp;
          this.shuffle(n-1);
     }
}
function convertirSecondes(s){
  return(s-(s%=60))/60+(9<s?'m':'m0')+s+"s";
}

var nombresPiecesParLigne=8;

var image64=new Image();
var image=new Image();
image.src="img/ImagesPuzzle/11.jpg";

var blockSize=0;
    if(window.innerHeight>window.innerWidth)
        blockSize=(window.innerWidth*0.93)/nombresPiecesParLigne;
    else
    blockSize=(window.innerHeight*0.8)/nombresPiecesParLigne;
    
    var canvasWidth=blockSize*nombresPiecesParLigne;
    var canvasHeight=blockSize*nombresPiecesParLigne;
    
    var canvas=document.createElement('canvas');
    canvas.width=canvasWidth;
    canvas.height=canvasHeight;
    
    document.getElementById("canvas").appendChild(canvas);
    var tailleBorderWidth=5;
    var defBorder=tailleBorderWidth.toString()+"px solid";
		
        canvas.style.display="block";
    canvas.style.margin="auto";
    var ctx=canvas.getContext("2d");
    var canvasPosition = canvas.getBoundingClientRect();
 var meilleurScore=0;
    var pseudoMeilleurScore="";
var tempsSecondes=0;
var btnCloseModal=document.getElementById("btnClose");

var listeImages=[];
for(let i=1;i<24;i++){
    listeImages.push(new Image());
    listeImages[i-1].src="img/ImagesPuzzle/"+i+".jpg";
}
       function retourneListeImage(){
        
        $.get(
            'https://bonnardwebeditions.com/getImgsPuzzle', 
           
 
            function(data){
    var listeSrcImage=data.split(";");
               
                for(var i=0;i<listeSrcImage.length-1;i++){
                    listeImages.push(new Image());
                    listeImages[i].src="img/ImagesPuzzle/"+listeSrcImage[i].toString();
                }
                listeImages.shuffle();
                
                
        
            }
         );
        
    }

console.log(listeImages);
 var numChoixImage=0;

image=listeImages[numChoixImage];
var listePiecesBienPlacees=[];
var listePieces=[];
var listePieceSelec=[];

var numClick=0;
var pieceSelec=false;
var listePieces2=[];
var posXPieceSelec=0;
var posYPieceSelec=0;
var posCompteur=0;
var gameStarted=false;
var widthlinePiece=5;
var widthlineSelec=10;
var imagePlusOuMoins=0;
var appli = document.getElementById("app");
var header = document.getElementById("header");
if(appli.value=="1"){
    header.style.display="none";
}
for(var i=0;i<nombresPiecesParLigne;i++){
   for(var j=0;j<nombresPiecesParLigne;j++){
        listePieces2.push([j,i]);
       listePieces.push([j,i]);
       listePieceSelec.push(false);
       listePiecesBienPlacees.push(false);
   } 
}
var morceauxImage=new Array(0,1,2,3);
    

do{
listePieces2.shuffle();
}while(!testPiecesTouteMalPlace);
    
    
    var positionXTaupe;
    var positionYTaupe;
    var numImage=0;
    var score=0;
    var compteurSecondesRestantes=30;
    var delay=1000;
    var posXPrecedent=0;
    var posYPrecedent=0;

    initGame();
    refresh();
    chrono();
   
    function initGame(){
        posXPieceSelec=-1;
        pieceSelec=false;
         listePiecesBienPlacees=[];
listePieces=[];
listePieceSelec=[];



listePieces2=[];


for(var i=0;i<nombresPiecesParLigne;i++){
   for(var j=0;j<nombresPiecesParLigne;j++){
        listePieces2.push([j,i]);
       listePieces.push([j,i]);
       listePieceSelec.push(false);
       listePiecesBienPlacees.push(false);
   } 
}
        do{
listePieces2.shuffle();
}while(!testPiecesTouteMalPlace);
        
    }
   
    function compteARebours(){
        if(compteurSecondesRestantes>0){
            compteurSecondesRestantes--;
            setTimeout(compteARebours,1000);
        }
    }
    function testPiecesTouteMalPlace(){
        var compteur=0;
        var nbPiecesMalPlaces=0;
        for(var i=0;i<nombresPiecesParLigne;i++){
        for(var j=0;j<nombresPiecesParLigne;j++){
            if(listePieces2[compteur][0]!=listePieces[compteur][0]&&listePieces2[compteur][1]!=listePieces[compteur][1])
                nbPiecesMalPlaces++;
            
            compteur++;
        }}
        if(nbPiecesMalPlaces==listePieces2.length){
            return true;
        }else
            return false;
    }
    function testPiecesTouteBienPlace(){
        var compteur=0;
        var nbPiecesMalPlaces=0;
        for(var i=0;i<nombresPiecesParLigne;i++){
        for(var j=0;j<nombresPiecesParLigne;j++){
            if(listePieces2[compteur][0]==listePieces[compteur][0]&&listePieces2[compteur][1]==listePieces[compteur][1])
                nbPiecesMalPlaces++;
            
            compteur++;
        }}
        if(nbPiecesMalPlaces==listePieces2.length){
            return true;
        }else
            return false;
    }
    function refresh(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
         
        if(gameStarted){
            if(testPiecesTouteBienPlace()){
                
                gameStarted=false;
                 
            
                 $('#exampleModalCenter').modal('toggle');
            $('#score').text("TEMPS : "+convertirSecondes(tempsSecondes));
           
            }
             
       var posImage=0;
        
        for(var i=0;i<nombresPiecesParLigne;i++){
        for(var j=0;j<nombresPiecesParLigne;j++){
            if(listePieces2[posImage][0]==listePieces[posImage][0]&&listePieces2[posImage][1]==listePieces[posImage][1])
                            listePiecesBienPlacees[posImage]=true;
            ctx.lineWidth=10;
            
            ctx.strokeStyle="rgb(0,0,0)";
            try{
            ctx.drawImage(image,listePieces2[posImage][0]*(image.width/nombresPiecesParLigne),listePieces2[posImage][1]*(image.height/nombresPiecesParLigne),image.width/nombresPiecesParLigne,image.height/nombresPiecesParLigne,j*blockSize,i*blockSize,blockSize,blockSize);
            
            }catch{
                
            }
            
            
            if(!listePiecesBienPlacees[posImage]){
                ctx.lineWidth=widthlinePiece/2;
                ctx.strokeStyle="rgb(255,0,0)";
            if(listePieces2[posImage][0]==0){
                
                ctx.beginPath();
                ctx.moveTo((j*blockSize)+(widthlinePiece/2),(i*blockSize));
                ctx.lineTo((j*blockSize)+(widthlinePiece/2),(i*blockSize)+blockSize);
                ctx.stroke();
                ctx.closePath();
            }
            if(listePieces2[posImage][1]==0){
                
                ctx.beginPath();
                ctx.moveTo((j*blockSize),(i*blockSize)+(widthlinePiece/2));
                ctx.lineTo((j*blockSize)+blockSize,(i*blockSize)+(widthlinePiece/2));
                ctx.stroke();
                ctx.closePath();
            }
            if(listePieces2[posImage][0]==nombresPiecesParLigne-1){
                
                ctx.beginPath();
                ctx.moveTo((j*blockSize)+blockSize-(widthlinePiece/2),i*blockSize);
                ctx.lineTo((j*blockSize)+blockSize-(widthlinePiece/2),(i*blockSize)+blockSize);
                ctx.stroke();
                ctx.closePath();
            }
            if(listePieces2[posImage][1]==nombresPiecesParLigne-1){
                
                ctx.beginPath();
                ctx.moveTo(j*blockSize,(i*blockSize)+blockSize-(widthlinePiece/2));
                ctx.lineTo((j*blockSize)+blockSize,(i*blockSize)+blockSize-(widthlinePiece/2));
                ctx.stroke();
                ctx.closePath();
            }
                
            }
        posImage++;
            
            
    }}
            posImage=0;
            for(i=0;i<nombresPiecesParLigne;i++){
                for(j=0;j<nombresPiecesParLigne;j++){
                    ctx.lineWidth=widthlinePiece/2;
                    ctx.strokeStyle="rgb(0,0,0)";
                    if(!listePiecesBienPlacees[posImage])
            ctx.strokeRect(j*blockSize,i*blockSize,blockSize,blockSize);
                posImage++;}}
        posImage=0;
            for(i=0;i<nombresPiecesParLigne;i++){
                for(j=0;j<nombresPiecesParLigne;j++){
                   
                    if(listePieceSelec[posImage]){
                ctx.lineWidth=widthlinePiece/2;
                ctx.strokeStyle="rgb(255,255,0)";
            ctx.strokeRect((j*blockSize),(i*blockSize),blockSize,blockSize);
                
            }
                    posImage++;
                }
                
            }
        
        }
        else{
            
            if(window.innerHeight>window.innerWidth)
        blockSize=(window.innerWidth*0.93)/nombresPiecesParLigne;
    else
    blockSize=(window.innerHeight*0.7)/nombresPiecesParLigne;
    
    canvasWidth=blockSize*nombresPiecesParLigne;
    canvasHeight=blockSize*nombresPiecesParLigne;
    
    
    canvas.width=canvasWidth;
    canvas.height=canvasHeight;
            
            widthlinePiece=blockSize/10;
            
            image=listeImages[numChoixImage];
         
            try{
            ctx.drawImage(image,0,0,canvasWidth,canvasHeight);
           }
            catch{
                if(imagePlusOuMoins>0){
                if(numChoixImage<listeImages.length-1)
                numChoixImage++;
            else
                numChoixImage=0;
                }
            else{
                if(numChoixImage>0)
                numChoixImage--;
            else
                numChoixImage=listeImages.length-1;
                }
            }
            ctx.lineWidth=widthlinePiece/2;
            for(i=0;i<nombresPiecesParLigne;i++){
        for(j=0;j<nombresPiecesParLigne;j++){
            ctx.strokeRect(j*blockSize,i*blockSize,blockSize,blockSize);
        }}
        
        ctx.lineWidth=2;
        
            ctx.fillStyle="rgba(250,0,0,0.6)";
        ctx.beginPath();
    ctx.moveTo((canvasWidth/2),widthlinePiece);
    ctx.lineTo((canvasWidth/2)+(blockSize/2)-widthlinePiece, blockSize-widthlinePiece);
    ctx.lineTo((canvasWidth/2)-(blockSize/2)+widthlinePiece, blockSize-widthlinePiece);
    ctx.fill();
        ctx.closePath();
        ctx.strokeStyle="rgb(250,250,0)";
         ctx.beginPath();
    ctx.moveTo((canvasWidth/2),widthlinePiece);
    ctx.lineTo((canvasWidth/2)+(blockSize/2)-widthlinePiece, blockSize-widthlinePiece);
    ctx.lineTo((canvasWidth/2)-(blockSize/2)+widthlinePiece, blockSize-widthlinePiece);
        ctx.closePath();
    ctx.stroke();
        
        
         ctx.beginPath();
    ctx.moveTo(canvasWidth-widthlinePiece,canvasHeight/2);
    ctx.lineTo((canvasWidth-blockSize)+widthlinePiece, (canvasHeight/2)-(blockSize/2)+widthlinePiece);
    ctx.lineTo((canvasWidth-blockSize)+widthlinePiece, (canvasHeight/2)+(blockSize/2)-widthlinePiece);
    ctx.fill();
        ctx.closePath();
        ctx.strokeStyle="rgb(250,250,0)";
         ctx.beginPath();
    ctx.moveTo(canvasWidth-widthlinePiece,canvasHeight/2);
    ctx.lineTo((canvasWidth-blockSize)+widthlinePiece, (canvasHeight/2)-(blockSize/2)+widthlinePiece);
    ctx.lineTo((canvasWidth-blockSize)+widthlinePiece, (canvasHeight/2)+(blockSize/2)-widthlinePiece);
        ctx.closePath();
    ctx.stroke();
        
        
        
         ctx.beginPath();
    ctx.moveTo(canvasWidth/2,canvasHeight-widthlinePiece);
    ctx.lineTo((canvasWidth/2)-(blockSize/2)+widthlinePiece, canvasHeight+widthlinePiece-blockSize);
    ctx.lineTo((canvasWidth/2)+(blockSize/2)-widthlinePiece, canvasHeight+widthlinePiece-blockSize);
    ctx.fill();
        ctx.closePath();
        ctx.strokeStyle="rgb(250,250,0)";
         ctx.beginPath();
   ctx.moveTo(canvasWidth/2,canvasHeight-widthlinePiece);
     ctx.lineTo((canvasWidth/2)-(blockSize/2)+widthlinePiece, canvasHeight+widthlinePiece-blockSize);
    ctx.lineTo((canvasWidth/2)+(blockSize/2)-widthlinePiece, canvasHeight+widthlinePiece-blockSize);
        ctx.closePath();
    ctx.stroke();
        
        
        
        
        
        ctx.beginPath();
    ctx.moveTo(widthlinePiece,canvasHeight/2);
    ctx.lineTo(blockSize-widthlinePiece, (canvasHeight/2)-(blockSize/2)+widthlinePiece);
    ctx.lineTo(blockSize-widthlinePiece, (canvasHeight/2)+(blockSize/2)-widthlinePiece);
    ctx.fill();
        ctx.closePath();
        ctx.strokeStyle="rgb(250,250,0)";
         ctx.beginPath();
    ctx.moveTo(widthlinePiece,canvasHeight/2);
    ctx.lineTo(blockSize-widthlinePiece, (canvasHeight/2)-(blockSize/2)+widthlinePiece);
    ctx.lineTo(blockSize-widthlinePiece, (canvasHeight/2)+(blockSize/2)-widthlinePiece);
        ctx.closePath();
    ctx.stroke();
     }
       
       
      setTimeout(refresh,100);
    }

canvas.ondblclick=function(e){
    e.preventDefault();
}
 $("#validerScore").click(function(event){
        event.preventDefault();
        if($("#pseudo").val().length==0)
            alert("Tapez votre pseudo");
        else{
             $.post(
            'https://bonnardwebeditions.com/enregistreMeilleurScore.php',
            {
               jeu:"puzzle",
                score:tempsSecondes,
                pseudo:$("#pseudo").val(),
                niveau:nombresPiecesParLigne
               
            },
 
            function(data){
 
               
                
                 
         
            },
            'text'
         );
            meilleurScore=tempsSecondes;
                pseudoMeilleurScore=$("#pseudo").val();
            $("#formMeilleurScore").modal('toggle');
        }
    });
function chrono(){
    if(gameStarted)
        tempsSecondes+=1;
    
    if(gameStarted)
    $("#chrono").text(convertirSecondes(tempsSecondes));
   
    setTimeout(chrono,1000);
}
canvas.onclick=function(e){
        e.preventDefault();
        canvasPosition = canvas.getBoundingClientRect();
       
       var posXClick=parseInt((e.clientX-canvasPosition.left)/blockSize);
       var posYClick=parseInt((e.clientY-canvasPosition.top)/blockSize);
        if(!gameStarted){
            posXClick=parseInt((e.clientX-canvasPosition.left)/blockSize);
        posYClick=parseInt((e.clientY-canvasPosition.top)/blockSize);
            if(posXClick==0){
                imagePlusOuMoins=-1;
                if(numChoixImage==0)
                    numChoixImage=listeImages.length-1;
                else
                    numChoixImage--;
            }
            else if(posXClick==nombresPiecesParLigne-1){
                imagePlusOuMoins=1;
                if(numChoixImage==listeImages.length-1)
                    numChoixImage=0;
                else
                    numChoixImage++;
            }
            else if(posYClick==0){
                if(nombresPiecesParLigne>3)
                {
                    nombresPiecesParLigne--;
                }
                
            }
            else if(posYClick==nombresPiecesParLigne-1){
                if(nombresPiecesParLigne<14){
                    nombresPiecesParLigne++;
                }
            }
            else{
                tempsSecondes=0;
                initGame();
                
                
                gameStarted=true;
                return;
            }
                
           
                
        }
    
        if(gameStarted){
            canvasPosition = canvas.getBoundingClientRect();
          

             posXClick=parseInt((e.clientX-canvasPosition.left)/blockSize);
        posYClick=parseInt((e.clientY-canvasPosition.top)/blockSize);

        var compteur=0;
        for(var i=0;i<nombresPiecesParLigne;i++){
            for(var j=0;j<nombresPiecesParLigne;j++){
                
                if(posXClick==j&&posYClick==i&&!listePiecesBienPlacees[compteur]){
                    if(!listePiecesBienPlacees[compteur])
                pieceSelec=!pieceSelec;
                    if(pieceSelec){
                            listePieceSelec[compteur]=true;
                        posXPieceSelec=listePieces2[compteur][0];
                        posYPieceSelec=listePieces2[compteur][1];
                        posCompteur=compteur;
                    }else{
                        if(!listePiecesBienPlacees[compteur]&&posXPieceSelec!=-1){
                        listePieceSelec[posCompteur]=false;
                        var posXTemp=listePieces2[compteur][0];
                        var posYTemp=listePieces2[compteur][1];
                        listePieces2[compteur][0]=posXPieceSelec;
                        listePieces2[compteur][1]=posYPieceSelec;
                        listePieces2[posCompteur][0]=posXTemp;
                        listePieces2[posCompteur][1]=posYTemp;
                        
                        }
                       
                        
                    }
                }
                       compteur++;
            }
        }}
      
            
    };
    btnCloseModal.addEventListener("click",function(e){
        $('#exampleModalCenter').modal('toggle');

    });
