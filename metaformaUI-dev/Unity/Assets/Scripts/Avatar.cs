using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class Avatar : MonoBehaviour
{
  [SerializeField]
  private Vector3 womenBreastPos;
  private Vector3 menBreastPos;
  [SerializeField]
  private float womenBreastRadius;
  private float menBreastRadius;
  [SerializeField]
  private CapsuleCollider breast;
  [SerializeField]
  private SkinnedMeshRenderer skin;
  private Mesh renderedMesh;
  private Inventory inventory;

  private List<MeasurementViewModel> measurementsQueue = new List<MeasurementViewModel>();

  public static Dictionary<string, int> shapekeys = new Dictionary<string, int>()
  {
    {"chest_size", 0 },
    {"waist_width", 1 },
    {"neck_size", 2 },
    {"hip_size", 3 },
    {"sleeve_length", 4 },
    {"weight", 6 },
    {"women", 7 },
    {"height", 5 }
  };

  private string sex;
  // Use this for initialization
  void Start()
  {
    inventory = GetComponent<Inventory>();
    renderedMesh = new Mesh();
    skin.BakeMesh(renderedMesh);
    menBreastPos = breast.transform.position;
    menBreastRadius = breast.radius;
    ResetMesh();
    SetSex("male");
  }

  // Update is called once per frame
  void Update()
  {

  }

  private void ResetMesh()
  {
    skin.sharedMesh.colors = ClippingHelper.InitializeColorArray(skin.sharedMesh);
  }


  public void SetSex(string sex)
  {
    this.sex = sex;
    MeasurementViewModel measurementVM = new MeasurementViewModel();
    measurementVM.min = 0;
    measurementVM.max = 100;
    measurementVM.name = "women";
    if (sex == "female")
    {
      measurementVM.value = 100;
    }
    else if (sex == "male")
    {
      measurementVM.value = 0;
    }
    AddMeasurementToQueue(measurementVM);
  }

  public void AddMeasurementToQueue(MeasurementViewModel measurement)
  {
    int index = measurementsQueue.FindIndex(el => el.name == measurement.name);
    if (index != -1)
      measurementsQueue[index] = measurement;
    else
      measurementsQueue.Add(measurement);

    float percentageSet = ToPercentage(measurement) * 100;
    SetBlendShape(measurement.name, percentageSet);
  }

  public void ResetColliders()
  {
    foreach (KeyValuePair<string, int> entry in shapekeys)
    {
      string name = entry.Key;
      GameObject colliderGO = GameObject.Find(name);
      if (!colliderGO) continue;
      else
      {
        BasicMeasurementController measurementController = colliderGO.GetComponent<BasicMeasurementController>();
        measurementController.Reset();
      }
    }
  }

  public IEnumerator ApplyMeasurementsQueueAsync()
  {
    for (int i = 0; i < TimeController.asyncMeasurementThreshold; i++)
    {
      foreach (MeasurementViewModel measurement in measurementsQueue)
      {
        float target = ToPercentage(measurement);
        float progress = Mathf.Lerp(0, target, (float)i / TimeController.asyncMeasurementThreshold);
        GameObject colliderGO = GameObject.Find(measurement.name);
        if (!colliderGO) continue;
        else
        {
          BasicMeasurementController measurementController = colliderGO.GetComponent<BasicMeasurementController>();
          measurementController.SetMeasurement(progress);
        }
      }
      yield return new WaitForFixedUpdate();
    }
  }

  protected float ToPercentage(MeasurementViewModel measurementViewModel)
  {
    float relativeMax = measurementViewModel.max - measurementViewModel.min;
    float relativeValue = measurementViewModel.value - measurementViewModel.min;
    float percentage = relativeValue / relativeMax;

    return percentage;
  }

  private void SetBlendShape(string name, float percentage)
  {
    skin.SetBlendShapeWeight(Avatar.shapekeys[name], percentage);
    //the renderedMesh stores the mesh after a blendshape has been applied
    skin.BakeMesh(renderedMesh);
  }

  public void HandleLayeredEffect(List<GameObject> aboves)
  {
    ResetMesh();
    foreach (GameObject above in aboves)
    {
      //when using fbx it's important to pass the position as fbx does not support transforms
      skin.sharedMesh.colors = ClippingHelper.HandleLayeredEffect(skin.transform.position, skin.sharedMesh.colors, skin.GetComponent<MeshCollider>(), renderedMesh, above, 1);
    }
  }

  public IEnumerator Equip(Product product)
  {
    ResetColliders();

    CoroutineWithData cd = new CoroutineWithData(this, inventory.Equip(product));
    yield return cd.coroutine;
    GameObject complex = (GameObject)cd.result;

    //disabling inventory visibility allows the processes to concentrate on physics only which makes it faster
    inventory.SetInventoryVisibility(false);

    Coroutine co = StartCoroutine(TimeController.LetClothSettle());
    StartCoroutine(ApplyMeasurementsQueueAsync());

    yield return co;
    inventory.SetInventoryVisibility(true);
    ComplexClothingController complexClothingController = complex.GetComponent<ComplexClothingController>();
    complexClothingController.ProxyHasSettled();

    HandleClothingWithMultipleStates();
    HandleLayeredEffect(inventory.equipped);
    inventory.HandleLayeredEffect();
  }

  public void Unequip(string sku)
  {
    inventory.Unequip(sku);

    HandleClothingWithMultipleStates();

    HandleLayeredEffect(inventory.equipped);
    inventory.HandleLayeredEffect();
  }

  public void Undress()
  {
    inventory.Undress();
  }



  public void HandleClothingWithMultipleStates()
  {
    List<GameObject> equippedClone = inventory.equipped.Select(el => el).ToList();
    Product[] products = inventory.equipped.Select(el => el.GetComponent<ComplexClothingController>().product).ToArray();
    foreach (GameObject clothing in equippedClone)
    {
      Product product = clothing.GetComponent<ComplexClothingController>().product;
      //if product has multiple states, delete it and load it again from server with the correct state
      if (product.hasMultipleStates && inventory.FindHighestLayerProductAbove(product, products) != product.currentState)
      {
        inventory.DeleteClothing(clothing);
        StartCoroutine(Equip(product));
      }

    }
  }
}
