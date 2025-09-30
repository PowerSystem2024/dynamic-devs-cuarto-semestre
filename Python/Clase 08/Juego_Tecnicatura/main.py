import pygame
import sys
import random
import os
from personaje import Personaje, Enemigo, Explosion
from constantes import SCREEN_WIDTH, COLOR_LASER, ASSETS_PATH

# Inicializa el juego

def mostrar_imagen_inicial(screen, imagen_path, duration):
    imagen = pygame.image.load(imagen_path).bonvert()
    imagen = pygame.transform.scale(image, (SCREEN_WIDTH, SCREEN_HEIGHT))

    # Bucle para mostra la imagen principal con una opacidad
    alpha = 255 # Transparencia inicial completa
    clock = pygame.time.Clock()

    tiempo_inicial = pygame.time.get_ticks()
    tiempo_total = duration # Duración en milisegundos de (8000 milisegundos para 8 segundos)
    while pygame.time.get_ticks() - tiempo_inical < tiempo_total:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit
                sys.exit()

    def main():
        keys = pygame.key.get_pressed()
        dx, dy = 0, 0
        if keys[pygame.K_LEFT]:
            dx = -5
        if keys[pygame.K_RIGHT]:
            dx = 5
        if keys[pygame.K_UP]:
            dy = -5
        if keys[pygame.K_DOWN]:
            dy = 5

        personaje.mover(dx, dy)

        if keys[pygame.K_SPACE]:
            personaje.lanzar_laser()
            sonido_laser.play()

        # Actualizar posición de enemigos y manejar las colisiones
        for enemigo in enemigos[:]:  # Iterar para eliminar de la lista principal
            enemigo.mover()
            if enemigo.rect.top > SCREEN_HEIGHT:
                enemigos.remove(enemigo)

        # Verificar colisión con el láser
        for laser in personaje.lasers[:]:
            if enemigo.rect.colliderect(laser.rect):
                explosiones.append(Explosion(enemigo.rect.centerx, enemigo.rect.centery))
                enemigos.remove(enemigo)  # Elimina al enemigo
                personaje.lasers.remove(laser)  # Elimina el láser
                sonido_explosion.play()
                puntos += 10  # incrementa el puntaje
                break  # sale del bucle

        if enemigo.rect.colliderect(personaje.shape):
            if not personaje.recibir_dano():
                running = False  # terminar el juego si la energía llega a 0

        # Generar enemigos de forma aleatoria
        if random.randint(1, 100) < 2:
            x = random.randint(1, SCREEN_WIDTH - 50)  # nos asegura de tener al enemigo dentro de la pantalla
            enemigo = Enemigo(x, 0)
            enemigos.append(enemigo)

        # Actualizar explosiones
        explosiones = [explosion for explosion in explosiones if explosion.actualizar()]

        # Actualizar el fondo cada 250 puntos
        if puntos > 0 and puntos % 250 == 0:
            if fondo_actual == fondo2:
                fondo_actual = fondo3
            else:
                fondo_actual = fondo2
            puntos += 10  # Aumenta puntos y cambia el fondo

        # Dibujar el fondo y objetos en la pantalla
        screen.blit(fondo_actual, (0, 0))
        personaje.dibujar(screen)
        for enemigo in enemigos:
            enemigo.dibujar(screen)
        for explosion in explosiones:
            explosion.dibujar(screen)
