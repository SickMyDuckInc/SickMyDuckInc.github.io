using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class MenuManager : MonoBehaviour {
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

    public void StartScreen()
    {
        SceneManager.LoadScene("MainGame");
    }

    public void ConfigScreen()
    {
        SceneManager.LoadScene("Configuration");
    }

    public void CreditsScreen()
    {
        SceneManager.LoadScene("Credits");
    }
}
