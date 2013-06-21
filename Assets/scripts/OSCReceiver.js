//You can set these variables in the scene because they are public 
public var RemoteIP : String = "127.0.0.1";
public var SendToPort : int = 5001;
public var ListenerPort : int = 5000; 
public var controller : Transform; 
public var handler : Osc; 
public var controllerObj:GameObject;
static var sig1 : int = 0;
static var currentUser : String = "default";
static var currentMode  :String = "on";

public function Start ()
{
	//Initializes on start up to listen for messages
	//make sure this game object has both UDPPackIO and OSC script attached
	
	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
	handler.SetAddressHandler("/mode", receiveMode); 
    handler.SetAddressHandler("/shake", shakeDetonator);   
    handler.SetAddressHandler("/enter", oscEnter); 
    handler.SetAddressHandler("/auto", autoDetonator);  
    
    
}
Debug.Log("Running");

function Update () {
	 /*
	if(sig1==1){
		 currentDetonator  = detonatorPrefabs [togglecount];
    	 togglecount++;
   		 if(togglecount  >  detonatorPrefabs.Length-1){
     		togglecount =  0;
     	 } 
     	 var position: Vector3 = Vector3(Random.Range(-10.0, 10.0), 0, Random.Range(-10.0, 10.0));   
     	 var exp : GameObject = Instantiate(currentDetonator,position, Quaternion.identity); 
   		 Destroy(exp, 10); 
		
	}
	sig1=0;
	  */
}	

//These functions are called when messages are received
//How to access values: 
	//oscMessage.Values[0], oscMessage.Values[1], etc

public function receiveMode (oscMessage : OscMessage) : void
{
   Debug.Log("mode > " + Osc.OscMessageToString(oscMessage));
   currentMode = oscMessage.Values[0];
}

public function shakeDetonator(oscMessage : OscMessage) : void
{	
	Debug.Log("Called Example One > " + Osc.OscMessageToString(oscMessage));
	Debug.Log("Message Values > " + oscMessage.Values[0]);
	var aaa = controllerScript.TWusers[oscMessage.Values[0] ];
	//Debug.Log(aaa);  
//	Debug.Log(currentmode); 
	if(currentMode =="on")
	{
	  currentUser = oscMessage.Values[0];
	  sig1 = 1;    
	} else if(currentMode =="test")
	{
	  currentUser = oscMessage.Values[0];
	  sig1 = 3;     
	}
} 

public function oscEnter(oscMessage : OscMessage) : void
{	
	
	Debug.Log("Enter > " + Osc.OscMessageToString(oscMessage));
	Debug.Log("Message Values > " + oscMessage.Values[0]);
	controllerScript.TWusers[oscMessage.Values[0]]= oscMessage.Values[1];
	currentUser = oscMessage.Values[0];
	//sig1 = 1;    
	//controllerScript.Explosion();
}

public function  autoDetonator(oscMessage : OscMessage) : void
{	
	
	Debug.Log("Auto > ");
    sig1 = 2;
     
	
}
 
public function sendOSC(txt : String){  

	handler.Send(handler.StringToOscMessage(txt)); 
	Debug.Log("Sended Message Values > " + txt);
}
