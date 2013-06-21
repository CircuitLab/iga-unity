var movTexture : MovieTexture;  
var movSound: AudioClip;
function Start () { 
  renderer.material.mainTexture = movTexture as Texture;
  movTexture.loop = true;
 movTexture.Play(); 
  audio.Play();

}

function Update () {

} 