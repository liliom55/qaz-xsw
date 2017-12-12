using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CanvasController : MonoBehaviour
{

  [SerializeField]
  private Text text;
  [SerializeField]
  private Button equipButton;
  [SerializeField]
  private Button unequipButton;
  [SerializeField]
  private Button setMeasurementsButton;

  [SerializeField]
  private Slider waistSlider;
  [SerializeField]
  private Slider chestSlider;
  [SerializeField]
  private Slider hipSlider;
  [SerializeField]
  private Slider heightSlider;
  [SerializeField]
  private Slider weightSlider;
  [SerializeField]
  private Toggle sexToggle;

  [SerializeField]
  Avatar avatar;
  void Start()
  {
    equipButton.onClick.AddListener(OnEquipButton);
    unequipButton.onClick.AddListener(OnUnequipButton);
    setMeasurementsButton.onClick.AddListener(SetMeasurements);
    sexToggle.onValueChanged.AddListener(delegate { SetSex(); });
  }

  // Update is called once per frame
  void Update()
  {

  }

  private void OnUnequipButton()
  {

    avatar.Unequip(text.text);

  }

  private void SetSex()
  {
    if (sexToggle.isOn)
      avatar.SetSex("female");
    else
      avatar.SetSex("male");
  }

  private void OnEquipButton()
  {
    Product product = new Product();
    product.sku = text.text;
    product.bodyPart = "top";
    product.layer = 0;
    product.hasMultipleStates = true;
    if (text.text.Contains("8405-21-899-00"))
    {
      product.layer = 1;
      product.bodyPart = "bottom";
      product.hasMultipleStates = false;
    }
    else if (text.text.Contains("8405-21-899-02"))
    {
      product.layer = 2;
      product.hasMultipleStates = false;
    }
    else if (text.text == "ada-men-top")
    {
      product.layer = 1;
      product.bodyPart = "top";
      product.hasMultipleStates = false;
    }
    else if (text.text == "ada-men-bottom")
    {
      product.layer = 0;
      product.bodyPart = "bottom";
      product.hasMultipleStates = false;
    }
    else if (text.text == "ada-women-top")
    {
      product.layer = 1;
      product.bodyPart = "top";
      product.hasMultipleStates = false;
    }
    else if (text.text == "ada-women-bottom")
    {
      product.layer = 0;
      product.bodyPart = "bottom";
      product.hasMultipleStates = false;
    }


    StartCoroutine(avatar.Equip(product));
  }

  private void SetMeasurements()
  {
    avatar.Undress();
    SetMeasurement("waist_width", waistSlider);
    SetMeasurement("chest_size", chestSlider);
    SetMeasurement("hip_size", hipSlider);
    SetMeasurement("height", heightSlider);
    SetMeasurement("weight", weightSlider);
  }

  private void SetMeasurement(string name, Slider slider)
  {
    MeasurementViewModel measurement = new MeasurementViewModel();
    measurement.name = name;
    measurement.value = slider.value;
    measurement.max = slider.maxValue;
    measurement.min = slider.minValue;

    avatar.AddMeasurementToQueue(measurement);

  }
}
