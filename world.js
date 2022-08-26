class World {
    constructor({ gravity, onGameOver }) {
        this.gravity = gravity;
        this.sprites = new Map();
        this.destroyIds = [];
        this.onGameOver = onGameOver;
    }

    add_sprite(sprite) {
        const id = Math.random().toString().slice(2);
        this.sprites.set(id, sprite);
    }

    remove_sprite(id) {
        this.sprites.delete(id)
    }

    update({ onUpdate }) {
        let birdId = null;
        let bird = null;
        this.sprites.forEach((sprite, id) => {
            if (!birdId) {
                birdId = id;
                bird = sprite;
                sprite.update({ gravity: this.gravity });
            }
            else {
                let collided = sprite.update({ gravity: this.gravity, checkCollisionWith: bird });
                if (collided) this.gameOver();
            }
            if (sprite.destroyed) {
                this.destroyIds.push(id);
                onUpdate();
            }
        });
        this.destroy();
    }

    render() {
        this.sprites.forEach(sprite => sprite.render());
    }

    gameOver() {
        this.onGameOver();
    }

    destroy() {
        this.destroyIds.forEach(id => this.sprites.delete(id));
        this.destroyIds = [];
    }
};

export default World;