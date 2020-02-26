let dxstat = document.getElementById("dxsort"), table = document.getElementById("table") ,stat=document.getElementById("stat");
let udata = {
	GET:{},
	properties:["SEC CODE","MATERIAL DESCRIPTION","WORK ORDER","MVT","dX","QTY WITH ORDER","QTY ISSUED","QTY REMAIN","DATE OF ISSUED","OFFICE","STATUS OF ORDER"]
};
let serchk='';
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBoASUtStv-VOeXsaPRyYOKAfyFRW2q2LY",
authDomain: "awais-2938f.firebaseapp.com",
databaseURL: "https://awais-2938f.firebaseio.com",
projectId: "awais-2938f",
storageBucket: "awais-2938f.appspot.com",
messagingSenderId: "314589639640",
appId: "1:314589639640:web:1d182783beadae1f6ef8ad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var got=0, database = firebase.database().ref();

function writeR(){
stat.innerText= "Loading...";
stat.style.color="#000";
table.innerHTML="";
udata.GET={};
serchk =document.getElementById("input").value;
got=0;
if(serchk.length!=9){
stat.innerHTML="Enter 9 digits</br>you have entered "+serchk.length+" digits";
stat.style.color="#f00";
return;
}
database.child('Sheet1/').orderByChild("WORK ORDER")
.startAt("W"+ serchk +"000/0000")
.endAt("W"+ serchk +"999/9999")
/*.equalTo("W174001193401/0011")174001193401*/
.on("value", function(snapshot) {
//document.write( JSON.stringify(snapshot.val()) );


let keys={},
keyf=udata.properties;
if(snapshot.exists()){
snapshot.forEach(function(data) {
let scode = data.val()["WORK ORDER"];
udata.GET[scode]= data.val();

});

}else{}
got++;
writea();
}, error => {
console.error(error);
got++;
writea();
}
);

database.child('Sheet1/').orderByChild("WORK ORDER")
.startAt("1W"+ serchk +"000/0000")
.endAt("1W"+ serchk +"999/9999")
.on("value", function(snapshot) {
let keys={},
keyf=udata.properties;
if(snapshot.exists()){
snapshot.forEach(function(data) {
let scode = data.val()["WORK ORDER"];	
udata.GET[scode]= data.val();
});

got++;
writea();
}else{}
}, error => {
	got++;
writea();
console.error(error);
});

}
input.disabled=false;
document.getElementById("button").disabled=false;

function writea(){
table.innerHTML="";
if(Object.keys(udata.GET).length==0){
stat.innerText= "[ NO DATA FOUND ]";
stat.style.color="#f00";
return;
}
let dat = "";
dat+= "<tr>";
udata.properties.forEach(function(key){
	dat+= "<th>"+key+"</th>";
});
dat+= "</tr>";
Object.keys(udata.GET).forEach(function(data) {
let color = "";
if(udata.GET[data]["WORK ORDER"][0]==1){
color = " style='color:#f00;'";
}
dat+= "<tr"+color+">";
udata.properties.forEach(function(key){
  dat+= "<td>"+udata.GET[data][key]+"</td>";
  });
dat+="</tr>";
});
window.requestAnimationFrame(function(){
table.innerHTML=dat;
sortTable(0,'a');
sortTable(3,'d');
stat.innerText= "Search results for \""+serchk+'"';
});
}

function sortTable(ind,order) {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementsByTagName('table')[0];
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[ind];
      y = rows[i + 1].getElementsByTagName("TD")[ind];
      // Check if the two rows should switch place:
	  if(order=="a"&&x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }else if(order=="d"&&x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
	
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function ent(event) {
	
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
writeR();
  }
}
function pt(){window.print();}
