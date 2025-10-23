interface Sprite {
    //% helper=spriteEquals
    //% blockId="sprite_equals" block="$this(mySprite) equals %otherSprite=variables_get(otherSprite)"
    /**
     * checks if the sprite equals to the other sprite with the exact same image 
     */
    //% group="Image"
    equals(otherSprite: Sprite): boolean
    
    //% helper=spriteClone
    //% blockId="sprite_clone" block="$this(mySprite) clone"
    /**
     * clones the sprite you have and creates a duplicate of the same sprite
     */
    //% group="Image"
    clone(): Sprite
    
    //% helper=spriteFill 
    //% blockId="sprite_fill" block="fill %c=colorWheelPicker"
    //% group="Image"
    /**
     * Fills the sprite with a specific color
     */
    fill(c: number): void
    
    //% helper=spriteColorEquals
    //% blockId="sprite_color_equals" block="$this(mySprite) color equals %c=colorWheelPicker"
    /**
     * Checks if the sprites color matches the color parameter
     * @param c The color value to compare to check the sprite's current color.
     */ 
    colorEquals(c: number): void
    
    //% helper=spriteColor deprecated=true  blockHidden=true
    /**
      Deprecated: Do not use this block because it could cache issues with the color controlling, use color equals instead.
     */
    __color(c: number): number
   
    //% helper=spriteOverlapsWithColorSprite
    //% blockId="sprite_overlaps_with_color_sprite"
    //% block="$this(mySprite) overlaps with %other=variables_get(otherSprite) and color equals to that other sprite is sprite overlapping %c"
    //% help=docs/overlapsWithColorSprite
    //% group="Overlaps"
    /**
     * Checks wheter the sprite overlaps with the other sprite with a specific color 
     * Returns true if such a pixel exists to the other sprite, otherwise returns false.
     */
    overlapsWithColorSprite(other: Sprite, c: number): boolean
    //% helper=spriteColorOverlapsWithColorSprite
    //% blockId="sprite_with_color_overlaps_with_otherSprite_with_color"
    //% block="sprite with color overlaps with other sprite with color $this(mySprite) %other=variables_get(otherSprite) %c=colorWheelPicker %c0=colorWheelPicker"
    //% group="Overlaps"
/**
 * Checks whether two sprites overlap at any pixel where
 * this sprite has the color `c` and the other sprite has the color `c0`.
 * Returns true if such a pixel exists to both sprites, otherwise false.
 */
    spriteWithColorOverlapsWithOtherSpriteWithColor(other: Sprite, c: number, c0: number): boolean
    
    //% helper=spriteDestroyOtherSprite
    //% blockId="$this(mySprite) destroy other sprite %sprite=variables_get(otherSprite)"
    //% group="Effects"
    /**
     * Destroys the other sprite in the screen
     */
    destroyOtherSprite(sprite: Sprite): void 
}

namespace helpers {
    export function spriteEquals(sprite: Sprite, otherSprite: Sprite): boolean {
        return sprite.image.equals(otherSprite.image)
    }

    export function spriteClone(sprite: Sprite): Sprite {
        return sprites.create(sprite.image.clone())
    }

    export function spriteFill(sprite: Sprite, c: number) {
        sprite.image.fill(c)
    }

    export function spriteColorEquals(sprite: Sprite, c: number) {
        for (let y = 0; y < sprite.height; y++) {
            for (let x = 0; x < sprite.width; x++) {
                let color = sprite.image.getPixel(x, y)
                if (color === c) return true
            }
        }

        return false
    }

    //% deprecated=true blockHidden=true
    export function __spriteColor(sprite: Sprite, c: number) {
        for (let y = 0; y < sprite.height; y++)
            for (let x = 0; x < sprite.width; x++)
                c = sprite.image.getPixel(x, y)
        return c
    }

    export function spriteOverlapsWithColorSprite(sprite: Sprite, other: Sprite, c: number): boolean {
        control.enablePerfCounter("overlapsWithColorCPP")

        if (other === sprite) return false
        
        for (let y = 0; y < sprite.height; y++)
            for (let x = 0; x < sprite.width; x++) {
                let color = sprite.image.getPixel(x, y)
                if (sprite.image.overlapsWith(other.image, x, y) && color === c) return true
         }
        return false 
    }

    export function spriteColorOverlapsWithColorSprite(sprite: Sprite, other: Sprite, c: number, c0: number): boolean {
        control.enablePerfCounter("overlapsWithColorCPP")

        if (other === sprite) return false

        for (let y = 0; y < sprite.height; y++)
            for (let x = 0; x < sprite.width; x++) {
                let color = sprite.image.getPixel(x, y)
                 for (let y0 = 0; y0 < other.height; y0++)
                 for (let x0 = 0; x0 < other.width; x0++) {
                     let color1 = other.image.getPixel(x, y)
                     if (sprite.image.overlapsWith(other.image, x, y) && color === c && color1 === c0) return true
                 }
            }
        return false
    }

    export function spriteDestroyOtherSprite(sprite: Sprite, otherSprite: Sprite) {
          let allSprites: Sprite[] 
          allSprites = []
          if (sprite.flags & sprites.Flag.Destroyed) allSprites.removeElement(sprite)
          else
          allSprites.removeElement(otherSprite)
    }
}
