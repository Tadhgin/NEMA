from gpiozero import DistanceSensor

front_sensor = DistanceSensor(echo=23, trigger=24)

def initialize():
    pass

def read_sensors():
    distance = front_sensor.distance * 100
    return {'front_distance_cm': distance}

def cleanup():
    front_sensor.close()
