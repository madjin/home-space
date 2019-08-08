/*
This is:
 
*Transformation
*API
 for
*Chamber
*Of
*Secrets

or TACOS for short. It allows a generic "click to open door" mechanic where the object in the room itself defines it's own opening waypoints. 
This allows the room to define door movements instead of editing the JS for every door.
It also allows a "click to write text to chat" mechanic.

As far as licensing, here's how this is going to go:
*If you use this JS file and don't edit it at all, keep the file name intact; TACOS_Vnazrin.1.3 -> TACOS_Vnazrin.1.3
*If you use this JS file and and edit it to suit your purposes, change the name after the V to your janus name and print what the last file name was in the space pervided; TACOS_Vnazrin.2.7 -> TACOS_Valusion.1.0
here ---->

<----
This will allow us some order to figuring out the telephone game that will be the versioning of this file.
*If you only use bits and peices of this file in some other JS file, you need to add a comment "glory be the banana" somewhere near the top of your file.
*If you meet Nazrin some day, and you think this stuff was worth it, you can buy him a JanusVR hoodie in return.

*/

/*
Functions:
rDoor(js_id , rotation degrees , duration , delay , flag type);
sDoor(js_id , deltax , deltay , deltaz , duration , delay , flag type);
Move(js_id , x , y , z , duration , delay);
Text(user name , Text);
mText(user name , ['array','of','text']);
PlaySound(js_id);
Teleport(posx,posy,posz,delay);
rTeleport(deltax,deltay,deltaz,delay);
Grab(js_id);
*/






var names=[];
var delaying=[];
var durations=[];
var countdown=[];

var rotstart=[];
var rotdelta=[];

var transstart=[];
var transdelta=[];

var lockednames=[];
var toreverse=[];

var sounds=[];
var sdelaying=[];

var teleports=[];
var tdelaying=[];

var colors=[];
var cdelaying=[];

var slides=[];
var slidestart=[];
var sldelaying=[];

var grabbing = false;
var grabbed  = false;
var grab='';
var gdistance=0;
var gplayer_xdir=Vector(0,0,0);
var gplayer_ydir=Vector(0,0,0);
var gplayer_zdir=Vector(0,0,0);
var gdelta_xdir=Vector(0,0,0);
var gdelta_ydir=Vector(0,0,0);
var gdelta_zdir=Vector(0,0,0);
var gobject_xdir=Vector(0,0,0);
var gobject_ydir=Vector(0,0,0);
var gobject_zdir=Vector(0,0,0);


room.onLoad = function(){}

room.update = function(delta)
{
  var arrayLength = names.length; 
  for (var i = 0; i < arrayLength; i++)
  {
    if (delaying[i]>0)
    {
      delaying[i] -= delta;
      if(delaying[i]<=0){
        transstart[i] = Vector(room.objects[names[i]].pos.x,room.objects[names[i]].pos.y,room.objects[names[i]].pos.z);
        rotstart[i]   = Math.atan2(room.objects[names[i]].fwd.x, room.objects[names[i]].fwd.z);
      }
    }else{
      countdown[i] -= delta;
      
      //so we don't overshoot
      if (countdown[i]<0){countdown[i]=0;}
      //what percent are we to completeing the transformation
      var percent = 1 - (countdown[i]/durations[i]);
      var currrot = rotstart[i] + (percent * rotdelta[i]);
      var result = rotateXYZ(currrot,0,0,names[i]);
      room.objects[names[i]].xdir=result[0];
      room.objects[names[i]].ydir=result[1];
      room.objects[names[i]].zdir=result[2];
      
      room.objects[names[i]].pos.x = transstart[i].x + (percent * transdelta[i].x);
      room.objects[names[i]].pos.y = transstart[i].y + (percent * transdelta[i].y);
      room.objects[names[i]].pos.z = transstart[i].z + (percent * transdelta[i].z);
      room.objects[names[i]].sync=true;
      if (countdown[i]<=0)
      {
        room.objects[names[i]].sync=true;
        names.splice(i, 1);
        delaying.splice(i, 1);
        durations.splice(i, 1);
        countdown.splice(i, 1);
        
        rotstart.splice(i, 1);
        rotdelta.splice(i, 1);

        transstart.splice(i, 1);
        transdelta.splice(i, 1);
        arrayLength--;
        i--;
      }
    }
  }
  
  arrayLength = sounds.length; 
  for (var i = 0; i < arrayLength; i++)
  {
    if (sdelaying[i]>=0)
    {
      sdelaying[i] -= delta;
      if(sdelaying[i]<=0){
        room.playSound(sounds[i]);
        sounds.splice(i, 1);
        sdelaying.splice(i, 1);
        arrayLength--;
        i--;
      }
    }
  }
  
  arrayLength = teleports.length; 
  for (var i = 0; i < arrayLength; i++)
  {
    if (tdelaying[i]>=0)
    {
      tdelaying[i] -= delta;
      if(tdelaying[i]<=0){
        player.pos.x=teleports[i][0];
        player.pos.y=teleports[i][1];
        player.pos.z=teleports[i][2];
        teleports.splice(i, 1);
        tdelaying.splice(i, 1);
        arrayLength--;
        i--;
      }
    }
  }
  
  arrayLength = colors.length; 
  for (var i = 0; i < arrayLength; i++)
  {
    if (cdelaying[i]>=0)
    {
      cdelaying[i] -= delta;
      if(cdelaying[i]<=0){
        room.objects[colors[i][0]].col.x = colors[i][1];
        room.objects[colors[i][0]].col.y = colors[i][2];
        room.objects[colors[i][0]].col.z = colors[i][3];
        colors.splice(i, 1);
        cdelaying.splice(i, 1);
        arrayLength--;
        i--;
      }
    }
  }
  
  arrayLength = slides.length; 
  for (var i = 0; i < arrayLength; i++)
  {
    if (sldelaying[i][0]>=0)
    {
      sldelaying[i][0] -= delta;
      if(sldelaying[i][0]<=0){
        slidestart[i][0]=player.pos.x;
        slidestart[i][1]=player.pos.y;
        slidestart[i][2]=player.pos.z;
        
        slides[i][0]-=slidestart[i][0];
        slides[i][1]-=slidestart[i][1];
        slides[i][2]-=slidestart[i][2];

      }
    }else{
      sldelaying[i][1] -= delta;
      
      //so we don't overshoot
      if (sldelaying[i][1]<0){sldelaying[i][1]=0;}
      var percent = 1 - (sldelaying[i][1]/sldelaying[i][2]);
      player.pos.x = slidestart[i][0] + (percent * slides[i][0]);
      player.pos.y = slidestart[i][1] + (percent * slides[i][1]);
      player.pos.z = slidestart[i][2] + (percent * slides[i][2]);
      
      if (sldelaying[i][1]<=0)
      {
        slides.splice(i, 1);
        slidestart.splice(i, 1);
        sldelaying.splice(i, 1);
        arrayLength--;
        i--;
      }
    }
  }
  
  if(grabbing){
    //the delta from matrix A->B is BA^T. We already transposed A when we stored it.
    var playerxrot= Math.atan2(-player.view_dir.x, -player.view_dir.z);
    var playerxyhyp=Math.sqrt(player.view_dir.z*player.view_dir.z+player.view_dir.x*player.view_dir.x);
    var playeryrot= Math.atan2(player.view_dir.y,-playerxyhyp);
    var result1=rotateXYZ(playerxrot, 0, 0);
    var result2 = multiply3x3(result1[0],result1[1],result1[2],gplayer_xdir,gplayer_ydir,gplayer_zdir);
    
    //we then multiply the original matrix by our delta: CD
    var result3 = multiply3x3(gobject_xdir,gobject_ydir,gobject_zdir,result2[0],result2[1],result2[2]);
    //print(gobject_xdir);
    
    room.objects[grab].xdir=result3[0];
    room.objects[grab].ydir=result3[1];
    room.objects[grab].zdir=result3[2];
    
    
    room.objects[grab].pos.x = (gdistance*player.view_dir.x)+player.head_pos.x;
    room.objects[grab].pos.y = (gdistance*player.view_dir.y)+player.head_pos.y;
    room.objects[grab].pos.z = (gdistance*player.view_dir.z)+player.head_pos.z;
  }
}

//rotating door: allows an object to rotate a certain amount within a certain duration after a certain delay.
//usage: onclick="rDoor('frontdoor',90,1,0,'once')"
//result: the object with js_id="frontdoor" will swing 90 degrees clockwise within 1 second after waiting 0 seconds. Will only work once.
//valid flags are 'once','repeat', and 'reverse'. default is 'repeat'
//there is currently a bug with reverse and repeat where if you spam click the object, it will end up in stange positions.
function rDoor(name,rotDeg,duration,delay,type)
{
  
  if(lockednames.indexOf(name)==-1){
    if(type=='once'){
      lockednames.push(name);
    } 
    names.push(name);
    delaying.push(delay*1000);
    durations.push(duration*1000);
    countdown.push(duration*1000);
    rotstart.push(Math.atan2(room.objects[name].fwd.x, room.objects[name].fwd.z));
    //yes, I know about the reverse bug. I'll fix it later
    if(type=='reverse'){
      if(toreverse.indexOf(name)==-1){
        toreverse.push(name);
        rotdelta.push(-Math.PI*2*rotDeg/360);
      }else{
        toreverse.splice(toreverse.indexOf(name),1);
        rotdelta.push(Math.PI*2*rotDeg/360);
      }
    }else{
      rotdelta.push(-Math.PI*2*rotDeg/360);
    }
    transstart.push(Vector(room.objects[name].pos.x,room.objects[name].pos.y,room.objects[name].pos.z));
    transdelta.push(Vector(0,0,0));
  }
}

//sliding door: allows an object to slide a certain amount within a certain duration after a certain delay.
//usage: onclick="sDoor('frontdoor',1,-15,2,1,0,'once')"
//result: the object with js_id="frontdoor" will move 1 meter in the x direction, 15 meters down and 2 meters in z. All within 1 second after waiting 0 seconds. Will only work once.
//valid flags are 'once','repeat', and 'reverse'. default is 'repeat'
//there is currently a bug with reverse and repeat where if you spam click the object, it will end up in stange positions.
function sDoor(name,deltax,deltay,deltaz,duration,delay,type)
{
  
  if(lockednames.indexOf(name)==-1){
    if(type=='once'){
      lockednames.push(name);
    } 
    names.push(name);
    delaying.push(delay*1000);
    durations.push(duration*1000);
    countdown.push(duration*1000);
    rotstart.push(Math.atan2(room.objects[name].fwd.x, room.objects[name].fwd.z));
    //yes, I know about the reverse bug. I'll fix it later
    if(type=='reverse'){
      if(toreverse.indexOf(name)==-1){
        toreverse.push(name);
        transdelta.push(Vector(deltax,deltay,deltaz));
      }else{
        toreverse.splice(toreverse.indexOf(name),1);
        transdelta.push(Vector(-deltax,-deltay,-deltaz));
      }
    }else{
      transdelta.push(Vector(deltax,deltay,deltaz));
    }
    transstart.push(Vector(room.objects[name].pos.x,room.objects[name].pos.y,room.objects[name].pos.z));
    rotdelta.push(0);
  }
}

//Move object: allows an object to move to a location within a certain duration after a certain delay.
//usage: onclick="Move('frontdoor',1,2,3,1,0)"
//result: the object with js_id="frontdoor" will move to the coordinates 1,2,3. All within 1 second after waiting 0 seconds. 
function Move(name,coordx,coordy,coordz,duration,delay)
{
    names.push(name);
    delaying.push(delay*1000);
    durations.push(duration*1000);
    countdown.push(duration*1000);
    rotstart.push(Math.atan2(room.objects[name].fwd.x, room.objects[name].fwd.z));
    transdelta.push(Vector(coordx-room.objects[name].pos.x,coordy-room.objects[name].pos.y,coordz-room.objects[name].pos.z));
    transstart.push(Vector(room.objects[name].pos.x,room.objects[name].pos.y,room.objects[name].pos.z));
    rotdelta.push(0);
}


//text: allows for an object to put a text string in chat. The first argument is what the player name looks like.
//usage: onclick="Text('That weird guy','I don\'t see anything wrong here.')"
//output: That weird guy: I don't see anything wrong here.
function Text(name,Text)
{
  name = name.replace(/ /g, " "); //black magic. Mecca Lecca Hi, Mecca Hiney Ho.
	print(name + ' ' + Text);
}


//multi choice text: allows for an object to put more than one text string in chat. randomises the array. The first argument is what the player name looks like.
//usage: onclick="mText('The count says',['one','two','three ha ha ha'])"
//output:
/*
The count says: three ha ha ha
The count says: one
The count says: two
*/
function mText(name,TextArray)
{
  name = name.replace(/ /g, " "); //black magic. Hocus Pocus.
	print(name + ' ' + TextArray[Math.floor(Math.random() * Object.keys(TextArray).length)]);
}

//Play sound: Plays a sound. Really simple
//usage: onclick="PlaySound('beep', 1000);"
//output: beeps after one second
function PlaySound(name,delay)
{
  sounds.push(name);
  sdelaying.push(delay);
}

//Teleport: teleports you to coordinates after a delay of miliseconds
//usage: onclick="Teleport(1,2,3,1000);"
//output: teleports you to 1,2,3 after 1 second
function Teleport(posx,posy,posz,delay)
{
  teleports.push([posx,posy,posz]);
  tdelaying.push(delay);
}

//Relative Teleport: teleports you an offset ammount after a delay of miliseconds
//usage: onclick="rTeleport(1,0,0,0);"
//output: teleports you 1 meter in the x direction.
function rTeleport(deltax,deltay,deltaz,delay)
{
  teleports.push([player.pos.x+deltax,player.pos.y+deltay,player.pos.z+deltaz]);
  tdelaying.push(delay);
}

//Slide: slowly move the player to the coordinates after a delay of miliseconds
//usage: onclick="Slide(0,2,0,3000,0);"
//output: the player will be moved to 0,2,0 over the course of 3 seconds.
function Slide(posx,posy,posz,duration,delay)
{
  slides.push([posx,posy,posz]);
  slidestart.push([posx,posy,posz]);
  sldelaying.push([delay,duration,duration]);
}

//Color: sets the color atribute of an object after a delay of miliseconds
//usage: onclick="Color('mycube',0,0,0,1000);"
//output: turns the object with js_id of 'mycube' black after one second.
function Color(name,red,blue,green,delay)
{
  colors.push([name,red,blue,green]);
  cdelaying.push(delay);
  room.objects[name].col.x = red;
  room.objects[name].col.x = blue;
  room.objects[name].col.x = green;
  tdelaying.push(delay);
}

//Grab: allows you to "pick up" an object and hold it at the distance where you clicked it. Click again to release. You can only grab one thing at a time. You can also override the distance in meters.
//usage: onclick="Grab('mycube',0);"
//output: Grabs hold of mycube. 0 means that you are not overriding the distance.
function Grab(name,distances)
{
  if(grabbed || grabbing){
    grabbed = false;
    grabbing = false;
  }else{
    grab=name;
    var playerxrot= Math.atan2(-player.view_dir.x, -player.view_dir.z);
    var playerxyhyp=Math.sqrt(player.view_dir.z*player.view_dir.z+player.view_dir.x*player.view_dir.x);
    var playeryrot= Math.atan2(player.view_dir.y,-playerxyhyp);
    var result1=rotateXYZ(playerxrot, 0, 0);
    
    
    gplayer_xdir=Vector(result1[0].x,result1[1].x,result1[2].x);
    gplayer_ydir=Vector(result1[0].y,result1[1].y,result1[2].y);
    gplayer_zdir=Vector(result1[0].z,result1[1].z,result1[2].z);
    
    gobject_xdir=Vector(room.objects[name].xdir.x,room.objects[name].xdir.y,room.objects[name].xdir.z);
    gobject_ydir=Vector(room.objects[name].ydir.x,room.objects[name].ydir.y,room.objects[name].ydir.z);
    gobject_zdir=Vector(room.objects[name].zdir.x,room.objects[name].zdir.y,room.objects[name].zdir.z);
    
    if(distances==0){
      gdistance = distance(room.objects[name].pos,player.head_pos);
    }else{
      gdistance=distances;
    }
    grabbing=true;
  }
}



/*
Utilities. Do not use in your JML code
*/
//euler angles to rotation matrix
function rotateXYZ(xrot, yrot, zrot){
    var A       = Math.cos(xrot);
    var B       = Math.sin(xrot);
    var C       = Math.cos(yrot);
    var D       = Math.sin(yrot);
    var E       = Math.cos(zrot);
    var F       = Math.sin(zrot);

    var xdir = Vector(A*E , A*F , -B);
    var ydir = Vector(D*B*E - C*F , D*B*F + C*E , A*D);
    var zdir = Vector(C*B*E + D*F , C*B*F - D*E , A*C);
    
    return [xdir,ydir,zdir];
}

function multiply3x3(xdir,ydir,zdir,xdir2,ydir2,zdir2){
  var xdir3=Vector(xdir.x*xdir2.x+xdir.y*ydir2.x+xdir.z*zdir2.x,xdir.x*xdir2.y+xdir.y*ydir2.y+xdir.z*zdir2.y,xdir.x*xdir2.z+xdir.y*ydir2.z+xdir.z*zdir2.z);
  var ydir3=Vector(ydir.x*xdir2.x+ydir.y*ydir2.x+ydir.z*zdir2.x,ydir.x*xdir2.y+ydir.y*ydir2.y+ydir.z*zdir2.y,ydir.x*xdir2.z+ydir.y*ydir2.z+ydir.z*zdir2.z);
  var zdir3=Vector(zdir.x*xdir2.x+zdir.y*ydir2.x+zdir.z*zdir2.x,zdir.x*xdir2.y+zdir.y*ydir2.y+zdir.z*zdir2.y,zdir.x*xdir2.z+zdir.y*ydir2.z+zdir.z*zdir2.z);
  return [xdir3,ydir3,zdir3];
}


/*
Key Controls
*/

room.onClick = function() {
  if(grabbing){
    room.preventDefault();
    grabbing=false;
    grabbed=true;
  }
}