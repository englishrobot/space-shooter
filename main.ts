controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.runtime() - last_shot > 400) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 2 2 . . . . . . . . . . . 
            . . . 3 1 1 3 . . . . . . . . . 
            . . . 1 1 1 1 2 . . . . . . . . 
            . . 2 1 1 1 1 3 . . . . . . . . 
            3 2 2 1 1 1 1 3 . . . . . . . . 
            1 1 3 1 1 1 1 3 . . . . . . . . 
            3 2 2 1 1 1 1 3 . . . . . . . . 
            . . 2 1 1 1 1 3 . . . . . . . . 
            . . . 3 1 1 1 2 . . . . . . . . 
            . . . 3 1 1 3 . . . . . . . . . 
            . . . 2 2 . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, x_fighter, 150, 0)
        last_shot = game.runtime()
        music.pewPew.play()
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.warmRadial, 10)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let asteroid: Sprite = null
let projectile: Sprite = null
let last_shot = 0
let x_fighter: Sprite = null
scene.setBackgroundColor(15)
x_fighter = sprites.create(img`
    ..ccc.........ffffff....
    ..f4cc.......fcc22ff....
    ..f44cc...fffccccff.....
    ..f244cccc22224442cc....
    ..f224cc2222222244b9c...
    ..cf2222222222222b999c..
    .c22c222222222b11199b2c.
    f22ccccccc222299111b222c
    fffffcc222c222222222222f
    .....f2222442222222222f.
    ....f222244fc2222222ff..
    ...c222244ffffffffff....
    ...c2222cfffc2f.........
    ...ffffffff2ccf.........
    .......ffff2cf..........
    ........fffff...........
    `, SpriteKind.Player)
x_fighter.setStayInScreen(true)
controller.moveSprite(x_fighter, 120, 120)
last_shot = 0
info.setLife(5)
let statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
last_shot = game.runtime()
statusbar.attachToSprite(x_fighter, -25, 0)
statusbar.max = 400
statusbar.setColor(7, 2)
game.onUpdate(function () {
    statusbar.value = game.runtime() - last_shot
})
game.onUpdateInterval(500, function () {
    if (game.runtime() > 5000) {
        asteroid = sprites.createProjectileFromSide(img`
            . . . . . . c c c . . . . . . . 
            . . . . . a a a c c c . . . . . 
            . . . c a c f a a a a c . . . . 
            . . c a c f f f a f f a c . . . 
            . c c a c c f a a c f f a c . . 
            . a b a a c 6 a a c c f a c c c 
            . a b b b 6 a b b a a c a f f c 
            . . a b b a f f b b a a c f f c 
            c . a a a c c f c b a a c f a c 
            c c a a a c c a a a b b a c a c 
            a c a b b a a 6 a b b 6 b b c . 
            b a c b b b 6 b c . c c a c . . 
            b a c c a b b a c . . . . . . . 
            b b a c a b a a . . . . . . . . 
            a b 6 b b a c . . . . . . . . . 
            . a a b c . . . . . . . . . . . 
            `, -120, 0)
        asteroid.y = randint(0, 120)
    } else {
        asteroid = sprites.createProjectileFromSide(img`
            . . . . . . c c c . . . . . . . 
            . . . . . a a a c c c . . . . . 
            . . . c a c f a a a a c . . . . 
            . . c a c f f f a f f a c . . . 
            . c c a c c f a a c f f a c . . 
            . a b a a c 6 a a c c f a c c c 
            . a b b b 6 a b b a a c a f f c 
            . . a b b a f f b b a a c f f c 
            c . a a a c c f c b a a c f a c 
            c c a a a c c a a a b b a c a c 
            a c a b b a a 6 a b b 6 b b c . 
            b a c b b b 6 b c . c c a c . . 
            b a c c a b b a c . . . . . . . 
            b b a c a b a a . . . . . . . . 
            a b 6 b b a c . . . . . . . . . 
            . a a b c . . . . . . . . . . . 
            `, -70, 0)
        asteroid.y = randint(0, 120)
    }
    asteroid.setKind(SpriteKind.Enemy)
})
