using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class EnemyVision : MonoBehaviour
{
    private NavMeshAgent agent;
    [HideInInspector]
    public NavMeshObstacle obstacle;
    //my position
    private Transform enemyPosition;

    Vector3 playerDirection;
    RaycastHit hit;

    [HideInInspector]
    public bool enabledObstacle;
    //min distance to enable obstacle navmesh and avoid collision between enemies
    private float minDistance = 10f;
    //player visible
    private bool isPlayerVisible;

    private void Start()
    {
        agent = GetComponentInParent<NavMeshAgent>();
        obstacle = GetComponentInParent<NavMeshObstacle>();
        obstacle.enabled = false;
        enabledObstacle = false;
        enemyPosition = transform.parent;
        isPlayerVisible = false;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag.Equals("Player") && !enabledObstacle)
        {
            Debug.Log("Player detected");
            playerDirection = other.gameObject.transform.position - enemyPosition.position;
            if (Physics.Raycast(enemyPosition.position, playerDirection, out hit))
            {
                if (hit.collider.gameObject.tag.Equals("Player"))
                {
                    other.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.blue);
                    isPlayerVisible = true;
                }
            }
            else
            {
                if(!isPlayerVisible)
                    isPlayerVisible = false;
            }
        }
    }

    private void OnTriggerStay(Collider other)
    {
        /*
         enable obstacle to avoid other enemies collision and later enable agent again 
         */
        if (other.gameObject.tag.Equals("Enemy"))
        {
            if(Vector3.Distance(enemyPosition.position, other.gameObject.transform.position) < minDistance)
            {
                if (!other.gameObject.GetComponentInChildren<EnemyVision>().enabledObstacle && !enabledObstacle)
                {
                    Debug.Log(gameObject.name + " :obstacle enabled");
                    agent.isStopped = true;
                    obstacle.enabled = true;
                    obstacle.carveOnlyStationary = true;
                    enabledObstacle = true;
                }

            }
        }

        if (other.gameObject.tag.Equals("Player") && !enabledObstacle)
        {
            //Debug.Log("Player detected");
            playerDirection = other.gameObject.transform.position - enemyPosition.position;
            if (Physics.Raycast(enemyPosition.position, playerDirection, out hit))
            {
                if (hit.collider.gameObject.tag.Equals("Player"))
                {
                    other.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.blue);
                    isPlayerVisible = true;
                }
                else
                {
                    if (!isPlayerVisible)
                        isPlayerVisible = false;
                }
            }
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.gameObject.tag.Equals("Enemy"))
        {
            if (enabledObstacle)
            {
                Debug.Log(gameObject.name + " :obstacle Disabled");
                obstacle.carveOnlyStationary = false;
                obstacle.enabled = false;
                agent.isStopped = false;
                enabledObstacle = false;
            }           
        }

        if (other.gameObject.tag.Equals("Player"))
        {
            //Debug.Log("exit player");
            other.gameObject.GetComponent<Renderer>().material.SetColor("_Color", Color.white);
        }
    }
  
}
