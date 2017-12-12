using UnityEngine;
using UnityEditor;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System;

[InitializeOnLoad]
public class CreateAssetBundles : MonoBehaviour
{

  private static string unityRootFolder;
  private static string assetBundleFolder;
  private static string clo3dFolder;
  private static string clo3dGeneratedMaterialsFolder;
  private static string textureFolder;
  private static List<string> myFilePaths;
  private static GameObject complexPrefab;
  private static GameObject proxyPrefab;

  static CreateAssetBundles()
  {
    EditorApplication.projectWindowChanged += BuildAllAssetBundles;
    unityRootFolder = Directory.GetCurrentDirectory() + "\\";
    assetBundleFolder = "Assets\\Editor\\AssetBundles\\";
    clo3dFolder = "Assets\\Editor\\Clo3d\\";
    textureFolder = "Assets\\Editor\\Textures\\";
    clo3dGeneratedMaterialsFolder = "Assets\\Editor\\Clo3d\\Materials\\";

    myFilePaths = GetObjsInfolder(unityRootFolder + clo3dFolder);
    complexPrefab = AssetDatabase.LoadAssetAtPath("Assets\\Prefabs\\complex.prefab", typeof(GameObject)) as GameObject;
    proxyPrefab = AssetDatabase.LoadAssetAtPath("Assets\\Prefabs\\proxy.prefab", typeof(GameObject)) as GameObject;
  }

  [MenuItem("Assets/Build AssetBundles")]
  static void BuildAllAssetBundles()
  {

    List<string> filePaths = GetObjsInfolder(unityRootFolder + clo3dFolder);
    bool filesDidNotChange = myFilePaths.SequenceEqual(filePaths);

    if (!filesDidNotChange)
    {
      myFilePaths = filePaths;
      foreach (string filePath in filePaths)
      {
        string file = Path.GetFileName(filePath);
        string bundleName = Path.GetFileNameWithoutExtension(filePath);
        Mesh complexMesh = AssetDatabase.LoadAssetAtPath(clo3dFolder + file, typeof(Mesh)) as Mesh;
        Mesh proxyMesh = AssetDatabase.LoadAssetAtPath(clo3dFolder + bundleName + "-proxy.obj", typeof(Mesh)) as Mesh;

        GameObject complex = CreateComplexPrefab(bundleName, complexMesh, complexPrefab);
        GameObject proxy = CreateProxyPrefab(bundleName, proxyMesh, proxyPrefab);
        MapToProxy(complex, proxy);

        string[] targetPaths = SaveInstantiatedToPrefabs(new GameObject[] { complex, proxy });
        SaveAssetBundle(targetPaths, bundleName);
        ClearGeneratedPrefabs(targetPaths);
      }
    }
  }

  static void MapToProxy(GameObject complex, GameObject proxy)
  {
    ComplexClothingController complexClothingController = complex.GetComponent<ComplexClothingController>();
    complexClothingController.proxy = proxy;

    MeshDeform meshDeform = complex.GetComponent<MeshDeform>();
    Mesh mesh = complex.GetComponent<MeshFilter>().sharedMesh;
    ProxyVertices[] proxyVertices = VertexMapper.MapToProxyVertices(mesh, proxy.GetComponent<Cloth>());
    meshDeform.myProxyVertices = proxyVertices;
  }

  static GameObject CreateComplexPrefab(string bundleName, Mesh mesh, GameObject complexPrefab)
  {
    GameObject complexClone = Instantiate(complexPrefab);
    //initializing the color is necessary to use clip() in the shader
    mesh.colors = ClippingHelper.InitializeColorArray(mesh);

    Material[] materials = GetMaterials(bundleName);
    MeshRenderer mr = complexClone.GetComponent<MeshRenderer>();
    mr.materials = materials;
    MeshFilter mf = complexClone.GetComponent<MeshFilter>();
    mf.mesh = mesh;
    complexClone.GetComponent<MeshCollider>().sharedMesh = mf.sharedMesh;
    //CreatePrefab function needs frontslash
    complexClone.name = bundleName;
    return complexClone;
  }

  static GameObject CreateProxyPrefab(string bundleName, Mesh mesh, GameObject proxyPrefab)
  {
    GameObject proxyClone = Instantiate(proxyPrefab);
    SkinnedMeshRenderer smr = proxyClone.GetComponent<SkinnedMeshRenderer>();
    smr.sharedMesh = mesh;
    proxyClone.name = bundleName + "-proxy";
    return proxyClone;
  }

  static string[] SaveInstantiatedToPrefabs(GameObject[] instantiated)
  {
    List<string> filePaths = new List<string>();
    foreach (GameObject obj in instantiated)
    {
      string clonePath = "Assets/Editor/" + obj.name + ".prefab";
      PrefabUtility.CreatePrefab(clonePath, obj);
      DestroyImmediate(obj);
      filePaths.Add(clonePath);
    }

    return filePaths.ToArray();
  }

  static void SaveAssetBundle(string[] targetPaths, string bundleName)
  {
    AssetBundleBuild[] build = new AssetBundleBuild[1];
    build[0] = new AssetBundleBuild();
    build[0].assetBundleName = bundleName;
    build[0].assetNames = targetPaths;
    BuildPipeline.BuildAssetBundles(assetBundleFolder, build, BuildAssetBundleOptions.None, BuildTarget.WebGL);
  }

  static List<string> GetObjsInfolder(string path)
  {
    List<string> files = Directory.GetFiles(path).ToList();
    List<string> prefabFiles = files.Where(file => file.Contains("obj") && !file.Contains(".meta") && !file.Contains("proxy")).ToList();
    return prefabFiles;
  }

  static Material[] GetMaterials(string bundleName)
  {
    string[] materialFiles = ReadMaterialNamesFromMtl(unityRootFolder + clo3dFolder + bundleName + ".mtl");
    Material[] materials = materialFiles.Select(filePath =>
    {
      //if the name of the material in the mtl file is 'Default fabric_3448'
      //It will be looking for a file 'Default fabric_3448.mat' but Unity only uses the first word to convert mtl to mat.
      //The name we need to be looking for is Default.mat
      string[] words = filePath.Split(' ');
      if (words.Length > 1)
        filePath = words[0] + ".mat";
      string materialName = Path.GetFileName(filePath);
      Material material = AssetDatabase.LoadAssetAtPath(clo3dGeneratedMaterialsFolder + materialName, typeof(Material)) as Material;
      material.shader = Shader.Find("Standard (Clip support)");
      Texture cottonTex = AssetDatabase.LoadAssetAtPath(textureFolder + "cotton.jpg", typeof(Texture)) as Texture;
      material.mainTexture = cottonTex;
      material.mainTextureScale = new Vector2(0.001f, 0.005f);
      material.SetFloat("_Glossiness", 0.0f);
      return material;
    }).ToArray();
    return materials;
  }

  static void ClearGeneratedPrefabs(string[] targetPaths)
  {
    foreach (string path in targetPaths)
      AssetDatabase.DeleteAsset(path);
  }

  static string[] ReadMaterialNamesFromMtl(string path)
  {
    Material[] materials = OBJLoader.LoadMTLFile(path);
    string[] materialNames = materials.Select(material => material.name + ".mat").ToArray();
    return materialNames;
  }

  

}
