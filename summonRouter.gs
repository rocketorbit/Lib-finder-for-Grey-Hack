//this script based on magic.
//if this doesnt work, you need a pure heart to make magic works.

//you make a wish.
if params.len < 1 then exit("To make a wish, you need to type router_version you want.")
wish = params[0]

castSpell = function //the magic happens.
    while true
        magic = floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1)
        if not is_valid_ip(magic) then continue
        if is_lan_ip(magic) then continue
        return magic
    end while
end function

checkMagic = function(spell) //lets see if your heart is pure enough.
    router = get_router(spell)
    if not router then router = get_switch(spell)
    if not router then return null
    if router.kernel_version == wish then return true
    return null
end function

timeToDoMagic = function
    it = 0
    start = time
    while true
        it = it + 1
        spell = castSpell
        pureHeart = checkMagic(spell)
        if not pureHeart then continue
        print("IP contain kernel_router.so " + wish + " found at ip: " + spell)
        print("Tried " + it + " times. Spent " + str(time - start) + " seconds.")
        exit("Congrats.")
    end while
end function
timeToDoMagic