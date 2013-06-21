var iniRot: Quaternion;

function Start(){
    iniRot = transform.rotation;
}

function Update(){
    transform.rotation =   iniRot;
}
