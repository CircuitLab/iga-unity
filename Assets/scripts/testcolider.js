public var detonatorPrefabs : GameObject[]; 
public var currentDetonator:GameObject;

var pushPower = 2.0;
var url = "https://gravatar.com/avatar/8d37978c8f6a038622dff392549869c0 ";
var urls =   [ 
	 "https://gravatar.com/avatar/0d22cf6120bdd1f4f70e9845a2c14793"
	, "https://gravatar.com/avatar/12ec69cf9761cb69eb3bae883e77d7a7"
	, "https://gravatar.com/avatar/15be82b46d1529fd3ddd4d12f24ba533"
	, "https://gravatar.com/avatar/218ca000c5efe425e205063f2a419cdf"
	, "https://gravatar.com/avatar/3026aa33e9d2bf0bd672a7714b988e1d"
	, "https://gravatar.com/avatar/342a12d80907543927d180a3ea158153"
	,  "https://gravatar.com/avatar/88722669a4c3c8c17ab2ed4c6b4d5b0a"
	, "https://gravatar.com/avatar/8b495f4b0b134eb7331a5b82eafd72fb"
	, "https://gravatar.com/avatar/deeda7e25af5a6a3e2f23cb498566a5d"
	, "http://uniba.jp/assets/img/m_andre.png"
	, "http://uniba.jp/assets/img/m_daichi.png"
	, "http://uniba.jp/assets/img/m_keiichi.png"
	, "http://uniba.jp/assets/img/m_keisuke.png"
	, "http://uniba.jp/assets/img/m_koichiro.png"
	, "http://uniba.jp/assets/img/m_noriyuki.png"
	,"http://uniba.jp/assets/img/m_sei.png"
	
  ];  

var osc :OSCReceiver ;

private var panelWidth;
private var panelHeight;


function Start(){
	 var panel = GameObject.Find("Plane");
	 panelWidth=panel.renderer.bounds.extents.z ;
	 panelHeight=panel.renderer.bounds.extents.y;
	 
	 var www : WWW = new WWW (urls[Random.Range(0, urls.length  -1 )] );
     yield www; 
     if(www.error) {
		Debug.Log("going into www.error catching case");
 	}
     renderer.material.mainTexture = www.texture; 
     
 	  var force =  new Vector3(Random.Range(-450, -200),  Random.Range(150, 180), Random.Range(-20, 20));  
     rigidbody.AddForce( force, ForceMode.Impulse);
     rigidbody.AddTorque( Random.Range(-10, 10), Random.Range(-10, 10), Random.Range(-10,10));
     
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
var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal); 
var offsetSize = 5; 
var pos : Vector3 = contact.point  + Vector3(0,offsetSize,0); 
if( contact.point.x <50){
  Instantiate(currentDetonator, pos, rot); 

Destroy(gameObject); 

 osc = GameObject.Find("OSCcontroller").GetComponent(OSCReceiver);
 osc.sendOSC ("/detonator " +  contact.point.z / panelWidth  +" "+  contact.point.y / panelHeight );
  }
}


