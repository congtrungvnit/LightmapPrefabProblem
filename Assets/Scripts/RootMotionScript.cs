//Description :  RootMotionScript.cs
// Callback for processing animation movements for modifying root motion.
// This callback will be invoked at each frame after the state machines and the animations have been evaluated, but before OnAnimatorIK.
// https://docs.unity3d.com/ScriptReference/MonoBehaviour.OnAnimatorMove.html
using UnityEngine;
using System.Collections;

[RequireComponent(typeof(Animator))]

public class RootMotionScript : MonoBehaviour {

	public Transform Player;

	void OnAnimatorMove()
	{
		Animator animator = GetComponent<Animator>(); 

		if (animator)
		{
			Vector3 newPosition = Player.position;
			newPosition.x += animator.GetFloat("Runspeed") * Time.deltaTime; 
			transform.position = newPosition;
		}
	}
}