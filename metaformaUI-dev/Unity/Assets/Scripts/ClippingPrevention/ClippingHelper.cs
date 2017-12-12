using System.Linq;
using UnityEngine;

public class ClippingHelper
{

  private static float distanceWithNoClipping = 0.02f;
  private static float maximumRaycastDistance = 0.4f;
  public static Color[] InitializeColorArray(Mesh mesh)
  {
    Color[] colors = new Color[mesh.vertexCount];
    for (int i = 0; i < colors.Length; i++)
    {
      colors[i] = new Color32(0, 0, 0, 255);
    }
    return colors;
  }

  public static Color[] HandleLayeredEffect(Vector3 position, Color[] colors, MeshCollider mcUnderneath, Mesh underneath, GameObject above, int bufferIterations)
  {
    int layer_mask = LayerMask.GetMask("Clothing");

    mcUnderneath.sharedMesh = underneath;
    mcUnderneath.enabled = true;
    MeshCollider mcAbove = above.GetComponent<MeshCollider>();
    mcAbove.sharedMesh = above.GetComponent<MeshFilter>().sharedMesh;
    mcAbove.enabled = true;

    Vector3[] vertices = underneath.vertices;
    Vector3[] normals = underneath.normals;

    for (int i = 0; i < vertices.Length; i++)
    {
      Vector3 origin = vertices[i] + position;
      Vector3 towards = normals[i];
      Ray ray = new Ray(origin, towards);

      ray.origin = ray.GetPoint(distanceWithNoClipping);
      ray.direction = -ray.direction;

      RaycastHit[] allHits = Physics.RaycastAll(ray, maximumRaycastDistance);
      if (VertexIsClipping(allHits, above.name))
        colors[i] = new Color32(0, 0, 0, 0);
    }
    //addopqauebuffer is broken
    //for (int i = 0; i < bufferIterations; i++)
    //colors = AddOpaqueBuffer(baseMesh);

    mcUnderneath.enabled = false;
    mcAbove.enabled = false;
    return colors;
  }

  private static bool VertexIsClipping(RaycastHit[] allHits, string above)
  {
    RaycastHit aboveHit = allHits.Where(r => r.transform.name.Equals(above)).FirstOrDefault();
    
    return ((distanceWithNoClipping - aboveHit.distance) < distanceWithNoClipping);
  }

  //Without adding a buffer around the tranparent vertices, some vertices that are supposed to be opaque are transparent.
  private static Color[] AddOpaqueBuffer(Mesh mesh)
  {
    Color[] colors = mesh.colors;
    Color[] originalColors = mesh.colors;
    int[] triangles = mesh.triangles;
    int[] triangle = new int[3];
    for (int i = 0; i < triangles.Length; i = i + 3)
    {
      triangle[0] = triangles[i];
      triangle[1] = triangles[i + 1];
      triangle[2] = triangles[i + 2];
      colors = SetBufferIfNecessary(originalColors, colors, triangle);
    }
    return colors;
  }

  private static Color[] SetBufferIfNecessary(Color[] originalColors, Color[] colors, int[] triangle)
  {
    for (int i = 0; i < triangle.Length; i++)
    {
      //if triangle is not all transparent then make it all opaque.
      if (TriangleContainsOpaque(originalColors, triangle, i))
        colors[triangle[i]].a = 255;
    }
    return colors;
  }

  private static bool TriangleContainsOpaque(Color[] colors, int[] triangle, int current)
  {
    for (int i = 0; i < triangle.Length; i++)
    {
      if (i != current && colors[triangle[i]].a != 0)
        return true;
    }
    return false;
  }

}
