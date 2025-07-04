export default class HandleInput {
    constructor(gamescreen) {
    this.outerpressed = false;
    this.innerpressed = false;


    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(e) {
        if (e.key === 'l' || e.key === 'L') {
            this.outerpressed = true;
        }
        if (e.key === 'a' || e.key === 'A') {
            this.outerpressed = true;
        }
        if (e.key === 'k' || e.key === 'K') {
            this.innerpressed = true;
        }
        if (e.key === 's' || e.key === 'S') {
            this.innerpressed = true;
        }
    }

    onKeyUp(e) {
        if (e.key === 'l' || e.key === 'L') {
            this.outerpressed = false;
        }
        if (e.key === 'a' || e.key === 'A') {
            this.outerpressed = false;
        }
        if (e.key === 'k' || e.key === 'K') {
            this.innerpressed = false;
        }
        if (e.key === 's' || e.key === 'S') {
            this.innerpressed = false;
        }
    }
}

