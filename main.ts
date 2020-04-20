sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (sprites.readDataNumber(otherSprite, "welk") == 1) {
        mySprite.startEffect(effects.blizzard, 500)
        otherSprite.destroy()
        info.changeScoreBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let sprite_list: Sprite[] = []
let seite = 0
let baum: Sprite = null
let blume: Sprite = null
let mySprite: Sprite = null
scene.setBackgroundColor(6)
mySprite = sprites.create(img`
. . . . . f 1 f 1 f . . . . . . 
. . . . . f 1 f 1 f . . . . . . 
. . . . . f 1 f 1 f . . . . . . 
. . . . . f f f f f . . . . . . 
. . . . . f 9 9 9 f . . . . . . 
. . . . . f 9 9 9 f . . . . . . 
. . . . . f 9 f 9 f . . . . . . 
. . . . . f 9 9 9 f . . . . . . 
. . f f f f 9 9 9 f f f f . . . 
. . f . . f f f f f . . f . . . 
. . f . . f . . . f . . f . . . 
. f f f . f . . . f . f f f . . 
. . f . . f . . . f . . f . . . 
. . . . . f . . . f . . . . . . 
. . . . . f . . . f . . . . . . 
. . . . . f . . . f . . . . . . 
`, SpriteKind.Player)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
mySprite.z = 10
controller.moveSprite(mySprite)
game.onUpdateInterval(1200, function () {
    blume = sprites.create(img`
. . 5 5 5 . . . 
. 5 5 5 5 5 . . 
. 5 5 e 5 5 . . 
. 5 5 5 5 5 . . 
. . 5 5 5 . . . 
. . . 7 . . . . 
. 7 7 7 7 7 . . 
. . . 7 . . . . 
`, SpriteKind.Food)
    mySprite.z = 5
    blume.setPosition(Math.randomRange(0, scene.screenWidth()), Math.randomRange(0, scene.screenHeight()))
    sprites.setDataNumber(blume, "ts", game.runtime())
    sprites.setDataNumber(blume, "welk", 0)
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(50)) {
        baum = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . 7 7 7 7 7 7 . . . . . 
. . . . 7 7 . . . . . 7 . . . . 
. . . . 7 . . . . . . 7 . . . . 
. . . . . 7 . . . . . 7 . . . . 
. . . . . . 7 . . . . 7 . . . . 
. . . . . . . 7 7 7 7 . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Enemy)
        seite = Math.randomRange(0, 3)
        if (seite == 0) {
            baum.setVelocity(Math.randomRange(-30, 30), Math.randomRange(5, 30))
            baum.setPosition(Math.randomRange(0, scene.screenWidth()), 0)
        } else if (seite == 1) {
            baum.setVelocity(Math.randomRange(-30, -5), Math.randomRange(-30, 30))
            baum.setPosition(scene.screenWidth(), Math.randomRange(0, scene.screenHeight()))
        } else if (seite == 2) {
            baum.setVelocity(Math.randomRange(-30, 30), Math.randomRange(-30, -5))
            baum.setPosition(Math.randomRange(0, scene.screenWidth()), scene.screenHeight())
        } else {
            baum.setVelocity(Math.randomRange(5, 30), Math.randomRange(-30, 30))
            baum.setPosition(0, Math.randomRange(0, scene.screenHeight()))
        }
    }
})
game.onUpdateInterval(700, function () {
    sprite_list = sprites.allOfKind(SpriteKind.Food)
    for (let Wert of sprite_list) {
        if (game.runtime() - sprites.readDataNumber(Wert, "ts") > 5000) {
            Wert.setImage(img`
. . . . . . . . 
. 1 . 1 . 1 . . 
. . 1 1 1 . . . 
. 1 1 7 1 1 . . 
. . 1 1 1 . . . 
. 1 . 1 . 1 . . 
. . . 7 . . . . 
. . . 7 . . . . 
`)
            sprites.setDataNumber(Wert, "welk", 1)
        }
    }
})
