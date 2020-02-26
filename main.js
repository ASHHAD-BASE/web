let dxstat = document.getElementById("dxsort"), table = document.getElementById("table") ,stat=document.getElementById("stat");
let udata = {
	GET:{},
	properties:["SEC CODE","MATERIAL DESCRIPTION","WORK ORDER","MVT","dX","QTY WITH ORDER","QTY ISSUED","QTY REMAIN","DATE OF ISSUED","OFFICE","STATUS OF ORDER"],
	filter:{},
	fdta:{MVT:{},dX:{}}
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
udata.filter={};
udata.fdta={MVT:{},dX:{}};
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
let fmvt = data.val()["MVT"],fdx = data.val()["dX"];
inc("MVT",fmvt);inc("dX",fdx);
udata.GET[scode]= data.val();
let dspt = udata.GET[scode]["DATE OF ISSUED"].split("/"),
tempdate = new Date("20"+dspt[2]+"-"+dspt[0]+"-"+dspt[1]);
//udata.GET[scode]["DATE OF ISSUED"]=tempdate.toLocaleDateString("en-AU",{ year: '2-digit', month: '2-digit', day: '2-digit' });

});

}else{}
got++;
if(true){
updatef();
writea();
}
}, error => {
console.error(error);
got++;
if(true){
updatef();
writea();
}
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
let fmvt = data.val()["MVT"],fdx = data.val()["dX"];
inc("MVT",fmvt);inc("dX",fdx);
udata.GET[scode]= data.val();
let dspt = udata.GET[scode]["DATE OF ISSUED"].split("/"),
tempdate = new Date("20"+dspt[2]+"-"+dspt[0]+"-"+dspt[1]);
udata.GET[scode]["DATE OF ISSUED"]=tempdate.toLocaleDateString("en-AU",{ year: '2-digit', month: '2-digit', day: '2-digit' });

});


}else{}
got++;
if(true){
writea();
updatef();
}
}, error => {
	got++;
if(true){
writea();
updatef();
}
console.error(error);
});

}
input.disabled=false;
document.getElementById("button").disabled=false;
function writea(){
//console.log(JSON.stringify(udata.fdta));
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
fstate=1;
for(filk in udata.filter){
if(udata.GET[data][filk]==udata.filter[filk]){
fstate&=1;
}else{
fstate&=0;return;
}
}
if(fstate==0){return;}

let color = "";
if( udata.GET[data]["WORK ORDER"][0] ==1){
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
document.getElementById("pfield").innerHTML="<p>WORK ORDER NUMBER:"+serchk+"</p><p>Printed on<br>"+(new Date())+"</p>";
});
}

function sortTable(ind,order) {
  var table1, rows, switching, i, x, y, shouldSwitch;
  table1 = document.getElementsByTagName('table')[0];
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table1.rows;
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

table.ondblclick= function(){
let attr = table.getAttribute('e');
if(attr=="true"){
table.removeAttribute("e");
return;
}
table.setAttribute("e",true);
};
function inc(path,value){
udata.fdta[path][value]=1;
}
function updatef(){
for( field in udata.fdta ){
let element = document.getElementById(field+"fil");
element.innerHTML= "<option value='all' default>ALL</option>";
for( fld in udata.fdta[field] ){
element.innerHTML+= "<option value='"+fld+"'>"+fld+"</option>";
}
element.disabled=false;
document.getElementById("pbtn").disabled=false;
}
}
function filterState(e){
if(e.value!="all"){
udata.filter[e.id.replace(/fil/g,"")]=e.value;
}else{
delete udata.filter[e.id.replace(/fil/g,"")];
}
writea();
//alert( JSON.stringify(udata.filter)  );
}