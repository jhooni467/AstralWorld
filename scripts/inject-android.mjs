import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const base = new URL("../android/app/src/main/", import.meta.url);
const manifestPath = new URL("AndroidManifest.xml", base);
const manifest = await readFile(manifestPath, "utf8");
const pkg = manifest.match(/package="([^"]+)"/)?.[1] || "com.astralworld.app";
const javaPath = new URL("java/" + pkg.replaceAll(".", "/") + "/AstralMediaPlugin.java", base);
await mkdir(dirname(javaPath.pathname), { recursive: true });
await writeFile(javaPath, `package ${pkg};

import android.Manifest;
import android.database.Cursor;
import android.net.Uri;
import android.provider.MediaStore;
import android.content.ContentResolver;
import android.content.pm.PackageManager;
import android.os.Build;
import com.getcapacitor.*;
import com.getcapacitor.annotation.*;
import org.json.JSONArray;
import org.json.JSONObject;

@CapacitorPlugin(name = "AstralMedia", permissions = {
 @Permission(alias = "videos", strings = { Manifest.permission.READ_EXTERNAL_STORAGE, "android.permission.READ_MEDIA_VIDEO" })
})
public class AstralMediaPlugin extends Plugin {
 @PluginMethod public void requestVideoPermission(PluginCall call) {
  if (Build.VERSION.SDK_INT >= 33 && getContext().checkSelfPermission("android.permission.READ_MEDIA_VIDEO") == PackageManager.PERMISSION_GRANTED) { JSObject r=new JSObject(); r.put("granted",true); call.resolve(r); return; }
  if (Build.VERSION.SDK_INT < 33 && getContext().checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) { JSObject r=new JSObject(); r.put("granted",true); call.resolve(r); return; }
  requestPermissionForAlias("videos", call, "permissionResult");
 }
 @PermissionCallback private void permissionResult(PluginCall call) {
  boolean granted = Build.VERSION.SDK_INT >= 33 ? getContext().checkSelfPermission("android.permission.READ_MEDIA_VIDEO") == PackageManager.PERMISSION_GRANTED : getContext().checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
  JSObject r=new JSObject(); r.put("granted",granted); call.resolve(r);
 }
 @PluginMethod public void listVideos(PluginCall call) {
  boolean granted = Build.VERSION.SDK_INT >= 33 ? getContext().checkSelfPermission("android.permission.READ_MEDIA_VIDEO") == PackageManager.PERMISSION_GRANTED : getContext().checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED;
  if (!granted) { call.reject("Video permission has not been granted"); return; }
  JSONArray videos = new JSONArray();
  String[] projection = { MediaStore.Video.Media._ID, MediaStore.Video.Media.DISPLAY_NAME, MediaStore.Video.Media.DURATION, MediaStore.Video.Media.SIZE, MediaStore.Video.Media.WIDTH, MediaStore.Video.Media.HEIGHT, MediaStore.Video.Media.DATE_ADDED, MediaStore.Video.Media.MIME_TYPE };
  String sort = MediaStore.Video.Media.DATE_ADDED + " DESC";
  try (Cursor cursor = getContext().getContentResolver().query(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, projection, null, null, sort)) {
   if (cursor != null) while (cursor.moveToNext()) {
    long id=cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Video.Media._ID));
    Uri uri=Uri.withAppendedPath(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, Long.toString(id));
    JSObject v=new JSObject(); v.put("id", "mediastore:"+id); v.put("uri",uri.toString());
    v.put("name",cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DISPLAY_NAME)));
    v.put("duration",cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DURATION)));
    v.put("size",cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.SIZE)));
    v.put("width",cursor.getInt(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.WIDTH)));
    v.put("height",cursor.getInt(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.HEIGHT)));
    v.put("dateAdded",cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATE_ADDED)));
    v.put("mimeType",cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.MIME_TYPE)));
    videos.put(v);
   }
   JSObject result=new JSObject(); result.put("videos",videos); call.resolve(result);
  } catch (Exception e) { call.reject("Could not query Android video library", e); }
 }
}
`);

const activityPath = new URL("java/" + pkg.replaceAll(".", "/") + "/MainActivity.java", base);
let activity = await readFile(activityPath, "utf8");
if (!activity.includes("registerPlugin(AstralMediaPlugin.class)")) {
 activity = activity.replace(/import [^;]+;\\n/g, m => m).replace(/(public class MainActivity extends BridgeActivity \\{)/, '$1\\n    @Override\\n    public void onCreate(android.os.Bundle savedInstanceState) {\\n        registerPlugin(AstralMediaPlugin.class);\\n        super.onCreate(savedInstanceState);\\n    }');
 await writeFile(activityPath, activity);
}
let updated = manifest;
if (!updated.includes("android.permission.READ_MEDIA_VIDEO")) updated = updated.replace("<application", '<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />\\n    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />\\n    <application');
if (updated !== manifest) await writeFile(manifestPath, updated);
console.log("Injected AstralMedia MediaStore plugin and permissions.");
