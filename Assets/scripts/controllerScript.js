public var detonatorPrefabs : GameObject[]; 
public var currentDetonator:GameObject;
public var togglecount=0;
public var ball:GameObject;
public var frontCube:GameObject;
public var frontSphere:GameObject;
public var frontTexture:Texture; 
static var TWusers:Hashtable ;
public var defaultTexture : Texture;
private var wall :GameObject[];
public var floor:GameObject;
public var cameraA : GameObject;
public var cameraB : GameObject;
var movTexture : MovieTexture;  

function Start () {
   wall = new GameObject[40 *26];
   //usr hash
   TWusers = new Hashtable();  
   
   TWusers.Add("default", "default"); 
   
    generateWall2();
    cameraA.camera.enabled = true;
    cameraB.camera.enabled = false;
} 

function Update() {
  if (Input.GetKeyDown(KeyCode.F)) {
        Screen.fullScreen = !Screen.fullScreen;
  } 
  if (Input.GetKeyDown(KeyCode.W)) {
         generateWall();
  }
  if (Input.GetKeyDown(KeyCode.E)) {
         generateWall2();
  }
 if (Input.GetKeyDown(KeyCode.R)) {
         generateWall3();
  }
  if (Input.GetKeyDown(KeyCode.C)) {
         if( cameraA.camera.enabled == true){
             cameraA.camera.enabled = false;
             cameraB.camera.enabled = true;
         }else{
             cameraA.camera.enabled = true;
              cameraB.camera.enabled = false;
         }
         
  }
   
  if(Input.GetKeyDown("mouse 1")){ 
  	 currentDetonator  = detonatorPrefabs [togglecount];
     togglecount++;
     if(togglecount  >  detonatorPrefabs.Length-1){
     	togglecount =  0;
     }
    var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
    var hit : RaycastHit;
    if(Physics.Raycast(ray,hit)){
   	    var offsetSize = 5;
     	var hitPoint = hit.point + ((Vector3.Scale(hit.normal, Vector3(offsetSize,offsetSize,offsetSize))));
        var rot = Quaternion.FromToRotation(Vector3.up,hit.normal);
		var exp : GameObject = Instantiate(currentDetonator,hitPoint,rot);         
    }
    Destroy(exp, 10); 
    
    }
    
    if(Input.GetKeyDown("mouse 0")){
       OSCReceiver.currentUser  = "default" ;
       if(OSCReceiver.currentMode =="test"){
         generateCube(false);
       }else{
         generateCube(true);
       }
    }
    
     if(OSCReceiver.sig1 ==1){ //nomal
         generateCube(true);
    	OSCReceiver.sig1 =0; 
		  Debug.Log(OSCReceiver.currentUser) ;	 
     }   
     else if(OSCReceiver.sig1 ==2){  //auto
         OSCReceiver.currentUser  = "default" ; 
         var  count = 10;
         while(count>0){
           count--;
           generateCube(true);
          
         }
    	OSCReceiver.sig1 =0; 
		//  Debug.Log(OSCReceiver.currentUser) ;	 
     } else if(OSCReceiver.sig1 == 3){  //test
        generateCube(false);
    	OSCReceiver.sig1 =0; 	 
     }           
}

function generateCube(expl){
     var point2 =  new Vector3(Random.Range(105, 110),  Random.Range(-50, 20), Random.Range(-73, 73));
     var rot3 = Quaternion(0,0,0,0);
     var newCube = Instantiate(ball , point2, rot3);
     //newCube.GetComponent("collider").explosion = expl;
	 // Debug.Log("instantiate") ;
}
 
function generateWall(){   

  
	for( var w = 0; w < wall.length ; w++){
	  Destroy(wall[w]); 
	 } 
	 var cubeSize = frontCube.transform.localScale.x;
    //piling box
  
	for ( var i =0; i < 25 ;i++){
	   for ( var j =0; j < 15 ;j++){
        var cpoint =  new Vector3(2,j*cubeSize-50 , (i-16)*cubeSize  + 40);
        var crot = Quaternion.identity;
    	wall[i+ j*40]  =  Instantiate(frontCube , cpoint,   crot);
    	wall[i+ j*40].rigidbody.Sleep();
    	wall[i+ j*40].renderer.material.mainTexture =  frontTexture;  
    	wall[i+ j*40].renderer.material.mainTextureScale.x = 1.0/25;
    	wall[i+ j*40].renderer.material.mainTextureScale.y = 1.0/15;
    	wall[i+ j*40].renderer.material.mainTextureOffset = Vector2(parseFloat(i)/25+0.1,parseFloat(j)/15);  
    	
     }
	}
 
} 

function generateWall2(){   

   	for( var w = 0; w < wall.length ; w++){
	  Destroy(wall[w]); 
	 }
    var fpoint =  new Vector3(0, -56 , 0);
    var frot = Quaternion.identity; 
    Instantiate(floor , fpoint,   frot);
     var cubeSize = frontCube.transform.localScale.x; 
     var wallx = 25;
     var wally =15;
    for ( var i =0; i < wallx ;i++){
	   for ( var j =0; j < wally ;j++){
        var cpoint =  new Vector3(2,j*cubeSize-50 , (i-16)*cubeSize  + 40);
        var crot = Quaternion.identity;
    	wall[i+ j*wallx]  =  Instantiate(frontCube , cpoint,   crot);
    	wall[i+ j*wallx].rigidbody.Sleep();
    	wall[i+ j*wallx].renderer.material.mainTexture =  movTexture;  
    	wall[i+ j*wallx].renderer.material.mainTextureScale.x = 1.0/36;
    	wall[i+ j*wallx].renderer.material.mainTextureScale.y = 1.0/20;
    	wall[i+ j*wallx].renderer.material.mainTextureOffset = Vector2(parseFloat(i)/36 +0.02 ,parseFloat(j)/20);  
    	
     }
	}
	  movTexture.loop = true;
  movTexture.Play();
} 

function generateWall3(){   

   	for( var w = 0; w < wall.length ; w++){
	  Destroy(wall[w]); 
	 }
    var fpoint =  new Vector3(0, -56 , 0);
    var frot = Quaternion.identity; 
    Instantiate(floor , fpoint,   frot);
     var cubeSize = frontCube.transform.localScale.x; 
     var wallx = 25;
     var wally =15;
    for ( var i =0; i < wallx ;i++){
	   for ( var j =0; j < wally ;j++){
        var cpoint =  new Vector3(2,j*cubeSize-50 , (i-16)*cubeSize  + 40);
        var crot = Quaternion.identity;
    	wall[i+ j*wallx]  =  Instantiate(frontSphere , cpoint,   crot);
    	wall[i+ j*wallx].rigidbody.Sleep();
    	wall[i+ j*wallx].renderer.material.mainTexture =  movTexture;  
    	wall[i+ j*wallx].renderer.material.mainTextureScale.x = 1.0/36;
    	wall[i+ j*wallx].renderer.material.mainTextureScale.y = 1.0/20;
    	wall[i+ j*wallx].renderer.material.mainTextureOffset = Vector2(parseFloat(i)/36 +0.02 ,parseFloat(j)/20);  
    	
     }
	}
	  movTexture.loop = true;
  movTexture.Play();
}