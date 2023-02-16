export class MainView extends Phaser.GameObjects.Container {
    #bkg;
    #bird;

    constructor(scene) {
        super(scene);
        this.#build();
    }

    update() {
        const { height } = this.scene.scale;
        if (this.#bird && this.#bird.y > height - this.#bird.height / 2) {
            this.scene.physics.world.disable(this.#bird);
            this.#bkg.disableInteractive();
        }
    }

    #build() {
        this.#buildBkg();
        this.#buildBird();
    }

    #buildBkg() {
        this.#bkg = this.scene.add.image(0, 0, "bkg");
        this.#bkg.setOrigin(0);
        this.#bkg.setInteractive();
        this.#bkg.on("pointerdown", this.#onBkgClick, this);
        this.add(this.#bkg);
    }

    #buildBird() {
        const { width, height } = this.scene.scale;
        this.#bird = this.scene.add.image(width * 0.2, height / 2, "bird");
        this.scene.physics.add.existing(this.#bird);
        this.add(this.#bird);
    }

    #onBkgClick() {
        this.#bird.x += 10;
    }
}
