
let departCoord={
    lat:'',
    lon:''
}

let arriverCoord={
    lat:'',
    lon:''
}

document.getElementById('departInput').onblur=()=>{
    let departInput=document.getElementById('departInput').value;
    

    fetch('https://nominatim.openstreetmap.org/?addressdetails=1&q='+departInput+'&format=json&limit=1')
        .then(res=>res.json())
        .then(data=>{
            departCoord.lat=data[0].lat;
            departCoord.lon=data[0].lon;
            
            let fullAdress='';
            if(data[0].address.tourism!==undefined){
                fullAdress+=data[0].address.tourism+',';
            }
            if(data[0].address.road!==undefined){
                fullAdress+=data[0].address.road+',';
            }
            if(data[0].address.neighbourhood!==undefined){
                fullAdress+=data[0].address.neighbourhood+',';
            }
            if(data[0].address.suburb!==undefined){
                fullAdress+=data[0].address.suburb+',';
            }
            if(data[0].address.city!==undefined){
                fullAdress+=data[0].address.city+',';
            }
            if(data[0].address.region!==undefined){
                fullAdress+=data[0].address.region+',';
            }
            if(data[0].address.country!==undefined){
                fullAdress+=data[0].address.country;
            }
            document.getElementById('departInput').value=fullAdress;

            
        }).catch(err=>console.log('ERROR'));

}

document.getElementById('arriverInput').onblur=()=>{
    let arriverInput=document.getElementById('arriverInput').value;
    

    fetch('https://nominatim.openstreetmap.org/?addressdetails=1&q='+arriverInput+'&format=json&limit=1')
        .then(res=>res.json())
        .then(data=>{
            arriverCoord.lat=data[0].lat;
            arriverCoord.lon=data[0].lon;
            
            let fullAdress='';
            if(data[0].address.tourism!==undefined){
                fullAdress+=data[0].address.tourism+',';
            }
            if(data[0].address.road!==undefined){
                fullAdress+=data[0].address.road+',';
            }
            if(data[0].address.neighbourhood!==undefined){
                fullAdress+=data[0].address.neighbourhood+',';
            }
            if(data[0].address.suburb!==undefined){
                fullAdress+=data[0].address.suburb+',';
            }
            if(data[0].address.city!==undefined){
                fullAdress+=data[0].address.city+',';
            }
            if(data[0].address.region!==undefined){
                fullAdress+=data[0].address.region+',';
            }
            if(data[0].address.country!==undefined){
                fullAdress+=data[0].address.country;
            }
            document.getElementById('arriverInput').value=fullAdress;

            
        }).catch(err=>console.log('ERROR'));

}


document.getElementById('myButton').onclick=()=>{

    fetch('https://graphhopper.com/api/1/route?point='+departCoord.lat+','+departCoord.lon+'&point='+arriverCoord.lat+','+arriverCoord.lon+'&profile=car&calc_points=false&key=bc3beb99-260b-4dc2-bae0-437365a435ac')
    .then(res=>res.json())
    .then(data=>{
        let str='Distance: '+(Math.round((Number(data.paths[0].distance/1000)+ Number.EPSILON) * 100)/100)+'km<br>';
        str+='Time: '+msToTime(data.paths[0].time);
        document.getElementById("myDiv").innerHTML=str;
    }).catch(err=>console.log('ERROR'));

}


function msToTime(duration) {
      let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds ;
  }


