using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HeightMeasurementController : BasicMeasurementController {

  [SerializeField]
  private HeightMeasurement[] childs;

  private float minHeightOffset = 0;
  [SerializeField]
  private float maxHeightOffset;

  override protected void Start()
  {

  }

  public override void SetMeasurement(float percent)
  {
    //StartCoroutine(SetMeasurementAsync(percent));
    foreach (HeightMeasurement child in childs)
    {
      if (maxHeightOffset != 0)
      {
        Vector3 offset = GetMeasurementOffset(new Vector3(0, minHeightOffset, 0), new Vector3(0, maxHeightOffset, 0), percent);
        child.transform.position += offset - child.heightOffsetJourney;
        child.heightOffsetJourney = offset;
      }
    }
  }
  /*
  private IEnumerator SetMeasurementAsync(float percent)
  {
    foreach (HeightMeasurement child in childs)
    {
      child.posBeforeHeight = child.transform.position;
      child.heightPosJourney = child.transform.position;
    }

    for (int i = 0; i < TimeController.asyncMeasurementThreshold; i++)
    {
      foreach (HeightMeasurement child in childs)
      {
        if (maxHeightOffset != 0)
        {
          float offset = GetMeasurementOffset(minHeightOffset, maxHeightOffset, percent);
          float progress = (float)i / TimeController.asyncMeasurementThreshold;
          Vector3 goal = child.posBeforeHeight + new Vector3(0, offset, 0);
          Vector3 newHeightPos = Vector3.Lerp(child.posBeforeHeight, goal, progress);
          
          child.transform.position += newHeightPos - child.heightPosJourney;
          child.heightPosJourney = newHeightPos;
        }
      }
      yield return new WaitForFixedUpdate();
    }
  }
  */
  public override void Reset()
  {
    foreach (HeightMeasurement child in childs)
    {
      child.transform.position = child.initialPos;
      child.Reset();
    }
  }

}
