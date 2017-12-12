using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HeightMeasurement : MonoBehaviour {

  [System.NonSerialized]
  public Vector3 initialPos;
  public Vector3 heightOffsetJourney;
	// Use this for initialization
	void Start () {
    initialPos = transform.position;
    }
	
	// Update is called once per frame
	void Update () {
		
	}

  public void Reset()
  {
    heightOffsetJourney = new Vector3();
  }
}
