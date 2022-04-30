from re import X
from .weapon import Sword
from .weapon import Bow
from .weapon import Torch
from .treasure import Treasure
import random

tile = "👣"

class Player:
    _damage = 0


    def __init__(self, symbol="🤠"):
        self._symbol = symbol
        self._x = None
        self._y = None
        self._randx = None
        self._randy = None

    def initPos(self, _map):
        n_row = len(_map)
        n_col = len(_map[0])

        y_init = n_row//2
        found = False
        while found is False:
            y_init += 1
            for i,c in enumerate(_map[y_init]):
                if c == "👣":
                    x_init = i
                    found = True
                    break

        y = random.randint(0, n_row-1)
        x = random.randint(0, n_col-1)

        while _map[y][x] != '👣' :
            y = random.randint(0, n_row-1)
            x = random.randint(0, n_col-1)

        self._randx = x
        self._randy = y
        print(x)
        print(y)

        self._x = x_init
        self._y = y_init

        _map[self._y][self._x] = self._symbol

    def move(self, dx, dy, map):
        n_row, n_col = len(map), len(map[0])
        new_x = self._x + dx
        new_y = self._y + dy
        if map[new_y][new_x] == "👣" or map[new_y][new_x] == '🧪' or map[new_y][new_x] == '🪖' or map[new_y][new_x] == '💸':
            ret =True
            map[new_y][new_x] = self._symbol
            map[self._y][self._x] = tile
            data = [{"i": f"{self._y}", "j":f"{self._x}", "content":tile}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            self._x = new_x
            self._y = new_y
            if new_y == self._randy and new_x == self._randx :
                delta_x = random.randint(0, n_col - 1)
                delta_y = random.randint(0, n_row - 1)
                while map[delta_y][delta_x] != '👣':
                    delta_x = random.randint(0, n_col - 1)
                    delta_y = random.randint(0, n_row - 1)
                map[delta_y][delta_x] = '💸'
                data = [{"i": f"{delta_y}", "j":f"{delta_x}", "content":'💸'}]
        elif map[new_y][new_x] == "🗡" :
            ret =True
            map[new_y][new_x] = self._symbol
            if self._damage == Torch._damage :
                map[self._y][self._x] = "🔥"
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":"🔥 "}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            if self._damage == Bow._damage :
                map[self._y][self._x] = "🏹"
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":"🏹 "}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            if self._damage == 0 :
                map[self._y][self._x] = tile
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":tile}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            self._x = new_x
            self._y = new_y
            self._damage = Sword._damage
        elif map[new_y][new_x] == "🔥" :
            ret =True
            map[new_y][new_x] = self._symbol
            if self._damage == Sword._damage :
                map[self._y][self._x] = "🗡"
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":"🗡 "}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            if self._damage == Bow._damage :
                map[self._y][self._x] = "🏹"
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":"🏹 "}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            if self._damage == 0 :
                map[self._y][self._x] = tile
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":tile}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            self._x = new_x
            self._y = new_y
            self._damage = Torch._damage
        elif map[new_y][new_x] == "🏹" :
            ret =True
            map[new_y][new_x] = self._symbol
            if self._damage == Sword._damage :
                map[self._y][self._x] = "🗡"
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":"🗡 "}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            if self._damage == Torch._damage :
                map[self._y][self._x] = "🔥"
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":"🔥 "}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            if self._damage == 0 :
                map[self._y][self._x] = tile
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":tile}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
            self._x = new_x
            self._y = new_y
            self._damage = Bow._damage
        elif map[new_y][new_x] == "🐍" :
            if self._damage > 1 :
                ret =True
                map[new_y][new_x] = self._symbol
                map[self._y][self._x] = tile
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":tile}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
                self._x = new_x
                self._y = new_y
        elif map[new_y][new_x] == "👹" :
            if self._damage > 5 :
                ret =True
                map[new_y][new_x] = self._symbol
                map[self._y][self._x] = tile
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":tile}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
                self._x = new_x
                self._y = new_y
        elif map[new_y][new_x] == "🧟‍♀️" :
            if self._damage == 5 :
                ret =True
                map[new_y][new_x] = self._symbol
                map[self._y][self._x] = tile
                data = [{"i": f"{self._y}", "j":f"{self._x}", "content":tile}, {"i": f"{new_y}", "j":f"{new_x}", "content":self._symbol}]
                self._x = new_x
                self._y = new_y
        else:
            ret = False
            data = []
        return data, ret