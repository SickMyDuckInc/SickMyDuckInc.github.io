using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class EnemyController : MonoBehaviour
{
    [Header("Agents priority from 1 to max enemies")]
    public int ENEMY_PRIORITY = 1;

    private Transform target;
    private int waypointIndex = 0;

    private List<Transform> waypoints;

    public NavMeshAgent agent;

    void Start()
    {
        waypoints = new List<Transform>(WaypointsManager.wp.waypoints.Count);
        waypoints = WaypointsManager.wp.GetSceneWaypoints();
        waypointIndex = Random.Range(0 , waypoints.Count);
        target = waypoints[waypointIndex];
        agent.autoRepath = true;
        agent.SetDestination(target.position);
        
        //Debug.Log(gameObject.name + " , initial waypoint = " + waypointIndex);
    }


    void FixedUpdate()
    {
        Debug.DrawRay(this.transform.position, this.transform.forward*10, Color.red);

        if (!agent.pathPending)
        {
            if (agent.remainingDistance <= agent.stoppingDistance)
            {
                if (!agent.hasPath || agent.velocity.sqrMagnitude == 0f)
                {
                    GetNextWaypoint();
                }
            }
        }
    }

    void GetNextWaypoint()
    {
        waypointIndex = Random.Range(0, waypoints.Count);

        target = waypoints[waypointIndex];
        agent.SetDestination(target.position);
    }

}
