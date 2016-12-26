using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class Connection_Manager : MonoBehaviour
{
    public GameObject player_prefab;
    private GameObject my_player;
    private Dictionary<int, GameObject> other_players;
    private int player_id = 0;

    // Use this for initialization
    void Start()
    {
        other_players = new Dictionary<int, GameObject>();
        ConnectToServer();
    }
    public void ConnectToServer()
    {
        Debug.Log("connecting");
        Application.ExternalCall("Logon");
    }

    public void OnRoomJoined(int playerId)
    {
        Debug.Log("room joined, my id is: " + player_id);
        player_id = playerId;
    }

    public void SpawnPlayer(int id)
    {
        Debug.Log("New Player to spawn..." + id);
          GameObject new_player = GameObject.Instantiate(player_prefab, Vector3.zero, Quaternion.identity);

          if (id == player_id) {
              Debug.Log("...and it's mine!");
              my_player = new_player;
          } else {
              other_players.Add(id, new_player);
          }
    }
}
