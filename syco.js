const discord = require('discord.js');
const bot = new discord.Client()
bot.on('ready',()=>{
    console.log('hi guys');
    bot.user.setActivity('Jesta Search...',{type:'WATCHING'});
    const guildo = bot.guilds.cache.get('738729340308684851');
    const general = guildo.channels.cache.find(c=>c.name.toLowerCase().includes('general'));
    const naknak = guildo.members.cache.find(n=>n.id == '695652521313828936')
    var inti = 'true';
    var ids = []
    setInterval(async ()=>{
        const timing = new Date()
        if(inti == 'true'){
        inti = 'false';
        var sending =  general.send(`${timing.getMonth()}/${timing.getDate()}/${timing.getFullYear()}`);
        ids.push(sending.id)
    }
        var this_is = await general.messages.fetch(ids[0])
        //this_is.edit(`${timing.getMonth()}/${timing.getDate()}/${timing.getFullYear()}`)
        // if(!this_is){
        //     return;
        // }
    }, 1000 );
    //console.log(bot.guilds.cache.map(g => g.name).join(','))
});
bot.on('message',msg=>{
    if(msg.author.bot) return; 
    //msg.guild.roles.cache.forEach(r=>console.log(r.rawPosition + r.name))
    //console.log(msg.guild.me.roles.cache.map(r=>r.rawPosition).join(',') + msg.guild.me.roles.cache.map(r=>r.name).join(','))
    if(msg.channel.id == '755489550062714971'){
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
                msg.channel.send('^^^^ <@&747831898755301429> ^^^^') 
            } else {
                const embed = new discord.MessageEmbed()
                .setColor('blue')
                .addField(name='איש צריך את עזרתכם:',value = nickname,false)
                .addField(name='reason:',value=`${reason}`,false)
                .addField(name='reason:',value=`!המשתמש אינו מחובר לשום חדר`,false)
            msg.channel.send(embed)
            msg.channel.send('^^^^ <@&747831898755301429> ^^^^')  
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
                msg.channel.send('^^^^ <@&747831898755301429> ^^^^') 
            } else {
                const embed = new discord.MessageEmbed()
                .setColor('blue') 
                .addField(name='איש צריך את עזרתכם:',value = nickname,false)
                .addField(name='reason:',value=`${reason}`,false)
                .addField(name='reason:',value=`!המשתמש אינו מחובר לשום חדר`,false)
            msg.channel.send(embed)
            msg.channel.send('^^^^ <@&747831898755301429> ^^^^') 
            }
            break;
    }
});
bot.on('message',msg=>{
    const args = msg.content.substring(1).split(' ');
     switch (args[0]) {
         case 'h':
             var vice = msg.member.voice.channel.name || 'none';
             const ;
             break;
        case 'helpme':
            break;
     }; 
});
bot.on('message',msg=>{
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
bot.login('NzQ4NjQ0NzU3NzAxMzk0NDQw.X0gbww.pGCPl3EpFo0-GTR-ZM1FF_Jb8pY');