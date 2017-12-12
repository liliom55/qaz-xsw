using ProgressBar;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class TimeController : MonoBehaviour
{
  public static int loadingTreshold = 200;
  public static int asyncMeasurementThreshold = loadingTreshold / 2;
  // Use this for initialization
  void Start()
  {
  }

  // Update is called once per frame
  void Update()
  {
    if (Input.GetKeyDown("space"))
      if (Time.timeScale == 0) UnfreezeTime();
      else FreezeTime();
  }

  public static IEnumerator LetClothSettle()
  {
    UnfreezeTime();
    LoadingController.SetTextAsync("Applying your clothing selection..");
    for (int i = 0; i < loadingTreshold; i++)
    {
      float percentProgress = (float)i / loadingTreshold;
      LoadingController.SetPercentageAsync(percentProgress * 100);
      yield return null;
    }
    LoadingController.Done();
    FreezeTime();
  }

  private static void FreezeTime()
  {
    Time.timeScale = 0;
  }

  private static void UnfreezeTime()
  {
    Time.timeScale = 1;
  }
}
