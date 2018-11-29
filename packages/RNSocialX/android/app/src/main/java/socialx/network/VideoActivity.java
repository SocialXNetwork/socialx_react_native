package socialx.network;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.PixelFormat;
import android.media.MediaPlayer;
import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.MediaController;
import android.widget.Toast;
import android.widget.VideoView;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.RelativeLayout.LayoutParams;
import android.view.GestureDetector;
import android.view.GestureDetector.SimpleOnGestureListener;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.content.res.Configuration;
import android.content.pm.ActivityInfo;

public class VideoActivity extends AppCompatActivity {
    private static ProgressDialog progressDialog;

    private int currentVolume;
    private boolean highSoundEnabled = true;
    private boolean muteSoundEnabled = false;

    private String videoPath;
    private GestureDetector gestureDetector;
    private VideoView myVideoView;
    private MediaPlayer mediaPlayer;
    private ImageButton close_fullscreen;
    private ImageButton sound_high;
    private ImageButton sound_mute;
    private RelativeLayout relativeLayout;
    private MediaController mediaController;
    private AudioManager audioManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR);
        setContentView(R.layout.player_fullscreen);
        gestureDetector = new GestureDetector(this, new SingleTapConfirm());
        Intent i = getIntent();

        close_fullscreen = (ImageButton) findViewById(R.id.close_fullscreen);
        sound_high = (ImageButton) findViewById(R.id.sound_high);
        sound_mute = (ImageButton) findViewById(R.id.sound_mute);

        close_fullscreen.setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent motion) {
                if(gestureDetector.onTouchEvent(motion)) {
                    myVideoView.stopPlayback();
                    finish();

                    return true;
                }
                                
                return false;
            };
        });

        sound_high.setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent motion) {
                if(gestureDetector.onTouchEvent(motion)) {
                    sound_high.setVisibility(View.GONE);
                    sound_mute.setVisibility(View.VISIBLE);

                    mediaPlayer.setVolume(0f, 0f);

                    highSoundEnabled = false;
                    muteSoundEnabled = true;

                    return true;
                }

                return false;
            };
        });

        sound_mute.setOnTouchListener(new OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent motion) {
                if(gestureDetector.onTouchEvent(motion)) {
                    sound_mute.setVisibility(View.GONE);
                    sound_high.setVisibility(View.VISIBLE);

                    mediaPlayer.setVolume(1f, 1f);

                    highSoundEnabled = true;
                    muteSoundEnabled = false;

                    return true;
                }
                                
                return false;
            };
        });
        
        if(i != null){
            myVideoView = (VideoView) findViewById(R.id.videoView);
            videoPath = i.getStringExtra("VIDEO_URL");
            progressDialog = ProgressDialog.show(VideoActivity.this, "", "Loading video", true);
            progressDialog.setCancelable(true);
            PlayVideo();
        }
        else{
            Toast.makeText(VideoActivity.this, "Video not found", Toast.LENGTH_SHORT).show();
        }
    }

    private void PlayVideo() {
        try {
            getWindow().setFormat(PixelFormat.TRANSLUCENT);

            mediaController = new MediaController(VideoActivity.this){
                @Override
                public void hide() {
                    super.hide();
                    close_fullscreen.setVisibility(View.GONE);
                    sound_high.setVisibility(View.GONE);
                    sound_mute.setVisibility(View.GONE);
                }

                @Override
                public void show() {
                    super.show(0);
                    close_fullscreen.setVisibility(View.VISIBLE);

                    if(!highSoundEnabled){
                        sound_mute.setVisibility(View.VISIBLE);
                        sound_high.setVisibility(View.GONE);
                    } else if(!muteSoundEnabled){
                        sound_high.setVisibility(View.VISIBLE);
                        sound_mute.setVisibility(View.GONE);
                    }
                }

                @Override
                public boolean dispatchKeyEvent(KeyEvent event) {
                    if(event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
                        super.hide();
                        close_fullscreen.setVisibility(View.GONE);
                        sound_mute.setVisibility(View.GONE);
                        sound_high.setVisibility(View.GONE);

                        return true;
                    }

                    return false;
                }
            };
            mediaController.setAnchorView(myVideoView);

            Uri video = Uri.parse(videoPath);
            myVideoView.setMediaController(mediaController);
            myVideoView.setVideoURI(video);
            myVideoView.requestFocus();
            myVideoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                public void onPrepared(MediaPlayer mp) {
                    close_fullscreen.setVisibility(View.VISIBLE);
                    sound_high.setVisibility(View.VISIBLE);
                    
                    mediaPlayer = mp;
                    progressDialog.dismiss();
                    if(BridgeModule.duration!=0)
                     myVideoView.seekTo(BridgeModule.duration);
                    myVideoView.pause();
                }
            });
        } catch (Exception e) {
            progressDialog.dismiss();
            System.out.println("Video Play Error :" + e.toString());
            finish();
        }

    }

    private class SingleTapConfirm extends SimpleOnGestureListener {
        @Override
        public boolean onSingleTapUp(MotionEvent event) {
            return true;
        }
    }

    private int getCurrentVolume() {
        audioManager = (AudioManager) getSystemService(this.AUDIO_SERVICE);
        currentVolume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC);

        return currentVolume;
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
            LayoutParams layoutParams =  new LayoutParams(ViewGroup.LayoutParams.FILL_PARENT, ViewGroup.LayoutParams.FILL_PARENT);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_TOP, RelativeLayout.TRUE);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_RIGHT, RelativeLayout.TRUE);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM, RelativeLayout.TRUE);
            layoutParams.addRule(RelativeLayout.ALIGN_PARENT_LEFT, RelativeLayout.TRUE);
            myVideoView.setLayoutParams(layoutParams);

            myVideoView.pause();
        }

        if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) {
            LayoutParams layoutParams =  new LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            layoutParams.addRule(RelativeLayout.CENTER_IN_PARENT, RelativeLayout.TRUE);
            myVideoView.setLayoutParams(layoutParams);

            myVideoView.pause();
        }
    }
}
