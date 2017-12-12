using System.Collections.Generic;
using UnityEngine;

//Using this class is a hack to serialize 2d arrays
[System.Serializable]
public class ProxyVertices
{
  public List<ProxyVertex> vertices;

  public ProxyVertices(List<ProxyVertex> vertices)
  {
    this.vertices = vertices;
  }
}

[System.Serializable]
public class ProxyVertex
{
  public int index;
  public Vector3 pos;
  public float weight;

  public ProxyVertex(int index, Vector3 pos)
  {
    this.index = index;
    this.pos = pos;
  }
  public ProxyVertex(int index, Vector3 pos, float weight)
  {
    this.index = index;
    this.pos = pos;
    this.weight = weight;
  }
}
