// Daily Oracle — 64卦数据 + 核心逻辑
// 版本: v1.0 · 2026-07-14

const HEXAGRAMS = {
  1:  { name:'乾为天',   en:'The Creative',       binary:'111111', fortune:'上上', level:5,
        judgment:'元亨利贞。',
        judgment_en:'The Creative works sublime success, furthering through perseverance.',
        image:'天行健，君子以自强不息。',
        image_en:'The movement of heaven is full of power. Thus the superior man makes himself strong and untiring.',
        reading:'乾卦六爻皆阳，如龙在天，正是大展宏图之时。事业上可积极进取，但需谨记亢龙有悔，盛极必衰。财运亨通但不可贪婪。感情宜主动出击。',
        reading_en:'All six lines are yang — like dragons soaring in the sky. Now is the time for bold action. Push forward in career, but remember: the proud dragon will have cause to repent. Fortune flows but do not be greedy. In love, take the initiative.',
        tags:['事业腾飞','财运亨通','谨防盛极','主动进取'],
        tags_en:['Career Soaring','Fortune Flowing','Beware Excess','Take Initiative'] },
  2:  { name:'坤为地',   en:'The Receptive',      binary:'000000', fortune:'中上', level:4,
        judgment:'元亨，利牝马之贞。',
        judgment_en:'The Receptive brings about sublime success, furthering through the perseverance of a mare.',
        image:'地势坤，君子以厚德载物。',
        image_en:'The earth\'s condition is receptive devotion. Thus the superior man who has breadth of character carries the outer world.',
        reading:'坤卦六爻纯阴，厚德载物。今日宜守不宜攻，以柔克刚，静待时机。财运平稳，不宜冒险投资。感情需耐心经营，急不得。',
        reading_en:'Pure yin — the power of receptive devotion. Today favor defense over offense. Overcome hardness with softness, await the right moment. Finances steady, avoid risky investments. In love, patience is key — don\'t rush.',
        tags:['以静制动','厚德载物','平稳财运','耐心等待'],
        tags_en:['Defense Over Offense','Carry With Grace','Steady Finances','Be Patient'] },
  3:  { name:'水雷屯',   en:'Difficulty at the Beginning', binary:'010001', fortune:'中下', level:2,
        judgment:'元亨利贞。勿用有攸往。',
        judgment_en:'Difficulty at the Beginning works supreme success, furthering through perseverance. Nothing should be undertaken.',
        image:'云雷屯，君子以经纶。',
        image_en:'Clouds and thunder: the image of Difficulty at the Beginning. Thus the superior man brings order out of confusion.',
        reading:'屯卦象征万物初生之艰难。创业维艰，此刻宜谨慎行事，稳扎稳打。勿贸然扩张，先立足再图发展。感情上不要急于表白。',
        reading_en:'The hexagram of beginnings — everything born faces hardship. Starting a venture is tough; proceed with caution, step by step. Don\'t expand recklessly — establish your footing first. In love, don\'t confess too soon.',
        tags:['创业维艰','谨言慎行','稳扎稳打','勿急'],
        tags_en:['Venture Hardship','Be Cautious','Steady Steps','Don\'t Rush'] },
  4:  { name:'山水蒙',   en:'Youthful Folly',      binary:'100010', fortune:'中中', level:3,
        judgment:'亨。匪我求童蒙，童蒙求我。',
        judgment_en:'Youthful Folly has success. It is not I who seek the young fool; the young fool seeks me.',
        image:'山下出泉，蒙。君子以果行育德。',
        image_en:'A spring wells up at the foot of the mountain: the image of Youth. Thus the superior man fosters his character by thoroughness in all he does.',
        reading:'蒙卦讲启蒙之道。今日若遇困惑，宜虚心求教而非固执己见。学习运势佳，适合充电进修。财不宜动，先想清楚再决定。',
        reading_en:'The hexagram of enlightenment. When confused today, seek guidance rather than clinging to your own views. Learning luck is strong — perfect for study and self-improvement. Don\'t move money yet; think clearly first.',
        tags:['虚心求教','学习良机','三思后行'],
        tags_en:['Seek Guidance','Learning Luck','Think Before Acting'] },
  5:  { name:'水天需',   en:'Waiting',             binary:'010111', fortune:'中上', level:4,
        judgment:'有孚，光亨，贞吉。利涉大川。',
        judgment_en:'Waiting. If you are sincere, you have light and success. Perseverance brings good fortune. It furthers one to cross the great water.',
        image:'云上于天，需。君子以饮食宴乐。',
        image_en:'Clouds rise up to heaven: the image of Waiting. Thus the superior man eats and drinks, is joyous and of good cheer.',
        reading:'需卦教人耐心等待。时机未到，强行反而坏事。今日适合休整、学习、准备，而非出击。财运需等，投资观望为佳。',
        reading_en:'The hexagram of patient waiting. The time has not yet come — forcing things will backfire. Today is for rest, study, and preparation, not attack. Fortune awaits — keep investments on watch.',
        tags:['耐心等待','时机未到','适合休整','观望'],
        tags_en:['Wait Patiently','Time Not Yet','Rest & Prepare','Watch & Wait'] },
  6:  { name:'天水讼',   en:'Conflict',            binary:'111010', fortune:'中下', level:2,
        judgment:'有孚窒惕，中吉，终凶。利见大人。',
        judgment_en:'Conflict. You are sincere and are being obstructed. A cautious halt halfway brings good fortune. Going through to the end brings misfortune.',
        image:'天与水违行，讼。君子以作事谋始。',
        image_en:'Heaven and water go their opposite ways: the image of Conflict. Thus in all his transactions the superior man carefully considers the beginning.',
        reading:'讼卦主口舌是非。今日易与人争执，宜忍让避锋芒。合同纠纷需谨慎，签约务必看清条款。感情上别翻旧账。',
        reading_en:'The hexagram of disputes. Today you may clash with others — better to yield than fight. Contract disputes need caution; read every clause before signing. In love, don\'t dig up old grievances.',
        tags:['避免争执','签约谨慎','忍让为上'],
        tags_en:['Avoid Arguments','Sign Carefully','Yield Gracefully'] },
  7:  { name:'地水师',   en:'The Army',            binary:'000010', fortune:'中中', level:3,
        judgment:'贞丈人吉，无咎。',
        judgment_en:'The Army. The army needs perseverance and a strong man. Good fortune without blame.',
        image:'地中有水，师。君子以容民畜众。',
        image_en:'In the middle of the earth is water: the image of the Army. Thus the superior man increases his masses by generosity toward the people.',
        reading:'师卦讲带兵打仗之道。今日团队协作是关键，领导力强则成。单打独斗事倍功半，学会授权和信任同伴。',
        reading_en:'The hexagram of leading troops. Today teamwork is crucial — strong leadership brings success. Going solo yields half the result; learn to delegate and trust your comrades.',
        tags:['团队协作','领导力','信任授权'],
        tags_en:['Teamwork','Leadership','Trust & Delegate'] },
  8:  { name:'水地比',   en:'Holding Together',    binary:'010000', fortune:'中上', level:4,
        judgment:'吉。原筮元永贞，无咎。',
        judgment_en:'Holding Together brings good fortune. Inquire of the oracle once again whether you possess sublimity, constancy, and perseverance; then there is no blame.',
        image:'地上有水，比。先王以建万国，亲诸侯。',
        image_en:'On the earth is water: the image of Holding Together. Thus the kings of antiquity bestowed the different states as fiefs and cultivated friendly relations with the feudal lords.',
        reading:'比卦讲亲附和合。今日人际关系回暖，适合修复裂痕、拓展人脉。事业上可寻求合作，抱团取暖。感情升温好时机。',
        reading_en:'The hexagram of union. Today relationships warm up — perfect for healing rifts and expanding your network. Seek cooperation in career; warmth in numbers. Love is heating up.',
        tags:['人际关系','合作共赢','感情升温'],
        tags_en:['Relationships','Win-Win Cooperation','Love Warms Up'] },
  9:  { name:'风天小畜', en:'Small Accumulating',  binary:'110111', fortune:'中上', level:4,
        judgment:'亨。密云不雨，自我西郊。',
        judgment_en:'The Taming Power of the Small has success. Dense clouds, no rain from our western region.',
        image:'风行天上，小畜。君子以懿文德。',
        image_en:'The wind drives across heaven: the image of the Taming Power of the Small. Thus the superior man refines the outward aspect of his nature.',
        reading:'小畜卦象征小有积蓄但尚不足。密云不雨，还需再等等。今日宜小有所为，不求大功。财运缓缓积累，勿急功近利。',
        reading_en:'Small accumulation — you have some savings but not yet enough. Dense clouds without rain — wait a little longer. Today favor small wins over grand achievements. Wealth accumulates slowly; don\'t chase quick gains.',
        tags:['小有积累','缓缓图之','勿急功近利'],
        tags_en:['Small Accumulation','Take It Slow','No Quick Gains'] },
  10: { name:'天泽履',   en:'Treading',            binary:'111011', fortune:'中中', level:3,
        judgment:'履虎尾，不咥人，亨。',
        judgment_en:'Treading upon the tail of the tiger. It does not bite the man. Success.',
        image:'上天下泽，履。君子以辩上下，定民志。',
        image_en:'Heaven above, the lake below: the image of Treading. Thus the superior man discriminates between high and low, and thereby fortifies the thinking of the people.',
        reading:'履卦如履虎尾，需处处小心。今日宜守规矩、按流程办事，切勿越界。官非诉讼要低调，平安即是福。',
        reading_en:'Like treading on a tiger\'s tail — proceed with utmost care. Today follow the rules, stick to procedures, never overstep. In legal matters, stay low-key; safety itself is blessing.',
        tags:['谨守规矩','步步为营','低调行事'],
        tags_en:['Follow Rules','Step by Step','Stay Low-Key'] },
  11: { name:'地天泰',   en:'Peace',               binary:'000111', fortune:'上上', level:5,
        judgment:'小往大来，吉亨。',
        judgment_en:'Peace. The small departs, the great approaches. Good fortune. Success.',
        image:'天地交，泰。后以财成天地之道，辅相天地之宜。',
        image_en:'Heaven and earth unite: the image of Peace. Thus the ruler divides and completes the course of heaven and earth; he furthers and regulates the gifts of heaven and earth, and so aids the people.',
        reading:'泰卦天地交泰，否极泰来！今日万事顺遂，正是转运之时。事业腾飞，财运亨通。但需记住泰极否来，得意时不忘形。',
        reading_en:'Heaven and earth in harmony — after adversity comes peace! Today everything flows smoothly, your luck is turning. Career soars, fortune flows. But remember: peace at its peak turns to standstill — stay humble in success.',
        tags:['否极泰来','万事顺遂','得意不忘形'],
        tags_en:['Peace Returns','Everything Flows','Stay Humble'] },
  12: { name:'天地否',   en:'Standstill',          binary:'111000', fortune:'中下', level:2,
        judgment:'否之匪人，不利君子贞。大往小来。',
        judgment_en:'Standstill. Evil people do not further the perseverance of the superior man. The great departs; the small approaches.',
        image:'天地不交，否。君子以俭德辟难，不可荣以禄。',
        image_en:'Heaven and earth do not unite: the image of Standstill. Thus the superior man falls back upon his inner worth in order to escape the difficulties. He does not permit himself to be honored with revenue.',
        reading:'否卦天地闭塞不通。今日诸事不顺，但不必气馁。否极泰来之前，宜韬光养晦，守住底线。不宜投资，不宜签约。',
        reading_en:'Heaven and earth are blocked. Nothing goes right today, but don\'t lose heart. Before the turn from standstill to peace, hide your light and guard your baseline. No investing, no signing contracts.',
        tags:['诸事不顺','韬光养晦','守住底线'],
        tags_en:['Nothing Goes Right','Hide Your Light','Guard Your Baseline'] },
  13: { name:'天火同人', en:'Fellowship',          binary:'111101', fortune:'上上', level:5,
        judgment:'同人于野，亨。利涉大川。',
        judgment_en:'Fellowship with Men in the open. Success. It furthers one to cross the great water.',
        image:'天与火，同人。君子以类族辨物。',
        image_en:'Heaven together with fire: the image of Fellowship with Men. Thus the superior man organizes the clans and makes distinctions between things.',
        reading:'同人卦讲志同道合。今日贵人运旺，合作洽谈易成。团队默契度高，适合启动联合项目。感情上与伴侣心有灵犀。',
        reading_en:'The hexagram of kindred spirits. Today benefactors abound, collaborations flourish. Team chemistry is high — perfect for launching joint projects. In love, you and your partner are in sync.',
        tags:['贵人相助','合作共赢','志同道合'],
        tags_en:['Benefactors','Win-Win','Kindred Spirits'] },
  14: { name:'火天大有', en:'Great Possession',    binary:'101111', fortune:'上上', level:5,
        judgment:'元亨。',
        judgment_en:'Possession in Great Measure. Supreme success.',
        image:'火在天上，大有。君子以遏恶扬善，顺天休命。',
        image_en:'Fire in heaven above: the image of Possession in Great Measure. Thus the superior man curbs evil and furthers good, and thereby obeys the benevolent will of heaven.',
        reading:'大有卦象征大丰收。前期的努力今日开始见到回报，财富、名誉都有收获。但需记得遏恶扬善，富贵不忘本。分享好运，运势更长久。',
        reading_en:'The hexagram of great harvest. Your past efforts now bear fruit — wealth and reputation both flow in. But remember to curb evil and further good; share your luck for lasting fortune.',
        tags:['大丰收','财富回报','富贵不忘'],
        tags_en:['Great Harvest','Wealth Returns','Share Your Luck'] },
  15: { name:'地山谦',   en:'Modesty',             binary:'000100', fortune:'上上', level:5,
        judgment:'亨，君子有终。',
        judgment_en:'Modesty creates success. The superior man carries things through.',
        image:'地中有山，谦。君子以裒多益寡，称物平施。',
        image_en:'Within the earth, a mountain: the image of Modesty. Thus the superior man reduces that which is too much, and augments that which is too little.',
        reading:'谦卦六爻皆吉，是64卦中最吉利的卦。今日谦逊行事，低调做人，运气自然来。山在地下，藏锋守拙，反而无往不利。',
        reading_en:'All six lines of Modesty are auspicious — the most fortunate of all 64 hexagrams. Today be humble, stay low-key, and luck comes naturally. A mountain hidden beneath the earth: hiding your edge brings invincibility.',
        tags:['谦逊得福','低调行事','无往不利'],
        tags_en:['Humble Blessings','Stay Low-Key','Invincible'] },
  16: { name:'雷地豫',   en:'Enthusiasm',          binary:'001000', fortune:'上中', level:4,
        judgment:'利建侯行师。',
        judgment_en:'Enthusiasm. It furthers one to install helpers and to set armies marching.',
        image:'雷出地奋，豫。先王以作乐崇德。',
        image_en:'Thunder comes resounding out of the earth: the image of Enthusiasm. Thus the ancient kings made music in order to honor merit, and offered it with splendor to the Supreme Deity.',
        reading:'豫卦象征喜悦和乐。今日心情愉悦，适合庆祝、聚会、表达快乐。但要防止乐极生悲，过度享乐反而有损。事业顺势而为即可。',
        reading_en:'The hexagram of joy and harmony. Today your mood is light — perfect for celebration, gathering, and expressing happiness. But guard against joy turning to sorrow; overindulgence harms. Let career flow naturally.',
        tags:['心情愉悦','庆祝聚会','防乐极生悲'],
        tags_en:['Joyful Mood','Celebrate','Guard Excess'] },
  17: { name:'泽雷随',   en:'Following',           binary:'011001', fortune:'中上', level:4,
        judgment:'元亨利贞，无咎。',
        judgment_en:'Following has supreme success. Perseverance furthers. No blame.',
        image:'泽中有雷，随。君子以向晦入宴息。',
        image_en:'Thunder in the middle of the lake: the image of Following. Thus the superior man at nightfall goes indoors for rest and recuperation.',
        reading:'随卦讲顺势而为。今日不宜逆势操作，顺应潮流事半功倍。跟对人、选对方向很重要。财运随大流，追高不如跟随。',
        reading_en:'The hexagram of going with the flow. Today don\'t swim against the current — follow the trend for double the result. Choosing the right people and direction matters. Wealth follows the crowd; better to follow than chase.',
        tags:['顺势而为','跟随潮流','事半功倍'],
        tags_en:['Go With Flow','Follow Trends','Double Results'] },
  18: { name:'山风蛊',   en:'Decay',               binary:'100110', fortune:'中下', level:2,
        judgment:'元亨。利涉大川。先甲三日，后甲三日。',
        judgment_en:'Work on What Has Been Spoiled has supreme success. It furthers one to cross the great water. Before the starting point, three days. After the starting point, three days.',
        image:'山下有风，蛊。君子以振民育德。',
        image_en:'The wind blows low on the mountain: the image of Decay. Thus the superior man stirs up the people and strengthens their spirit.',
        reading:'蛊卦暗示积弊需清理。今日宜大扫除，不只是屋子，还有关系、项目中的沉疴旧疾。勇于断舍离，破而后立。',
        reading_en:'The hexagram hints at accumulated rot that needs clearing. Today is for spring cleaning — not just your room, but stagnant relationships and dead projects. Have the courage to cut ties; only through breaking can you rebuild.',
        tags:['清理积弊','断舍离','破而后立'],
        tags_en:['Clear Decay','Cut Ties','Break to Rebuild'] },
  19: { name:'地泽临',   en:'Approach',            binary:'000011', fortune:'中上', level:4,
        judgment:'元亨利贞。至于八月有凶。',
        judgment_en:'Approach has supreme success. Perseverance furthers. When the eighth month comes, there will be misfortune.',
        image:'泽上有地，临。君子以教思无穷，容保民无疆。',
        image_en:'The earth above the lake: the image of Approach. Thus the superior man is inexhaustible in his will to teach, and without limits in his tolerance and protection of the people.',
        reading:'临卦象征领导亲临。今日宜主动出击，亲自把控重要事务。好运在八月前需抓紧，莫等过期后悔。领导力是关键。',
        reading_en:'The hexagram of the leader drawing near. Today take initiative, personally handle key matters. Good fortune must be seized before the eighth month — don\'t wait until it\'s too late. Leadership is key.',
        tags:['主动出击','把握时机','领导力'],
        tags_en:['Take Initiative','Seize Timing','Leadership Key'] },
  20: { name:'风地观',   en:'Contemplation',       binary:'110000', fortune:'中中', level:3,
        judgment:'盥而不荐，有孚颙若。',
        judgment_en:'Contemplation. The ablution has been made, but not yet the offering. Full of trust they look up to him.',
        image:'风行地上，观。先王以省方观民设教。',
        image_en:'The wind blows over the earth: the image of Contemplation. Thus the kings of antiquity visited the regions of the world, contemplated the people, and gave them instruction.',
        reading:'观卦讲观察之道。今日宜做旁观者而非参与者，观察局势再定策略。旁观者清，收集信息优于仓促出手。',
        reading_en:'The hexagram of observation. Today be the observer, not the participant. Study the situation before setting your strategy. The bystander sees clearly — gather intelligence before acting hastily.',
        tags:['观察局势','收集信息','旁观者清'],
        tags_en:['Observe First','Gather Intel','Bystander Clear'] },
  21: { name:'火雷噬嗑', en:'Biting Through',      binary:'101001', fortune:'中中', level:3,
        judgment:'亨。利用狱。',
        judgment_en:'Biting Through has success. It is favorable to let justice be administered.',
        image:'雷电噬嗑，先王以明罚敕法。',
        image_en:'Thunder and lightning: the image of Biting Through. Thus the kings of antiquity made firm the laws through clearly defined penalties.',
        reading:'噬嗑卦如咬合硬物。今日遇到障碍需强硬突破，法律相关事务有利。打官司宜主动，谈判桌上不示弱。',
        reading_en:'Like biting through something tough. When you hit obstacles today, break through with force. Legal matters are favored. In disputes, take the offensive; at the negotiating table, don\'t show weakness.',
        tags:['突破障碍','法律事务','强硬态度'],
        tags_en:['Break Through','Legal Favored','Be Firm'] },
  22: { name:'山火贲',   en:'Grace',               binary:'100101', fortune:'中中', level:3,
        judgment:'亨。小利有攸往。',
        judgment_en:'Grace has success. In small matters, it is favorable to undertake something.',
        image:'山下有火，贲。君子以明庶政，无敢折狱。',
        image_en:'Fire at the foot of the mountain: the image of Grace. Thus does the superior man proceed when clearing up current affairs. But he dare not decide controversial issues in this way.',
        reading:'贲卦讲外在修饰。今日适合打扮、包装、做展示，形象分很重要。但勿过度装饰，内在实质才是根本。小利可求，大利勿盼。',
        reading_en:'The hexagram of external adornment. Today is for dressing up, packaging, presenting — image matters. But don\'t over-decorate; inner substance is the foundation. Small gains possible, don\'t expect the big prize.',
        tags:['形象包装','外在修饰','小有所得'],
        tags_en:['Image & Polish','External Grace','Small Gains'] },
  23: { name:'山地剥',   en:'Splitting Apart',     binary:'100000', fortune:'下下', level:1,
        judgment:'不利有攸往。',
        judgment_en:'Splitting Apart. It does not further one to go anywhere.',
        image:'山附于地，剥。上以厚下安宅。',
        image_en:'The mountain rests on the earth: the image of Splitting Apart. Thus those above can ensure their position only by giving generously to those below.',
        reading:'剥卦阳气将尽，小人道长。今日诸事不宜，守成为上。投资撤退，纠纷避让。留得青山在，不愁没柴烧。',
        reading_en:'Yang energy is nearly gone — petty people prevail. Today nothing is favorable; holding your ground is best. Retreat from investments, avoid disputes. As long as the mountain stands, there is wood to burn.',
        tags:['诸事不宜','守成为上','留得青山'],
        tags_en:['Nothing Favorable','Hold Ground','Mountain Remains'] },
  24: { name:'地雷复',   en:'Return',              binary:'000001', fortune:'上中', level:4,
        judgment:'亨。出入无疾，朋来无咎。反复其道，七日来复。',
        judgment_en:'Return. Success. Going out and coming in without error. Friends come without blame. The way returns. After seven days comes the return.',
        image:'雷在地中，复。先王以至日闭关。',
        image_en:'Thunder within the earth: the image of the Turning Point. Thus the kings of antiquity closed the passes at the time of solstice.',
        reading:'复卦一阳来复，万象更新。低谷已过，好运七日可期。今日宜重启搁置的计划，回归正轨。一切都在变好。',
        reading_en:'One yang line returns — all things renew. The valley is past; good fortune returns within seven days. Today restart shelved plans, return to the right path. Everything is getting better.',
        tags:['万象更新','回归正轨','七日转运'],
        tags_en:['All Things Renew','Return to Path','Seven-Day Turn'] },
  25: { name:'天雷无妄', en:'Innocence',           binary:'111001', fortune:'中上', level:4,
        judgment:'元亨利贞。其匪正有眚，不利有攸往。',
        judgment_en:'Innocence. Supreme success. Perseverance furthers. If someone is not as he should be, he has misfortune, and it does not further him to undertake anything.',
        image:'天下雷行，物与无妄。先王以茂对时育万物。',
        image_en:'Under heaven, thunder rolls: all things attain the natural state of Innocence. Thus the kings of old, rich in virtue, nourished all beings in accordance with the seasons.',
        reading:'无妄卦讲不妄为。今日顺其自然就好，不要耍小聪明走捷径。心诚则灵，投机取巧反而招灾。适合真诚待人接物。',
        reading_en:'The hexagram of not forcing things. Today let things flow naturally — no clever shortcuts. Sincerity brings results; opportunism brings disaster. Perfect for genuine, heartfelt interactions.',
        tags:['顺其自然','心诚则灵','勿投机'],
        tags_en:['Let It Flow','Sincerity Works','No Shortcuts'] },
  26: { name:'山天大畜', en:'Great Accumulating',  binary:'100111', fortune:'上上', level:5,
        judgment:'利贞。不家食吉。利涉大川。',
        judgment_en:'The Taming Power of the Great. Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.',
        image:'天在山中，大畜。君子以多识前言往行。',
        image_en:'Heaven within the mountain: the image of the Taming Power of the Great. Thus the superior man acquaints himself with many sayings of antiquity and many deeds of the past, in order to strengthen his character thereby.',
        reading:'大畜卦象征大积累。今日厚积薄发，前期储备今日可用。财富积累可观，适合长期布局。知识储备变现的好时机。',
        reading_en:'The hexagram of great accumulation. Today your stored reserves can be deployed. Wealth accumulation is impressive — perfect for long-term positioning. Knowledge reserves convert to real gains.',
        tags:['厚积薄发','财富积累','长期布局'],
        tags_en:['Great Accumulation','Wealth Built','Long-Term Play'] },
  27: { name:'山雷颐',   en:'Nourishment',         binary:'100001', fortune:'中中', level:3,
        judgment:'贞吉。观颐，自求口实。',
        judgment_en:'The Corners of the Mouth. Perseverance brings good fortune. Pay heed to the providing of nourishment, and to what a man seeks to fill his own mouth with.',
        image:'山下有雷，颐。君子以慎言语，节饮食。',
        image_en:'At the foot of the mountain, thunder: the image of Providing Nourishment. Thus the superior man is careful of his words and temperate in eating and drinking.',
        reading:'颐卦讲养生养德。今日注意健康饮食，管住嘴。言语谨慎，祸从口出。投资的养分需时间酝酿，不急不躁。',
        reading_en:'The hexagram of nourishment. Today watch your diet and health — guard your mouth. Be careful with words; disaster comes from the mouth. Investments need time to nurture; stay calm.',
        tags:['注意健康','谨慎言语','养精蓄锐'],
        tags_en:['Watch Health','Guard Words','Nurture Calmly'] },
  28: { name:'泽风大过', en:'Great Excess',        binary:'011110', fortune:'中下', level:2,
        judgment:'栋桡。利有攸往，亨。',
        judgment_en:'Preponderance of the Great. The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.',
        image:'泽灭木，大过。君子以独立不惧，遁世无闷。',
        image_en:'The lake rises above the trees: the image of Preponderance of the Great. Thus the superior man, when he stands alone, is unconcerned, and if he has to renounce the world, he is undaunted.',
        reading:'大过卦暗示过犹不及。某方面走极端了，需要回调。感情上不要逼太紧，事业上别用力过猛。找到平衡点。',
        reading_en:'Too much of a good thing. Some aspect has gone to extremes and needs correction. In love, don\'t push too hard. In career, don\'t overexert. Find the balance point.',
        tags:['过犹不及','寻找平衡','回调'],
        tags_en:['Too Much','Find Balance','Pull Back'] },
  29: { name:'坎为水',   en:'The Abyss',           binary:'010010', fortune:'中下', level:2,
        judgment:'习坎，有孚，维心亨，行有尚。',
        judgment_en:'The Abysmal repeated. If you are sincere, you have success in your heart, and whatever you do succeeds.',
        image:'水洊至，习坎。君子以常德行，习教事。',
        image_en:'Water flows on uninterruptedly and reaches its goal: the image of the Abysmal repeated. Thus the superior man walks in lasting virtue and carries on the business of teaching.',
        reading:'坎卦重重险阻。今日如陷深渊，一波未平一波又起。保持诚信是渡劫关键。不要挣扎，顺势而为反而能浮出水面。',
        reading_en:'Danger upon danger. Today feels like an abyss — one wave after another. Keeping faith is the key to crossing through. Don\'t struggle; going with the flow actually brings you to the surface.',
        tags:['险阻重重','保持诚信','顺势而为'],
        tags_en:['Danger Repeated','Keep Faith','Go With Flow'] },
  30: { name:'离为火',   en:'The Clinging',        binary:'101101', fortune:'中上', level:4,
        judgment:'利贞，亨。畜牝牛吉。',
        judgment_en:'The Clinging. Perseverance furthers. It brings success. Care of the cow brings good fortune.',
        image:'明两作，离。大人以继明照于四方。',
        image_en:'That which is bright rises twice: the image of Fire. Thus the great man, by perpetuating this brightness, illuminates the four quarters of the world.',
        reading:'离卦象征光明依附。今日宜依附正道上位者，借光而行。创意灵感迸发，适合创作。女贵人运旺。',
        reading_en:'The hexagram of clinging brightness. Today attach yourself to the right people in power, and borrow their light. Creative inspiration bursts forth — perfect for artistry. Female benefactor luck is strong.',
        tags:['借光而行','创意迸发','贵人运'],
        tags_en:['Borrow Light','Creative Burst','Female Benefactor'] },
  31: { name:'泽山咸',   en:'Influence',           binary:'011100', fortune:'上中', level:4,
        judgment:'亨，利贞。取女吉。',
        judgment_en:'Influence. Success. Perseverance furthers. To take a maiden to wife brings good fortune.',
        image:'山上有泽，咸。君子以虚受人。',
        image_en:'A lake on the mountain: the image of Influence. Thus the superior man encourages people to approach him by his readiness to receive them.',
        reading:'咸卦主感情感应。今日桃花运旺，单身者有机会遇到心仪对象。恋爱中的人关系升温。合作谈判中先交心再谈事。',
        reading_en:'The hexagram of romantic attraction. Today romantic luck is strong — singles may meet someone special. Couples grow closer. In negotiations, connect heart-to-heart before talking business.',
        tags:['感情运势','桃花旺','先交心'],
        tags_en:['Romance Luck','Peach Blossom','Heart First'] },
  32: { name:'雷风恒',   en:'Duration',            binary:'001110', fortune:'中上', level:4,
        judgment:'亨，无咎，利贞，利有攸往。',
        judgment_en:'Duration. Success. No blame. Perseverance furthers. It furthers one to have somewhere to go.',
        image:'雷风，恒。君子以立不易方。',
        image_en:'Thunder and wind: the image of Duration. Thus the superior man stands firm and does not change his direction.',
        reading:'恒卦讲持之以恒。今日宜坚守而非变卦，长期投资继续持有。感情是马拉松不是短跑。稳定压倒一切。',
        reading_en:'The hexagram of endurance. Today stay the course rather than switching. Long-term investments — keep holding. Love is a marathon, not a sprint. Stability trumps everything.',
        tags:['持之以恒','长期持有','稳定为上'],
        tags_en:['Stay the Course','Long-Term Hold','Stability Wins'] },
  33: { name:'天山遁',   en:'Retreat',             binary:'111100', fortune:'中中', level:3,
        judgment:'亨，小利贞。',
        judgment_en:'Retreat. Success. In what is small, perseverance furthers.',
        image:'天下有山，遁。君子以远小人，不恶而严。',
        image_en:'Mountain under heaven: the image of Retreat. Thus the superior man keeps the inferior man at a distance, not angrily but with reserve.',
        reading:'遁卦教人适时退避。今日退一步海阔天空，不必硬碰硬。远离是非之人和地方。股市宜减仓止盈。',
        reading_en:'The hexagram of strategic withdrawal. Today one step back opens vast horizons — don\'t meet force with force. Stay away from toxic people and places. In stocks, reduce positions and take profits.',
        tags:['退避三舍','远离是非','减仓止盈'],
        tags_en:['Strategic Retreat','Avoid Toxicity','Take Profits'] },
  34: { name:'雷天大壮', en:'Great Power',         binary:'001111', fortune:'上中', level:4,
        judgment:'利贞。',
        judgment_en:'The Power of the Great. Perseverance furthers.',
        image:'雷在天上，大壮。君子以非礼勿履。',
        image_en:'Thunder in heaven above: the image of the Power of the Great. Thus the superior man does not tread upon paths that do not accord with established order.',
        reading:'大壮卦力量正盛。今日可以大展拳脚，但切记用正不用邪。力量越大责任越大，勿以强凌弱。事业冲劲十足。',
        reading_en:'Great power is at its peak. Today you can flex your muscles, but always use the righteous path, never force. The greater the power, the greater the responsibility — never bully the weak. Career momentum is strong.',
        tags:['力量正盛','大展拳脚','行得正'],
        tags_en:['Power at Peak','Flex Muscles','Walk Right Path'] },
  35: { name:'火地晋',   en:'Progress',            binary:'101000', fortune:'上上', level:5,
        judgment:'康侯用锡马蕃庶，昼日三接。',
        judgment_en:'Progress. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.',
        image:'明出地上，晋。君子以自昭明德。',
        image_en:'The sun rises over the earth: the image of Progress. Thus the superior man himself brightens his bright virtue.',
        reading:'晋卦如旭日东升。今日贵人提拔，步步高升。职场上有晋升机会，主动表现自己。求职面试运势极佳。',
        reading_en:'Like the rising sun. Today benefactors lift you up — step by step you rise. Promotion opportunities at work; show your best self. Job interview luck is excellent.',
        tags:['步步高升','晋升机会','贵人提拔'],
        tags_en:['Step Up','Promotion Chance','Benefactor Lifts'] },
  36: { name:'地火明夷', en:'Darkening of the Light', binary:'000101', fortune:'中下', level:2,
        judgment:'利艰贞。',
        judgment_en:'Darkening of the Light. In adversity it furthers one to be persevering.',
        image:'明入地中，明夷。君子以莅众，用晦而明。',
        image_en:'The light has sunk into the earth: the image of Darkening of the Light. Thus does the superior man live with the great mass: he veils his light, yet still shines.',
        reading:'明夷卦光明被遮蔽。今日宜韬光养晦，装傻比逞能安全。小人当道时，保持低调等待光明重现。忍一时风平浪静。',
        reading_en:'The light is hidden. Today hide your brightness — playing dumb is safer than showing off. When petty people rule, keep a low profile and wait for the light to return. Endure for now; calm seas will come.',
        tags:['韬光养晦','装傻保身','忍一时'],
        tags_en:['Hide Your Light','Play Dumb','Endure Now'] },
  37: { name:'风火家人', en:'The Family',          binary:'110101', fortune:'上中', level:4,
        judgment:'利女贞。',
        judgment_en:'The Family. The perseverance of the woman furthers.',
        image:'风自火出，家人。君子以言有物而行有恒。',
        image_en:'Wind comes forth from fire: the image of the Family. Thus the superior man has substance in his words and duration in his way of life.',
        reading:'家人卦主家庭和睦。今日宜陪家人，享受天伦之乐。家宅平安即是福。事业上适合内部整顿、团队建设。女性运旺。',
        reading_en:'The hexagram of family harmony. Today be with your loved ones, enjoy domestic bliss. A peaceful home is the greatest blessing. In career, favor internal restructuring and team building. Female luck is strong.',
        tags:['家庭和睦','团队建设','女性运旺'],
        tags_en:['Family Harmony','Team Building','Female Luck'] },
  38: { name:'火泽睽',   en:'Opposition',          binary:'101011', fortune:'中下', level:2,
        judgment:'小事吉。',
        judgment_en:'Opposition. In small matters, good fortune.',
        image:'上火下泽，睽。君子以同而异。',
        image_en:'Above, fire; below, the lake: the image of Opposition. Thus amid all fellowship the superior man retains his individuality.',
        reading:'睽卦讲分歧对立。今日容易与人口角，求同存异是智慧。合作方可能意见不合，小事可成大事难。婚姻关系紧张需沟通。',
        reading_en:'The hexagram of division. Today disagreements are likely — seeking common ground while respecting differences is wisdom. Partners may clash; small matters succeed, big ones don\'t. Marital tension needs communication.',
        tags:['求同存异','口角注意','小事可成'],
        tags_en:['Seek Common Ground','Watch Words','Small Wins'] },
  39: { name:'水山蹇',   en:'Obstruction',         binary:'010100', fortune:'中下', level:2,
        judgment:'利西南，不利东北。利见大人。',
        judgment_en:'Obstruction. The southwest furthers. The northeast does not further. It furthers one to see the great man.',
        image:'山上有水，蹇。君子以反身修德。',
        image_en:'Water on the mountain: the image of Obstruction. Thus the superior man turns his attention to himself and molds his character.',
        reading:'蹇卦前路崎岖。今日困难重重，硬闯不如绕道。向西南方向发展可能更顺。宜求教贵人指点迷津。修德自省是破解之道。',
        reading_en:'The road ahead is rugged. Today difficulties pile up — better to go around than push through. The southwest direction may be smoother. Seek guidance from mentors. Self-reflection is the key to breaking through.',
        tags:['困难重重','绕道而行','求教贵人'],
        tags_en:['Heavy Obstacles','Go Around','Seek Mentor'] },
  40: { name:'雷水解',   en:'Deliverance',         binary:'001010', fortune:'中上', level:4,
        judgment:'利西南。无所往，其来复吉。',
        judgment_en:'Deliverance. The southwest furthers. If there is no longer anything where one has to go, return brings good fortune.',
        image:'雷雨作，解。君子以赦过宥罪。',
        image_en:'Thunder and rain set in: the image of Deliverance. Thus the superior man pardons mistakes and forgives misdeeds.',
        reading:'解卦天地解冻，万物复苏。前期的困局今日开始化解。原谅自己、宽恕他人，放下包袱才能轻装上阵。诉讼和解佳。',
        reading_en:'Heaven and earth thaw — all things revive. Today\'s earlier entanglements begin to unravel. Forgive yourself, forgive others; drop the burden to travel light. Lawsuits favor settlement.',
        tags:['困局化解','宽恕放下','轻装上阵'],
        tags_en:['Entanglement Unties','Forgive & Release','Travel Light'] },
  41: { name:'山泽损',   en:'Decrease',            binary:'100011', fortune:'中下', level:2,
        judgment:'有孚，元吉，无咎，可贞，利有攸往。',
        judgment_en:'Decrease combined with sincerity brings about supreme good fortune without blame. One may be persevering in this. It furthers one to undertake something.',
        image:'山下有泽，损。君子以惩忿窒欲。',
        image_en:'At the foot of the mountain, the lake: the image of Decrease. Thus the superior man controls his anger and restrains his instincts.',
        reading:'损卦讲减损之道。今日可能需要破财消灾或有舍有得。学会做减法，断舍离某些不必要的东西。减损之后反而轻松。',
        reading_en:'The hexagram of reduction. Today you may need to lose money to avert disaster, or give up to gain. Learn to subtract — cut ties with the unnecessary. After reduction, you actually feel lighter.',
        tags:['破财消灾','断舍离','有舍有得'],
        tags_en:['Lose to Gain','Cut Ties','Give & Receive'] },
  42: { name:'风雷益',   en:'Increase',            binary:'110001', fortune:'上上', level:5,
        judgment:'利有攸往，利涉大川。',
        judgment_en:'Increase. It furthers one to undertake something. It furthers one to cross the great water.',
        image:'风雷，益。君子以见善则迁，有过则改。',
        image_en:'Wind and thunder: the image of Increase. Thus the superior man: if he sees good, he imitates it; if he has faults, he rids himself of them.',
        reading:'益卦象征增益。今日诸事增长，投资回报可观。学习新技能事半功倍。见善则迁，趁机升级自己。大利南方。',
        reading_en:'The hexagram of increase. Today everything grows — investment returns are impressive. Learning new skills yields double the result. See the good and follow it — use this chance to upgrade yourself. The south is especially favorable.',
        tags:['增益增长','投资回报','学习升级'],
        tags_en:['Growth & Gain','Investment Returns','Upgrade Self'] },
  43: { name:'泽天夬',   en:'Breakthrough',        binary:'011111', fortune:'中上', level:4,
        judgment:'扬于王庭，孚号有厉。',
        judgment_en:'Breakthrough. One must resolutely make the matter known at the court of the king. It must be announced truthfully. Danger.',
        image:'泽上于天，夬。君子以施禄及下。',
        image_en:'The lake has risen up to heaven: the image of Breakthrough. Thus the superior man dispenses riches downward and refrains from resting on his virtue.',
        reading:'夬卦果断决裂。今日该断则断，犹豫只会反受其乱。离职、分手、清仓——心里早有的决定今天可以执行了。',
        reading_en:'The hexagram of decisive severance. Today what must be cut, cut — hesitation only brings more pain. Resignation, breakup, liquidation — the decisions you\'ve held in your heart can be executed today.',
        tags:['果断决裂','当断则断','不再犹豫'],
        tags_en:['Decisive Cut','Cut Now','No Hesitation'] },
  44: { name:'天风姤',   en:'Coming to Meet',      binary:'111110', fortune:'中中', level:3,
        judgment:'女壮，勿用取女。',
        judgment_en:'Coming to Meet. The maiden is powerful. One should not marry such a maiden.',
        image:'天下有风，姤。后以施命诰四方。',
        image_en:'Under heaven, wind: the image of Coming to Meet. Thus does the prince act when disseminating his commands and proclaiming them to the four quarters of heaven.',
        reading:'姤卦讲偶然相遇。今日可能有意外邂逅，但不一定是良缘。一见钟情需冷静，先了解再说。合作也需考察背景。',
        reading_en:'The hexagram of chance encounters. Today you may meet someone unexpectedly, but not necessarily a good match. Love at first sight needs cooling — understand first. Cooperations also need background checks.',
        tags:['意外邂逅','勿急确定','先了解'],
        tags_en:['Chance Encounter','Don\'t Rush','Understand First'] },
  45: { name:'泽地萃',   en:'Gathering Together',  binary:'011000', fortune:'上中', level:4,
        judgment:'亨。王假有庙。利见大人。',
        judgment_en:'Gathering Together. Success. The king approaches his temple. It furthers one to see the great man.',
        image:'泽上于地，萃。君子以除戎器，戒不虞。',
        image_en:'Over the earth, the lake: the image of Gathering Together. Thus the superior man renews his weapons in order to meet the unforseen.',
        reading:'萃卦精英汇聚。今日适合参加聚会、行业交流，人脉是金。群策群力好过单打独斗。但防人群中有小人。',
        reading_en:'The hexagram of elite gathering. Today is perfect for meetups and industry networking — connections are gold. Collective wisdom beats solo effort. But beware of petty people in the crowd.',
        tags:['精英汇聚','人脉为王','群策群力'],
        tags_en:['Elite Gathering','Network Is Gold','Collective Wisdom'] },
  46: { name:'地风升',   en:'Pushing Upward',      binary:'000110', fortune:'上上', level:5,
        judgment:'元亨。用见大人，勿恤。南征吉。',
        judgment_en:'Pushing Upward has supreme success. One must see the great man. Fear not. Departure toward the south brings good fortune.',
        image:'地中生木，升。君子以顺德，积小以高大。',
        image_en:'Within the earth, wood grows: the image of Pushing Upward. Thus the superior man of devoted character heaps up small things in order to achieve something high and great.',
        reading:'升卦如树木生长，稳健上升。今日扎扎实实，步步高升。不急不躁的进步最可靠。事业南方发展有利。学生考试运佳。',
        reading_en:'Like a tree growing — steady upward progress. Today build solidly, step by step you rise. Unhurried progress is the most reliable. Career favors the south. Student exam luck is excellent.',
        tags:['稳健上升','步步高升','考试运佳'],
        tags_en:['Steady Rise','Step by Step','Exam Luck'] },
  47: { name:'泽水困',   en:'Exhaustion',          binary:'011010', fortune:'下下', level:1,
        judgment:'亨，贞，大人吉，无咎。有言不信。',
        judgment_en:'Oppression. Success. Perseverance. The great man brings about good fortune. No blame. When one has something to say, it is not believed.',
        image:'泽无水，困。君子以致命遂志。',
        image_en:'There is no water in the lake: the image of Exhaustion. Thus the superior man stakes his life on following his will.',
        reading:'困卦四面楚歌。今日精疲力竭，钱紧人乏。守正待时，不妄动是关键。说实话没人信，不如沉默。低谷是暂时的。',
        reading_en:'Besieged on all sides. Today you\'re exhausted — money tight, energy drained. Hold to the right path and wait — don\'t act rashly. Truth falls on deaf ears; silence is better. The valley is temporary.',
        tags:['四面楚歌','精疲力竭','守正待时'],
        tags_en:['Besieged','Exhausted','Hold & Wait'] },
  48: { name:'水风井',   en:'The Well',            binary:'010110', fortune:'中中', level:3,
        judgment:'改邑不改井，无丧无得。',
        judgment_en:'The Well. The town may be changed, but the well cannot be changed. It neither decreases nor increases.',
        image:'木上有水，井。君子以劳民劝相。',
        image_en:'Water over wood: the image of the Well. Thus the superior man encourages the people at their work and exhorts them to help one another.',
        reading:'井卦象征公共资源。今日建立系统比追逐目标更重要。水井在，人来人往都不怕。搭建自动化、建立流程是正道。',
        reading_en:'The hexagram of shared infrastructure. Today building systems matters more than chasing goals. A well stays put while people come and go. Build automations, establish processes — that is the right path.',
        tags:['建立系统','搭建流程','稳如井'],
        tags_en:['Build Systems','Establish Process','Steady as a Well'] },
  49: { name:'泽火革',   en:'Revolution',          binary:'011101', fortune:'中上', level:4,
        judgment:'巳日乃孚，元亨利贞，悔亡。',
        judgment_en:'Revolution. On your own day you are believed. Supreme success, furthering through perseverance. Remorse disappears.',
        image:'泽中有火，革。君子以治历明时。',
        image_en:'Fire in the lake: the image of Revolution. Thus the superior man sets the calendar in order and makes the seasons clear.',
        reading:'革卦讲变革维新。今日适合拥抱变化——换工作、改方案、变风格。旧的不去新的不来。改革会带来阵痛但值得。',
        reading_en:'The hexagram of transformation. Today embrace change — switch jobs, change plans, shift style. The old won\'t go unless the new comes. Reform brings growing pains but is worth it.',
        tags:['拥抱变化','变革维新','旧去新来'],
        tags_en:['Embrace Change','Transform & Renew','Old Out, New In'] },
  50: { name:'火风鼎',   en:'The Cauldron',        binary:'101110', fortune:'上上', level:5,
        judgment:'元吉，亨。',
        judgment_en:'The Cauldron. Supreme good fortune. Success.',
        image:'木上有火，鼎。君子以正位凝命。',
        image_en:'Fire over wood: the image of the Cauldron. Thus the superior man consolidates his fate by making his position correct.',
        reading:'鼎卦象征权力与稳固。今日适合确定方向、锁定目标，鼎定江山。合作签约、正式任命的好日子。身居其位谋其政。',
        reading_en:'The hexagram of power and stability. Today is perfect for setting direction, locking in targets, and solidifying your position. An auspicious day for contracts, official appointments. Occupy your proper place and do your duty.',
        tags:['鼎定江山','正式签约','权力稳固'],
        tags_en:['Solidify Position','Sign Contracts','Power Stable'] },
  51: { name:'震为雷',   en:'The Arousing',        binary:'001001', fortune:'中中', level:3,
        judgment:'亨。震来虩虩，笑言哑哑。',
        judgment_en:'The Arousing Shock. Success. Shock comes — oh, oh! Laughing words — ha, ha!',
        image:'洊雷，震。君子以恐惧修省。',
        image_en:'Thunder repeated: the image of Shock. Thus in fear and trembling the superior man sets his life in order and examines himself.',
        reading:'震卦如惊雷炸响。今日可能有突发变故让你措手不及。遇惊不怕，事后反而能笑对。借此机会反省修德。',
        reading_en:'Like a thunderclap. Today unexpected disruption may catch you off guard. Don\'t fear the shock — afterwards you can laugh about it. Use this chance for self-reflection and moral cultivation.',
        tags:['突发变故','遇惊不怕','借机反省'],
        tags_en:['Sudden Shock','Don\'t Fear','Self-Reflect'] },
  52: { name:'艮为山',   en:'Keeping Still',       binary:'100100', fortune:'中中', level:3,
        judgment:'艮其背，不获其身。行其庭，不见其人。',
        judgment_en:'Keeping Still. Keeping his back still so that he no longer feels his body. He goes into his courtyard and does not see his people. No blame.',
        image:'兼山，艮。君子以思不出其位。',
        image_en:'Mountains standing close together: the image of Keeping Still. Thus the superior man does not permit his thoughts to go beyond his situation.',
        reading:'艮卦教人知止。今日当行则行，当止则止，不要贪。投资设好止盈止损线。感情上不越界不纠缠。知止不殆。',
        reading_en:'The hexagram of knowing when to stop. Today act when you should, stop when you should — don\'t be greedy. In investing, set stop-loss and take-profit lines. In love, don\'t cross boundaries or cling. Knowing when to stop keeps you safe.',
        tags:['知止不殆','不贪','设好边界'],
        tags_en:['Know When to Stop','Don\'t Be Greedy','Set Boundaries'] },
  53: { name:'风山渐',   en:'Development',         binary:'110100', fortune:'上中', level:4,
        judgment:'女归吉，利贞。',
        judgment_en:'Development. The maiden is given in marriage. Good fortune. Perseverance furthers.',
        image:'山上有木，渐。君子以居贤德善俗。',
        image_en:'On the mountain, a tree: the image of Development. Thus the superior man abides in dignity and virtue, in order to improve the mores.',
        reading:'渐卦讲渐进发展。今日按部就班，不求速成。感情上适合细水长流而非一见钟情。项目阶段推进最稳妥。',
        reading_en:'The hexagram of gradual progress. Today proceed step by step — don\'t chase quick results. In love, a steady stream beats a flash flood. Projects advance most reliably phase by phase.',
        tags:['按部就班','渐进发展','细水长流'],
        tags_en:['Step by Step','Gradual Progress','Steady Stream'] },
  54: { name:'雷泽归妹', en:'The Marrying Maiden', binary:'001011', fortune:'中下', level:2,
        judgment:'征凶，无攸利。',
        judgment_en:'The Marrying Maiden. Undertakings bring misfortune. Nothing that would further.',
        image:'泽上有雷，归妹。君子以永终知敝。',
        image_en:'Thunder over the lake: the image of the Marrying Maiden. Thus the superior man understands the transitory in the light of the eternity of the end.',
        reading:'归妹卦暗示不当结合。今日小心合伙协议中的不平等条款。感情上强扭的瓜不甜。合作需看清楚谁在主导。',
        reading_en:'The hexagram hints at improper unions. Today watch for unequal terms in partnership agreements. In love, a forced melon is not sweet. In cooperation, see clearly who holds the reins.',
        tags:['不当结合','平等条款','强扭不甜'],
        tags_en:['Improper Union','Equal Terms','Forced Won\'t Work'] },
  55: { name:'雷火丰',   en:'Abundance',           binary:'001101', fortune:'上中', level:4,
        judgment:'亨，王假之。勿忧，宜日中。',
        judgment_en:'Abundance has success. The king attains it. Be not sad. Be like the sun at midday.',
        image:'雷电皆至，丰。君子以折狱致刑。',
        image_en:'Both thunder and lightning come: the image of Abundance. Thus the superior man decides lawsuits and carries out punishments.',
        reading:'丰卦象征丰盛盈满。今日收获满满，但需知日中则昃。趁阳光正好赶紧晒粮。享受当下但要为雨天的到来准备。',
        reading_en:'The hexagram of overflowing fullness. Today the harvest is rich, but know that the sun at midday begins to set. Dry your grain while the sun shines. Enjoy the present but prepare for rainy days.',
        tags:['丰盛盈满','享受当下','未雨绸缪'],
        tags_en:['Overflowing Fullness','Enjoy Now','Prepare for Rain'] },
  56: { name:'火山旅',   en:'The Wanderer',        binary:'101100', fortune:'中下', level:2,
        judgment:'小亨，旅贞吉。',
        judgment_en:'The Wanderer. Success through smallness. Perseverance brings good fortune to the wanderer.',
        image:'山上有火，旅。君子以明慎用刑而不留狱。',
        image_en:'Fire on the mountain: the image of the Wanderer. Thus the superior man is clear-minded and cautious in imposing penalties, and protracts no lawsuits.',
        reading:'旅卦如人在旅途。今日漂泊感强烈，心里不踏实。搬家、出差、换城市的不确定是常态。低调行事，入乡随俗。',
        reading_en:'Like a traveler on the road. Today you feel adrift, unsettled. Moving, business trips, city changes — uncertainty is normal. Stay low-key; when in Rome, do as the Romans do.',
        tags:['人在旅途','漂泊不定','入乡随俗'],
        tags_en:['On the Road','Adrift','Adapt Locally'] },
  57: { name:'巽为风',   en:'The Gentle',          binary:'110110', fortune:'中中', level:3,
        judgment:'小亨，利有攸往，利见大人。',
        judgment_en:'The Gentle. Success through what is small. It furthers one to have somewhere to go. It furthers one to see the great man.',
        image:'随风，巽。君子以申命行事。',
        image_en:'Winds following one upon the other: the image of the Gently Penetrating. Thus the superior man spreads his commands abroad and carries out his undertakings.',
        reading:'巽卦如风渗透。今日以柔克刚，委婉沟通比直来直去有效。适合做说服、销售、谈判工作。退一步海阔天空。',
        reading_en:'Like wind penetrating everywhere. Today overcome hardness with softness — indirect persuasion works better than direct confrontation. Perfect for sales, negotiation, and teaching. One step back opens vast horizons.',
        tags:['以柔克刚','委婉沟通','退一步'],
        tags_en:['Soft Over Hard','Gentle Persuasion','Step Back'] },
  58: { name:'兑为泽',   en:'The Joyous',          binary:'011011', fortune:'上中', level:4,
        judgment:'亨，利贞。',
        judgment_en:'The Joyous. Success. Perseverance is favorable.',
        image:'丽泽，兑。君子以朋友讲习。',
        image_en:'Lakes resting one on the other: the image of the Joyous. Thus the superior man joins with his friends for discussion and practice.',
        reading:'兑卦主喜悦交流。今日宜聚会交友，心情舒畅。适合做分享、演讲、教学。快乐本身就是好运。笑口常开财自来。',
        reading_en:'The hexagram of joyful exchange. Today gather with friends, lift your spirits. Perfect for sharing, speaking, and teaching. Happiness itself is good fortune. A smiling face draws wealth.',
        tags:['喜悦交流','聚会交友','笑口常开'],
        tags_en:['Joyful Exchange','Gather & Connect','Smile Brings Wealth'] },
  59: { name:'风水涣',   en:'Dispersion',          binary:'110010', fortune:'中中', level:3,
        judgment:'亨。王假有庙，利涉大川。',
        judgment_en:'Dispersion. Success. The king approaches his temple. It furthers one to cross the great water. Perseverance furthers.',
        image:'风行水上，涣。先王以享于帝立庙。',
        image_en:'The wind drives over the water: the image of Dispersion. Thus the kings of antiquity sacrificed to the Lord and built temples.',
        reading:'涣卦如风吹水散。今日散掉心中郁结，放下执念即解脱。团队涣散时需重新凝聚人心。破而后立，散而后聚。',
        reading_en:'Like wind scattering water. Today disperse the knots in your heart — let go of attachments and find liberation. When the team scatters, rally them anew. Break to rebuild, scatter to gather.',
        tags:['放下执念','重新凝聚','散而后聚'],
        tags_en:['Let Go','Rally Anew','Scatter to Gather'] },
  60: { name:'水泽节',   en:'Limitation',          binary:'010011', fortune:'中中', level:3,
        judgment:'亨。苦节不可贞。',
        judgment_en:'Limitation. Success. Galling limitation must not be persevered in.',
        image:'泽上有水，节。君子以制数度，议德行。',
        image_en:'Water over lake: the image of Limitation. Thus the superior man creates number and measure, and examines the nature of virtue and correct conduct.',
        reading:'节卦讲节制有度。今日适可而止，过犹不及。花钱有预算，说话有分寸。节食、节欲、节言，节制者得自由。',
        reading_en:'The hexagram of measured restraint. Today stop at the right point — too much is as bad as too little. Budget your spending, measure your words. Restraint in diet, desire, and speech — the restrained find true freedom.',
        tags:['适可而止','节制有度','预算管控'],
        tags_en:['Stop at Right Point','Measured Restraint','Budget Control'] },
  61: { name:'风泽中孚', en:'Inner Truth',         binary:'110011', fortune:'中上', level:4,
        judgment:'豚鱼吉，利涉大川，利贞。',
        judgment_en:'Inner Truth. Pigs and fishes. Good fortune. It furthers one to cross the great water. Perseverance furthers.',
        image:'泽上有风，中孚。君子以议狱缓死。',
        image_en:'Wind over lake: the image of Inner Truth. Thus the superior man discusses criminal cases in order to delay executions.',
        reading:'中孚卦讲内心诚信。今日真诚是最大的武器。诚信待人，人必信之。签署协议、口头承诺的好时机。说到做到。',
        reading_en:'The hexagram of inner sincerity. Today sincerity is your greatest weapon. Treat others with honesty and they will trust you. An auspicious time for signing agreements and making verbal commitments. Mean what you say.',
        tags:['内心诚信','说到做到','以诚待人'],
        tags_en:['Inner Sincerity','Mean What You Say','Honesty Wins'] },
  62: { name:'雷山小过', en:'Small Excess',        binary:'001100', fortune:'中中', level:3,
        judgment:'亨，利贞。可小事，不可大事。',
        judgment_en:'Preponderance of the Small. Success. Perseverance furthers. Small things may be done; great things should not be done.',
        image:'山上有雷，小过。君子以行过乎恭，丧过乎哀。',
        image_en:'Thunder on the mountain: the image of Preponderance of the Small. Thus in his conduct the superior man gives preponderance to reverence.',
        reading:'小过卦小小越界无伤大雅。今日小事可为，大事勿动。小打小闹可以，大动作留到以后。节约成本，稳扎稳打。',
        reading_en:'Small transgressions cause no real harm. Today small matters can proceed, but big moves should wait. Tinker, don\'t overhaul. Cut costs, advance steadily.',
        tags:['小事可为','大事勿动','稳扎稳打'],
        tags_en:['Small Matters OK','Big Moves Wait','Steady Advance'] },
  63: { name:'水火既济', en:'After Completion',    binary:'010101', fortune:'中中', level:3,
        judgment:'亨小，利贞。初吉终乱。',
        judgment_en:'After Completion. Success in small matters. Perseverance furthers. At the beginning good fortune, at the end disorder.',
        image:'水在火上，既济。君子以思患而预防之。',
        image_en:'Water over fire: the image of the Condition After Completion. Thus the superior man takes thought of misfortune and arms himself against it in advance.',
        reading:'既济卦象征已成之事。祝贺——但，初吉终乱是规律。完成后马上开始准备下一阶段，别在功劳簿上躺太久。',
        reading_en:'The hexagram of completion. Congratulations — but, the pattern is: good at the start, chaos at the end. As soon as you finish, begin preparing the next phase. Don\'t rest too long on your laurels.',
        tags:['初吉终乱','预防未来','别躺功劳簿'],
        tags_en:['Good Start, Chaos End','Prepare Next','Don\'t Rest on Laurels'] },
  64: { name:'火水未济', en:'Before Completion',   binary:'101010', fortune:'中中', level:3,
        judgment:'亨。小狐汔济，濡其尾，无攸利。',
        judgment_en:'Before Completion. Success. But if the little fox, after nearly completing the crossing, gets his tail in the water, there is nothing that would further.',
        image:'火在水上，未济。君子以慎辨物居方。',
        image_en:'Fire over water: the image of the Condition Before Transition. Thus the superior man is careful in the differentiation of things, so that each finds its place.',
        reading:'未济卦象征事情未完成。别急，就差最后一步了。善始善终比开局更重要。最后关头最容易出错，加倍小心。',
        reading_en:'The hexagram of the unfinished. Don\'t rush — you\'re just one step away. Finishing well matters more than starting well. The final stretch is where mistakes happen most; be doubly careful.',
        tags:['善始善终','最后关头','加倍小心'],
        tags_en:['Finish Well','Final Stretch','Double Care'] }
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
  try {
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
  } catch (err) {
    console.warn('[Oracle] saveToHistory error:', err);
    return { id: Date.now() };
  }
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
