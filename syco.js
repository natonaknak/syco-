const discord = require('discord.js');
const ms = require("ms");
const fs = require("fs")
const muted_time = require("C:/Users/Lenovo/Downloads/bot-ofor-dis/special-bot/muted_time.json")
const bot = new discord.Client()
bot.on('ready',()=>{
    console.log('hi guys');
    bot.user.setActivity('Jesta Search...',{type:'WATCHING'});
    const guildo = bot.guilds.cache.get('738729340308684851');
    const general = guildo.channels.cache.find(c=>c.name.toLowerCase().includes('general'));
    const naknak = guildo.members.cache.find(n=>n.id == '695652521313828936')
    var inti = 'true';
    var ids = []
    // setInterval(async ()=>{
    //     const timing = new Date()
    //     if(inti == 'true'){
    //     inti = 'false';
    //     var sending =  general.send(`${timing.getMonth()}/${timing.getDate()}/${timing.getFullYear()}`);
    //     ids.push(sending.id)
    // }
        //var this_is = await general.messages.fetch(ids[0])
        //this_is.edit(`${timing.getMonth()}/${timing.getDate()}/${timing.getFullYear()}`)
        // if(!this_is){
        //     return;
        // }
    //}, 1000 );
    //console.log(bot.guilds.cache.map(g => g.name).join(','))
});
const setup_json = require("./setup.json");
bot.on('message',msg=>{
    if(msg.author.bot) return; 
    if(msg.content.toLowerCase().startsWith("js!setup") && msg.member.hasPermission("ADMINISTRATOR")){
        const args = msg.content.split(" ").slice(1);
        const id = args[0];
        if(!id || !msg.guild.channels.cache.find(c=>c.id == id)){
            return msg.reply("js!setup id")
        }
        setup_json[msg.guild.name] = {
            id : id            
        }
        fs.writeFile("./setup.json",JSON.stringify(setup_json),(err)=>{if(err){console.log(err)}})
    }
    //msg.guild.roles.cache.forEach(r=>console.log(r.rawPosition + r.name))
    //console.log(msg.guild.me.roles.cache.map(r=>r.rawPosition).join(',') + msg.guild.me.roles.cache.map(r=>r.name).join(','))
    if(setup_json[msg.guild.name]){
    if(msg.channel.id == setup_json[msg.guild.name].id){
        const args = msg.content.split(' ');
        const lines = msg.content.split('\n');
        if(lines.length <= 1){
             msg.delete().then(()=>{
                const embed = new discord.MessageEmbed()
                   .setColor(15158332)
                   .setTitle('__שלום אדוני, פניתי אליך כי ראיתי ששלחת הודעה בשרת גסטה לא ברורה ולכן ההודעה **נמחקה**__')
                   .addFields(
                        {name : 'על מנת שההודעה תשלח בפעם הבאה אנא תעבוד עם התבנית הזאת :',value : '^^^'},
                        {name : ':שם',value : '[שמך]'},
                        {name : ':גסטה בשבילי',value : '[מה שהינך צריך]'},
                        {name : ':גסטה בשבילך',value : '[מה שאתה מביא לפונה]'},
                        {name : 'תודה רבה והמשך גלישה מהנה בשרת שלנו!',value : '😊'},
                   )
                    msg.author.send(embed);
                    msg.author.send('||לא חייב לכתוב שם||')
        })
            return;
    }
        if(lines[0].startsWith('שם') && lines.length >= 3) {
            var line0 = lines[0].slice(2);
            var line1 = lines[1]
            var line2 = lines[2]
        }else {
            var line0 = msg.author.username;
            var line1 = lines[0]
            var line2 = lines[1]
        } 
        console.log(line1)
        if((args[0] == 'שם' && line1.startsWith('גסטה בשבילי') && line1.startsWith('גסטה בשבילך')) || (line1.startsWith('גסטה בשבילי') && line2.startsWith('גסטה בשבילך')) || (line1.startsWith("ג'סטה בשבילי") && line2.startsWith("ג'סטה בשבילך")) ){
            function check_lentgh(line) {
                if (line.split(' ').slice(3).join(' ') == ''){
                    return 'אין' 
                } else {
                    return line.split(' ').slice(3).join(' ')
                }
            }    
            const embed = new discord.MessageEmbed()
                .setTitle('הנה הגסטה שלך:')
                .setColor(3066993)
                .addFields(
                    {name : ':שם' , value : line0 , inline:false},
                    {name : ':גסטה בשבילי' , value : check_lentgh(line1)/*.split(' ').slice(3).join(' ')*/ ,inline:false},
                    {name : ':גסטה בשבילך' , value : check_lentgh(line2)/*.split(' ').slice(3).join(' ')*/ ,inline:false}
                )
                msg.author.send(embed)
        } else {
            msg.delete().then(()=>{
                const embed = new discord.MessageEmbed()
                   .setColor(15158332)
                   .setTitle('__שלום אדוני, פניתי אליך כי ראיתי ששלחת הודעה בשרת גסטה לא ברורה ולכן ההודעה **נמחקה**__')
                   .addFields(
                       {name : 'על מנת שההודעה תשלח בפעם הבאה אנא תעבוד עם התבנית הזאת :',value : '^^^'},
                       {name : ':שם',value : '[שמך]'},
                       {name : ':גסטה בשבילי',value : '[מה שהינך צריך]'},
                       {name : ':גסטה בשבילך',value : '[מה שאתה מביא לפונה]'},
                       {name : 'תודה רבה והמשך גלישה מהנה בשרת שלנו!',value : '😊'},
                   )
                msg.author.send(embed);
                msg.author.send('||The message send by Jesta bot||')
            })
        }
    }
}
});
bot.on('message',msg=>{
    const args = msg.content.substring(1).split(' ');
    switch (args[0]) {
        case 'h':
            var nickname = msg.member.nickname || msg.author.username
            var reason = args.slice(1).join(' ') || 'none';
            if(msg.member.voice.channel) {
                const embed = new discord.MessageEmbed()
                    .setColor('blue')
                    .addField(name='איש צריך את עזרתכם:',value = nickname,false)
                    .addFields(
                        {name:'reason:',value:`${reason}`,inline:true},
                        {name:'player is in channel:',value:`${msg.member.voice.channel.name}`,inline:false}
                    )
                msg.channel.send(embed)
                msg.channel.send('^^^^ <@&755416131996614666> ^^^^') 
            } else {
                const embed = new discord.MessageEmbed()
                .setColor('blue')
                .addField(name='איש צריך את עזרתכם:',value = nickname,false)
                .addField(name='reason:',value=`${reason}`,false)
                .addField(name='reason:',value=`!המשתמש אינו מחובר לשום חדר`,false)
            msg.channel.send(embed)
            msg.channel.send('^^^^ <@&755416131996614666> ^^^^')  
            }
            break;
            case 'helpme':
            var nickname = msg.member.nickname || msg.author.username
            var reason = args.slice(1).join(' ') || 'none';
            if(msg.member.voice.channel) {
                const embed = new discord.MessageEmbed()
                    .setColor('blue')
                    .addField(name='איש צריך את עזרתכם:',value = nickname,false)
                    .addFields(
                        {name:'reason:',value:`${reason}`,inline:false},
                        {name:'player is in channel:',value:`${msg.member.voice.channel.name}`,inline:false}
                    )
                msg.channel.send(embed)
                msg.channel.send('^^^^ <@&755416131996614666> ^^^^') 
            } else {
                const embed = new discord.MessageEmbed()
                .setColor('blue') 
                .addField(name='איש צריך את עזרתכם:',value = nickname,false)
                .addField(name='reason:',value=`${reason}`,false)
                .addField(name='reason:',value=`!המשתמש אינו מחובר לשום חדר`,false)
            msg.channel.send(embed)
            msg.channel.send('^^^^ <@&755416131996614666> ^^^^') 
            }
            msg.member.hasPermission
            break;
    }
});
const prefix = "!"
bot.on('message',async msg=>{
    if(msg.content.startsWith("!dm")){
        const mention = msg.mentions.members.first();
        if(!mention){
            return msg.reply("תתיג מישהו")
        }
        mention.send(msg.content.split(" ").slice(2).join(" ")).then(msg.delete())
    }
    if(msg.content.startsWith("!unmute")){
        if(msg.member.roles.cache.has(r=>r.id == '763475931921776740') ||  msg.member.hasPermission("MENAGE_MESSAGES")){
            const mention = msg.mentions.members.first();
            if(!muted_time[msg.guild.name]){
                return msg.channel.send("i didnt found the muteRole,pls use !set_muteRole command to set the mute role.")
            } 
            if(!mention){
                return msg.reply("לא מצאתי תממבר")
            }
            if(mention.roles.cache.has(muted_time[msg.guild.name].muteRole_id)){
                msg.channel.send(`<@${mention.id}> was unmuted`)
                mention.roles.remove(muted_time[msg.guild.name].muteRole_id)
            } else {
                return msg.reply("הממבר לא על מיוט")
            }
            } else {
                return msg.reply("אין לך גישה")
            }
    }
    if(msg.content.startsWith("!set_muteRole")){
        if(msg.member.hasPermission('MENAGE ROLES')){
            const args = msg.content.slice(1).split(" ")
            if(!args[1]){
                return msg.channel.send('בבקשה תשלח את האיידי של הרול ככה : !set_muteRole id')
            }
            muted_time[msg.guild.name]={
                muteRole_id : args[1]
            }
            if(!msg.guild.roles.cache.find(r=>r.id == muted_time[msg.guild.name].muteRole_id)){
                return msg.channel.send('לא מצאתי את הרול.')
            }
            msg.channel.send("הצלחתי לקבוע את הרול בהצלחה")
            fs.writeFile("C:/Users/Lenovo/Downloads/bot-ofor-dis/special-bot/muted_time.json",JSON.stringify(muted_time),(err)=>{if(err) console.log(err)})
            } else {
                return msg.reply("אין לך גישות")
            }
        }
    if(msg.content.startsWith("!mute")){
        if(msg.member.roles.cache.has(r=>r.id == '763475931921776740') ||  msg.member.hasPermission("MENAGE_MESSAGES")){
            const member = msg.mentions.members.first();
            const args = msg.content.slice(1).split(" ")
            const time = args[2];
            const reason  = args.slice(3) || "none";
            const number_array = [1,2,3,4,5,6,7,8,9]
            let ii = 0;
            for(let i of number_array){
                if(!time || !time.includes(i)){
                    ii++;
                    if(ii == 9){
                        return msg.reply("תקבע זמן")
                    }
                }
            }
            if(!muted_time[msg.guild.name]){
               return  msg.channel.send("i didnt found the muteRole,pls use !set_muteRole command to set the mute role.")
            } else {
        if(!member) return  msg.channel.send(`{ERROR,PLS SPECIFY A MEMBER!!}`);
        member.roles.add(muted_time[msg.guild.name].muteRole_id)
        msg.channel.send(`${member} has muted for ${ms(ms(time))} || reason : ${reason}`)
        setTimeout(function(){
            if(member.roles.cache.has(muted_time[msg.guild.name].muteRole_id)){
            member.roles.remove(muted_time[msg.guild.name].muteRole_id);
            msg.channel.send(`${member} has been unmuted!!`);
            }
        },ms(time));
    };
    }
    }
    if(msg.content.startsWith("!clear")){
        if(msg.member.hasPermission("MANAGE_MESSAGES")){
            const args = msg.content.slice(1).split(" ")
            if(isNaN(args[1]) || parseInt(args[1]) <= 0) {
                return msg.reply('give me amount to clear')
            };
            let deleteAmount;
            if(parseInt(args[1]) > 100){
                deleteAmount = 100
            } else {
                deleteAmount = args[1]
            };
            msg.channel.bulkDelete(deleteAmount,true);
            msg.channel.send(`i delete ${deleteAmount} amount of masseges` + `|| <@${msg.member.id}> האיש שעשה את הפקודה`).then(m=>{m.delete({timeout:2000,reason:'something have to be done'})})
            } else {
               msg.channel.send('אין לך גישה')
            }
    }
    if(msg.content.startsWith("!unban")){
    if(msg.member.hasPermission('BAN_MEMBERS')){
        const args = msg.content.slice(1).split(" ")
        if(!args[1]){
            return msg.reply("תתייג מישהו או תכתוב תאיידי שלו")
        }
        const mention = msg.mentions.members.first() || args[1];
        if(!mention){
            return msg.reply("תתייג מישהו או תכתוב תאיידי שלו")
        }
        try {
            var ban_or_not = await msg.guild.fetchBan(mention)
        } catch (error) {
            return msg.reply("הממבר לא בבאן.")
        }
        msg.guild.members.unban(ban_or_not.user.id).then(()=>{
            msg.delete({timeout : 1000});
            msg.channel.send(`i unbanned <@${ban_or_not.user.id}>` + ` || <@${msg.author.id}> זה האיש שעשה את הפקודה`)
        })
    } else {
        msg.reply("אין לך גישה")
    }
    }
    if(msg.content.startsWith("!ban")){
    if(msg.member.hasPermission('BAN_MEMBERS')){
        const args = msg.content.slice(1).split(" ");
        const mention = msg.mentions.members.first();
        if(!mention) return msg.reply('mention someone to ban');
        const reason = args.slice(2)
        const time = reason.pop()
        function reason_check(reason){
            if(reason == "" || reason == "7d" || reason == "1d" || reason == "24h"){
                reason = "none"
            } else {
                reason = reason.join(" ")
            }
            return reason
        }
        if(time == "7d"){
            msg.guild.members.ban(mention.user.id,{reason : reason_check(reason),days : 7}).then(m=>{
                msg.delete({timeout : 1000});
                msg.channel.send(`i banned ${mention} for : ${time}` + `<@${msg.author.id}> זה האיש שעשה את הפקודה`)
            })
        } else if(time == "24h" || time == "1d"){
            msg.guild.members.ban(mention.user.id,{reason : reason_check(reason),days : 1}).then(()=>{
                msg.delete({timeout : 1000});
                msg.channel.send(`i banned ${mention} for : ${time}` + `<@${msg.author.id}> זה האיש שעשה את הפקודה`)
            })
        } else {
            msg.guild.members.ban(mention.user.id,{reason : reason_check(reason)}).then(m=>{
                msg.delete({timeout : 1000});
                msg.channel.send(`i banned ${mention} for : ${time}` + `<@${msg.author.id}> זה האיש שעשה את הפקודה`)
            })
        }
        } else if(!msg.member.hasPermission('BAN MEMBERS')) return msg.reply('you dont have permissions...:(');
    }
    if(msg.author.username == 'nato naknak' && msg.content == 'emit'){
        bot.emit('guildMemberAdd',msg.member)
    }
})
bot.on('guildMemberAdd',member => {
    const welcome_channel = member.guild.channels.cache.find(c=>c.name.toLowerCase().includes('welcome'))||member.guild.channels.cache.find(c=>c.name.toLowerCase().includes('elcome'));
    const embed = new discord.MessageEmbed()
        .setTitle('ממבר חדש נכנס')
        .addFields(
            {name : 'שמו:',value : member.user.username},
            {name : 'מספר האנשים בשרת:',value : member.guild.memberCount}
        )
        .setThumbnail(member.user.displayAvatarURL())
        welcome_channel.send(embed)
});
const fortnite = require("fortnite");
const f_s = new fortnite("975f5964-2e38-44b5-ab72-be53ed65784a");
bot.on("message",async msg=>{
    const args = msg.content.split(" ");
    if(args[0] == "!fs" || args[0] == "!fortnite"){
        if(args.length < 2){
            return msg.reply("תגדיר username וגם platform")
        }
        const platforms = ["pc","xb1","psn"]
        const lastWord = args[args.length -1].toLowerCase()
        let platform , username;
        if(platforms.includes(lastWord)){
            username = args.slice(1,args.length - 1).join(" ");
            platform = lastWord;
        } else {
            username = args.slice(1).join(" ");
            platform = "pc";
        }
        try {
            const search = await f_s.user(username,platform);
            if(!search.username){
                return msg.reply("לא מצאתי תמשתמש")
            }
            const lifetime = search.stats.lifetime;
            const solo = search.stats.solo;
            const duo = search.stats.duo;
            const squad =  search.stats.squad;
            const embed = new discord.MessageEmbed()
                .setColor("#9d4dbb")
                .setTitle(`${search.username} | ${search.platform}`)
                .setURL(search.url)
                .setFooter("stats",msg.author.displayAvatarURL())
                .setTimestamp()
                .addFields(
                    {name : "solo score",value : solo.score},
                    {name : "duo score",value : duo.score},
                    {name : "squad score",value : squad.score},
                    {name : "kills",value : lifetime.kills},
                    {name : "solo matches",value : solo.matches},
                    {name : "duo matches",value : duo.matches},
                    {name : "squad matches",value : squad.matches},
                )
            msg.channel.send(embed)
        } catch (error) {
            if(error){
                console.log(error)
            }
        }
    }
})
bot.login('NzQ4NjQ0NzU3NzAxMzk0NDQw.X0gbww.pGCPl3EpFo0-GTR-ZM1FF_Jb8pY');