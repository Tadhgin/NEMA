from gpiozero import LEDBoard
import time

face_leds = LEDBoard(5, 6, 13, 19, 26, pwm=True)

def initialize():
    face_leds.off()

def display_pattern(pattern):
    if pattern == 'happy':
        face_leds.value = (1, 0, 1, 0, 1)
    elif pattern == 'sad':
        face_leds.value = (0, 1, 0, 1, 0)
    else:
        face_leds.off()

def display_startup_pattern():
    face_leds.blink(on_time=0.2, off_time=0.2, n=5)

def cleanup():
    face_leds.off()
