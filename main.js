opcion1 = "";

opcion2 = "";

Webcam.set({
    width:360, height:310,image_format:"svg",svg_quality:90
});

camara = document.getElementById("mesirve");

Webcam.attach('#camara');

function tomarfoto(){
    Webcam.snap(function(data_uri) { document.getElementById("resultado").innerHTML = '<img id="foto_tomada" src="'+data_uri+'"/>'; });
}

clasificacion = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/M_F5hNAbH/model.json", modelocargado);

function modelocargado() {
    console.log("El modelo ya se cargo");
} 

function hablar() {
    var voz = window.speechSynthesis;
    opcion1voz = "La primera predicion es "+ opcion1;
    opcion2voz = "La segunda predicion es "+opcion2;
    var vozfinal =new SpeechSynthesisUtterance(opcion1voz+opcion2voz);
    voz.speak(vozfinal);
}

function identificar() {
    foto = document.getElementById("foto_tomada");
    clasificacion.classify(foto, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emocion1").innerHTML = results [0].label;
        document.getElementById("emocion2").innerHTML = results [1].label;
        opcion1 = results[0].label;
        opcion2 = results[1].label;
        hablar();
        if(results [0].label=="feliz"){
            document.getElementById("salidaemoji1").innerHTML = "&#128578;";
        }
        if(results [0].label=="triste"){
            document.getElementById("salidaemoji1").innerHTML = "&#128549;";
        }
        if(results [0].label=="enojado"){
            document.getElementById("salidaemoji1").innerHTML = "&#129324;";
        }
        if(results [1].label=="feliz"){
            document.getElementById("salidaemoji2").innerHTML = "&#128578;";
        }
        if(results [1].label=="triste"){
            document.getElementById("salidaemoji2").innerHTML = "&#128549;";
        }
        if(results [1].label=="enojado"){
            document.getElementById("salidaemoji28").innerHTML = "&#129324;";
        }
    }
}