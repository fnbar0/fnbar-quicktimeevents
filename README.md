# FiveM Quick Time Event Minigames

This FiveM script introduces 3 interactive Quick Time Event (QTE) minigames designed to enhance player engagement and add dynamic challenges to your server. These minigames are fully customizable and easy to integrate into any scenario.

## Features

1. Tapping Key QTE - Requires the player to tap a specific key repeatedly within a time limit. 

2. Holding Key QTE - The player must hold down a specified key for a set duration until a progress bar is fully filled.

2. Dual Key Press QTE - The player must press two specified keys simultaneously to succeed.

# Installation

* Download the repository
* Put the `fnbar-quicktimeevents` folder in your resources directory
* Add `ensure fnbar-quicktimeevents` to your server config

# Usage

### Tapping Key QTE

This QTE contains 3 settings **key**, **clickAmount**, **timeout** and a callback function.

**Key** - Desired key that player has to click **clickAmount** of times in the time of **timeout** (in miliseconds). If player doesn't finish the QTE in time he will fail it.
```lua
exports["fnbar-quicktimeevents"]:StartTapQTE('E', 10, 10000, function(success)
    if success then
        print("TapQTE passed!")
    else
        print("TapQTE failed!")
    end
end)
```
This function would trigger a QTE in which player would have to click **E** 10 times in the time of 10 seconds (10000 miliseconds). Whether if player succeded in the QTE, the callback would be either false or true.

### Holding Key QTE

This QTE contains 3 settings **key**, **timeout**, **speed** and a callback function.

**Key** - Desired key that player has to hold for certain time until progressbar fills entirely in the time of **timeout** (in miliseconds), the **speed** setting is how fast the progressbar will fill, I suggest using for example 3. If player doesn't finish the QTE in time he will fail it.
```lua
exports["fnbar-quicktimeevents"]:StartHoldQTE('E', 10000, 3, function(success)
    if success then
        print("HoldQTE passed!")
    else
        print("HoldQTE failed!")
    end
end)
```
This function would trigger a QTE in which player would have to hold **E** until progressbar fills entirely, with the time limit of 10 seconds (10000 miliseconds). Whether if player succeded in the QTE, the callback would be either false or true.

### Dual Key Press QTE

This QTE contains 3 settings **first key**, **second key**, **timeout** and a callback function.

The player has to to press **first key** and **second key** at the same time to finish this QTE. As the previous ones, in the time limit of **timeout**. If player doesn't finish the QTE in time he will fail it.
```lua
exports["fnbar-quicktimeevents"]:StartDoubleKeyQTE('E', 'G', 10000, function(success)
    if success then
        print("DoubleKeyQTE passed!")
    else
        print("DoubleKeyQTE failed!")
    end
end)
```
This function would trigger a QTE in which player would have to hold **E** and **G** simultaneously in the time limit of 10 seconds (10000 miliseconds). Whether if player succeded in the QTE, the callback would be either false or true.
## Testing

If you would like to test these QTE's you can use test commands that are located in `client.lua` starting on line 76 (Remember to write in the command key you want to click in QTE!).

## Video showcase
- [Youtube Video](https://www.youtube.com/watch?v=upUx6IsQC44)
