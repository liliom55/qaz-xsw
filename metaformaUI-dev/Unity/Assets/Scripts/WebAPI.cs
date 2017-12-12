using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class WebAPI : MonoBehaviour
{
  [SerializeField]
  private Avatar avatar;

  // Use this for initialization
  void Start()
  {
    Application.ExternalCall("UnityLoader.onWebglReady");
    //prevent webgl from capturing all keys
#if UNITY_WEBGL && !UNITY_EDITOR
         WebGLInput.captureAllKeyboardInput = false;
#endif
  }

  // Update is called once per frame
  void Update()
  {

  }

  public void Equip(string jsonProduct)
  {
    Product product = JsonUtility.FromJson<Product>(jsonProduct);
    StartCoroutine(avatar.Equip(product));
    //you can use the following line to return a value to javascript after it has been set in webglservice (in angular app)
    //Application.ExternalCall("UnityLoader.return");
  }

  public void Unequip(string sku)
  {
    avatar.Unequip(sku);
  }

  public void Undress()
  {
    avatar.Undress();
  }

  public void SetSex(string sex)
  {
    avatar.SetSex(sex);
  }

  public void SetMeasurement(string json)
  {
    MeasurementViewModel measurement = JsonUtility.FromJson<MeasurementViewModel>(json);
    avatar.AddMeasurementToQueue(measurement);
  }
}
