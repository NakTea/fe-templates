package com.aicardrn

import android.os.Bundle
import android.util.Log
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule


class RNConfigModule(reactContext: ReactApplicationContext) :
        ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "RNConfigModule"

    private fun sendEvent(reactContext: ReactContext, eventName: String, info: Array<String>) {
    val params = Arguments.createArray().apply { info.forEach { pushString(it) } }
      val initialProperties = Bundle().apply { putString("bundleData", "{\"data\":{\"title\":\"sendEvent-肖申克的救赎3\",\"rating\":9.7,\"content\":[{\"label\":\"豆瓣评分\",\"value\":\"9.7\"}],\"posterUrl\":\"https://picsum.photos/400/400\"},\"opts\":{\"imageWidth\":420,\"imageHeight\":860}}") }
      val str = "{\"data\":{\"title\":\"肖申克的救赎2\",\"rating\":9.7,\"content\":[{\"label\":\"豆瓣评分\",\"value\":\"9.7\"}],\"posterUrl\":\"https://picsum.photos/400/400\"},\"opts\":{\"imageWidth\":420,\"imageHeight\":860}}"
      reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, str)
    }

    private var listenerCount = 0

    @ReactMethod
    fun addListener(eventName: String) {
    if (listenerCount == 0) {
      // Set up any upstream listeners or background tasks as necessary
    }

    listenerCount += 1
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        listenerCount -= count
        if (listenerCount == 0) {
            // Remove upstream listeners， stop unnecessary background tasks
        }
    }

    @ReactMethod
    fun onRNFinish() {
        println("RN初始化完毕")
    }

    @ReactMethod
    fun bridgeToNative(data: ReadableMap, callback: Callback) {
        val name: String? = data.getString("name")
        if (name == "failed") {
          callback.invoke("failed")
        } else  if (name == "error") {
          callback.invoke("error")
        } else {
          callback.invoke("success")
        }
  }

    @ReactMethod
    fun createCalendarEvent(name: String, location: String, callback: Callback) {
      val imageList =
            arrayOf(
                    "https://picsum.photos/400/400",
                    "https://picsum.photos/400/400"
            )
    println(imageList)
    sendEvent(reactApplicationContext, "EventReminder", imageList)

    Log.d("CalendarModule", "Create event called with name: $name and location: $location")

    callback.invoke(111)
  }
}
