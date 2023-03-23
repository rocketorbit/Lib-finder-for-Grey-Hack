//this script based on magic.
//if this doesnt work, you need a pure heart to make magic works.

//import_code("/root/cloudExploitAPI") //boost speed by using cloud exploit database.
remoteScan = function(ip, port) //delete this whole function if you use cloud exploit database api.
    ns = mx.net_use(ip, port)
    if not ns then return null
    ml = ns.dump_lib
    if not ml then return null
    ret = {}
    ret.lib_name = ml.lib_name
    ret.version = ml.version
    ret.memorys = {}
    memorys = mx.scan(ml)
    for memory in memorys
        addresses = split(mx.scan_address(ml, memory), "Unsafe check:")
        ret.memorys[memory] = []
        for address in addresses
            if address == addresses[0] then continue
            value = address[indexOf(address, "<b>") + 3:indexOf(address, "</b>")]
            value = replace(value, "\n", "")
            ret.memorys[memory] = ret.memorys[memory] + [value]
        end for
    end for
    return ret
end function

//you make a wish.
if params.len < 2 then exit("To make a wish, you need to type lib_name and lib_version you want.")
if params.len % 2 == 1 then exit("a name or a version didnt found its paired name or version.")
wishes = []
while params.len
    wish = params.pop
    wish = params.pop + " " + wish
    wishes.push(wish)
end while

mx = include_lib(current_path + "/metaxploit.so")
if not mx then exit("You need metaxploit.so at current path.")
shell = get_shell
computer = shell.host_computer
currentPath = current_path
magicFolder = computer.File(currentPath + "/magicFolder")
if not magicFolder then
    computer.create_folder(currentPath, "magicFolder")
    magicFolder = computer.File(currentPath + "/magicFolder")
end if

drawCircle = function //draw a magic circle.
    while true
        magicCircle = floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1) + "." + floor((rnd * 255) + 1)
        if not is_valid_ip(magicCircle) then continue
        if is_lan_ip(magicCircle) then continue
        return magicCircle
    end while
end function

castSpell = function(magicCircle) //cast a spell.
    router = get_router(magicCircle)
    if not router then router = get_switch(magicCircle)
    if not router then return null
    ports = router.used_ports
    if not ports then return null
    found = null
    for port in ports
        ns = mx.net_use(magicCircle, port.port_number)
        if not ns then continue
        ml = ns.dump_lib
        if not ml then continue
        //exploits = queryExploit(ml.lib_name, ml.version)
        //if not exploits then exploits = remoteScan(magicCircle, port.port_number)
        exploits = remoteScan(magicCircle, port.port_number) //delete this line and use the two lines above if you use cloud exploit database api.
        if not exploits then continue
        for e in exploits.memorys
            for v in e.value
                object = ml.overflow(e.key, v)
                if not typeof(object) == "shell" then continue
                object.scp("/lib", magicFolder.path, shell)
                found = true
            end for
        end for
    end for
    return found
end function

checkMagic = function //lets see if your heart is pure enough.
    folder = computer.File(magicFolder.path + "/lib")
    if not typeof(folder) == "file" then return null
    for file in folder.get_files
        ml = mx.load(file.path)
        if not ml then continue
        for wish in wishes
            if (ml.lib_name + " " + ml.version) == wish then return wish
        end for
    end for
    folder.delete
    return null
end function

timeToDoMagic = function
    it = 0
    start = time
    while wishes
        it = it + 1
        magicCircle = drawCircle
        magic = castSpell(magicCircle)
        if not magic then continue
        pureHeart = checkMagic
        if not pureHeart then continue
        print("Lib " + pureHeart + " found at ip: " + magicCircle)
        print("Already downloaded for you. Find it at " + magicFolder.path)
        print("Tried " + it + " times. Spent " + str(time - start) + " seconds.")
        wishes.remove(wishes.indexOf(pureHeart))
    end while
    print("Congrats!")
end function
timeToDoMagic
