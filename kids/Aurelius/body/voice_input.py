# voice_input.py
import speech_recognition as sr

class VoiceInput:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        self.mic = sr.Microphone()

    def listen(self, timeout=5, phrase_time_limit=10):
        with self.mic as source:
            print("[Voice] Listening...")
            self.recognizer.adjust_for_ambient_noise(source)
            try:
                audio = self.recognizer.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
                return self.recognizer.recognize_whisper_api(audio)
            except sr.UnknownValueError:
                print("[Voice] Could not understand audio.")
                return ""
            except sr.RequestError as e:
                print(f"[Voice] API Error: {e}")
                return ""
