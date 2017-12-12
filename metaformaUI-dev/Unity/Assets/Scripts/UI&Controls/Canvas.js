#pragma strict
/*
  @SerializeField
  private var text: text;
  @SerializeField
  private var equipButton: Button;
  @SerializeField
  private var unequipButton: Button;
  @SerializeField
  private var setMeasurementsButton: Button;

  @SerializeField
  private var waistSlider: Slider;
  @SerializeField
  private var chestSlider: Slider;
  @SerializeField
  private var hipSlider: Slider;
  @SerializeField
  private var heightSlider: Slider;
  @SerializeField
  private var weightSlider: Slider;
  @SerializeField
  private var sexToggle: Toiggle;
  @SerializeField
  var inventory: Inventory;

  @SerializeField
  var avatar: Avatar;
  function Start()
  {
    equipButton.onClick.AddListener(OnEquipButton);
    unequipButton.onClick.AddListener(OnUnequipButton);
    setMeasurementsButton.onClick.AddListener(SetMeasurements);
    sexToggle.onValueChanged.AddListener(delegate { SetSex(); });
  }

  // Update is called once per frame
  function Update()
  {

  }

  function OnUnequipButton()
  {

    inventory.Unequip(text.text);

  }

  function SetSex()
  {
    if (sexToggle.isOn)
      avatar.SetSex("female");
    else
      avatar.SetSex("male");
  }

  function OnEquipButton()
  {
    product.sku = text.text;
    
    StartCoroutine(inventory.Equip(product));
  }

  function SetMeasurements()
  {
    inventory.Undress();
    SetMeasurement("waist_width", waistSlider);
    SetMeasurement("chest_size", chestSlider);
    SetMeasurement("hip_size", hipSlider);
    SetMeasurement("height", heightSlider);
    SetMeasurement("weight", weightSlider);
  }

  function SetMeasurement(string name, Slider slider)
  {
    MeasurementViewModel measurement = new MeasurementViewModel();
    measurement.name = name;
    measurement.value = slider.value;
    measurement.max = slider.maxValue;
    measurement.min = slider.minValue;

    avatar.AddMeasurementToQueue(measurement);

  }
  */