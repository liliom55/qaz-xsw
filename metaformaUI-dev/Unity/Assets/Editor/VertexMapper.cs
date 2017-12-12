using System;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEngine;

[InitializeOnLoad]
public class VertexMapper : MonoBehaviour {

  private static int numOfProxyPoints = 9;

  public static ProxyVertices[] MapToProxyVertices(Mesh mesh, Cloth proxy)
  {
    LoadingController.SetTextAsync("Almost done");
    Vector3[] fromVertices = proxy.vertices;
    List<ProxyVertex> proxyV = fromVertices.Select((v, index) => new ProxyVertex(index, v)).ToList();
    ProxyVertices[] myProxyV = new ProxyVertices[mesh.vertexCount];
    //IMPORTANT: ACCESSING MESH.VERTICES DIRECTLY CAUSES A MEMORY OVERFLOW.
    //mesh.vertices returns a copy of the vertices EACH TIME ******
    Vector3[] meshVertices = mesh.vertices;
    for (int i = 0; i < mesh.vertexCount; i++)
    {
      float remainder = i % 200;
      if (remainder == 0)
      {
        if (EditorUtility.DisplayCancelableProgressBar("Mapping proxy vertices to complex vertices", "Procecssing vertex " + i + "of " + mesh.vertexCount, (float)i / (float)mesh.vertexCount))
        {
          return null;
        }
      }
      myProxyV[i] = FindPointsUnderDistance(meshVertices[i], proxyV);
    }
    EditorUtility.ClearProgressBar();
    return myProxyV;
  }

  private static ProxyVertices FindPointsUnderDistance(Vector3 point, List<ProxyVertex> vertices)
  {
    List<ProxyVertex> ordered = vertices.OrderBy(v => Math.Abs(Vector3.SqrMagnitude(point - v.pos))).ToList();
    List<ProxyVertex> orderedAndLimited = ordered.GetRange(0, numOfProxyPoints);
    List<ProxyVertex> withWeight = AttributeWeights(point, orderedAndLimited);

    ProxyVertices proxyVertices = new ProxyVertices(withWeight);
    return proxyVertices;
  }


  private static List<ProxyVertex> AttributeWeights(Vector3 point, List<ProxyVertex> vertices)
  {
    ProxyVertex farthest = vertices.Last();
    float sqrFarthestPoint = Vector3.SqrMagnitude(point - farthest.pos);
    List<ProxyVertex> withWeight = vertices.Select(v => new ProxyVertex(v.index, v.pos, ComputeWeight(point, v.pos, sqrFarthestPoint))).ToList();
    List<ProxyVertex> normalized = NormalizeWeights(withWeight);
    return normalized;
  }

  private static float ComputeWeight(Vector3 origin, Vector3 point, float sqrFarthestPoint)
  {
    float sqrDistance = Vector3.SqrMagnitude(origin - point);
    float weight = (sqrFarthestPoint - sqrDistance) / sqrFarthestPoint;
    return weight;
  }

  private static List<ProxyVertex> NormalizeWeights(List<ProxyVertex> vertices)
  {
    float totalWeight = vertices.Select(v => v.weight).Sum();
    List<ProxyVertex> normalized = vertices.Select(v => new ProxyVertex(v.index, v.pos, v.weight / totalWeight)).ToList();
    return normalized;
  }
}
