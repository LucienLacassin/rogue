from .map_generator import Generator
from .player import Player
from .monster import Snake
from .monster import Monster
from .monster import Zombie
from .weapon import Sword
from .weapon import Bow
from .weapon import Torch
from .treasure import Treasure
from .Potion import Potion
from .armor import Armure
import random


class Game:
    def __init__(self, width=50, height=35):
        self._generator = Generator(width=width, height=height)
        self._generator.gen_level()
        self._generator.gen_tiles_level()
        self._map = self._generator.tiles_level

        self._player = Player()
        self._player.initPos( self._map )
        for _ in range (35) :
            self._monster = Snake()
            self._monster.initPos( self._map )
        for _ in range (7) :
            self._monster = Zombie()
            self._monster.initPos( self._map )
        for _ in range (15) :
            self._monster = Monster()
            self._monster.initPos( self._map )
        for _ in range (4) :
            self._potion = Potion()
            self._potion.initPos( self._map )
        self._weapon = Sword()
        self._weapon.initPos( self._map )
        self._weapon = Bow()
        self._weapon.initPos( self._map )
        self._weapon = Torch()
        self._weapon.initPos( self._map )
        for _ in range (3) :
            self._armor = Armure()
            self._armor.initPos( self._map )


    def getMap(self):
        return self._map

    def move(self, dx, dy) :
        return self._player.move(dx, dy, self._map)