import Board from './Board';

export default class GamePlay {
  constructor(boardSize = 4) {
    this.board = new Board();
    this.boardSize = boardSize;
    this.index = null;
  }

  init() {
    document.body.appendChild(this.board.createBoard(this.boardSize));
    this.cells = [...document.querySelectorAll('.cell')];
    // eslint-disable-next-line prefer-destructuring
    this.img = document.images[0];
    this.greeting = document.querySelector('.greeting');
    this.counters = document.querySelector('.counters');
    this.gameOver = document.querySelector('.game-over');
    this.newGame = document.querySelector('.start-game');
    this.stopGame = document.querySelector('.stop-game');
    this.hitCounter = document.querySelector('.hit');
    this.missCounter = document.querySelector('.miss');
    this.wrapper = document.querySelector('.wrapper');
    this.newGame.addEventListener('click', () => this.start());
    this.stopGame.addEventListener('click', () => this.stop());
    this.clickCounterFunc = this.clickCounter.bind(this);
  }

  getIndex() {
    this.countCheck = false;
    let index = null;
    do {
      index = Math.floor(Math.random() * (this.boardSize ** 2));
    } while (index === this.index);
    return index;
  }

  generateGoblin() {
    if (this.index || this.index === 0) {
      this.cells[this.index].classList.remove('active');
      this.cells[this.index].innerHTML = '';
    }
    this.index = this.getIndex();
    const currentСell = this.cells[this.index];
    currentСell.classList.add('active');
    currentСell.appendChild(this.img);
  }

  start() {
    this.greeting.classList.add('display_none');
    this.gameOver.classList.add('display_none');
    this.newGame.classList.add('display_none');
    this.wrapper.classList.add('wrapper_active');
    this.counters.classList.remove('display_none');
    this.stopGame.classList.remove('display_none');
    this.hit = 0;
    this.miss = 0;
    this.redrawGameScore();
    this.generateGoblin();
    this.eventListener();
    this.interval = setInterval(() => {
      if (!this.countCheck) {
        this.miss += 1;
        this.redrawGameScore();
        this.checkGameOver();
      }
      this.generateGoblin();
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.wrapper.removeEventListener('click', this.clickCounterFunc);
    this.greeting.classList.add('display_none');
    this.gameOver.classList.add('display_none');
    this.stopGame.classList.add('display_none');
    this.counters.classList.remove('display_none');
    this.newGame.classList.remove('display_none');
    this.wrapper.classList.remove('wrapper_active');
  }

  eventListener() {
    this.wrapper.addEventListener('click', this.clickCounterFunc);
  }

  clickCounter(e) {
    this.checkClick(e.target);
    this.redrawGameScore();
    this.checkGameOver();
  }

  redrawGameScore() {
    this.hitCounter.textContent = this.hit;

    this.missCounter.textContent = this.miss;
  }

  checkClick(e) {
    if (e.closest('.active')) {
      this.hit += 1;
    } else {
      this.miss += 1;
    }
    this.countCheck = true;
  }

  checkGameOver() {
    if (this.miss > 4) {
      clearInterval(this.interval);
      this.wrapper.removeEventListener('click', this.clickCounterFunc);
      this.counters.classList.add('display_none');
      this.stopGame.classList.add('display_none');
      this.gameOver.classList.remove('display_none');
      this.newGame.classList.remove('display_none');
      this.wrapper.classList.remove('wrapper_active');
    }
  }
}
