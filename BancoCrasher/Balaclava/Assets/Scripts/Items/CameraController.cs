using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour {
    public float leftLimit;
    public float rightLimit;
    public float rotationSpeed = 5;
    public float rangeVision;

    private bool positiveMovement;
    
	// Use this for initialization
	void Start () {
        positiveMovement = true;

        rightLimit = ConvertAngle(rightLimit);
        leftLimit = ConvertAngle(leftLimit);
	}
	
	// Update is called once per frame
	void Update () {
        CameraMovement();
        Detection();

    }

    private void CameraMovement()
    {
        float angle =  ConvertAngle(transform.rotation.eulerAngles.y);
        if(positiveMovement)
        {
            if(angle <= rightLimit)
            {
                transform.Rotate(Vector3.up * (rotationSpeed * Time.deltaTime),Space.World);
            }
            else
            {
                positiveMovement = false;
            }
        }
        else
        {
            if (angle >= leftLimit)
            {
                transform.Rotate(Vector3.up * (-rotationSpeed * Time.deltaTime), Space.World);
            }
            else
            {
                positiveMovement = true;
            }
        }
    }

    private float ConvertAngle(float angle)
    {
        if (angle > 180)
        {
            angle -= 360;
        }
        else if(angle < -180){
            angle += 360;
        }
        return angle;
    }

    private void Detection()
    {
        /*// Bit shift the index of the layer (8) to get a bit mask
        int layerMask = 1 << 9;

        RaycastHit hit;
        // Does the ray intersect any objects excluding the player layer
        if (Physics.Raycast(transform.position, Quaternion.Euler(0, 45, 0) * transform.TransformDirection( Vector3.forward), out hit, rangeVision, layerMask))
        {
            Debug.DrawRay(transform.position, Quaternion.Euler(0, 45, 0) * transform.TransformDirection(Vector3.forward) * hit.distance, Color.yellow);
            Debug.Log("Did Hit");
        }
        else
        {
            Debug.DrawRay(transform.position, Quaternion.Euler(0, 45, 0) * transform.TransformDirection(Vector3.forward) * 1000, Color.white);
            Debug.Log("Did not Hit");
        }*/
        
    }
}

