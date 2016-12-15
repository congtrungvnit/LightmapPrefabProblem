// Description : Manage Player animation and player movement
#pragma strict

var Speed						: float = 5;												// Player speed				
private var rb					: Rigidbody;
var jumpForce 					: float = 2;												// Jump force
var gravity 					: float = -10;												// Player gravity

var b_Jump						: boolean = true;
private var anim 				: Animator;
private var RunHash				: int = Animator.StringToHash("b_run");						// Refers to Animator Parameters "b_run".
private var JumpHash			: int = Animator.StringToHash("b_Jump");					// Refers to Animator Parameters "b_Jump".
private var JumpingStateHash	: int = Animator.StringToHash("Base.Jum");					// Refers to Animator State Jum

var obj_Player 					: GameObject;
var obj_Pivot_Player 			: GameObject;

private var col					: CapsuleCollider;
private var colCenterY			: float;
private var colHeight			: float;


var b_timer 					: boolean = true;
private var	timer				: float = 0;
var target_Timer 				: float = .15;

var Input_Value					: float;
var smoothInputValue			: float = 1;
var smoothInputValue2			: float = 1;

function Start() {									
	rb = GetComponent.<Rigidbody>();
	anim = obj_Player.GetComponent.<Animator>();
	col = GetComponent.<CapsuleCollider>();
	col.height = colHeight;
	col.center.y = colCenterY;
}

function FixedUpdate () {																				  
	rb.velocity.x = Input_Value* Speed*smoothInputValue*smoothInputValue;		// Move the player rigidbody

	if (b_timer) {											
		rb.velocity.y = jumpForce;												// PLayer jump
		anim.SetBool(JumpHash,true);											// Play an animation
	}
	else{
		rb.velocity.y -= gravity; 												// Apply gravity to the player
	}
}

function Update(){
	Input_Value = Input.GetAxis("Horizontal")*smoothInputValue;					// PLayer move


	if(Input.GetButtonDown("Jump") && b_Jump){									// Player Jump
		b_timer = true;
	}
	else if(Input.GetButtonUp("Jump")){	
		b_timer = false;	
		timer = 0;
	}

	if(b_timer){
		timer = Mathf.MoveTowards(timer,target_Timer,Time.deltaTime);
		if(timer == target_Timer){	b_timer = false;	timer = 0;}
	}

	anim.SetFloat("Runspeed",Input.GetAxis("Horizontal"));						// play an animation when the player is running
	if(Input.GetAxis("Horizontal")>0){											// Change player direction
		obj_Pivot_Player.transform.rotation.eulerAngles.y = 90;
	}
	else if (Input.GetAxis("Horizontal")<0){									// Change player direction
		obj_Pivot_Player.transform.rotation.eulerAngles.y = 270;
	}

	var hit : RaycastHit;
	var distanceToGround : float;												// Check distance to the ground
	if (Physics.Raycast (transform.position, -Vector3.up, hit, 100.0)) {
		distanceToGround = hit.distance;
	}
	 var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);	// know what animation is active
    if(stateInfo.fullPathHash == JumpingStateHash && distanceToGround < .7){	// If the active state is MoveStateHash ("Base.Movement")
		if(!b_timer)b_Jump = true;
		anim.SetBool(JumpHash,false);

		colCenterY = Mathf.MoveTowards(colCenterY,0.28,Time.deltaTime*5);
		colHeight = Mathf.MoveTowards(colHeight, 1.57,Time.deltaTime*5);
	}
	

	if (distanceToGround < .7) {												// if player touch the ground
       	if(!b_timer)b_Jump = true;
		anim.SetBool(JumpHash,false);

		colCenterY = Mathf.MoveTowards(colCenterY,0.28,Time.deltaTime*5);
		colHeight = Mathf.MoveTowards(colHeight, 1.57,Time.deltaTime*5);
    }
    else{																	
    	b_Jump = false;
    	colCenterY = Mathf.MoveTowards(colCenterY,0.58,Time.deltaTime*5);
		colHeight = Mathf.MoveTowards(colHeight, 1.22,Time.deltaTime*5);
    }

	if(Input.GetAxis("Horizontal")!=0){anim.SetBool(RunHash,true);}				
	else {anim.SetBool(RunHash,false);}

	col.height = colHeight;
	col.center.y = colCenterY;
}
