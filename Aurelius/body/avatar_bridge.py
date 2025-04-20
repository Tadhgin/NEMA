# avatar_bridge.py

class AvatarBridge:
    def __init__(self):
        self.status = "idle"

    def send_expression(self, expression):
        """
        Send a symbolic facial expression or animation cue to avatar renderer.
        Examples: 'smile', 'think', 'tilt_head', 'sad_blink'
        """
        print(f"[Avatar] Expressing: {expression}")
        self.status = expression

    def speak_sync(self, text):
        """
        Sync text-to-speech output to avatar mouth or gestures.
        """
        print(f"[Avatar] Syncing speech with: '{text[:50]}...'")

    def idle_loop(self):
        """
        Basic idle loop or animation trigger when Caelum is 'waiting.'
        """
        print("[Avatar] Entering idle loop.")
