import random

class Sword ():
    _damage = 3

    def __init__(self, symbol='🗡'):
        self._symbol = symbol
        self._x = None
        self._y = None

    def initPos(self, _map):
        n_row = len(_map)
        n_col = len(_map[0])

        y_init = random.randint(0, n_row-1)
        x_init = random.randint(0, n_col-1)

        while _map[y_init][x_init] != '👣' :
            y_init = random.randint(0, n_row-1)
            x_init = random.randint(0, n_col-1)
        
        self._x = x_init
        self._y = y_init

        _map[self._y][self._x] = self._symbol

class Bow ():
    _damage = 6

    def __init__(self, symbol='🏹'):
        self._symbol = symbol
        self._x = None
        self._y = None

    def initPos(self, _map):
        n_row = len(_map)
        n_col = len(_map[0])

        y_init = random.randint(0, n_row-1)
        x_init = random.randint(0, n_col-1)

        while _map[y_init][x_init] != '👣' :
            y_init = random.randint(0, n_row-1)
            x_init = random.randint(0, n_col-1)
        
        self._x = x_init
        self._y = y_init

        _map[self._y][self._x] = self._symbol

class Torch ():
    _damage = 5

    def __init__(self, symbol='🔥'):
        self._symbol = symbol
        self._x = None
        self._y = None

    def initPos(self, _map):
        n_row = len(_map)
        n_col = len(_map[0])

        y_init = random.randint(0, n_row-1)
        x_init = random.randint(0, n_col-1)

        while _map[y_init][x_init] != '👣' :
            y_init = random.randint(0, n_row-1)
            x_init = random.randint(0, n_col-1)
        
        self._x = x_init
        self._y = y_init

        _map[self._y][self._x] = self._symbol