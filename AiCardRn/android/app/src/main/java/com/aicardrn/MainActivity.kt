package com.aicardrn

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "AiCardRn"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : ReactActivityDelegate(this, mainComponentName) {
      override fun getLaunchOptions(): Bundle {
        // val imageList = arrayListOf("http://foo.com/bar1.png", "http://foo.com/bar2.png")
        // val initialProperties = Bundle().apply { putStringArrayList("images", imageList) }
        val initialProperties = Bundle().apply { putString("bundleData", "{\"data\":{\"title\":\"init-肖申克的救赎\",\"rating\":9.7,\"content\":[{\"label\":\"豆瓣评分\",\"value\":\"9.7\"}],\"posterUrl\":\"https://picsum.photos/400/400\"},\"opts\":{\"imageWidth\":420,\"imageHeight\":860}}") }
        return initialProperties
      }
    }
  }
}
