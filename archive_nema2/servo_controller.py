import RPi.GPIO as GPIO
import json
from flask import Flask, request

app = Flask(__name__)

with open("../mazzy_pins.json") as f:
    servo_pins = json.load(f)["servos"]

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(servo_pins["camera_pan"], GPIO.OUT)
GPIO.setup(servo_pins["camera_tilt"], GPIO.OUT)

pan_pwm = GPIO.PWM(servo_pins["camera_pan"], 50)
tilt_pwm = GPIO.PWM(servo_pins["camera_tilt"], 50)

pan_pwm.start(7.5)
tilt_pwm.start(7.5)

@app.route('/servo', methods=['POST'])
def servo_control():
    data = request.json
    pan_angle = data.get("pan", 90)
    tilt_angle = data.get("tilt", 90)

    pan_duty = 2.5 + (pan_angle / 18)
    tilt_duty = 2.5 + (tilt_angle / 18)

    pan_pwm.ChangeDutyCycle(pan_duty)
    tilt_pwm.ChangeDutyCycle(tilt_duty)

    return {"status": "success"}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8001)
