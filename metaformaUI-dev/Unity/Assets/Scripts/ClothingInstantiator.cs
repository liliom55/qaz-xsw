
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ClothingInstantiator : MonoBehaviour
{
  [SerializeField]
  public string baseUrl;

  private void Start()
  {
    Caching.ClearCache();
  }


  public IEnumerator Instantiate(Product product, CapsuleCollider[] colliders)
  {
    string bundleName = product.sku;
    if (product.currentState > 0)
      bundleName += "-layer" + product.currentState;
    string url = baseUrl + bundleName;

    AssetBundleManager.Unload(url, 1, true);
    AssetBundle bundle = AssetBundleManager.getAssetBundle(url, 1);

    if (!bundle)
    {
      yield return StartCoroutine(AssetBundleManager.downloadAssetBundle(url, 1));
      bundle = AssetBundleManager.getAssetBundle(url, 1);
    }

    GameObject complexPrefab = (GameObject)bundle.LoadAsset(bundleName);
    GameObject proxyPrefab = (GameObject)bundle.LoadAsset(bundleName + "-proxy");
    GameObject complex = Instantiate(complexPrefab);
    GameObject proxy = Instantiate(proxyPrefab);
    proxy.GetComponent<Cloth>().capsuleColliders = colliders;
    complex.name = product.sku;
    complex.GetComponent<ComplexClothingController>().proxy = proxy;

    Material[] complexMaterials = complex.GetComponent<MeshRenderer>().materials;
    Material[] proxyMaterials = proxy.GetComponent<SkinnedMeshRenderer>().materials;
    //the shader can not be set beforehand in the assetbundle
    foreach (Material material in complexMaterials)
    {
      material.shader = Shader.Find("Standard (Clip support)");
    }
    foreach (Material material in proxyMaterials)
    {
      material.shader = Shader.Find("Clip All");
    }

    yield return complex;
  }


}
