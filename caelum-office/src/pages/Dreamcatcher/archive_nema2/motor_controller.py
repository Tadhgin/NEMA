import RPi.GPIO as GPIO
import json
import time

class MotorController:
    def __init__(self, pin_config="../mazzy_pins.json"):
        with open(pin_config) as f:
            pins = json.load(f)["motors"]
        self.pins = pins

        GPIO.setmode(GPIO.BCM)
        GPIO.setwarnings(False)

        for pin in self.pins.values():
            GPIO.setup(pin, GPIO.OUT)

    def move(self, direction="stop", duration=1):
        if direction == "forward":
            GPIO.output(self.pins["left_motor_forward"], True)
            GPIO.output(self.pins["right_motor_forward"], True)

        elif direction == "backward":
            GPIO.output(self.pins["left_motor_backward"], True)
            GPIO.output(self.pins["right_motor_backward"], True)

        elif direction == "left":
            GPIO.output(self.pins["right_motor_forward"], True)
            GPIO.output(self.pins["left_motor_backward"], True)

        elif direction == "right":
            GPIO.output(self.pins["left_motor_forward"], True)
            GPIO.output(self.pins["right_motor_backward"], True)

        else:
            GPIO.output(list(self.pins.values()), False)
            return

        time.sleep(duration)
        GPIO.output(list(self.pins.values()), False)
