﻿//
//Filename: maxCamera.cs
//
// original: http://www.unifycommunity.com/wiki/index.php?title=MouseOrbitZoom
//
// --01-18-2010 - create temporary target, if none supplied at start

using UnityEngine;
using System.Collections;
using UnityEngine.EventSystems;

[AddComponentMenu("Camera-Control/3dsMax Camera Style")]
public class maxCamera : MonoBehaviour
{
  public Transform target;
  public Vector3 targetOffset;
  public float distance = 5.0f;
  public float maxDistance = 20;
  public float minDistance = .6f;
  public float xSpeed = 100.0f;
  public float ySpeed = 100.0f;
  public int yMinLimit = -80;
  public int yMaxLimit = 80;
  public int zoomRate = 60;
  public float panSpeed = 0.5f;
  public float zoomDampening = 5.0f;

  private float xDeg = 0.0f;
  private float yDeg = 0.0f;
  private float currentDistance;
  private float desiredDistance;
  private Quaternion currentRotation;
  private Quaternion desiredRotation;
  private Quaternion rotation;
  private Vector3 position;

  private float fakeDeltaTime = 0.01f;
  private float panFakeDeltaTime = 0.15f;
  private EventSystem eventSystem;

  void Start() { Init(); }
  void OnEnable() { Init(); }

  public void Init()
  {
    eventSystem = EventSystem.current;
    //If there is no target, create a temporary target at 'distance' from the cameras current viewpoint
    if (!target)
    {
      GameObject go = new GameObject("Cam Target");
      go.transform.position = transform.position + (transform.forward * distance);
      target = go.transform;
    }

    distance = Vector3.Distance(transform.position, target.position);
    currentDistance = distance;
    desiredDistance = distance;

    //be sure to grab the current rotations as starting points.
    position = transform.position;
    rotation = transform.rotation;
    currentRotation = transform.rotation;
    desiredRotation = transform.rotation;

    xDeg = Vector3.Angle(Vector3.right, transform.right);
    yDeg = Vector3.Angle(Vector3.up, transform.up);
  }

  /*
   * Camera logic on LateUpdate to only update after all character movement logic has been handled. 
   */
  void LateUpdate()
  {

    
    if (!eventSystem.IsPointerOverGameObject() && Input.GetMouseButton(0))
    {
      xDeg += Input.GetAxis("Mouse X") * xSpeed * 0.02f;
      
      // set camera rotation 
      desiredRotation = Quaternion.Euler(yDeg, xDeg, 0);
      currentRotation = transform.rotation;

      rotation = Quaternion.Lerp(currentRotation, desiredRotation, fakeDeltaTime * zoomDampening);
      transform.rotation = rotation;
    }
    // otherwise if left mouse is selected, we pan by way of transforming the target in screenspace
    //middle button behaves in some weird way on html. Button gets stuck
    else if (!eventSystem.IsPointerOverGameObject() && Input.GetMouseButton(1))
    {
      //grab the rotation of the camera so we can move in a psuedo local XY space
      target.rotation = transform.rotation;
      //target.Translate(Vector3.right * -Input.GetAxis("Mouse X") * panSpeed * panFakeDeltaTime);
      target.Translate(transform.up * -Input.GetAxis("Mouse Y") * panSpeed * panFakeDeltaTime, Space.World);
    }

    ////////Orbit Position

    // affect the desired Zoom distance if we roll the scrollwheel
    desiredDistance -= Input.GetAxis("Mouse ScrollWheel") * fakeDeltaTime * zoomRate * Mathf.Abs(desiredDistance);
    //clamp the zoom min/max
    desiredDistance = Mathf.Clamp(desiredDistance, minDistance, maxDistance);
    // For smoothing of the zoom, lerp distance
    currentDistance = Mathf.Lerp(currentDistance, desiredDistance, fakeDeltaTime * zoomDampening);

    // calculate position based on the new currentDistance 
    position = target.position - (rotation * Vector3.forward * currentDistance + targetOffset);
    transform.position = position;
  }

  private static float ClampAngle(float angle, float min, float max)
  {
    if (angle < -360)
      angle += 360;
    if (angle > 360)
      angle -= 360;
    return Mathf.Clamp(angle, min, max);
  }
}