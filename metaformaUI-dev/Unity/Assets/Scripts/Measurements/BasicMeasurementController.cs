using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BasicMeasurementController : MonoBehaviour
{

  private CapsuleCollider capsule;
  private BasicMeasurement measurement;

  // Use this for initialization
  virtual protected void Start()
  {
    capsule = GetComponent<CapsuleCollider>();
    measurement = GetComponent<BasicMeasurement>();
  }

  virtual public void SetMeasurement(float percent)
  {
    if (measurement.maxRadius != 0)
    {
      float offset = GetMeasurementOffset(measurement.initialRadius, measurement.maxRadius, percent);
      capsule.radius += offset - measurement.radiusOffsetJourney;
      measurement.radiusOffsetJourney = offset;
    }

    if (measurement.maxHeight != 0)
    {
      float offset = GetMeasurementOffset(measurement.initialHeight, measurement.maxHeight, percent);
      capsule.height += offset - measurement.heightOffsetJourney;
      measurement.heightOffsetJourney = offset;
    }

    if (measurement.maxPos != Vector3.zero)
    {
      Vector3 offset = GetMeasurementOffset(measurement.initialPos, measurement.maxPos, percent);
      transform.position += offset - measurement.posOffsetJourney;
      measurement.posOffsetJourney = offset;
    }
    
  }

  virtual public void Reset()
  {
    capsule.radius = measurement.initialRadius;
    capsule.height = measurement.initialHeight;
    transform.position = measurement.initialPos;
    measurement.Reset();
  }

  protected float GetMeasurementOffset(float min, float max, float percent)
  {
    return Mathf.Lerp(min, max, percent) - min;
  }
  protected Vector3 GetMeasurementOffset(Vector3 min, Vector3 max, float percent)
  {
    return Vector3.Lerp(min, max, percent) - min;
  }



}
