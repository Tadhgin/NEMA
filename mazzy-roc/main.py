from controllers.motor_controller import MotorController
from controllers.servo_controller import ServoController
from controllers.sensor_controller import SensorController
from controllers.led_controller import LEDController
from controllers.audio_controller import AudioController
from controllers.webcam_controller import WebcamController
from flask import Flask, jsonify, request, send_file
from roc_comms import get_command, send_data, send_image
import json

app = Flask(__name__)

# Load configuration
with open('config/mazzy_pins.json') as f:
    pins = json.load(f)

# Initialize controllers
motors = MotorController(pins['motors'])
servos = ServoController(pins['servos'])
sensors = SensorController(pins['sensors'])
leds = LEDController(pins['led_face'])
audio = AudioController()
webcam = WebcamController(resolution=(1280, 720), fps=30)

# Routes
@app.route('/move', methods=['POST'])
def move():
    data = request.json
    direction = data.get("direction", "stop")
    duration = data.get("duration", 1)
    motors.move(direction, duration)
    return jsonify({"status": "success", "direction": direction, "duration": duration})

@app.route('/servo', methods=['POST'])
def servo_move():
    pan = request.json.get('pan')
    tilt = request.json.get('tilt')
    servos.set_position(pan, tilt)
    return jsonify({"status": "servo_moved", "pan": pan, "tilt": tilt})

@app.route('/sensors', methods=['GET'])
def sensor_data():
    data = sensors.read_all()
    return jsonify({"sensors": data})

@app.route('/led', methods=['POST'])
def led_face():
    emotion = request.json.get('emotion')
    leds.display_emotion(emotion)
    return jsonify({"status": "led_emotion", "emotion": emotion})

@app.route('/speak', methods=['POST'])
def speak():
    text = request.json.get('text')
    audio.speak(text)
    return jsonify({"status": "spoken", "text": text})

@app.route('/webcam/snapshot', methods=['GET'])
def snapshot():
    filename = 'snapshot.jpg'
    webcam.take_snapshot(filename)
    return send_file(filename, mimetype='image/jpeg')

@app.route('/webcam/video', methods=['POST'])
def record_video():
    duration = request.json.get('duration', 10)
    filename = 'recording.avi'
    webcam.record_video(duration, filename)
    return jsonify({"status": "recorded", "duration": duration, "file": filename})

@app.route('/webcam/audio', methods=['POST'])
def record_audio():
    duration = request.json.get('duration', 10)
    filename = 'audio.wav'
    webcam.record_audio(duration, filename)
    return jsonify({"status": "audio_recorded", "duration": duration, "file": filename})

@app.route('/poll_command', methods=['GET'])
def poll_command():
    command = get_command()
    if command:
        return jsonify({"status": "success", "command": command})
    return jsonify({"status": "no command"})

@app.route('/report_status', methods=['POST'])
def report_status():
    data = request.json
    result = send_data(data)
    if result:
        return jsonify({"status": "reported", "response": result})
    return jsonify({"status": "failed"})

@app.route('/upload-image', methods=['POST'])
def upload_image_route():
    image_path = '/path/to/your/image.jpg'
    result = send_image(image_path)
    if result:
        return jsonify({"status": "uploaded", "response": result})
    return jsonify({"status": "failed"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)