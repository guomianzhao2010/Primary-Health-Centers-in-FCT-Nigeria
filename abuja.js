var myMap = L.map("map", {
    center: [9.0765, 7.4894],
    zoom: 10
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiZ3VvbWlhbnpoYW8yMDEwIiwiYSI6ImNqdGs2bm16bjA4MGI0OWs2OGh4c2lvODUifQ.7Qf1OAT1zQ6r1mtSp2rFTw"
}).addTo(myMap);

var link ="https://geoserver.grid-nigeria.org/geoserver/GRIDMaster/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GRIDMaster:sv_fc_healthcare_facilities&outputFormat=application%2Fjson&authkey=fdfe9a37-d2d0-4210-9a15-25dab5d907fa&CQL_FILTER=state_code=%27FC%27";
var wards="https://geoserver.grid-nigeria.org/geoserver/GRIDMaster/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=GRIDMaster:sv_boundary_wards&outputFormat=application%2Fjson&authkey=fdfe9a37-d2d0-4210-9a15-25dab5d907fa&CQL_FILTER=state_code=%27FC%27"

var indicator=""
function in_sample(feature){
    for(var j = 0; j < hospitalnames.length; j++){
            if (feature.properties.name==hospitalnames[j]["Name"])    
     {return true;}
    }
    return false;      
}

function out_sample(feature){
    for(var j = 0; j < hospitalnames.length; j++){
            if (feature.properties.name==hospitalnames[j]["Name"] ){return false;}

            else if (feature.properties.category=="Unknown" || feature.properties.category=="Teaching Hospital" || feature.properties.category=="General Hospital" || feature.properties.category=="Private Clinic" || feature.properties.category=="Federal Hospital"  || feature.properties.category=="Federal Staff Clinic" || feature.properties.category=="Military and Paramilitary Clinic"){return false;}
    }
    return true;      
}

function general(feature){
    for(var j = 0; j < hospitalnames.length; j++){
            

            if (feature.properties.category=="General Hospital"){return true;}
    }
    return false;      
}

function teaching(feature){
    for(var j = 0; j < hospitalnames.length; j++){
            

            if (feature.properties.category=="Teaching Hospital"){return true;}
    }
    return false;      
}

d3.json(link, function(data){
    var sample_hospitals= data.features.filter(in_sample); 
    var all_hospitals= data.features.filter(out_sample); 
    var general_hospitals= data.features.filter(general); 
    var teachings= data.features.filter(teaching); 
    markerlayer(sample_hospitals, all_hospitals, general_hospitals, teachings);

}); 


function markerlayer(sample, all, general, teachings){
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.category +
          "</h3><hr><p>" + feature.properties.ward_name + ": "+ feature.properties.name );
      } 
    
    var geojsonMarkerOptions = {
        radius: 6,
        fillColor: "#ff6600", 
        color: "#ff6600",
        weight: 1,
        opacity: 1,
        fillOpacity: 11
    };

    var geojsonMarkerOptions2 = {
        radius: 6,
        fillColor: "#0088cc", 
        color: "#ffffff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var geojsonMarkerOptions3 = {
        radius: 6,
        fillColor: "#000066", 
        color: "#ffffff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var geojsonMarkerOptions4 = {
        radius: 12,
        fillColor: "#00cc00", 
        color: "#ffffff",
        weight: 1,
        opacity: 1,
        fillOpacity: 1
    };



    var sample0= L.geoJSON(sample, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) 
        {   
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    })

    var missing1 = L.circleMarker([8.4799000000072, 6.969997754000042], {

        fillColor: "#ff6600", 
        color: "#ff6600",
            fillOpacity: 1,
            radius: 4
        }).bindPopup("<h3>" + "Primary Health Center" +
        "</h3><hr><p>" + "Nuku" + ": "+ "Manderigi Primary Health Center"); 
    
    var missing2 = L.circleMarker([8.463684571000021, 6.942318359000061], {

        fillColor: "#ff6600", 
        color: "#ff6600",
            fillOpacity: 1,
            radius: 4
        }).bindPopup("<h3>" + "Primary Health Center" +
        "</h3><hr><p>" + "South East" + ": "+ "Naharati Primary Health Center");
    
    var missing3 = L.circleMarker([8.96509000000007, 7.2101200000000745], {
    
        fillColor: "#ff6600", 
        color: "#ff6600",
            fillOpacity: 1,
            radius: 4
        }).bindPopup("<h3>" + "Primary Health Center" +
        "</h3><hr><p>" + "Gui" + ": "+ "Tunga Nasara Primary Health Center");
    
    var missing4 = L.circleMarker([9.00128711000005, 7.49052539000006], {
    
        fillColor: "#ff6600", 
        color: "#ff6600",
            fillOpacity: 1,
            radius: 4
        }).bindPopup("<h3>" + "Primary Health Center" +
        "</h3><hr><p>" + "Garki" + ": "+ "Durumi Primary Health Center");
    
    var missing5 = L.circleMarker([9.066990000000023, 7.399670000000038], {
    
            fillColor: "#ff6600", 
            color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gwarimpa" + ": "+ "Piwoyi Primary Health Center");
    
    var missing6= L.circleMarker([9.057990000000023, 7.409670000000038], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                    fillOpacity: 1,
                    radius: 4
                }).bindPopup("<h3>" + "Primary Health Center" +
                "</h3><hr><p>" + "Gwarimpa" + ": "+ "Karon Majigi Primary Health Center");
    
    var missing7= L.circleMarker([8.9321167, 7.3878628], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
                    }).bindPopup("<h3>" + "Primary Health Center" +
                    "</h3><hr><p>" + "Kabusa" + ": "+ "Dnako Primary Health Center");
    
    var missing8= L.circleMarker([8.88507813000052, 7.575890136000022], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Orozo" + ": "+ "Munape Primary Health Center");            
    
    var missing9= L.circleMarker([9.1429350000000036, 7.433150000000071], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Dutse" + ": "+ "Dutse Baupma Primary Health Care Clinic"); 
    
    var missing10= L.circleMarker([9.27850341800007, 7.479726562000062], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Igu" + ": "+ "Kaima Primary Health Care Clinic"); 

    var missing11= L.circleMarker([9.31253535735999, 7.584994191018499], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Kawu" + ": "+ "Pada Gwari Primary Health Care Clinic"); 
    
    var missing12= L.circleMarker([9.191926269000048, 7.5283105470000555], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Shere" + ": "+ "Gudupe Primary Health Care Clinic"); 
    
    var missing13= L.circleMarker([9.093720703000058, 6.984689942000036], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Dobi" + ": "+ "Tsauni PH"); 
    
    var missing14= L.circleMarker([9.073720703000058, 6.984689942000036], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Dobi" + ": "+ "KaidaSabo Primary Health Center"); 
    
    var missing15= L.circleMarker([8.98440000000048, 7.131980000000027], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gwako" + ": "+ "Kpakuru Primary Health Center "); 
    
    var missing16= L.circleMarker([9.15839606570678, 7.115418091059172], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Ikwa" + ": "+ "Yimi Primary Health Center"); 
    
    var missing17= L.circleMarker([9.170905762000068, 7.067080078000058], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Ibwa" + ": "+ "IbwaPada Primary Health Center"); 
    
    var missing18= L.circleMarker([8.789470000000051, 7.420970000000029], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gaube" + ": "+ "Gidan Bawa Primary Health Care Clinic"); 

    var missing19= L.circleMarker([8.789470000000051, 7.440970000000029], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gaube" + ": "+ "Kahodahannu Primary Health Care Clinic"); 
    
    var missing20= L.circleMarker([8.789470000000051, 7.460970000000029], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gaube" + ": "+ "Gbaukuchi Primary Health Care Clinic"); 

    var missing21= L.circleMarker([8.53729640665045, 7.342599044551751], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gudunkarya" + ": "+ "Darka Primary Health Care Post");
    
    var missing22= L.circleMarker([8.51729640665045, 7.326599044551751], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gudunkarya" + ": "+ "Gova Primary Health Care Post"); 

    var missing23= L.circleMarker([8.52729640665045, 7.346599044551751], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Gudunkarya" + ": "+ "Tashara Primary Health Care Clinic"); 
            
    
    var missing24= L.circleMarker([8.700280000000039, 7.313770000000034], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Kabi" + ": "+ "Agwai Primary Health Care Clinic");

    var missing25= L.circleMarker([8.740280000000039, 7.313770000000034], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Kabi" + ": "+ "Tude Primary Health Care Clinic");
    
    var missing26= L.circleMarker([8.720280000000039, 7.311770000000034], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Kabi" + ": "+ "Tude Primary Health Care Clinic");
    
    var missing27= L.circleMarker([8.724112053461556, 7.155081924001392], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Kwaku" + ": "+ "Gawu Primary Health Care Clinic");
    
    var missing28= L.circleMarker([8.509510000000073, 7.0347000000000435], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Rubochi" + ": "+ "Zokotu Primary Health Care Clinic");     
    
    var missing29= L.circleMarker([8.7708176900675, 6.82143218853942], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Dafa" + ": "+ "Tunga Guli Primary Health Care Clinic");   
            
    var missing30= L.circleMarker([8.7708176900675, 6.86143218853942], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Dafa" + ": "+ "Pangu Guli Primary Health Care Clinic"); 

    var missing31= L.circleMarker([8.897568, 7.0937932], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Kilankwa" + ": "+ "Sheda Galadima Primary Health  Care Clinic "); 

    var missing32= L.circleMarker([8.496684571000021, 6.851318359000061], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Ebagi" + ": "+ "Naharati Primary Health Center"); 

    var missing33= L.circleMarker([8.863078613000046, 6.902479004000042], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Kundu" + ": "+ "Tungan Sarki Primary Health Care Center"); 
            
    var missing34= L.circleMarker([8.620051146180825, 6.9199394856945], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Wako" + ": "+ "Chida Primary Health Care Clinic"); 

    var missing35= L.circleMarker([8.814508789000029, 7.061271973000039], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Yangoji" + ": "+ "Yangoji Primary Health Care  Clinic"); 
    
    var missing36= L.circleMarker([8.471684571000021, 6.944918359000061], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Central Abaji" + ": "+ "Abaji Central Primary Health Center"); 

    var missing37= L.circleMarker([8.471684571000021, 6.944318359000061], {
    
                fillColor: "#ff6600", 
                color: "#ff6600",
                fillOpacity: 1,
                radius: 4
            }).bindPopup("<h3>" + "Primary Health Center" +
            "</h3><hr><p>" + "Central Abaji" + ": "+ "Abaji Township Health Center"); 

    var missing= L.layerGroup([missing1, missing2,missing3, missing4, missing5,missing6,missing7,missing8, missing9,missing10, missing11, missing12, missing13, missing14, missing15, missing16, missing17, missing18, missing19, missing20, missing21, missing22, missing23, missing24, missing25, missing26,missing27,missing28, missing29, missing30, missing31, missing32, missing33, missing34, missing35, missing36, missing37]);
    
    var sample=L.layerGroup([missing, sample0]);
    var all= L.geoJSON(all, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) 
        {   
            return L.circleMarker(latlng, geojsonMarkerOptions2);
        }
    })

    var general= L.geoJSON(general, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) 
        {   
            return L.circleMarker(latlng, geojsonMarkerOptions3);
        }
    })

    var compare=L.layerGroup([sample, all, general]);

    var overlay={
    
        "Sampling Frame": sample,
        "Other Primary Health Centers": all, 
        "General Hospitals": general, 
        "Compare": compare
    };

    L.control.layers(overlay).addTo(myMap);

    L.geoJSON(teachings, {
        pointToLayer: function (feature, latlng) 
        {   
            return L.circleMarker(latlng, geojsonMarkerOptions4);
        }
    }).addTo(myMap);
   
}

function pickcolor(mag){
    var color="";
    
    if (mag==0){
      color='#ff6600';
    }
    else if (mag==2) {
      color = '#0088cc'; 
    }

    else if (mag==4) {
        color = '#000066'; 
      }

      else if (mag==6) {
        color = "#00cc00"; 
      }

    return color;
    }
    
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (myMap) {
    
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [6, 0, 2, 4],
            labels = ["University Of Abuja Teaching Hospital","Sampling Frame", "Other Primary Health Centers", "General Hospital"];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + pickcolor(grades[i]) + '"></i> ' + labels[i] + '<br>' ;
        }
    
        return div;
    };
    legend.addTo(myMap);

    L.control.scale().addTo(myMap);


d3.json(wards, function(data) {
    // Creating a geoJSON layer with the retrieved data
    wardslayer(data.features)
  });

function wardslayer(region){
    function onEachRegion(feature, layer){
        layer.bindPopup("Ward Name: "+ feature.properties.ward_name);

        layer.on({
            mouseover: function(event) {
             this.openPopup();
              layer = event.target;
              layer.setStyle({
                fillOpacity: 0.9
              });
            },

            mouseout: function(event) {
                this.closePopup();
                layer = event.target;
                layer.setStyle({
                  fillOpacity: 0.35
                });
              }
        });
               
      } 

    L.geoJson(region, {
        style: function(feature) {
            return {
              color: "white",
              fillColor: chooseColor(feature.properties.ward_name),
              fillOpacity: 0.35,
              weight: 1.5
            }; },
        onEachFeature: onEachRegion
      }).addTo(myMap);

function chooseColor(wards){

    if (wards== 'Pandagi' || wards== 'Alu Mamagi' || wards== 'City Center 1'|| wards== 'Gawu' || wards== 'Gurdi' || wards== 'North East'|| wards== 'Nuku'|| wards== 'Ebagi'|| wards== 'South East'|| wards== 'Yaba'
    || wards== 'Garki 1'|| wards== 'Gui'|| wards== 'Gwagwa'|| wards== 'Gwarinpa'|| wards== 'Jiwa'
    || wards== 'Kabusa'|| wards== 'Karshi 1' || wards== 'Karu'|| wards== 'Kubwa'|| wards== 'Kuduru'
    || wards== 'Nyanya 1'|| wards== 'Orozo' || wards== 'Bwari Central'|| wards== 'Byazhin'|| wards== 'Dutse'|| wards== 'Igu' || wards== 'Kawu'
    || wards== 'Shere'|| wards== 'Ushafa'|| wards== 'Dobi'|| wards== 'Gwako' 
    || wards== 'Ibwa'|| wards== 'Ikwa'|| wards== 'Kutunku'|| wards== 'Paiko'
    || wards== 'Tungan Maje'|| wards== 'Zuba'|| wards== 'Chibiri'|| wards== 'Gaube'
    || wards== 'Gudunkarya'|| wards== 'Gwargwada'|| wards== 'Kabi'|| wards== 'Kuje'
    || wards== 'Kujekwa'|| wards== 'Kwaku'|| wards== 'Rubochi'|| wards== 'Yenche'
    || wards== 'Ashara'|| wards== 'Dafa'|| wards== 'Gumbo'|| wards== 'Kinlakwa'
    || wards== 'Kundu 1'|| wards== 'Kwali'|| wards== 'Pai'|| wards== 'Wako'
    || wards== 'Yangoji'|| wards== 'Yebu' || wards== 'Central-Gwa' || wards== 'Quarters' || wards=="Central Abaji" )
    {
        return "#006699";
    }
    else {return "#cc3300";}
}

var wards=['Agyana Pandagi', 'Alu Mamagi', 'Central', 'Gawu', 'Gurdi',
       'North East', 'Nuku Sabongari', 'Rimba Ebagi', 'South East',
       'Yaba', 'Garki', 'Gui', 'Gwagwa', 'Gwarimpa', 'Jiwa', 'Kabusa',
       'Karshi', 'Karu', 'Nyanya', 'Orozo', 'Bwari central',
       'Bwari Central', 'Byazhin', 'Dutse', 'Igu', 'Kawu', 'kubwa',
       'Kuduru', 'Shere', 'Ushafa', 'Dobi', 'Gwako', 'Ibwa', 'Ikwa',
       'Kutunku', 'Paikon', 'Tunga Maje', 'Zuba', 'Chibiri ', 'Gaube ',
       'Gudunkarya ', 'Gwargwada ', 'Kabi ', 'Kuje Central ', 'Kujekwa ',
       'Kwaku ', 'Rubochi ', 'Yanche ', 'Ashara ', 'Dafa', 'Gumbo ',
       'Kilankwa', 'Kundu ', 'Kwali ', 'Pai ', 'Wako ', 'Yangoji ',
       'Yebu ']; 
} 
