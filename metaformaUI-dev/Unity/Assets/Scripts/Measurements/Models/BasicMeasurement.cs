using System;
using UnityEngine;

public class BasicMeasurement : MonoBehaviour {
  [NonSerialized]
  public Vector3 initialPos;
  public Vector3 posOffsetJourney;
  [NonSerialized]
  public float initialHeight;
  public float heightOffsetJourney;
  [NonSerialized]
  public float initialRadius;
  public float radiusOffsetJourney;
  [NonSerialized]
  public Vector3 maxPos;

  [SerializeField]
  public Vector3 maxPosOffset;
  [SerializeField]
  public float maxRadius;
  [SerializeField]
  public float maxHeight;

  private void Start()
  {
    CapsuleCollider capsule = GetComponent<CapsuleCollider>();

    initialPos = transform.position;
    maxPos = initialPos + maxPosOffset;
    initialHeight = capsule.height;
    initialRadius = capsule.radius;
  }

  public void Reset()
  {
    posOffsetJourney = new Vector3();
    radiusOffsetJourney = 0;
    heightOffsetJourney = 0;
  }

}
