import pygame

pygame.mixer.init()

def initialize():
    pass

def play_startup_sound():
    pygame.mixer.music.load('startup.mp3')
    pygame.mixer.music.play()

def play_sound(file):
    pygame.mixer.music.load(file)
    pygame.mixer.music.play()

def cleanup():
    pygame.mixer.music.stop()
