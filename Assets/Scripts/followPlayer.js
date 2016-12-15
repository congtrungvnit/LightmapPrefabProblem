// Description : FollowPlayer.js : Use this script on Camera. 
// The camera follow the player
#pragma strict

@Header ("Target to follow")	
var Target 				: GameObject;						// Connect the player
@Header ("Smooth follow values")	
var smoothTimeX 		: float = .25;							
var smoothTimeY			: float = .5;
@Header ("X Y Z offset")	
var Camera_offset		: Vector3 = Vector3(0,2,-7); 

function FixedUpdate () {
	transform.localPosition = Vector3(
		Mathf.Lerp(transform.localPosition.x, Target.transform.localPosition.x+Camera_offset.x, Time.deltaTime/smoothTimeX),
		Mathf.Lerp(transform.localPosition.y, Target.transform.localPosition.y+Camera_offset.y, Time.deltaTime/smoothTimeY),
		Mathf.Lerp(transform.localPosition.z,Target.transform.localPosition.z+Camera_offset.z, Time.deltaTime/smoothTimeY)
	);
}


function Return_DistanceZ(){
	return Camera_offset.z;
}
function Return_DistanceY(){
	return Camera_offset.y;
}

function DistanceZ(value_Y : float,value_Z : float){
	Camera_offset = Vector3(Camera_offset.x,value_Y,value_Z);
}

