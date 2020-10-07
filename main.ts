namespace SpriteKind {
    export const boss = SpriteKind.create()
    export const beam = SpriteKind.create()
}
function laser_beam () {
    laser = sprites.create(img`
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        33333
        `, SpriteKind.beam)
    laser.z = -1
    laser.follow(big_boss, 100)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . 6 6 6 5 5 6 6 6 . . . . 
        . . . 7 7 7 7 6 6 6 6 6 6 . . . 
        . . 6 7 7 7 7 8 8 8 1 1 6 6 . . 
        . . 7 7 7 7 7 8 8 8 1 1 5 6 . . 
        . 6 7 7 7 7 8 8 8 8 8 5 5 6 6 . 
        . 6 7 7 7 8 8 8 6 6 6 6 5 6 6 . 
        . 6 6 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . 6 8 7 7 8 8 6 6 6 6 6 6 6 6 . 
        . . 6 8 7 7 8 6 6 6 6 6 8 6 . . 
        . . 6 8 8 7 8 8 6 6 6 8 6 6 . . 
        . . . 6 8 8 8 8 8 8 8 8 6 . . . 
        . . . . 6 6 8 8 8 8 6 6 . . . . 
        . . . . . . 6 6 6 6 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spaceship, 0, -100)
})
sprites.onOverlap(SpriteKind.beam, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(false, effects.splatter)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy(effects.fire, 100)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.boss, function (sprite, otherSprite) {
    boss_life += -1
    sprite.destroy(effects.fire, 100)
    if (boss_life == 0) {
        laser.destroy(effects.fire, 100)
        info.changeScoreBy(10)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy(effects.trail, 100)
    music.baDing.play()
    info.changeScoreBy(1)
})
let astroid: Sprite = null
let astro_type = 0
let boss_life = 0
let projectile: Sprite = null
let big_boss: Sprite = null
let laser: Sprite = null
let spaceship: Sprite = null
info.setLife(3)
info.setScore(0)
let astro_list = [img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . a b a a . . . . . . 
    . . . . . c b a f c a c . . . . 
    . . . . c b b b f f a c c . . . 
    . . . . b b f a b b a a c . . . 
    . . . . c b f f b a f c a . . . 
    . . . . . c a a c b b a . . . . 
    . . . . . . c c c c . . . . . . 
    . . . . . . . c . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, img`
    . . . . . . . . . c c 8 . . . . 
    . . . . . . 8 c c c f 8 c c . . 
    . . . c c 8 8 f c a f f f c c . 
    . . c c c f f f c a a f f c c c 
    8 c c c f f f f c c a a c 8 c c 
    c c c b f f f 8 a c c a a a c c 
    c a a b b 8 a b c c c c c c c c 
    a f c a a b b a c c c c c f f c 
    a 8 f c a a c c a c a c f f f c 
    c a 8 a a c c c c a a f f f 8 a 
    . a c a a c f f a a b 8 f f c a 
    . . c c b a f f f a b b c c 6 c 
    . . . c b b a f f 6 6 a b 6 c . 
    . . . c c b b b 6 6 a c c c c . 
    . . . . c c a b b c c c . . . . 
    . . . . . c c c c c c . . . . . 
    `, img`
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
    `, img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . c c . . . . . . . . 
    . . . . c a f b c . . . . . . . 
    . . . . b f f b c c . . . . . . 
    . . . a a f b a b a c . . . . . 
    . . . c a c b b f f b . . . . . 
    . . . . b f f b f a b . . . . . 
    . . . . a f f b b b a . . . . . 
    . . . . . a b b c c . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `]
let astro_speed = 0
let astro_pos = 0
spaceship = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 2 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . e 2 . . . . . . . 
    . . . . . . e e 4 e . . . . . . 
    . . . . . . e 2 4 e . . . . . . 
    . . . . . c c c e e e . . . . . 
    . . . . e e 2 2 2 4 e e . . . . 
    . . c f f f c c e e f f e e . . 
    . c c c c e e 2 2 2 2 4 2 e e . 
    c c c c c c e e 2 2 2 4 2 2 e e 
    c c c c c c e e 2 2 2 2 4 2 e e 
    `, SpriteKind.Player)
spaceship.y = scene.screenHeight() - 10
controller.moveSprite(spaceship, 50, 50)
spaceship.setFlag(SpriteFlag.StayInScreen, true)
game.onUpdate(function () {
    if (big_boss.top > 0) {
        big_boss.top = 0
        big_boss.vy = 0
        big_boss.vx = 10
        laser_beam()
    }
    if (big_boss.right > scene.screenWidth()) {
        big_boss.vx = -20
    } else if (big_boss.left <= 0) {
        big_boss.vx = 20
    }
    if (boss_life == 0) {
        big_boss.destroy(effects.coolRadial, 500)
    }
})
game.onUpdateInterval(1000, function () {
    astro_type = randint(0, 3)
    astro_pos = randint(0, scene.screenWidth())
    astroid = sprites.create(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, SpriteKind.Enemy)
    astroid.x = astro_pos
    astroid.y = -10
    if (astro_type == 0) {
        astro_speed = 100
        astroid.setImage(astro_list[astro_type])
        astroid.ay = astro_speed
    } else if (astro_type == 1) {
        astro_speed = 200
        astroid.setImage(astro_list[astro_type])
        astroid.ay = astro_speed
    } else if (astro_type == 2) {
        astro_speed = 50
        astroid.setImage(astro_list[astro_type])
        astroid.ay = astro_speed
    } else if (astro_type == 3) {
        astro_speed = 60
        astroid.setImage(astro_list[astro_type])
        astroid.ay = astro_speed
    }
})
game.onUpdateInterval(20000, function () {
    big_boss = sprites.create(img`
        ........................................
        ........................................
        ........................................
        ........................................
        ..........aaaaaaaaaaa...................
        .........aaaaaaaaaaaaa..................
        .......aaaaaaaaaaaaaaaaa................
        ......aaaaaaaaaaaaaaaaaaa...............
        .....aaaaaaaaaaaaaaaaaaaaa..............
        .....aaaaaa1111111aaaaaaaa..............
        ....aaaaa11111111111aaaaaaa.............
        ...aaaaa1111111111111aaaaaaa............
        ...aaaaa111fffffff111aaaaaaa............
        ...aaaa111fffffffff111aaaaaa............
        ...aaaa111ff1ffffff111aaaaaa............
        ...aaaa111fffffffff111aaaaaa............
        ...aaaa111fffffffff111aaaaaa............
        ...aaaa111fffffffff111aaaaaa............
        ...aaaa111fffffffff111aaaaaa............
        ...aaaa111fffffffff111aaaaaa............
        ...aaaaa111fffffff111aaaaaaa............
        ...aaaaa1111111111111aaaaaaa............
        ....aaaaa11111111111aaaaaac.............
        .....aaaaaa1111111aaaaaaac..............
        .....aaaaaaaaaaaaaaaaaaaac..............
        ......aaaaaaaaaaaaaaaaaaccaac...........
        .....aaaaaaaaaaaaaaaaccc..aaaac.........
        ....aaa..aaaaaaaaaaaacc......aaac.......
        ...aaa....aaaaaaacccc.aac......aaac.....
        ..aaa.....aa..aa..ac...aac......aaa.....
        .aaa.....aaa..aa..aac...aaac............
        .a......aaa..aaa...aaac..aaac...........
        ........aa...aa.....aaac..aaa...........
        .......aaa..aaa......aaa................
        .......aa...aa..........................
        ........................................
        ........................................
        ........................................
        ........................................
        ........................................
        `, SpriteKind.boss)
    boss_life = 5
    big_boss.y = -16
    big_boss.vy = 20
})
