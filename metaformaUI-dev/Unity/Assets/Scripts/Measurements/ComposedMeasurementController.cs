using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ComposedMeasurementController : BasicMeasurementController {

  [SerializeField]
  private string measurementType;
  [SerializeField]
  private BasicMeasurementController[] childs;

  override protected void Start()
  {

  }

  public override void SetMeasurement(float percent)
  {
    Type type = Type.GetType(measurementType);

    foreach (BasicMeasurementController child in childs)
    {
      BasicMeasurement measurement = (BasicMeasurement)child.GetComponent(type);
      child.SetMeasurement(percent);
    }
  }

  public override void Reset()
  {
    Type type = Type.GetType(measurementType);

    foreach (BasicMeasurementController child in childs)
    {
      BasicMeasurement measurement = (BasicMeasurement)child.GetComponent(type);
      child.Reset();
    }
  }
}
