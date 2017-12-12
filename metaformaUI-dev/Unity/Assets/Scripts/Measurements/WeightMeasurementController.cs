using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WeightMeasurementController : BasicMeasurementController {

  private float minRadiusOffset = 0;
  [SerializeField]
  private float maxRadiusOffset;

  [SerializeField]
  private WeightMeasurement[] childs;

  override protected void Start()
  {
    
  }

  public override void SetMeasurement(float percent)
  {
    foreach (WeightMeasurement child in childs)
    {
      if (maxRadiusOffset != 0)
      {
        float offset = GetMeasurementOffset(minRadiusOffset, maxRadiusOffset, percent);
        child.GetComponent<CapsuleCollider>().radius += offset - child.radiusOffsetJourney;
        child.radiusOffsetJourney = offset;
      }
    }
  }

  public override void Reset()
  {
    foreach (WeightMeasurement child in childs)
    {
      child.GetComponent<CapsuleCollider>().radius = child.initialRadius;
      child.Reset();
    }
  }
}
