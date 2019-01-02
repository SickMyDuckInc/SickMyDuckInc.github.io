using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraVision : MonoBehaviour
{
    Vector3 playerDirection;
    RaycastHit hit;
    public GameObject camera;

    private void OnTriggerStay(Collider other)
    {
        if (other.gameObject.tag.Equals("Player"))
        {
            //Debug.Log("Player detected");
            playerDirection = other.gameObject.transform.position - camera.transform.position;
            if(Physics.Raycast(camera.transform.position, playerDirection, out hit))
            {
                if (hit.collider.gameObject.tag.Equals("Player"))
                {
                    other.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.blue);
                }
            }
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.gameObject.tag.Equals("Player"))
        {
            //Debug.Log("exit player");
            other.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.white);
        }
    }
}
