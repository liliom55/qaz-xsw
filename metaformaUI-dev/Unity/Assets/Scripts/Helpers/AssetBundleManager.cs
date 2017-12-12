using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

static public class AssetBundleManager
{
  private static Dictionary<string, string> headers;
  private static Byte[] data;
  // A dictionary to hold the AssetBundle references
  static private Dictionary<string, AssetBundleRef> dictAssetBundleRefs;
  static AssetBundleManager()
  {
    dictAssetBundleRefs = new Dictionary<string, AssetBundleRef>();
    WWWForm form = new WWWForm();
    headers = form.headers;
    headers["Authorization"] = "Basic " + System.Convert.ToBase64String(
            System.Text.Encoding.ASCII.GetBytes("logistik:06102017"));
    data = form.data;
  }
  // Class with the AssetBundle reference, url and version
  private class AssetBundleRef
  {
    public AssetBundle assetBundle = null;
    public int version;
    public string url;
    public AssetBundleRef(string strUrlIn, int intVersionIn)
    {
      url = strUrlIn;
      version = intVersionIn;
    }
  };
  // Get an AssetBundle
  public static AssetBundle getAssetBundle(string url, int version)
  {
    string keyName = url + version.ToString();
    AssetBundleRef abRef;
    if (dictAssetBundleRefs.TryGetValue(keyName, out abRef))
      return abRef.assetBundle;
    else
      return null;
  }
  // Download an AssetBundle
  public static IEnumerator downloadAssetBundle(string url, int version)
  {
    string keyName = url + version.ToString();
    if (dictAssetBundleRefs.ContainsKey(keyName))
      yield return null;
    else
    {
      while (!Caching.ready)
        yield return null;

      using (WWW www = new WWW(url, null, headers))
      {
        yield return www;
        if (www.error != null)
          throw new Exception("WWW download:" + www.error + "at url " + url);
        AssetBundleRef abRef = new AssetBundleRef(url, version);
        abRef.assetBundle = www.assetBundle;
        dictAssetBundleRefs.Add(keyName, abRef);
      }
    }
  }
  // Unload an AssetBundle
  public static void Unload(string url, int version, bool allObjects)
  {
    string keyName = url + version.ToString();
    AssetBundleRef abRef;
    if (dictAssetBundleRefs.TryGetValue(keyName, out abRef))
    {
      abRef.assetBundle.Unload(allObjects);
      abRef.assetBundle = null;
      dictAssetBundleRefs.Remove(keyName);
    }
  }
}
