using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WeightMeasurement : MonoBehaviour
{
  [System.NonSerialized]
  public float initialRadius;
  public float radiusOffsetJourney;
  // Use this for initialization
  void Start()
  {
    initialRadius = GetComponent<CapsuleCollider>().radius;
  }

  // Update is called once per frame
  void Update()
  {

  }

  public void Reset()
  {
    radiusOffsetJourney = 0;
  }
}
