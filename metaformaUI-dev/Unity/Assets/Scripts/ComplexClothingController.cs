using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ComplexClothingController : MonoBehaviour {


  public Product product;
  private Cloth cloth;
  private Vector3[] vertices;
  private Vector3[] normals;

  public GameObject proxy;

  public CapsuleCollider[] colliders;
  // Use this for initialization
  void Start()
  {
    cloth = GetComponent<Cloth>();
    
  }

  // Update is called once per frame
  void Update()
  {
  }

  public void PrepareDestroy()
  {
    Destroy(proxy);
  }

  public void ResetMesh()
  {
    Mesh mesh = GetComponent<MeshFilter>().sharedMesh;
    mesh.colors = ClippingHelper.InitializeColorArray(mesh);
  }


  public void HandleLayeredEffect(GameObject above)
  {
    Mesh mesh = GetComponent<MeshFilter>().sharedMesh;
    mesh.colors = ClippingHelper.HandleLayeredEffect(new Vector3(), mesh.colors, GetComponent<MeshCollider>(), mesh, above, 1);
  }

  public void ProxyHasSettled()
  {
    MeshDeform meshDeform = GetComponent<MeshDeform>();
    Mesh mesh = GetComponent<MeshFilter>().mesh;

    Cloth cloth = proxy.GetComponent<Cloth>();
    mesh.vertices = meshDeform.GetUpdatedMeshVertices(mesh.vertices, cloth.vertices);
    
    //proxy can cause ghosting. it's safer to disable them when unused.
    proxy.SetActive(false);
  }
}
