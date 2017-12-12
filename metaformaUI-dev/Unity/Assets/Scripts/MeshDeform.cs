using UnityEngine;

public class MeshDeform : MonoBehaviour
{
  
  public ProxyVertices[] myProxyVertices;
  

  public Vector3[] GetUpdatedMeshVertices(Vector3[] vertices, Vector3[] proxyVertices)
  {
    for (int i = 0; i < vertices.Length; i++)
    {

      Vector3 offset = ComputeAverageOffset(myProxyVertices[i], proxyVertices);
      vertices[i] -= offset;
    }

    return vertices;
  }

  private Vector3 ComputeAverageOffset(ProxyVertices proxyV, Vector3[] clothVertices)
  {
    Vector3 avg = new Vector3();
    for (int i = 0; i < proxyV.vertices.Count; i++)
    {
      Vector3 offset = proxyV.vertices[i].pos - clothVertices[proxyV.vertices[i].index];
      avg += offset * proxyV.vertices[i].weight;
      proxyV.vertices[i].pos = clothVertices[proxyV.vertices[i].index];
    }
    return avg;
  }


  
}