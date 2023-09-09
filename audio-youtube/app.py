import requests
import os

def download_audio(url, filename):
    with open(filename, "wb") as f:
        f.write(requests.get(url, stream=True).content)
    print("Descarga completada")    

def download_video(url, filename):
    with open(filename, "wb") as f:
        f.write(requests.get(url, stream=True).content)
    print("Descarga completada")   

def exit_app():
    print("Saliendo de la aplicación...")
    os.system("exit")

def main():
    print("--------------------------------------------------------------------")
    print("|   Bienvenido a la aplicación de descarga de archivos de YouTube  |")
    print("--------------------------------------------------------------------")
    print("|                    ¿Qué desea descargar?                         |")
    print("|                           1. Audio                               |")
    print("|                           2. Video                               |")
    print("|                           3. Salir                               |")
    print("--------------------------------------------------------------------")

    choice = input("Ingrese una opción: ")
    print("")

    if choice == "1":
        print("--------------------------------------------------------------------")
        print("|        Iniciando el proceso para la descarga de un audio         |")
        print("--------------------------------------------------------------------")
        url = input("Ingrese la URL del archivo: ")
        filename = input("Ingrese el nombre para el archivo: ")
        extension = ".mp3"
        print("Iniciando descarga...")
        download_audio(url, filename + extension)

    elif choice == "2":
        print("--------------------------------------------------------------------")
        print("|        Iniciando el proceso para la descarga de un vídeo         |")
        print("--------------------------------------------------------------------")
        url = input("Ingrese la URL del archivo: ")
        filename = input("Ingrese el nombre para el archivo: ")
        extension = ".mp4"
        print("Iniciando descarga...")
        download_video(url, filename + extension)

    elif choice == "3":
        exit_app()
    else:
        print("Opción inválida.")

if __name__ == "__main__":
    main()