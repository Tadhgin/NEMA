import os

for root, dirs, files in os.walk("C:/Users/User/Documents/NEMA"):
    for name in files:
        print(os.path.join(root, name))
