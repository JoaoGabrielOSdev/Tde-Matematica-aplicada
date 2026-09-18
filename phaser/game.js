const GAME_WIDTH = 1100;
const GAME_HEIGHT = 650;

class GeometryScene extends Phaser.Scene {
  constructor() {
    super("GeometryScene");
  }

  create() {
    this.score = 0;
    this.lives = 3;
    this.totalFragments = 8;
    this.isInvulnerable = false;
    this.isFinished = false;

    this.createTextures();
    this.drawArena();
    this.createHud();
    this.createPlayer();
    this.createObstacles();
    this.createFragments();
    this.createPortal();
    this.createEnemies();
    this.createControls();
    this.createPhysics();

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard.off("keydown-R", this.restartGame, this);
      this.tweens.killAll();
    });
  }

  createTextures() {
    this.makeCircleTexture("player", 42, 20, 0x58a6ff);
    this.makeCircleTexture("fragment", 24, 12, 0xffd166);
    this.makeCircleTexture("enemy", 36, 17, 0xff6b8a);
    this.makePortalTexture();
  }

  makeCircleTexture(key, size, radius, color) {
    if (this.textures.exists(key)) return;

    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(color, 1);
    graphics.fillCircle(size / 2, size / 2, radius);
    graphics.lineStyle(2, 0xffffff, 0.48);
    graphics.strokeCircle(size / 2, size / 2, radius - 1);
    graphics.generateTexture(key, size, size);
    graphics.destroy();
  }

  makePortalTexture() {
    if (this.textures.exists("portal")) return;

    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.lineStyle(5, 0x9b7bff, 1);
    graphics.strokeCircle(30, 30, 23);
    graphics.lineStyle(2, 0xd8ccff, 0.7);
    graphics.strokeCircle(30, 30, 14);
    graphics.generateTexture("portal", 60, 60);
    graphics.destroy();
  }

  drawArena() {
    this.add.rectangle(550, 325, GAME_WIDTH, GAME_HEIGHT, 0x0c1426);

    const grid = this.add.graphics();
    grid.lineStyle(1, 0x233452, 0.34);
    for (let x = 50; x < GAME_WIDTH; x += 50) {
      grid.lineBetween(x, 0, x, GAME_HEIGHT);
    }
    for (let y = 50; y < GAME_HEIGHT; y += 50) {
      grid.lineBetween(0, y, GAME_WIDTH, y);
    }

    const glow = this.add.graphics();
    glow.fillStyle(0x58a6ff, 0.05);
    glow.fillCircle(170, 530, 180);
    glow.fillStyle(0x9b7bff, 0.05);
    glow.fillCircle(930, 120, 210);

    this.add.text(36, 612, "MOVIMENTE-SE  •  COLETE  •  ALCANCE O PORTAL", {
      color: "#7585a0",
      fontFamily: "Arial, sans-serif",
      fontSize: "12px",
      fontStyle: "bold",
      letterSpacing: 1.5,
    });
  }

  createHud() {
    this.add.rectangle(550, 45, GAME_WIDTH - 48, 64, 0x111c33, 0.94)
      .setStrokeStyle(1, 0x314566, 0.9);

    this.add.text(38, 25, "GEOMETRIA EM AÇÃO", {
      color: "#f8fafc",
      fontFamily: "Arial, sans-serif",
      fontSize: "17px",
      fontStyle: "bold",
    });
    this.add.text(38, 53, "EXEMPLO PRÁTICO COM PHASER 3", {
      color: "#7585a0",
      fontFamily: "Arial, sans-serif",
      fontSize: "10px",
      fontStyle: "bold",
      letterSpacing: 1.2,
    });

    this.scoreText = this.add.text(660, 30, "FRAGMENTOS  0 / 8", {
      color: "#ffd166",
      fontFamily: "Arial, sans-serif",
      fontSize: "15px",
      fontStyle: "bold",
    });
    this.statusText = this.add.text(660, 58, "Colete os fragmentos amarelos", {
      color: "#a8b3c7",
      fontFamily: "Arial, sans-serif",
      fontSize: "11px",
    });
    this.livesText = this.add.text(940, 38, "● ● ●", {
      color: "#58a6ff",
      fontFamily: "Arial, sans-serif",
      fontSize: "17px",
      fontStyle: "bold",
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 535, "player");
    this.player.setDepth(3);
    this.player.body.setCircle(18, 3, 3);
    this.player.setCollideWorldBounds(true);
  }

  createObstacles() {
    this.obstacles = this.physics.add.staticGroup();
    const rectangles = [
      [270, 170, 230, 22],
      [710, 175, 220, 22],
      [260, 370, 185, 22],
      [675, 390, 240, 22],
      [535, 270, 22, 120],
    ];

    rectangles.forEach(([x, y, width, height]) => {
      const obstacle = this.add.rectangle(x, y, width, height, 0x243553)
        .setStrokeStyle(1, 0x52709c, 0.8);
      this.physics.add.existing(obstacle, true);
      this.obstacles.add(obstacle);
    });
  }

  createFragments() {
    this.fragments = this.physics.add.group({ allowGravity: false, immovable: true });
    const positions = [
      [135, 125], [470, 125], [870, 120], [165, 290],
      [470, 520], [620, 225], [850, 300], [965, 510],
    ];

    positions.forEach(([x, y], index) => {
      const fragment = this.fragments.create(x, y, "fragment");
      fragment.setDepth(2);
      fragment.body.setCircle(10, 2, 2);
      fragment.setData("index", index + 1);
      this.tweens.add({
        targets: fragment,
        y: y - 8,
        duration: 700 + index * 90,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    });
  }

  createPortal() {
    this.portal = this.physics.add.staticSprite(1015, 105, "portal");
    this.portal.setAlpha(0.42);
    this.portal.setScale(0.9);
    this.tweens.add({
      targets: this.portal,
      angle: 360,
      duration: 2800,
      repeat: -1,
      ease: "Linear",
    });
  }

  createEnemies() {
    this.enemies = this.physics.add.group({ allowGravity: false, bounceX: 1, bounceY: 1 });
    const enemyData = [
      [610, 135, 110, 0],
      [380, 470, 0, -95],
      [875, 500, -90, 0],
    ];

    enemyData.forEach(([x, y, velocityX, velocityY]) => {
      const enemy = this.enemies.create(x, y, "enemy");
      enemy.setDepth(2);
      enemy.body.setCircle(15, 3, 3);
      enemy.setVelocity(velocityX, velocityY);
      enemy.setCollideWorldBounds(true);
      this.tweens.add({
        targets: enemy,
        angle: 360,
        duration: 1400,
        repeat: -1,
        ease: "Linear",
      });
    });
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys("W,A,S,D");
    this.input.keyboard.on("keydown-R", this.restartGame, this);
  }

  restartGame() {
    this.scene.restart();
  }

  createPhysics() {
    this.physics.add.collider(this.player, this.obstacles);
    this.physics.add.collider(this.enemies, this.obstacles);
    this.physics.add.overlap(this.player, this.fragments, this.collectFragment, undefined, this);
    this.physics.add.overlap(this.player, this.portal, this.tryFinish, undefined, this);
    this.physics.add.collider(this.player, this.enemies, this.hitEnemy, undefined, this);
  }

  update() {
    if (this.isFinished) return;

    const speed = 230;
    let velocityX = 0;
    let velocityY = 0;
    if (this.cursors.left.isDown || this.keys.A.isDown) velocityX = -speed;
    if (this.cursors.right.isDown || this.keys.D.isDown) velocityX = speed;
    if (this.cursors.up.isDown || this.keys.W.isDown) velocityY = -speed;
    if (this.cursors.down.isDown || this.keys.S.isDown) velocityY = speed;

    this.player.setVelocity(velocityX, velocityY);
    if (velocityX !== 0 || velocityY !== 0) this.player.rotation += 0.04;
  }

  collectFragment(player, fragment) {
    fragment.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText(`FRAGMENTOS  ${this.score} / ${this.totalFragments}`);

    if (this.score === this.totalFragments) {
      this.statusText.setText("Portal ativado! Encontre o círculo roxo").setColor("#bbaaff");
      this.portal.setAlpha(1);
      this.tweens.add({ targets: this.portal, scale: 1.1, duration: 500, yoyo: true, repeat: -1 });
    } else {
      this.statusText.setText(`${this.totalFragments - this.score} fragmento(s) restante(s)`);
    }
  }

  tryFinish() {
    if (this.score < this.totalFragments) return;

    this.isFinished = true;
    this.player.setVelocity(0, 0);
    this.statusText.setText("Fase concluída com sucesso!").setColor("#8ff0c1");
    this.showFinishPanel();
  }

  hitEnemy() {
    if (this.isInvulnerable || this.isFinished) return;

    this.isInvulnerable = true;
    this.lives -= 1;
    this.livesText.setText("● ".repeat(this.lives).trim() || "—");
    this.cameras.main.shake(180, 0.008);
    this.player.setPosition(100, 535);
    this.player.setVelocity(0, 0);
    this.player.setAlpha(0.38);

    if (this.lives <= 0) {
      this.statusText.setText("Você ficou sem vidas. Pressione R para tentar novamente.").setColor("#ff9cae");
      this.isFinished = true;
      return;
    }

    this.statusText.setText(`Cuidado! Você ainda tem ${this.lives} vida(s)`);
    this.time.delayedCall(1400, () => {
      this.isInvulnerable = false;
      this.player.setAlpha(1);
    });
  }

  showFinishPanel() {
    this.add.rectangle(550, 325, 440, 210, 0x0b1020, 0.96)
      .setStrokeStyle(2, 0x9b7bff, 0.9).setDepth(10);
    this.add.text(550, 274, "FASE CONCLUÍDA", {
      color: "#f8fafc", fontFamily: "Arial, sans-serif", fontSize: "27px", fontStyle: "bold",
    }).setOrigin(0.5).setDepth(11);
    this.add.text(550, 320, "Você usou movimento, colisões e física 2D\npara completar o desafio.", {
      align: "center", color: "#a8b3c7", fontFamily: "Arial, sans-serif", fontSize: "14px", lineSpacing: 8,
    }).setOrigin(0.5).setDepth(11);
    this.add.text(550, 386, "JOGAR NOVAMENTE  (R)", {
      backgroundColor: "#6d53c7", color: "#ffffff", fontFamily: "Arial, sans-serif", fontSize: "13px",
      fontStyle: "bold", padding: { left: 18, right: 18, top: 10, bottom: 10 },
    }).setOrigin(0.5).setDepth(11).setInteractive({ useHandCursor: true })
      .on("pointerdown", this.restartGame, this);
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: "#0c1426",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [GeometryScene],
};

new Phaser.Game(config);
