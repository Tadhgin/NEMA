import cv2
import threading
import pyaudio
import wave
import time

class WebcamController:
    def __init__(self, resolution=(640,480), fps=30, camera_index=0):
        self.resolution = resolution
        self.fps = fps
        self.cap = cv2.VideoCapture(camera_index)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, resolution[0])
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, resolution[1])
        self.cap.set(cv2.CAP_PROP_FPS, fps)

    def stream_video(self):
        while True:
            ret, frame = self.cap.read()
            if ret:
                cv2.imshow('Webcam Feed', frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
        self.cap.release()
        cv2.destroyAllWindows()

    def take_snapshot(self, filename='snapshot.jpg'):
        ret, frame = self.cap.read()
        if ret:
            cv2.imwrite(filename, frame)

    def record_video(self, duration=10, filename='recording.avi'):
        fourcc = cv2.VideoWriter_fourcc(*'XVID')
        out = cv2.VideoWriter(filename, fourcc, self.fps, self.resolution)
        start = time.time()
        while (time.time() - start) < duration:
            ret, frame = self.cap.read()
            if ret:
                out.write(frame)
        out.release()

    def digital_zoom(self, zoom_factor=2):
        ret, frame = self.cap.read()
        if ret:
            height, width = frame.shape[:2]
            new_h, new_w = height // zoom_factor, width // zoom_factor
            start_row, start_col = (height - new_h) // 2, (width - new_w) // 2
            end_row, end_col = start_row + new_h, start_col + new_w
            zoomed_frame = frame[start_row:end_row, start_col:end_col]
            return cv2.resize(zoomed_frame, self.resolution)

    def record_audio(self, duration=10, filename='audio.wav'):
        audio = pyaudio.PyAudio()
        stream = audio.open(format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024)
        frames = []
        for _ in range(0, int(44100 / 1024 * duration)):
            data = stream.read(1024)
            frames.append(data)
        stream.stop_stream()
        stream.close()
        audio.terminate()

        waveFile = wave.open(filename, 'wb')
        waveFile.setnchannels(1)
        waveFile.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
        waveFile.setframerate(44100)
        waveFile.writeframes(b''.join(frames))
        waveFile.close()
