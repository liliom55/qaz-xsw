using ProgressBar;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LoadingController : MonoBehaviour
{

  [SerializeField]
  private ProgressBarBehaviour progressBar;
  [SerializeField]
  private Text text;
  private static float progress;
  private static string taskDescription;

  // Use this for initialization
  void Start()
  {
    HideLoading();
  }

  // Update is used to display percentage to allow async task to display loadings
  void Update()
  {
    if (progress != 0)
      Set(taskDescription, progress);
    else HideLoading();
  }

  public void SetAsync(string title, float progress)
  {
    SetTextAsync(title);
    SetPercentageAsync(progress);
  }

  private void Set(string title, float progress)
  {
    SetText(title);
    SetPercentage(progress);
  }

  public static void SetTextAsync(string title)
  {
    taskDescription = title;
  }

  private void SetText(string title)
  {
    text.text = title;
  }

  public static void SetPercentageAsync(float progress)
  {
    LoadingController.progress = progress;
  }

  public static void Done()
  {
    progress = 0.0f;
  }

  private void SetPercentage(float progress)
  {
    ShowLoading();
    progressBar.Set(progress);
  }

  private void HideLoading()
  {
    progressBar.gameObject.SetActive(false);
  }

  private void ShowLoading()
  {
    progressBar.gameObject.SetActive(true);
  }
}
