public var detonatorPrefabs : GameObject[]; 
public var currentDetonator:GameObject;

public var pushPower = 2.0;
public var osc :OSCReceiver ;
public var testicons : Texture[];  
private var panelWidth;
private var panelHeight;

public var explosion = true ;

function Start(){ 
 
	 var panel = GameObject.Find("Plane");
	 panelWidth=panel.renderer.bounds.extents.z ;
	 panelHeight=panel.renderer.bounds.extents.y;
	 
	 var url = controllerScript.TWusers[OSCReceiver.currentUser];
	// Debug.Log("url "+ url);
	var socialpanel  =  this.transform.Find("socialpanel").transform.Find("socialicon"); 
//	socialpanel.transform.rotation = Quaternion.Euler(0,90, 0);
	 if(url == "default") { 	   
	   socialpanel.renderer.material.mainTexture = testicons[Random.Range(0, testicons.length  -1 )];
	   
	 } else {
	   var www  = new WWW (url);
	   if(www.error) {
		 Debug.Log("going into www.error catching case");
       } else {
         yield www; 
         socialpanel.renderer.material.mainTexture = www.texture; 
       }
      }
 	 var force =  new Vector3(Random.Range(-500, -350),  Random.Range(150, 180), Random.Range(-20, 20));  
     rigidbody.AddForce( force, ForceMode.Impulse);
     rigidbody.AddTorque( Random.Range(-200, 200), Random.Range(-200, 200), Random.Range(-200,200));
     
     currentDetonator =  detonatorPrefabs[Random.Range(0, detonatorPrefabs.Length  -1 )]; 
    
}


function OnControllerColliderHit (hit : ControllerColliderHit) {
	var body : Rigidbody = hit.collider.attachedRigidbody;
	if (body == null || body.isKinematic)
		return;
	if (hit.moveDirection.y < -0.3)
		return;
	var pushDir : Vector3 = Vector3 (hit.moveDirection.x, 0, hit.moveDirection.z);
	body.velocity = pushDir * pushPower;  

}  

function OnCollisionEnter(collision : Collision){  
// Rotate the object so that the y-axis faces along the normal of the surface 
var contact : ContactPoint = collision.contacts[0];  
 if(contact.point.y< -150){
   Destroy(this.gameObject); 
 }
var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal); 
var offsetSize = 5; 
var pos : Vector3 = contact.point  + Vector3(0,offsetSize,0); 
if( contact.point.x <50 && explosion ){
  Instantiate(currentDetonator, pos, rot); 
 //audio.Play();
Destroy(gameObject); 

 //osc = GameObject.Find("OSCcontroller").GetComponent(OSCReceiver);
 //osc.sendOSC ("/detonator " +  contact.point.z / panelWidth  +" "+  contact.point.y / panelHeight );
  }
}


