using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;



public class Inventory : MonoBehaviour
{

  [SerializeField]
  private CapsuleCollider[] upperColliders;
  [SerializeField]
  private CapsuleCollider[] lowerColliders;

  private ClothingInstantiator clothingInstantiator;
  public List<GameObject> equipped;

  [SerializeField]
  private float offsetPerLayer;
  [SerializeField]
  private float forceToHoldPants;
  
  [SerializeField]
  private GameObject proxyPrefab;
  [SerializeField]
  private GameObject complexPrefab;

  // Use this for initialization
  void Start()
  {
    equipped = new List<GameObject>();
    clothingInstantiator = GetComponent<ClothingInstantiator>();
  }

  // Update is called once per frame
  void Update()
  {
  }

  public void Undress()
  {
    List<Product> products = equipped.Select((obj => obj.GetComponent<ComplexClothingController>().product)).ToList();
    foreach (Product product in products)
    {
      Unequip(product.sku);
    }
  }

  public IEnumerator Equip(Product product)
  {
    CapsuleCollider[] colliders = ResolveColliders(product.layer, product.bodyPart);

    if (product.hasMultipleStates)
    {
      int highestLayer = FindHighestLayerProductAbove(product, equipped.Select(el => el.GetComponent<ComplexClothingController>().product).ToArray());
      if (highestLayer > 0)
        product.currentState = highestLayer;
    }

    CoroutineWithData cd = new CoroutineWithData(this, clothingInstantiator.Instantiate(product, colliders));
    yield return cd.coroutine;
    GameObject complex = (GameObject)cd.result;
    equipped.Add(complex);
    GameObject proxy = complex.GetComponent<ComplexClothingController>().proxy;

    if (product.bodyPart == "bottom")
    {
      Cloth cloth = proxy.GetComponent<Cloth>();
      cloth.externalAcceleration = new Vector3(0.0f, forceToHoldPants, 0.0f);
    }

    ComplexClothingController complexClothingController = complex.GetComponent<ComplexClothingController>();
    complexClothingController.product = product;
    complexClothingController.colliders = colliders;

    yield return complex;
  }

  public void SetInventoryVisibility(bool visible)
  {
    foreach (GameObject clothing in equipped)
      clothing.SetActive(visible);
  }

  public void Unequip(string sku)
  {
    GameObject clothing = equipped.Find(x => x.GetComponent<ComplexClothingController>().product.sku.Contains(sku));
    DeleteClothing(clothing);

  }

  public void DeleteClothing(GameObject clothing)
  {
    equipped.Remove(clothing);
    ComplexClothingController complexClothingController = clothing.GetComponent<ComplexClothingController>();
    complexClothingController.PrepareDestroy();
    Destroy(clothing);
  }

  private CapsuleCollider[] ResolveColliders(int layer, string bodyPart)
  {
    CapsuleCollider[] colliders = null;
    if (bodyPart == "top")
      colliders = upperColliders;
    else if (bodyPart == "bottom")
      colliders = lowerColliders;

    CapsuleCollider[] collidersBasedOnLayer = new CapsuleCollider[colliders.Length];
    for (int i = 0; i < colliders.Length; i++)
    {
      CapsuleCollider collider = colliders[i].GetComponent<CapsuleCollider>();
      collider.radius = collider.radius + (offsetPerLayer * layer);
      collidersBasedOnLayer[i] = collider;
    }
    return collidersBasedOnLayer;
  }


  public void HandleLayeredEffect()
  {

    Product[] products = equipped.Select((obj => obj.GetComponent<ComplexClothingController>().product)).ToArray();
    foreach (GameObject clothing in equipped)
    {
      Product current = clothing.GetComponent<ComplexClothingController>().product;
      clothing.GetComponent<ComplexClothingController>().ResetMesh();

      Product[] productsAbove = FindProductsAbove(products, current);
      foreach (Product above in productsAbove)
      {
        GameObject go = equipped.Where((obj => obj.GetComponent<ComplexClothingController>().product.sku == above.sku)).First();
        clothing.GetComponent<ComplexClothingController>().HandleLayeredEffect(go);
      }
    }
  }

  private Product[] FindProductsAbove(Product[] products, Product current)
  {
    products = products.Where((product => product.layer > current.layer)).ToArray();
    return products;
  }

  public int FindHighestLayerProductAbove(Product current, Product[] products)
  {
    int highestLayer = 0;
    Product highestLayerProduct = products.Where(el => el.layer > current.layer).OrderBy(el => el.layer).LastOrDefault();
    if (highestLayerProduct != null)
      highestLayer = highestLayerProduct.layer;
    return highestLayer;
  }

}
