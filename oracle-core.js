// Daily Oracle — 64卦数据 + 核心逻辑
// 版本: v1.0 · 2026-07-14

const HEXAGRAMS = {
  1:  { name:'乾为天',   en:'The Creative',       binary:'111111', fortune:'上上', level:5,
        judgment:'元亨利贞。', image:'天行健，君子以自强不息。',
        reading:'乾卦六爻皆阳，如龙在天，正是大展宏图之时。事业上可积极进取，但需谨记亢龙有悔，盛极必衰。财运亨通但不可贪婪。感情宜主动出击。',
        tags:['事业腾飞','财运亨通','谨防盛极','主动进取'] },
  2:  { name:'坤为地',   en:'The Receptive',      binary:'000000', fortune:'中上', level:4,
        judgment:'元亨，利牝马之贞。', image:'地势坤，君子以厚德载物。',
        reading:'坤卦六爻纯阴，厚德载物。今日宜守不宜攻，以柔克刚，静待时机。财运平稳，不宜冒险投资。感情需耐心经营，急不得。',
        tags:['以静制动','厚德载物','平稳财运','耐心等待'] },
  3:  { name:'水雷屯',   en:'Difficulty at the Beginning', binary:'010001', fortune:'中下', level:2,
        judgment:'元亨利贞。勿用有攸往。', image:'云雷屯，君子以经纶。',
        reading:'屯卦象征万物初生之艰难。创业维艰，此刻宜谨慎行事，稳扎稳打。勿贸然扩张，先立足再图发展。感情上不要急于表白。',
        tags:['创业维艰','谨言慎行','稳扎稳打','勿急'] },
  4:  { name:'山水蒙',   en:'Youthful Folly',      binary:'100010', fortune:'中中', level:3,
        judgment:'亨。匪我求童蒙，童蒙求我。', image:'山下出泉，蒙。君子以果行育德。',
        reading:'蒙卦讲启蒙之道。今日若遇困惑，宜虚心求教而非固执己见。学习运势佳，适合充电进修。财不宜动，先想清楚再决定。',
        tags:['虚心求教','学习良机','三思后行'] },
  5:  { name:'水天需',   en:'Waiting',             binary:'010111', fortune:'中上', level:4,
        judgment:'有孚，光亨，贞吉。利涉大川。', image:'云上于天，需。君子以饮食宴乐。',
        reading:'需卦教人耐心等待。时机未到，强行反而坏事。今日适合休整、学习、准备，而非出击。财运需等，投资观望为佳。',
        tags:['耐心等待','时机未到','适合休整','观望'] },
  6:  { name:'天水讼',   en:'Conflict',            binary:'111010', fortune:'中下', level:2,
        judgment:'有孚窒惕，中吉，终凶。利见大人。', image:'天与水违行，讼。君子以作事谋始。',
        reading:'讼卦主口舌是非。今日易与人争执，宜忍让避锋芒。合同纠纷需谨慎，签约务必看清条款。感情上别翻旧账。',
        tags:['避免争执','签约谨慎','忍让为上'] },
  7:  { name:'地水师',   en:'The Army',            binary:'000010', fortune:'中中', level:3,
        judgment:'贞丈人吉，无咎。', image:'地中有水，师。君子以容民畜众。',
        reading:'师卦讲带兵打仗之道。今日团队协作是关键，领导力强则成。单打独斗事倍功半，学会授权和信任同伴。',
        tags:['团队协作','领导力','信任授权'] },
  8:  { name:'水地比',   en:'Holding Together',    binary:'010000', fortune:'中上', level:4,
        judgment:'吉。原筮元永贞，无咎。', image:'地上有水，比。先王以建万国，亲诸侯。',
        reading:'比卦讲亲附和合。今日人际关系回暖，适合修复裂痕、拓展人脉。事业上可寻求合作，抱团取暖。感情升温好时机。',
        tags:['人际关系','合作共赢','感情升温'] },
  9:  { name:'风天小畜', en:'Small Accumulating',  binary:'110111', fortune:'中上', level:4,
        judgment:'亨。密云不雨，自我西郊。', image:'风行天上，小畜。君子以懿文德。',
        reading:'小畜卦象征小有积蓄但尚不足。密云不雨，还需再等等。今日宜小有所为，不求大功。财运缓缓积累，勿急功近利。',
        tags:['小有积累','缓缓图之','勿急功近利'] },
  10: { name:'天泽履',   en:'Treading',            binary:'111011', fortune:'中中', level:3,
        judgment:'履虎尾，不咥人，亨。', image:'上天下泽，履。君子以辩上下，定民志。',
        reading:'履卦如履虎尾，需处处小心。今日宜守规矩、按流程办事，切勿越界。官非诉讼要低调，平安即是福。',
        tags:['谨守规矩','步步为营','低调行事'] },
  11: { name:'地天泰',   en:'Peace',               binary:'000111', fortune:'上上', level:5,
        judgment:'小往大来，吉亨。', image:'天地交，泰。后以财成天地之道，辅相天地之宜。',
        reading:'泰卦天地交泰，否极泰来！今日万事顺遂，正是转运之时。事业腾飞，财运亨通。但需记住泰极否来，得意时不忘形。',
        tags:['否极泰来','万事顺遂','得意不忘形'] },
  12: { name:'天地否',   en:'Standstill',          binary:'111000', fortune:'中下', level:2,
        judgment:'否之匪人，不利君子贞。大往小来。', image:'天地不交，否。君子以俭德辟难，不可荣以禄。',
        reading:'否卦天地闭塞不通。今日诸事不顺，但不必气馁。否极泰来之前，宜韬光养晦，守住底线。不宜投资，不宜签约。',
        tags:['诸事不顺','韬光养晦','守住底线'] },
  13: { name:'天火同人', en:'Fellowship',          binary:'111101', fortune:'上上', level:5,
        judgment:'同人于野，亨。利涉大川。', image:'天与火，同人。君子以类族辨物。',
        reading:'同人卦讲志同道合。今日贵人运旺，合作洽谈易成。团队默契度高，适合启动联合项目。感情上与伴侣心有灵犀。',
        tags:['贵人相助','合作共赢','志同道合'] },
  14: { name:'火天大有', en:'Great Possession',    binary:'101111', fortune:'上上', level:5,
        judgment:'元亨。', image:'火在天上，大有。君子以遏恶扬善，顺天休命。',
        reading:'大有卦象征大丰收。前期的努力今日开始见到回报，财富、名誉都有收获。但需记得遏恶扬善，富贵不忘本。分享好运，运势更长久。',
        tags:['大丰收','财富回报','富贵不忘'] },
  15: { name:'地山谦',   en:'Modesty',             binary:'000100', fortune:'上上', level:5,
        judgment:'亨，君子有终。', image:'地中有山，谦。君子以裒多益寡，称物平施。',
        reading:'谦卦六爻皆吉，是64卦中最吉利的卦。今日谦逊行事，低调做人，运气自然来。山在地下，藏锋守拙，反而无往不利。',
        tags:['谦逊得福','低调行事','无往不利'] },
  16: { name:'雷地豫',   en:'Enthusiasm',          binary:'001000', fortune:'上中', level:4,
        judgment:'利建侯行师。', image:'雷出地奋，豫。先王以作乐崇德。',
        reading:'豫卦象征喜悦和乐。今日心情愉悦，适合庆祝、聚会、表达快乐。但要防止乐极生悲，过度享乐反而有损。事业顺势而为即可。',
        tags:['心情愉悦','庆祝聚会','防乐极生悲'] },
  17: { name:'泽雷随',   en:'Following',           binary:'011001', fortune:'中上', level:4,
        judgment:'元亨利贞，无咎。', image:'泽中有雷，随。君子以向晦入宴息。',
        reading:'随卦讲顺势而为。今日不宜逆势操作，顺应潮流事半功倍。跟对人、选对方向很重要。财运随大流，追高不如跟随。',
        tags:['顺势而为','跟随潮流','事半功倍'] },
  18: { name:'山风蛊',   en:'Decay',               binary:'100110', fortune:'中下', level:2,
        judgment:'元亨。利涉大川。先甲三日，后甲三日。', image:'山下有风，蛊。君子以振民育德。',
        reading:'蛊卦暗示积弊需清理。今日宜大扫除，不只是屋子，还有关系、项目中的沉疴旧疾。勇于断舍离，破而后立。',
        tags:['清理积弊','断舍离','破而后立'] },
  19: { name:'地泽临',   en:'Approach',            binary:'000011', fortune:'中上', level:4,
        judgment:'元亨利贞。至于八月有凶。', image:'泽上有地，临。君子以教思无穷，容保民无疆。',
        reading:'临卦象征领导亲临。今日宜主动出击，亲自把控重要事务。好运在八月前需抓紧，莫等过期后悔。领导力是关键。',
        tags:['主动出击','把握时机','领导力'] },
  20: { name:'风地观',   en:'Contemplation',       binary:'110000', fortune:'中中', level:3,
        judgment:'盥而不荐，有孚颙若。', image:'风行地上，观。先王以省方观民设教。',
        reading:'观卦讲观察之道。今日宜做旁观者而非参与者，观察局势再定策略。旁观者清，收集信息优于仓促出手。',
        tags:['观察局势','收集信息','旁观者清'] },
  21: { name:'火雷噬嗑', en:'Biting Through',      binary:'101001', fortune:'中中', level:3,
        judgment:'亨。利用狱。', image:'雷电噬嗑，先王以明罚敕法。',
        reading:'噬嗑卦如咬合硬物。今日遇到障碍需强硬突破，法律相关事务有利。打官司宜主动，谈判桌上不示弱。',
        tags:['突破障碍','法律事务','强硬态度'] },
  22: { name:'山火贲',   en:'Grace',               binary:'100101', fortune:'中中', level:3,
        judgment:'亨。小利有攸往。', image:'山下有火，贲。君子以明庶政，无敢折狱。',
        reading:'贲卦讲外在修饰。今日适合打扮、包装、做展示，形象分很重要。但勿过度装饰，内在实质才是根本。小利可求，大利勿盼。',
        tags:['形象包装','外在修饰','小有所得'] },
  23: { name:'山地剥',   en:'Splitting Apart',     binary:'100000', fortune:'下下', level:1,
        judgment:'不利有攸往。', image:'山附于地，剥。上以厚下安宅。',
        reading:'剥卦阳气将尽，小人道长。今日诸事不宜，守成为上。投资撤退，纠纷避让。留得青山在，不愁没柴烧。',
        tags:['诸事不宜','守成为上','留得青山'] },
  24: { name:'地雷复',   en:'Return',              binary:'000001', fortune:'上中', level:4,
        judgment:'亨。出入无疾，朋来无咎。反复其道，七日来复。', image:'雷在地中，复。先王以至日闭关。',
        reading:'复卦一阳来复，万象更新。低谷已过，好运七日可期。今日宜重启搁置的计划，回归正轨。一切都在变好。',
        tags:['万象更新','回归正轨','七日转运'] },
  25: { name:'天雷无妄', en:'Innocence',           binary:'111001', fortune:'中上', level:4,
        judgment:'元亨利贞。其匪正有眚，不利有攸往。', image:'天下雷行，物与无妄。先王以茂对时育万物。',
        reading:'无妄卦讲不妄为。今日顺其自然就好，不要耍小聪明走捷径。心诚则灵，投机取巧反而招灾。适合真诚待人接物。',
        tags:['顺其自然','心诚则灵','勿投机'] },
  26: { name:'山天大畜', en:'Great Accumulating',  binary:'100111', fortune:'上上', level:5,
        judgment:'利贞。不家食吉。利涉大川。', image:'天在山中，大畜。君子以多识前言往行。',
        reading:'大畜卦象征大积累。今日厚积薄发，前期储备今日可用。财富积累可观，适合长期布局。知识储备变现的好时机。',
        tags:['厚积薄发','财富积累','长期布局'] },
  27: { name:'山雷颐',   en:'Nourishment',         binary:'100001', fortune:'中中', level:3,
        judgment:'贞吉。观颐，自求口实。', image:'山下有雷，颐。君子以慎言语，节饮食。',
        reading:'颐卦讲养生养德。今日注意健康饮食，管住嘴。言语谨慎，祸从口出。投资的养分需时间酝酿，不急不躁。',
        tags:['注意健康','谨慎言语','养精蓄锐'] },
  28: { name:'泽风大过', en:'Great Excess',        binary:'011110', fortune:'中下', level:2,
        judgment:'栋桡。利有攸往，亨。', image:'泽灭木，大过。君子以独立不惧，遁世无闷。',
        reading:'大过卦暗示过犹不及。某方面走极端了，需要回调。感情上不要逼太紧，事业上别用力过猛。找到平衡点。',
        tags:['过犹不及','寻找平衡','回调'] },
  29: { name:'坎为水',   en:'The Abyss',           binary:'010010', fortune:'中下', level:2,
        judgment:'习坎，有孚，维心亨，行有尚。', image:'水洊至，习坎。君子以常德行，习教事。',
        reading:'坎卦重重险阻。今日如陷深渊，一波未平一波又起。保持诚信是渡劫关键。不要挣扎，顺势而为反而能浮出水面。',
        tags:['险阻重重','保持诚信','顺势而为'] },
  30: { name:'离为火',   en:'The Clinging',        binary:'101101', fortune:'中上', level:4,
        judgment:'利贞，亨。畜牝牛吉。', image:'明两作，离。大人以继明照于四方。',
        reading:'离卦象征光明依附。今日宜依附正道上位者，借光而行。创意灵感迸发，适合创作。女贵人运旺。',
        tags:['借光而行','创意迸发','贵人运'] },
  31: { name:'泽山咸',   en:'Influence',           binary:'011100', fortune:'上中', level:4,
        judgment:'亨，利贞。取女吉。', image:'山上有泽，咸。君子以虚受人。',
        reading:'咸卦主感情感应。今日桃花运旺，单身者有机会遇到心仪对象。恋爱中的人关系升温。合作谈判中先交心再谈事。',
        tags:['感情运势','桃花旺','先交心'] },
  32: { name:'雷风恒',   en:'Duration',            binary:'001110', fortune:'中上', level:4,
        judgment:'亨，无咎，利贞，利有攸往。', image:'雷风，恒。君子以立不易方。',
        reading:'恒卦讲持之以恒。今日宜坚守而非变卦，长期投资继续持有。感情是马拉松不是短跑。稳定压倒一切。',
        tags:['持之以恒','长期持有','稳定为上'] },
  33: { name:'天山遁',   en:'Retreat',             binary:'111100', fortune:'中中', level:3,
        judgment:'亨，小利贞。', image:'天下有山，遁。君子以远小人，不恶而严。',
        reading:'遁卦教人适时退避。今日退一步海阔天空，不必硬碰硬。远离是非之人和地方。股市宜减仓止盈。',
        tags:['退避三舍','远离是非','减仓止盈'] },
  34: { name:'雷天大壮', en:'Great Power',         binary:'001111', fortune:'上中', level:4,
        judgment:'利贞。', image:'雷在天上，大壮。君子以非礼勿履。',
        reading:'大壮卦力量正盛。今日可以大展拳脚，但切记用正不用邪。力量越大责任越大，勿以强凌弱。事业冲劲十足。',
        tags:['力量正盛','大展拳脚','行得正'] },
  35: { name:'火地晋',   en:'Progress',            binary:'101000', fortune:'上上', level:5,
        judgment:'康侯用锡马蕃庶，昼日三接。', image:'明出地上，晋。君子以自昭明德。',
        reading:'晋卦如旭日东升。今日贵人提拔，步步高升。职场上有晋升机会，主动表现自己。求职面试运势极佳。',
        tags:['步步高升','晋升机会','贵人提拔'] },
  36: { name:'地火明夷', en:'Darkening of the Light', binary:'000101', fortune:'中下', level:2,
        judgment:'利艰贞。', image:'明入地中，明夷。君子以莅众，用晦而明。',
        reading:'明夷卦光明被遮蔽。今日宜韬光养晦，装傻比逞能安全。小人当道时，保持低调等待光明重现。忍一时风平浪静。',
        tags:['韬光养晦','装傻保身','忍一时'] },
  37: { name:'风火家人', en:'The Family',          binary:'110101', fortune:'上中', level:4,
        judgment:'利女贞。', image:'风自火出，家人。君子以言有物而行有恒。',
        reading:'家人卦主家庭和睦。今日宜陪家人，享受天伦之乐。家宅平安即是福。事业上适合内部整顿、团队建设。女性运旺。',
        tags:['家庭和睦','团队建设','女性运旺'] },
  38: { name:'火泽睽',   en:'Opposition',          binary:'101011', fortune:'中下', level:2,
        judgment:'小事吉。', image:'上火下泽，睽。君子以同而异。',
        reading:'睽卦讲分歧对立。今日容易与人口角，求同存异是智慧。合作方可能意见不合，小事可成大事难。婚姻关系紧张需沟通。',
        tags:['求同存异','口角注意','小事可成'] },
  39: { name:'水山蹇',   en:'Obstruction',         binary:'010100', fortune:'中下', level:2,
        judgment:'利西南，不利东北。利见大人。', image:'山上有水，蹇。君子以反身修德。',
        reading:'蹇卦前路崎岖。今日困难重重，硬闯不如绕道。向西南方向发展可能更顺。宜求教贵人指点迷津。修德自省是破解之道。',
        tags:['困难重重','绕道而行','求教贵人'] },
  40: { name:'雷水解',   en:'Deliverance',         binary:'001010', fortune:'中上', level:4,
        judgment:'利西南。无所往，其来复吉。', image:'雷雨作，解。君子以赦过宥罪。',
        reading:'解卦天地解冻，万物复苏。前期的困局今日开始化解。原谅自己、宽恕他人，放下包袱才能轻装上阵。诉讼和解佳。',
        tags:['困局化解','宽恕放下','轻装上阵'] },
  41: { name:'山泽损',   en:'Decrease',            binary:'100011', fortune:'中下', level:2,
        judgment:'有孚，元吉，无咎，可贞，利有攸往。', image:'山下有泽，损。君子以惩忿窒欲。',
        reading:'损卦讲减损之道。今日可能需要破财消灾或有舍有得。学会做减法，断舍离某些不必要的东西。减损之后反而轻松。',
        tags:['破财消灾','断舍离','有舍有得'] },
  42: { name:'风雷益',   en:'Increase',            binary:'110001', fortune:'上上', level:5,
        judgment:'利有攸往，利涉大川。', image:'风雷，益。君子以见善则迁，有过则改。',
        reading:'益卦象征增益。今日诸事增长，投资回报可观。学习新技能事半功倍。见善则迁，趁机升级自己。大利南方。',
        tags:['增益增长','投资回报','学习升级'] },
  43: { name:'泽天夬',   en:'Breakthrough',        binary:'011111', fortune:'中上', level:4,
        judgment:'扬于王庭，孚号有厉。', image:'泽上于天，夬。君子以施禄及下。',
        reading:'夬卦果断决裂。今日该断则断，犹豫只会反受其乱。离职、分手、清仓——心里早有的决定今天可以执行了。',
        tags:['果断决裂','当断则断','不再犹豫'] },
  44: { name:'天风姤',   en:'Coming to Meet',      binary:'111110', fortune:'中中', level:3,
        judgment:'女壮，勿用取女。', image:'天下有风，姤。后以施命诰四方。',
        reading:'姤卦讲偶然相遇。今日可能有意外邂逅，但不一定是良缘。一见钟情需冷静，先了解再说。合作也需考察背景。',
        tags:['意外邂逅','勿急确定','先了解'] },
  45: { name:'泽地萃',   en:'Gathering Together',  binary:'011000', fortune:'上中', level:4,
        judgment:'亨。王假有庙。利见大人。', image:'泽上于地，萃。君子以除戎器，戒不虞。',
        reading:'萃卦精英汇聚。今日适合参加聚会、行业交流，人脉是金。群策群力好过单打独斗。但防人群中有小人。',
        tags:['精英汇聚','人脉为王','群策群力'] },
  46: { name:'地风升',   en:'Pushing Upward',      binary:'000110', fortune:'上上', level:5,
        judgment:'元亨。用见大人，勿恤。南征吉。', image:'地中生木，升。君子以顺德，积小以高大。',
        reading:'升卦如树木生长，稳健上升。今日扎扎实实，步步高升。不急不躁的进步最可靠。事业南方发展有利。学生考试运佳。',
        tags:['稳健上升','步步高升','考试运佳'] },
  47: { name:'泽水困',   en:'Exhaustion',          binary:'011010', fortune:'下下', level:1,
        judgment:'亨，贞，大人吉，无咎。有言不信。', image:'泽无水，困。君子以致命遂志。',
        reading:'困卦四面楚歌。今日精疲力竭，钱紧人乏。守正待时，不妄动是关键。说实话没人信，不如沉默。低谷是暂时的。',
        tags:['四面楚歌','精疲力竭','守正待时'] },
  48: { name:'水风井',   en:'The Well',            binary:'010110', fortune:'中中', level:3,
        judgment:'改邑不改井，无丧无得。', image:'木上有水，井。君子以劳民劝相。',
        reading:'井卦象征公共资源。今日建立系统比追逐目标更重要。水井在，人来人往都不怕。搭建自动化、建立流程是正道。',
        tags:['建立系统','搭建流程','稳如井'] },
  49: { name:'泽火革',   en:'Revolution',          binary:'011101', fortune:'中上', level:4,
        judgment:'巳日乃孚，元亨利贞，悔亡。', image:'泽中有火，革。君子以治历明时。',
        reading:'革卦讲变革维新。今日适合拥抱变化——换工作、改方案、变风格。旧的不去新的不来。改革会带来阵痛但值得。',
        tags:['拥抱变化','变革维新','旧去新来'] },
  50: { name:'火风鼎',   en:'The Cauldron',        binary:'101110', fortune:'上上', level:5,
        judgment:'元吉，亨。', image:'木上有火，鼎。君子以正位凝命。',
        reading:'鼎卦象征权力与稳固。今日适合确定方向、锁定目标，鼎定江山。合作签约、正式任命的好日子。身居其位谋其政。',
        tags:['鼎定江山','正式签约','权力稳固'] },
  51: { name:'震为雷',   en:'The Arousing',        binary:'001001', fortune:'中中', level:3,
        judgment:'亨。震来虩虩，笑言哑哑。', image:'洊雷，震。君子以恐惧修省。',
        reading:'震卦如惊雷炸响。今日可能有突发变故让你措手不及。遇惊不怕，事后反而能笑对。借此机会反省修德。',
        tags:['突发变故','遇惊不怕','借机反省'] },
  52: { name:'艮为山',   en:'Keeping Still',       binary:'100100', fortune:'中中', level:3,
        judgment:'艮其背，不获其身。行其庭，不见其人。', image:'兼山，艮。君子以思不出其位。',
        reading:'艮卦教人知止。今日当行则行，当止则止，不要贪。投资设好止盈止损线。感情上不越界不纠缠。知止不殆。',
        tags:['知止不殆','不贪','设好边界'] },
  53: { name:'风山渐',   en:'Development',         binary:'110100', fortune:'上中', level:4,
        judgment:'女归吉，利贞。', image:'山上有木，渐。君子以居贤德善俗。',
        reading:'渐卦讲渐进发展。今日按部就班，不求速成。感情上适合细水长流而非一见钟情。项目阶段推进最稳妥。',
        tags:['按部就班','渐进发展','细水长流'] },
  54: { name:'雷泽归妹', en:'The Marrying Maiden', binary:'001011', fortune:'中下', level:2,
        judgment:'征凶，无攸利。', image:'泽上有雷，归妹。君子以永终知敝。',
        reading:'归妹卦暗示不当结合。今日小心合伙协议中的不平等条款。感情上强扭的瓜不甜。合作需看清楚谁在主导。',
        tags:['不当结合','平等条款','强扭不甜'] },
  55: { name:'雷火丰',   en:'Abundance',           binary:'001101', fortune:'上中', level:4,
        judgment:'亨，王假之。勿忧，宜日中。', image:'雷电皆至，丰。君子以折狱致刑。',
        reading:'丰卦象征丰盛盈满。今日收获满满，但需知日中则昃。趁阳光正好赶紧晒粮。享受当下但要为雨天的到来准备。',
        tags:['丰盛盈满','享受当下','未雨绸缪'] },
  56: { name:'火山旅',   en:'The Wanderer',        binary:'101100', fortune:'中下', level:2,
        judgment:'小亨，旅贞吉。', image:'山上有火，旅。君子以明慎用刑而不留狱。',
        reading:'旅卦如人在旅途。今日漂泊感强烈，心里不踏实。搬家、出差、换城市的不确定是常态。低调行事，入乡随俗。',
        tags:['人在旅途','漂泊不定','入乡随俗'] },
  57: { name:'巽为风',   en:'The Gentle',          binary:'110110', fortune:'中中', level:3,
        judgment:'小亨，利有攸往，利见大人。', image:'随风，巽。君子以申命行事。',
        reading:'巽卦如风渗透。今日以柔克刚，委婉沟通比直来直去有效。适合做说服、销售、谈判工作。退一步海阔天空。',
        tags:['以柔克刚','委婉沟通','退一步'] },
  58: { name:'兑为泽',   en:'The Joyous',          binary:'011011', fortune:'上中', level:4,
        judgment:'亨，利贞。', image:'丽泽，兑。君子以朋友讲习。',
        reading:'兑卦主喜悦交流。今日宜聚会交友，心情舒畅。适合做分享、演讲、教学。快乐本身就是好运。笑口常开财自来。',
        tags:['喜悦交流','聚会交友','笑口常开'] },
  59: { name:'风水涣',   en:'Dispersion',          binary:'110010', fortune:'中中', level:3,
        judgment:'亨。王假有庙，利涉大川。', image:'风行水上，涣。先王以享于帝立庙。',
        reading:'涣卦如风吹水散。今日散掉心中郁结，放下执念即解脱。团队涣散时需重新凝聚人心。破而后立，散而后聚。',
        tags:['放下执念','重新凝聚','散而后聚'] },
  60: { name:'水泽节',   en:'Limitation',          binary:'010011', fortune:'中中', level:3,
        judgment:'亨。苦节不可贞。', image:'泽上有水，节。君子以制数度，议德行。',
        reading:'节卦讲节制有度。今日适可而止，过犹不及。花钱有预算，说话有分寸。节食、节欲、节言，节制者得自由。',
        tags:['适可而止','节制有度','预算管控'] },
  61: { name:'风泽中孚', en:'Inner Truth',         binary:'110011', fortune:'中上', level:4,
        judgment:'豚鱼吉，利涉大川，利贞。', image:'泽上有风，中孚。君子以议狱缓死。',
        reading:'中孚卦讲内心诚信。今日真诚是最大的武器。诚信待人，人必信之。签署协议、口头承诺的好时机。说到做到。',
        tags:['内心诚信','说到做到','以诚待人'] },
  62: { name:'雷山小过', en:'Small Excess',        binary:'001100', fortune:'中中', level:3,
        judgment:'亨，利贞。可小事，不可大事。', image:'山上有雷，小过。君子以行过乎恭，丧过乎哀。',
        reading:'小过卦小小越界无伤大雅。今日小事可为，大事勿动。小打小闹可以，大动作留到以后。节约成本，稳扎稳打。',
        tags:['小事可为','大事勿动','稳扎稳打'] },
  63: { name:'水火既济', en:'After Completion',    binary:'010101', fortune:'中中', level:3,
        judgment:'亨小，利贞。初吉终乱。', image:'水在火上，既济。君子以思患而预防之。',
        reading:'既济卦象征已成之事。祝贺——但，初吉终乱是规律。完成后马上开始准备下一阶段，别在功劳簿上躺太久。',
        tags:['初吉终乱','预防未来','别躺功劳簿'] },
  64: { name:'火水未济', en:'Before Completion',   binary:'101010', fortune:'中中', level:3,
        judgment:'亨。小狐汔济，濡其尾，无攸利。', image:'火在水上，未济。君子以慎辨物居方。',
        reading:'未济卦象征事情未完成。别急，就差最后一步了。善始善终比开局更重要。最后关头最容易出错，加倍小心。',
        tags:['善始善终','最后关头','加倍小心'] }
};

// ============================================================
// Wallet (OKX) + X Layer Testnet
// ============================================================

// X Layer Testnet 网络参数
const XLAYER_TESTNET = {
  chainId: '0x7A0',        // 1952
  chainName: 'X Layer Testnet',
  rpcUrls: ['https://testrpc.xlayer.tech/terigon'],
  nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
  blockExplorerUrls: ['https://www.okx.com/web3/explorer/xlayer-test']
};

function getOKXProvider() {
  if (window.okxwallet) return window.okxwallet;
  if (window.ethereum && window.ethereum.isOKXWallet) return window.ethereum;
  return null;
}

async function connectWallet() {
  const provider = getOKXProvider();
  if (!provider) {
    alert('请先安装 OKX Wallet 浏览器插件\nhttps://www.okx.com/web3');
    return null;
  }
  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (e) {
    console.error('钱包连接失败', e);
    return null;
  }
}

/**
 * 切换钱包网络到 X Layer 测试网
 * 返回 true 表示成功（当前已在或在提示后切换成功）
 */
async function switchToXLayerTestnet() {
  const provider = getOKXProvider();
  if (!provider) return false;
  try {
    // 先尝试切换
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: XLAYER_TESTNET.chainId }]
    });
    console.log('[Oracle] 已切换到 X Layer 测试网');
    return true;
  } catch (switchError) {
    // 如果网络未添加（4902），则添加
    if (switchError.code === 4902) {
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [XLAYER_TESTNET]
        });
        console.log('[Oracle] 已添加并切换到 X Layer 测试网');
        return true;
      } catch (addError) {
        console.error('[Oracle] 添加 X Layer 测试网失败', addError);
        alert('请手动在 OKX 钱包中添加 X Layer 测试网\nRPC: https://testrpc.xlayer.tech/terigon\nChain ID: 1952');
        return false;
      }
    }
    console.error('[Oracle] 切换网络失败', switchError);
    return false;
  }
}

/**
 * 字符串转 hex (用于 tx data 字段)
 */
function stringToHex(str) {
  return '0x' + Array.from(new TextEncoder().encode(str))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * 链上存证（完整流程）：
 * 1. 切换到 X Layer 测试网
 * 2. personal_sign 签名
 * 3. eth_sendTransaction 0 OKB 自转账，将签名哈希写入 data 字段
 * 返回 { address, signature, txHash } 或 null
 */
async function sendOnChainAttestation(message) {
  const provider = getOKXProvider();
  if (!provider) return null;

  try {
    // Step 0: 切网
    const switched = await switchToXLayerTestnet();
    if (!switched) {
      console.error('[Oracle] 无法切换到 X Layer 测试网');
      return null;
    }

    // Step 1: 获取账户
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];

    // Step 2: 签名存证消息
    const signature = await provider.request({
      method: 'personal_sign',
      params: [message, address]
    });
    console.log('[Oracle] 签名完成:', signature.slice(0, 20) + '…');

    // Step 3: 发送 0 OKB 自转账交易，data 字段记录存证信息
    // data 格式: 前缀 0x4441494c594f5241434c45 ("DAILYORACLE") + 签名前 32 字节
    const attestationData = '0x4441494c594f5241434c45' + signature.slice(2, 66); // 标记 + 签名片段
    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [{
        from: address,
        to: address,           // 自转账
        value: '0x0',          // 0 OKB
        data: attestationData
      }]
    });
    console.log('[Oracle] 交易已发送，txHash:', txHash);

    return { address, signature, txHash };
  } catch (e) {
    console.error('[Oracle] 链上存证失败', e);
    // 区分用户取消和真实错误
    if (e.code === 4001) {
      console.log('[Oracle] 用户取消了操作');
      return { cancelled: true };
    }
    return null;
  }
}

// ============================================================
// Divination (3-coin method)
// ============================================================
function tossCoins() {
  // Simulate 3 coins: each coin 2 or 3, sum = 6,7,8,9
  // 6=old yin, 7=young yang, 8=young yin, 9=old yang
  const c1 = Math.random() < 0.5 ? 2 : 3;
  const c2 = Math.random() < 0.5 ? 2 : 3;
  const c3 = Math.random() < 0.5 ? 2 : 3;
  return c1 + c2 + c3;
}

function castHexagram() {
  const lines = [];
  const changingLines = [];
  for (let i = 0; i < 6; i++) {
    const value = tossCoins();
    lines.push(value);
    if (value === 6 || value === 9) changingLines.push(i);
  }
  // Lines array: index 0 = line 1 (初爻), index 5 = line 6 (上爻)
  // Binary representation: index 0 = top (bit 5), index 5 = bottom (bit 0)
  // Yang = 7 or 9, Yin = 6 or 8
  const primaryBinary = lines.map(l => (l === 7 || l === 9) ? '1' : '0').reverse().join('');
  const changedBinary  = lines.map((l, i) => {
    if (l === 6) return '1'; // old yin → yang
    if (l === 9) return '0'; // old yang → yin
    return (l === 7) ? '1' : '0';
  }).reverse().join('');
  const primaryId = parseInt(primaryBinary, 2) + 1;
  return {
    primaryId,
    primaryHex: HEXAGRAMS[primaryId],
    primaryBinary,
    changedId: primaryBinary !== changedBinary ? parseInt(changedBinary, 2) + 1 : null,
    changedHex: primaryBinary !== changedBinary ? HEXAGRAMS[parseInt(changedBinary, 2) + 1] : null,
    changingLines,
    lines,
    timestamp: new Date().toISOString()
  };
}

// ============================================================
// Storage
// ============================================================
const STORAGE_KEY = 'daily_oracle_history';

function saveToHistory(record) {
  const history = getHistory();
  // One divination per day — replace today's if exists
  const today = new Date().toISOString().slice(0, 10);
  const filtered = history.filter(r => r.date !== today);
  const entry = {
    id: Date.now(),
    date: today,
    primaryId: record.primaryId,
    primaryName: record.primaryHex.name,
    fortune: record.primaryHex.fortune,
    reading: record.primaryHex.reading.slice(0, 60) + '...',
    changingLines: record.changingLines,
    changedId: record.changedId,
    changedName: record.changedHex ? record.changedHex.name : null,
    txHash: null,
    timestamp: record.timestamp
  };
  filtered.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return entry;
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

function updateTxHash(recordId, txHash) {
  const history = getHistory();
  const entry = history.find(r => String(r.id) === String(recordId));
  if (entry) { entry.txHash = txHash; }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function updateAttestationRecord(recordId, txHash, signature) {
  const history = getHistory();
  const entry = history.find(r => String(r.id) === String(recordId));
  if (entry) {
    entry.txHash = txHash;
    entry.signature = signature;
    entry.chain = 'X Layer Testnet';
    entry.chainId = 1952;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

// ============================================================
// Signature-based on-chain attestation
// ============================================================
async function signAttestation(message) {
  const provider = getOKXProvider();
  if (!provider) return null;
  try {
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    const signature = await provider.request({
      method: 'personal_sign',
      params: [message, accounts[0]]
    });
    return { address: accounts[0], signature };
  } catch (e) {
    console.error('签名失败', e);
    return null;
  }
}

// ============================================================
// URL param helpers
// ============================================================
function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}
