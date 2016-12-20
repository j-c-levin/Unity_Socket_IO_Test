using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class Connection_Manager : MonoBehaviour
{

    // Use this for initialization
    void Start()
    {
        ConnectToServer();
    }
    public void ConnectToServer()
    {
        Debug.Log("connecting");
        Application.ExternalCall("Logon");
    }

    public void OnRoomJoined()
    {

    }

    public void SpawnPlayer()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }
}
