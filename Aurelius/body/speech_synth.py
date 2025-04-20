# speech_synth.py
import pyttsx3

class SpeechSynth:
    def __init__(self, voice_name=None):
        self.engine = pyttsx3.init()
        if voice_name:
            self.set_voice(voice_name)

    def set_voice(self, voice_name):
        for voice in self.engine.getProperty('voices'):
            if voice_name.lower() in voice.name.lower():
                self.engine.setProperty('voice', voice.id)
                print(f"[Speech] Voice set to: {voice.name}")
                break

    def speak(self, text):
        print(f"[Speech] Speaking: {text[:60]}...")
        self.engine.say(text)
        self.engine.runAndWait()
