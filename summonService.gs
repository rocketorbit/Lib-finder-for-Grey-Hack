//this script based on magic.
//if this doesnt work, you need a pure heart to make magic works.

//you make a wish.
if params.len < 2 then exit("To make a wish, you need to type service_name and service_version you want.")
wish = params[0] + " " + params[1]

drawCircle = function //draw a magic circle.
    while true
        magicCircle = floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1)
        if not is_valid_ip(magicCircle) then continue
        if is_lan_ip(magicCircle) then continue
        return magicCircle
    end while
end function

castSpell = function(magicCircle) //cast a spell.
	magic = get_router(magicCircle)
	if not magic then magic = get_switch(magicCircle)
	if not magic then return null
	return magic
end function

checkMagic = function(magic) //lets see if your heart is pure enough.
    ports = magic.used_ports
    if not ports then return null
    for port in ports
        libInfo = magic.port_info(port)
        if libInfo == wish then return true
    end for
    return null
end function

timeToDoMagic = function //lets do this.
    it = 0
    start = time
    while true
        it = it + 1
        magicCircle = drawCircle
        magic = castSpell(magicCircle)
        if not magic then continue
        pureHeart = checkMagic(magic)
        if not pureHeart then continue
        print("IP contain service " + wish + " found at ip: " + magicCircle)
        print("Tried " + it + " times. Spent " + str(time - start) + " seconds.")
        exit("Congrats.")
    end while
end function
timeToDoMagic