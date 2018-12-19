package socialx.network;

import android.app.Application;

import com.facebook.react.ReactApplication;
import org.linusu.RNGetRandomValuesPackage;
import com.github.alinz.reactnativewebviewbridge.WebViewBridgePackage;
import net.zubricky.AndroidKeyboardAdjust.AndroidKeyboardAdjustPackage;
import com.beefe.picker.PickerViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.bugsnag.BugsnagReactNative;
import com.horcrux.svg.SvgPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.react.rnspinkit.RNSpinkitPackage;
import iyegoroff.RNTextGradient.RNTextGradientPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.bitgo.randombytes.RandomBytesPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new BridgePackage(),
            new MainReactPackage(),
            new RNGetRandomValuesPackage(),
            new WebViewBridgePackage(),
            new AndroidKeyboardAdjustPackage(),
            new PickerViewPackage(),
            new OrientationPackage(),
            new RCTSplashScreenPackage(),
            BugsnagReactNative.getPackage(),
            new SvgPackage(),
            new ReactVideoPackage(),
            new RNDeviceInfo(),
            new RNSpinkitPackage(),
            new RNTextGradientPackage(),
            new BlurViewPackage(),
            new LinearGradientPackage(),
            new LottiePackage(),
            new ImageResizerPackage(),
            new PickerPackage(),
            new VectorIconsPackage(),
            new FastImageViewPackage(),
            new RandomBytesPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
