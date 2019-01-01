using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WaypointsManager : MonoBehaviour
{
    public static WaypointsManager wp = null;

    [Header("Scene Waypoints")]
    public List<Transform> waypoints;


    // Start is called before the first frame update
    void Awake()
    {
        wp = this;
    }

    public List<Transform> GetSceneWaypoints()
    {
        return waypoints;
    }
}
