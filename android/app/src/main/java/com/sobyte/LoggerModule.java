package com.sobyte;

import java.util.Map;
import java.util.HashMap;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;

public class LoggerModule extends ReactContextBaseJavaModule {
    LoggerModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "LoggerModule";
    }

    @ReactMethod
    public void log(String message, String name, Callback callback) {
        Log.d("LoggerModule", message + " " + name);
        callback.invoke(message + " " + name);
    }
}
