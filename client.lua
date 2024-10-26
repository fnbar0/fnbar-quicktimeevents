local isInTapQTE = false
local isInHoldQTE = false
local isInDoubleKeyQTE = false
local tapCallback = nil
local holdCallback = nil
local doubleKeyCallback = nil

function StartTapQTE(key, clickAmount, timeout, cb)
    if isInTapQTE then return end
    if not key then return end
    isInTapQTE = true
    tapCallback = cb
    SendNUIMessage({
        type = "startTapQTE",
        key = key,
        clickAmount = clickAmount,
        timeout = timeout
    })
    SetNuiFocus(true, false)
end

function StartHoldQTE(key, timeout, speed, cb)
    if isInHoldQTE then return end
    if not key then return end
    if not speed then return end
    isInHoldQTE = true
    holdCallback = cb
    SendNUIMessage({
        type = "startHoldQTE",
        key = key,
        clickAmount = clickAmount,
        timeout = timeout,
        speed = speed;
    })
    SetNuiFocus(true, false)
end

function StartDoubleKeyQTE(key, secondKey, timeout, cb)
    if isInDoubleKeyQTE then return end
    if not key or not secondKey then return end
    if key == secondKey then return end
    isInDoubleKeyQTE = true
    doubleKeyCallback = cb
    SendNUIMessage({
        type = "startDoubleKeyQTE",
        key = key,
        secondKey = secondKey,
        clickAmount = clickAmount,
        timeout = timeout
    })
    SetNuiFocus(true, false)
end

RegisterNUICallback('TapQTEResult', function(data)
    SetNuiFocus(false, false)
    isInTapQTE = false
    tapCallback(data.success) 
end)

RegisterNUICallback('HoldQTEResult', function(data)
    SetNuiFocus(false, false)
    isInHoldQTE = false
    holdCallback(data.success) 
end)

RegisterNUICallback('DoubleKeyQTEResult', function(data)
    SetNuiFocus(false, false)
    isInDoubleKeyQTE = false
    doubleKeyCallback(data.success) 
end)

exports('StartTapQTE', StartTapQTE)
exports('StartHoldQTE', StartHoldQTE)
exports('StartDoubleKeyQTE', StartDoubleKeyQTE)

RegisterCommand('taptap', function(src,args)
    StartTapQTE(args[1], 10, 5000, function(success)
        if success then
            print("TapQTE passed!")
        else
            print("TapQTE failed!")
        end
    end)
end)

RegisterCommand('hold', function(src,args)
    StartHoldQTE(args[1], 10000, 3, function(success)
        if success then
            print("HoldQTE passed!")
        else
            print("HoldQTE failed!")
        end
    end)
end)

RegisterCommand('double', function(src,args)
    StartDoubleKeyQTE(args[1], 'e', 10000, function(success)
        if success then
            print("HoldQTE passed!")
        else
            print("HoldQTE failed!")
        end
    end)
end)
