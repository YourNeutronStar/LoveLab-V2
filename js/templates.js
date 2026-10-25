/* Presets and supported visual themes.
   Every theme is a palette; every template is a complete story.
   You can combine any template with any theme. */
window.LL_THEMES = [
  {id:'rose',icon:'💗',label:'themeRose'},
  {id:'night',icon:'🌙',label:'themeNight'},
  {id:'sunny',icon:'🍑',label:'themeSunny'},
  {id:'bubu',icon:'🐻',label:'themeBubu'},
  {id:'alien',icon:'🛸',label:'themeAlien'},
  {id:'floral',icon:'🌼',label:'themeFloral'}
];

const llChoice=(label,action)=>({label,action});
const llScene=(emoji,title,note,...choices)=>({emoji,title,note,choices});

window.LL_TEMPLATES = {
  coffee:{icon:'☕',label:'presetCoffee',description:'presetCoffeeSub',theme:'rose',
    tr:{name:'Kaotik kahve ☕',to:'Manita',from:'Benden',success:{title:'YIPPIEEE, DATE ONAYLANDI! ☕💗',body:'30 dakikalık kahve date resmen onaylandı!\nSıcacık tarhana opsiyonel, sohbet zorunlu 😭'},decline:{title:'No problem manita 🤍',body:'Başka bir zaman kahve içeriz. Güzel şeyler zorla olmaz.'},scenes:[
      llScene('☕','MANİTAAAA GARİİİ','Yarın 30 dk’lık kahve date var, gelcen mi?',llChoice('EVETTT 💗','success'),llChoice('Düşüniim 🤔','next'),llChoice('Hayır 🙄','runaway')),
      llScene('🥣','İKNA PAKETİ GELDİ','Manita iknayı istemiyi… NE VERİİİN? SICAACIK TARHANAMI VERİM?',llChoice('İSTİYOM 🥹','success'),llChoice('Bilmem ya','next'),llChoice('Hayır','runaway')),
      llScene('💳','SON TEKLİFİM!','O zaman kahveler de benden olsun! Var mısın?',llChoice('TAMAMM ☕','success'),llChoice('Bi düşüniim','next'),llChoice('Hayır','runaway')),
      llScene('🐣','BU KADAR PAZARLIK YETER','Manita 30 dakikalık kahveye gelcen, ülke mi satın alıyon? 😭',llChoice('Ehehe tamam 💗','success'),llChoice('Başka zaman 🤍','decline'))]},
    en:{name:'Chaotic coffee ☕',to:'My favorite human',from:'Me',success:{title:'YIPPIEEE, COFFEE DATE! ☕💗',body:'Our 30-minute coffee date is officially on!\nWarm soup optional, good company mandatory.'},decline:{title:'No problem 🤍',body:'Coffee another day. The good things should never feel forced.'},scenes:[
      llScene('☕','HEY, YOUUU!','Got 30 minutes for coffee tomorrow?',llChoice('YESSS 💗','success'),llChoice('Let me think 🤔','next'),llChoice('Nope 🙄','runaway')),
      llScene('🥣','SPECIAL OFFER','What if I bring you a bowl of WARM SOUP?',llChoice('SOUP? YES 🥹','success'),llChoice('Maybe...','next'),llChoice('No','runaway')),
      llScene('💳','LAST OFFER!','Coffee is on me. Deal?',llChoice('DEAL ☕','success'),llChoice('Hmm...','next'),llChoice('No','runaway')),
      llScene('🐣','THIS IS GETTING SERIOUS','It’s just a coffee, not a mortgage 😭',llChoice('Okayyy 💗','success'),llChoice('Another time 🤍','decline'))]}
  },
  gentle:{icon:'🌷',label:'presetGentle',description:'presetGentleSub',theme:'sunny',
    tr:{name:'Tatlı davet 🌷',to:'Biricik insan',from:'Ben',success:{title:'YAAA ÇOK GÜZEL! 🌷',body:'Kahve, sohbet ve güzel bir gün bizi bekliyor. İyi ki varsın!'},decline:{title:'Hiç sorun değil 🤍',body:'Başka bir gün, ikimizin de içine sinince görüşürüz.'},scenes:[
      llScene('🌷','Sana küçücük bir teklifim var','Bu hafta bir ara sakin sakin kahve içelim mi?',llChoice('Olur! ☕','success'),llChoice('Başka zaman','next'),llChoice('Olmaz 🤍','decline')),
      llScene('🧁','Aceleye gerek yok','Müsait olduğumuz başka bir gün olur mu?',llChoice('Oluuur','success'),llChoice('Şimdilik olmaz','decline'))]},
    en:{name:'Sweet invitation 🌷',to:'You',from:'Me',success:{title:'THAT SOUNDS LOVELY! 🌷',body:'Coffee, a cozy conversation, and a nice day ahead.'},decline:{title:'No worries 🤍',body:'Another day, when it feels right for both of us.'},scenes:[
      llScene('🌷','A little invitation','Want to grab a calm coffee together this week?',llChoice('I’d love to! ☕','success'),llChoice('Maybe later','next'),llChoice('Not now 🤍','decline')),
      llScene('🧁','No rush at all','Could we pick another day that works for both of us?',llChoice('Of course','success'),llChoice('Not right now','decline'))]}
  },
  surprise:{icon:'🎂',label:'presetSurprise',description:'presetSurpriseSub',theme:'night',
    tr:{name:'Sürpriz kutlama 🎂',to:'En sevdiğim insan',from:'Bir sürpriz sever',success:{title:'İYİ Kİ VARSIN! 🎊',body:'Gülüşün, sohbetin, birlikte biriktirdiğimiz anılar… Daha nice güzel günlere! 💌'},decline:{title:'Bir dahaki sefere ✨',body:'Sorun değil, küçük notum burada bekliyor.'},scenes:[
      llScene('🎁','Sana mini bir sürprizim var!','Merak etmiyor musun bakalım ne hazırladım?',llChoice('AÇALIM!','next'),llChoice('Birazdan','next'),llChoice('Bugün değil','decline')),
      llScene('🎂','Hadi gözlerini kapat!','Üçe kadar sayıyorum… 1… 2… 3!',llChoice('SÜRPRİZ 🎉','success'),llChoice('Bir dakika!','decline'))]},
    en:{name:'Surprise celebration 🎂',to:'My favorite person',from:'Your secret admirer',success:{title:'SO GLAD YOU EXIST! 🎊',body:'Your laugh, our talks and the memories we make. Here’s to many more! 💌'},decline:{title:'Another time ✨',body:'No worries, your little note will still be here.'},scenes:[
      llScene('🎁','A tiny surprise for you!','Ready to find out what it is?',llChoice('OPEN IT!','next'),llChoice('In a minute','next'),llChoice('Not today','decline')),
      llScene('🎂','Close your eyes!','Counting to three... 1... 2... 3!',llChoice('SURPRISE 🎉','success'),llChoice('Hang on!','decline'))]}
  },
  bubu:{icon:'🐻',label:'presetBubu',description:'presetBubuSub',theme:'bubu',
    tr:{name:'Bubu & Dudu’nun mini randevusu 🐻🐼',to:'Dudu',from:'Bubu',success:{title:'BUBU VE DUDU BULUŞUYOR! 🐻🐼',body:'Mini kahve date onaylandı!\nYumuşacık sarılmalar ve sıcacık sohbetler bizi bekliyor 🤎'},decline:{title:'Peki Dudu, no problem 🤍',body:'Bubu burada. Kahvemizi başka zaman içeriz, acele yok.'},scenes:[
      llScene('🐼','DUDUUU, Bİ BAKSANA','Bubu sana minicik bir soru sormak istiyor...',llChoice('Dinliyorum 🥹','next'),llChoice('Sonra mı?','decline')),
      llScene('🐻','KAHVE DATE?','Birlikte 30 dakikalık tatlı bir kahve içelim mi?',llChoice('EVETT 💗','success'),llChoice('Hmmm 🤔','next'),llChoice('Hayır','runaway')),
      llScene('🍯','BONUS TEKLİF!','Bir de ballı kurabiye getiriyorum. Ne dersin?',llChoice('TAMAMM 🤎','success'),llChoice('Başka zaman','decline'))]},
    en:{name:'Bubu & Dudu mini date 🐻🐼',to:'Dudu',from:'Bubu',success:{title:'BUBU AND DUDU HAVE A DATE! 🐻🐼',body:'Coffee date confirmed!\nWarm drinks and cozy cuddles await 🤎'},decline:{title:'Okay Dudu, no problem 🤍',body:'Bubu is still here. Coffee another time, no rush.'},scenes:[
      llScene('🐼','HEY DUDUUU','Bubu has one tiny question...',llChoice('I’m listening 🥹','next'),llChoice('Maybe later','decline')),
      llScene('🐻','COFFEE DATE?','Want a sweet little 30-minute coffee together?',llChoice('YESS 💗','success'),llChoice('Hmm 🤔','next'),llChoice('No','runaway')),
      llScene('🍯','BONUS OFFER!','I’ll bring honey cookies too. What do you say?',llChoice('DEAL 🤎','success'),llChoice('Another time','decline'))]}
  },
  alien:{icon:'👽',label:'presetAlien',description:'presetAlienSub',theme:'alien',
    tr:{name:'Galaktik davet 🛸',to:'Dünyalı',from:'Uzaylı',success:{title:'GÖREV KABUL EDİLDİ! 🚀',body:'Galaksiler arası randevumuz onaylandı.\nKoordinatlar: sen + ben + bir fincan kahve.'},decline:{title:'Sinyal alındı 🤍',body:'Uzay gemisi geri dönüyor. Başka bir gezegende, başka bir gün görüşürüz.'},scenes:[
      llScene('🛸','DÜNYALI, BENİ DUYUYOR MUSUN?','Çok uzaklardan sana özel bir sinyal gönderiyorum.',llChoice('Sinyal net! 📡','next'),llChoice('Meşgulüm','decline')),
      llScene('👽','GİZLİ GALAKTİK GÖREV','Benimle bir kahve içmeye cesaretin var mı?',llChoice('HAZIRIM 🚀','success'),llChoice('Bi düşüneyim','next'),llChoice('Aslaaa','runaway')),
      llScene('🪐','SON MESAJ','Kahve benden, yıldızlar evrenden. Anlaştık mı?',llChoice('ANLAŞTIK ✨','success'),llChoice('Belki başka zaman','decline'))]},
    en:{name:'Galactic invitation 🛸',to:'Earthling',from:'Your alien',success:{title:'MISSION ACCEPTED! 🚀',body:'Our intergalactic date is confirmed.\nCoordinates: you + me + a cup of coffee.'},decline:{title:'Signal received 🤍',body:'Spaceship heading home. See you on another planet, another day.'},scenes:[
      llScene('🛸','EARTHLING, DO YOU COPY?','Sending you an exclusive message from a distant galaxy.',llChoice('Loud and clear! 📡','next'),llChoice('Busy right now','decline')),
      llScene('👽','SECRET SPACE MISSION','Dare to join me for a coffee?',llChoice('LET’S GO 🚀','success'),llChoice('Let me think','next'),llChoice('Absolutely not','runaway')),
      llScene('🪐','FINAL TRANSMISSION','Coffee is on me, stars are on the universe. Deal?',llChoice('DEAL ✨','success'),llChoice('Another time','decline'))]}
  },
  floral:{icon:'🌼',label:'presetFloral',description:'presetFloralSub',theme:'floral',
    tr:{name:'Çiçekli bir not 🌼',to:'Güzel insan',from:'Çiçekçinin biri',success:{title:'BU BUKET SENİN! 🌸',body:'Bir kahve, bir buket, biraz güneş...\nGünün en güzel haberi sensin.'},decline:{title:'Çiçekler yine açar 🌿',body:'Hiç sorun değil. Bahar devam ediyor, başka bir gün görüşürüz.'},scenes:[
      llScene('🌷','SANA BİR ÇİÇEK GETİRDİM','Ama bir de minik sorum var...',llChoice('Sor bakalım 🌸','next'),llChoice('Sonra','decline')),
      llScene('🌼','GÜNEŞLİ BİR KAHVE MOLASI','Bu hafta çiçekli bir yerde kahve içelim mi?',llChoice('Olurrr ☕','success'),llChoice('Biraz düşüneyim','next'),llChoice('Şimdi olmaz','decline')),
      llScene('💐','SON ÇİÇEĞİM','Bir buket güzel sohbet teklif ediyorum. Var mısın?',llChoice('VARIM 🌻','success'),llChoice('Başka gün','decline'))]},
    en:{name:'A flower note 🌼',to:'Lovely human',from:'Someone with flowers',success:{title:'THIS BOUQUET IS YOURS! 🌸',body:'One coffee, one bouquet, a little sunshine...\nYou made my day.'},decline:{title:'Flowers bloom again 🌿',body:'No worries at all. Spring is still here; another day is fine.'},scenes:[
      llScene('🌷','I BROUGHT YOU A FLOWER','And one little question...',llChoice('Go on 🌸','next'),llChoice('Later','decline')),
      llScene('🌼','A SUNNY COFFEE BREAK','Want to grab coffee somewhere full of flowers?',llChoice('Yes please ☕','success'),llChoice('Let me think','next'),llChoice('Not today','decline')),
      llScene('💐','MY LAST FLOWER','Offering you a bouquet of nice conversations. Deal?',llChoice('DEAL 🌻','success'),llChoice('Another day','decline'))]}
  }
};

/* German editions of the six built-in stories. Custom messages are never auto-translated. */
Object.assign(window.LL_TEMPLATES.coffee, {de:{name:'Chaotischer Kaffee ☕',to:'Lieblingsmensch',from:'Mir',success:{title:'YIPPIEEE, KAFFEE-DATE! ☕💗',body:'Unsere 30 Minuten Kaffee sind bestätigt!\nHeißer Tee optional, gute Gesellschaft Pflicht.'},decline:{title:'Kein Problem 🤍',body:'Kaffee an einem anderen Tag. Nichts muss erzwungen werden.'},scenes:[
  llScene('☕','HEEEY DUUU!','Hast du morgen 30 Minuten Zeit für einen Kaffee?',llChoice('JAAAA 💗','success'),llChoice('Mal überlegen 🤔','next'),llChoice('Nein 🙄','runaway')),
  llScene('🥣','SONDERANGEBOT','Und wenn ich dir eine warme Suppe mitbringe?',llChoice('SUPPE? JA 🥹','success'),llChoice('Vielleicht...','next'),llChoice('Nein','runaway')),
  llScene('💳','LETZTES ANGEBOT','Der Kaffee geht auf mich. Deal?',llChoice('DEAL ☕','success'),llChoice('Hmm...','next'),llChoice('Nein','runaway')),
  llScene('🐣','JETZT MAL EHRLICH','Es ist nur ein Kaffee, kein Hauskauf 😭',llChoice('Okayyy 💗','success'),llChoice('Ein andermal 🤍','decline'))
]}});
Object.assign(window.LL_TEMPLATES.gentle, {de:{name:'Süße Einladung 🌷',to:'Dich',from:'Mir',success:{title:'WIE SCHÖN! 🌷',body:'Kaffee, ein nettes Gespräch und ein schöner Tag warten auf uns.'},decline:{title:'Kein Problem 🤍',body:'Ein anderes Mal, wenn es für uns beide passt.'},scenes:[
  llScene('🌷','Eine kleine Einladung','Hast du diese Woche Lust auf einen gemütlichen Kaffee?',llChoice('Sehr gern ☕','success'),llChoice('Vielleicht später','next'),llChoice('Lieber nicht 🤍','decline')),
  llScene('🧁','Ganz ohne Eile','Vielleicht an einem anderen Tag?',llChoice('Klar!','success'),llChoice('Heute nicht','decline'))
]}});
Object.assign(window.LL_TEMPLATES.surprise, {de:{name:'Kleine Überraschung 🎂',to:'Meinen Lieblingsmenschen',from:'Ein Überraschungsfan',success:{title:'WIE SCHÖN, DASS ES DICH GIBT! 🎊',body:'Dein Lachen, unsere Gespräche, gemeinsame Erinnerungen. Auf viele schöne Tage! 💌'},decline:{title:'Ein anderes Mal ✨',body:'Kein Problem, deine kleine Nachricht wartet hier.'},scenes:[
  llScene('🎁','Ich habe eine Überraschung!','Willst du wissen, was es ist?',llChoice('ZEIG MAL!','next'),llChoice('Gleich','next'),llChoice('Heute nicht','decline')),
  llScene('🎂','Augen zu!','Ich zähle bis drei... 1... 2... 3!',llChoice('ÜBERRASCHUNG 🎉','success'),llChoice('Moment!','decline'))
]}});
Object.assign(window.LL_TEMPLATES.bubu, {de:{name:'Bubu & Dudu Mini-Date 🐻🐼',to:'Dudu',from:'Bubu',success:{title:'BUBU UND DUDU TREFFEN SICH! 🐻🐼',body:'Kaffee-Date bestätigt!\nWarme Getränke und kuschelige Umarmungen warten 🤎'},decline:{title:'Okay Dudu, kein Problem 🤍',body:'Bubu ist noch da. Kaffee ein anderes Mal, ganz ohne Druck.'},scenes:[
  llScene('🐼','HEEEEY DUDUUU','Bubu hat eine winzige Frage...',llChoice('Ich höre 🥹','next'),llChoice('Später','decline')),
  llScene('🐻','KAFFEE-DATE?','Hast du Lust auf 30 Minuten gemütlichen Kaffee?',llChoice('JAAAA 💗','success'),llChoice('Hmmm 🤔','next'),llChoice('Nein','runaway')),
  llScene('🍯','BONUSANGEBOT!','Ich bringe Honigkekse mit. Was sagst du?',llChoice('DEAL 🤎','success'),llChoice('Ein andermal','decline'))
]}});
Object.assign(window.LL_TEMPLATES.alien, {de:{name:'Galaktische Einladung 🛸',to:'Erdling',from:'Deinem Alien',success:{title:'MISSION ANGENOMMEN! 🚀',body:'Unser intergalaktisches Date ist bestätigt.\nKoordinaten: du + ich + Kaffee.'},decline:{title:'Signal empfangen 🤍',body:'Das Raumschiff fliegt heim. Wir sehen uns auf einem anderen Planeten.'},scenes:[
  llScene('🛸','ERDLING, HÖRST DU MICH?','Eine geheime Nachricht aus einer fernen Galaxie.',llChoice('Laut und deutlich 📡','next'),llChoice('Bin beschäftigt','decline')),
  llScene('👽','GEHEIME WELTRAUMMISSION','Traust du dich, mit mir Kaffee zu trinken?',llChoice('BIN DABEI 🚀','success'),llChoice('Mal überlegen','next'),llChoice('Niemals','runaway')),
  llScene('🪐','LETZTE FUNKMELDUNG','Kaffee von mir, Sterne vom Universum. Deal?',llChoice('DEAL ✨','success'),llChoice('Ein andermal','decline'))
]}});
Object.assign(window.LL_TEMPLATES.floral, {de:{name:'Eine Blumennachricht 🌼',to:'Einen lieben Menschen',from:'Jemandem mit Blumen',success:{title:'DIESER STRAUSS IST FÜR DICH! 🌸',body:'Ein Kaffee, ein Blumenstrauß, ein bisschen Sonne...\nDu machst meinen Tag schöner.'},decline:{title:'Blumen blühen wieder 🌿',body:'Kein Problem. Der Frühling bleibt, wir sehen uns ein anderes Mal.'},scenes:[
  llScene('🌷','EINE BLUME FÜR DICH','Und ich habe noch eine Frage...',llChoice('Frag nur 🌸','next'),llChoice('Später','decline')),
  llScene('🌼','EINE KAFFEEPAUSE IN DER SONNE','Trinken wir diese Woche Kaffee zwischen Blumen?',llChoice('Gerne ☕','success'),llChoice('Mal überlegen','next'),llChoice('Heute nicht','decline')),
  llScene('💐','MEINE LETZTE BLUME','Ich biete dir einen Strauß schöner Gespräche. Deal?',llChoice('DEAL 🌻','success'),llChoice('Ein andermal','decline'))
]}});
