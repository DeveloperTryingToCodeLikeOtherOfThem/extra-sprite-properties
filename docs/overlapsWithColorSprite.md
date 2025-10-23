### Sprite Overlaps With OtherSprite With Other Sprite Color 

Checks if sprite overlaps with other sprite and with the specific color it is overlapping 
Also, the color works when you put a value in the 2nd parameter for the sprite overlapping color with it tells it must also check if the other sprites color matches to that color.
Last thing, it does not mean the whole sprite must be covered with 1 color, if it at least has the data sprite sheet of 1 color you assigned it overlapped with.
``` blocks
  let player = sprites.create(img`5045490459405495045`, SpriteKind.Player)
  let other = sprites.create(img`99999930349`, SpriteKind.Player)
  if (player.overlapsWithColorSprite(other, 9)) game.gameOver(true)
```

### Sprite With Color Overlaps With Other Sprite With Color
Checks if the sprite has a specific color and overlaps with the other sprite and with a specific color
Also, make sure that both colors match the sprite colors you drew for your sprie because if the data colors in your drawing do not exist those colors, it will not overlap. 
``` blocks
   let player = sprites.create(img`5045490459405495045`, SpriteKind.Player)
  let other = sprites.create(img`99999930349`, SpriteKind.Player)
  if (player.spriteWithColorOverlapsWithOtherSpriteWithColor(other, 2, 3)) game.gameOver(true)
```