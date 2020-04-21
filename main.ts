sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    if (sprites.readDataNumber(otherSprite, "welk") == 1) {
        sprite_list = sprites.allOfKind(SpriteKind.Food)
        welkeBlumen = 0
        for (let Wert of sprite_list) {
            if (sprites.readDataNumber(Wert, "welk") == 1) {
                welkeBlumen += 1
            }
        }
        mySprite.startEffect(effects.blizzard, 500)
        otherSprite.destroy()
        info.changeScoreBy(1)
        if (welkeBlumen == 1) {
            game.over(true)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.over(false)
    }
})
function plantFlower () {
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
    blume.setPosition(Math.randomRange(5, scene.screenWidth()), Math.randomRange(5, scene.screenHeight()))
    sprites.setDataNumber(blume, "ts", game.runtime())
    sprites.setDataNumber(blume, "welk", 0)
}
let baum: Sprite = null
let blume: Sprite = null
let sprite_list: Sprite[] = []
let mySprite: Sprite = null
let welkeBlumen: number
let seite = 1
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
info.setLife(5)
plantFlower()
plantFlower()
game.onUpdateInterval(1500, function () {
    plantFlower()
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(30)) {
        baum = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . 7 7 7 7 7 . . . . . . 
. . . 7 7 7 7 7 7 7 7 7 . . . . 
. . . 7 7 7 7 7 7 7 7 7 7 . . . 
. . 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
. . 7 7 7 7 7 7 7 7 7 7 7 7 7 . 
. . . . . . . 7 7 7 7 7 . . . . 
. . . . . . . e e . . . . . . . 
. . . . . . . e e . . . . . . . 
. . . . . . . e e . . . . . . . 
. . . . . . . e e . . . . . . . 
. . . . . . . e e . . . . . . . 
. . . . . . . e e . . . . . . . 
`, SpriteKind.Enemy)
        seite = Math.randomRange(0, 3)
        if (seite == 0) {
            baum.setVelocity(Math.randomRange(-20, 20), Math.randomRange(5, 20))
            baum.setPosition(Math.randomRange(0, scene.screenWidth()), 0)
        } else if (seite == 1) {
            baum.setVelocity(Math.randomRange(-20, -5), Math.randomRange(-20, 20))
            baum.setPosition(scene.screenWidth(), Math.randomRange(0, scene.screenHeight()))
        } else if (seite == 2) {
            baum.setVelocity(Math.randomRange(-20, 20), Math.randomRange(-20, -5))
            baum.setPosition(Math.randomRange(0, scene.screenWidth()), scene.screenHeight())
        } else {
            baum.setVelocity(Math.randomRange(5, 20), Math.randomRange(-20, 20))
            baum.setPosition(0, Math.randomRange(0, scene.screenHeight()))
        }
    }
})
game.onUpdateInterval(700, function () {
    sprite_list = sprites.allOfKind(SpriteKind.Food)
    for (let Wert2 of sprite_list) {
        if (game.runtime() - sprites.readDataNumber(Wert2, "ts") > 5000) {
            Wert2.setImage(img`
. . . . . . . . 
. 1 . 1 . 1 . . 
. . 1 1 1 . . . 
. 1 1 7 1 1 . . 
. . 1 1 1 . . . 
. 1 . 1 . 1 . . 
. . . 7 . . . . 
. . . 7 . . . . 
`)
            sprites.setDataNumber(Wert2, "welk", 1)
        }
    }
})
