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
import android.view.GestureDetector;
import android.view.GestureDetector.SimpleOnGestureListener;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnTouchListener;
import android.view.KeyEvent;
import android.media.AudioManager;
import android.media.MediaPlayer;

public class VideoActivity extends AppCompatActivity {
    private static ProgressDialog progressDialog;

    private String videoPath;
    private GestureDetector gestureDetector;
    private VideoView myVideoView;
    private MediaPlayer mediaPlayer;
    private ImageButton close_fullscreen;
    private ImageButton sound_high;
    private ImageButton sound_mute;
    private RelativeLayout relativeLayout;
    private MediaController mediaController;

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

        close_fullscreen.setVisibility(View.GONE);
        sound_mute.setVisibility(View.GONE);
        sound_high.setVisibility(View.GONE);

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

                    mediaPlayer.setVolume(0, 0);

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

                    mediaPlayer.setVolume(0, 1);

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

            close_fullscreen.setVisibility(View.VISIBLE);
            sound_high.setVisibility(View.VISIBLE);

            mediaController = new MediaController(VideoActivity.this){
                @Override
                public void hide() {
                    // Overwrite the default hide stub (don't hide the MediaController as default)
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

            relativeLayout = (RelativeLayout) findViewById(R.id.relative_layout);
            myVideoView.setOnTouchListener(new OnTouchListener() {
                @Override
                public boolean onTouch(View v, MotionEvent motion) {
                    if(relativeLayout.getVisibility() == View.VISIBLE) {
                        if(gestureDetector.onTouchEvent(motion)) {
                            mediaController.setVisibility(View.VISIBLE);
                            close_fullscreen.setVisibility(View.VISIBLE);

                            return true;
                        }
                    }

                    return false;
                }
            });
        
            Uri video = Uri.parse(videoPath);
            myVideoView.setMediaController(mediaController);
            myVideoView.setVideoURI(video);
            myVideoView.requestFocus();
            myVideoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                public void onPrepared(MediaPlayer mp) {
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
}
