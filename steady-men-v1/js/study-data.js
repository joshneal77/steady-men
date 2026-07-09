/* Edit this file to update the schedule, study night details, resource links, and daily notes. */
const STUDY_CONFIG = {
  siteTitle: "Steady Men 16:13",
  studyTitle: "Rooted in the Word | Summer Reading Plan 2026",
  tagline: "A daily walk in the Word. Honest brotherhood. Steady growth.",
  startDate: "2026-07-19",
  endDate: "2026-09-05",
  bibleVersion: "CSB",
  whatsAppUrl: "",
  studyPackageUrl: "assets/steady-men-1613-summer-group.docx",
  showOptionalResources: true,
  memory: {
    reference: "Psalm 1:1-3",
    version: "CSB",
    theme: "Delight. Meditate. Be Rooted.",
    url: "https://www.bible.com/bible/1713/PSA.1.1-3.CSB",
    note: "Memory work is encouraged, not tested. Let this passage shape steady attention to God's Word."
  },
  studyNights: [
    {
      date: "2026-07-18",
      title: "Intro Gathering",
      theme: "Getting Started",
      time: "9:00 PM",
      location: "Online by Zoom/Teams (TBD)",
      note: "Approx. 1 hour: expectations/introductions, group hopes, and a clear start."
    },
    {
      date: "2026-07-31",
      title: "Steady Men Night 1",
      theme: "Rooted in Christ",
      time: "9:00 PM",
      location: "In person: 693 Line 3, Niagara-on-the-Lake",
      note: "Further details shared in WhatsApp."
    },
    {
      date: "2026-08-14",
      title: "Steady Men Night 2",
      theme: "Brotherhood & Accountability",
      time: "9:00 PM",
      location: "In person: 693 Line 3, Niagara-on-the-Lake",
      note: "Further details shared in WhatsApp."
    },
    {
      date: "2026-08-28",
      title: "Steady Men Night 3",
      theme: "Endurance & Finishing Well",
      time: "9:00 PM",
      location: "In person: 693 Line 3, Niagara-on-the-Lake",
      note: "Further details shared in WhatsApp."
    }
  ],
  optionalResources: [
    {
      title: "Where Have All the Good Men Gone?",
      type: "Optional Video",
      scripture: "Genesis 1-3",
      url: "https://www.youtube.com/watch?v=6u2r8-VBHvg",
      summary: "A helpful background message on faithful work, obedience, sacrificial love, and humble responsibility."
    },
    {
      title: "Stand Firm & Act Like Men",
      type: "Optional Video",
      scripture: "1 Peter 5:6-10",
      url: "https://www.youtube.com/watch?v=YcHdx3uyUks",
      summary: "A supporting message on humility, casting burdens on Christ, refusing isolation, and getting back up through grace."
    },
    {
      title: "Stand Firm",
      type: "Optional Video",
      scripture: "Ephesians 6:10-18",
      url: "https://www.youtube.com/watch?v=0Z8Z-J7dcv0",
      summary: "A supporting message on standing in the Lord's strength and fighting for the people God has entrusted to us."
    },
    {
      title: "Be Strong",
      type: "Optional Video",
      scripture: "Matthew 20:17-28",
      url: "https://www.youtube.com/watch?v=vo7-W-TnT2Q",
      summary: "A supporting message on strength shaped by Jesus: enduring hardship, humility, and serving in love."
    }
  ],
  brotherhoodReminders: [
    "A simple checkmark, done, or reaction in WhatsApp helps the group keep walking together.",
    "Do not quietly disappear. If you miss a few days, jump back in with today's reading.",
    "Pray for another man in the group today. Reach out if he comes to mind.",
    "Share one honest thought from the reading if God puts something on your heart.",
    "Encourage a brother today. A short message can help keep a man steady.",
    "This is not a place to judge, shame, or perform. Keep moving forward with grace.",
    "Ask one honest question today: How are you really doing?"
  ]
};

const OPEN_SUNDAY_NOTE = "Catch up, reflect, pray, or rest. Do not stress about missed days - jump back in with the current reading and keep going.";

const READING_PLAN = [
  {
    date: "2026-07-19",
    scripture: "John 1:1-18",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His identity, truth, obedience, and invitation to follow Him.",
    note: "John opens by showing that Jesus is the eternal Word who was with God and is God. He is not merely a teacher or example; He is the source of life and light. A God-centered man starts by seeing Jesus for who He truly is."
  },
  {
    date: "2026-07-20",
    scripture: "John 1:19-51",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His identity, truth, obedience, and invitation to follow Him.",
    note: "Jesus calls ordinary men to follow Him and begins to reveal who He is. The first disciples do not have everything figured out; they respond to His invitation and bring others with them. Steady growth begins with following Jesus and helping other men see Him more clearly."
  },
  {
    date: "2026-07-21",
    scripture: "John 2",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His identity, truth, obedience, and invitation to follow Him.",
    note: "Jesus shows His authority over celebration, worship, and the temple. He brings joy, but He also refuses to let worship become hollow or self-serving. Following Him means letting Him shape both the ordinary parts of life and the places where our hearts have drifted."
  },
  {
    date: "2026-07-22",
    scripture: "John 3:1-21",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His identity, truth, obedience, and invitation to follow Him.",
    note: "Jesus tells Nicodemus that a religious life is not enough; we must be made new by the Spirit. This passage brings us back to the gospel: we are not earning a place with God, but receiving new life through faith in Christ."
  },
  {
    date: "2026-07-23",
    scripture: "John 3:22-36",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His identity, truth, obedience, and invitation to follow Him.",
    note: "John the Baptist gives a clear picture of humility: Jesus must increase, and we must decrease. A steady man does not build his life around being noticed, right, or important. He gladly makes more of Christ."
  },
  {
    date: "2026-07-24",
    scripture: "John 4:1-26",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His identity, truth, obedience, and invitation to follow Him.",
    note: "Jesus meets a woman with a complicated story and offers living water that truly satisfies. He sees people fully without turning away from them. Real change begins when we bring our thirst, shame, and need to Christ rather than trying to satisfy them elsewhere."
  },
  {
    date: "2026-07-25",
    scripture: "John 4:27-54",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His identity, truth, obedience, and invitation to follow Him.",
    note: "The woman at the well becomes a witness, and Jesus calls His disciples to see the spiritual needs around them. Faith is not meant to stay private. Men who are being changed by Jesus learn to notice, serve, and speak about what He has done."
  },
  {
    date: "2026-07-26",
    scripture: "Open Sunday",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His authority, compassion, courage, and call to trust.",
    openDay: true,
    note: OPEN_SUNDAY_NOTE
  },
  {
    date: "2026-07-27",
    scripture: "John 5",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His authority, compassion, courage, and call to trust.",
    note: "Jesus heals, speaks with the authority of the Father, and calls people to honor Him. The issue is not whether we admire Jesus, but whether we trust and obey Him. Our faith becomes steady when His voice carries more weight than our fears or preferences."
  },
  {
    date: "2026-07-28",
    scripture: "John 6:1-29",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His authority, compassion, courage, and call to trust.",
    note: "Jesus provides for a crowd and then challenges people who only want Him for what He can give. He is not a tool for a more comfortable life. He is the One we need, and faith means trusting Him even when we do not yet see the whole plan."
  },
  {
    date: "2026-07-29",
    scripture: "John 6:30-71",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His authority, compassion, courage, and call to trust.",
    note: "Jesus calls Himself the bread of life, and many people walk away because His words are hard. Peter stays because he recognizes that Jesus alone has the words of eternal life. A steady man keeps coming back to Christ when obedience is costly or confusing."
  },
  {
    date: "2026-07-30",
    scripture: "John 7",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His authority, compassion, courage, and call to trust.",
    note: "Jesus teaches openly despite opposition and invites the thirsty to come to Him. He does not chase approval or move according to pressure. He follows the Father's timing and speaks the truth with courage."
  },
  {
    date: "2026-07-31",
    scripture: "John 8",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His authority, compassion, courage, and call to trust.",
    studyNight: "Men's Gathering Tonight - 9:00 PM | 693 Line 3, NOTL",
    note: "Jesus confronts sin without abandoning people, exposes false confidence, and declares Himself the light of the world. Freedom comes from remaining in His word, not from doing whatever we feel. This is a strong passage for guarding our minds and homes with truth."
  },
  {
    date: "2026-08-01",
    scripture: "John 9-10",
    theme: "Rooted in Christ",
    weekFocus: "Seeing Jesus clearly: His authority, compassion, courage, and call to trust.",
    note: "Jesus gives sight to a man born blind and describes Himself as the Good Shepherd. He knows His sheep, leads them, and lays down His life for them. Men are called to listen for Christ's voice and lead others by serving, protecting, and pointing them to Him."
  },
  {
    date: "2026-08-02",
    scripture: "Open Sunday",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus shows us humble service, prayerful dependence, love, and courage under pressure.",
    openDay: true,
    note: OPEN_SUNDAY_NOTE
  },
  {
    date: "2026-08-03",
    scripture: "John 11",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus shows us humble service, prayerful dependence, love, and courage under pressure.",
    note: "Jesus enters grief, weeps with those who mourn, and shows power over death. He is neither distant nor overwhelmed by suffering. Following Him includes being present with people in hard moments and trusting that death does not have the final word."
  },
  {
    date: "2026-08-04",
    scripture: "John 12",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus shows us humble service, prayerful dependence, love, and courage under pressure.",
    note: "Jesus speaks about a life that bears fruit by following Him rather than seeking self-protection or human praise. He also models a heart fixed on the Father's glory. A faithful man learns to put obedience above image and comfort."
  },
  {
    date: "2026-08-05",
    scripture: "John 13:1-20",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus shows us humble service, prayerful dependence, love, and courage under pressure.",
    note: "Jesus washes His disciples' feet and gives them an example of humble service. Biblical leadership is not about being above others; it is about using strength and responsibility for their good. This matters at home, at work, and in the church."
  },
  {
    date: "2026-08-06",
    scripture: "John 13:21-38",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus shows us humble service, prayerful dependence, love, and courage under pressure.",
    note: "Jesus remains steady while betrayal and failure surround Him. He gives His followers a new command: love one another as He has loved them. Real brotherhood is built on that kind of committed, Christ-shaped love, not convenience."
  },
  {
    date: "2026-08-07",
    scripture: "John 14",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus shows us humble service, prayerful dependence, love, and courage under pressure.",
    note: "Jesus tells troubled disciples not to let their hearts be afraid because He is the way, the truth, and the life. He promises the Holy Spirit to help them obey and remember His words. Men do not have to carry faithfulness alone; Christ has given His presence and help."
  },
  {
    date: "2026-08-08",
    scripture: "John 15",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus shows us humble service, prayerful dependence, love, and courage under pressure.",
    note: "Jesus calls His disciples to abide in Him because fruitfulness comes from remaining connected to Him. This is the heart of daily time in the Word: not checking a box, but staying close to the source of life. Psalm 1 uses a similar picture of a tree rooted near water."
  },
  {
    date: "2026-08-09",
    scripture: "Open Sunday",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus finishes His work with prayer, sacrifice, resurrection hope, and a clear mission for His people.",
    openDay: true,
    note: OPEN_SUNDAY_NOTE
  },
  {
    date: "2026-08-10",
    scripture: "John 16",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus finishes His work with prayer, sacrifice, resurrection hope, and a clear mission for His people.",
    note: "Jesus prepares His disciples for trouble without leaving them hopeless. He promises the Spirit, tells them to pray in His name, and says that in Him they can have peace. A steady man does not deny hardship; he learns to face it with Christ."
  },
  {
    date: "2026-08-11",
    scripture: "John 17",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus finishes His work with prayer, sacrifice, resurrection hope, and a clear mission for His people.",
    note: "Jesus prays for His disciples and for those who will believe through their message. His prayer centers on knowing God, being kept from evil, growing in truth, and living in unity. Prayer is not an extra part of Christian life; it is part of how we stand and care for one another."
  },
  {
    date: "2026-08-12",
    scripture: "John 18",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus finishes His work with prayer, sacrifice, resurrection hope, and a clear mission for His people.",
    note: "Jesus faces arrest and injustice without panic, manipulation, or compromise. Peter's denial reminds us that confidence in ourselves is fragile. Jesus remains faithful where we fail, which gives us both humility and hope."
  },
  {
    date: "2026-08-13",
    scripture: "John 19",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus finishes His work with prayer, sacrifice, resurrection hope, and a clear mission for His people.",
    note: "Jesus goes to the cross willingly and finishes the work the Father gave Him. His love is sacrificial, costly, and purposeful. Husbands, fathers, single men, and brothers alike are called to let Christ redefine strength through obedience and self-giving love."
  },
  {
    date: "2026-08-14",
    scripture: "John 20",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus finishes His work with prayer, sacrifice, resurrection hope, and a clear mission for His people.",
    studyNight: "Men's Gathering Tonight - 9:00 PM | 693 Line 3, NOTL",
    note: "The risen Jesus meets fearful disciples with peace, restores purpose, and sends them into the world. The resurrection changes what is possible: sin, fear, and failure do not get the final word. We follow a living Savior."
  },
  {
    date: "2026-08-15",
    scripture: "John 21",
    theme: "Faithful in Daily Life",
    weekFocus: "Jesus finishes His work with prayer, sacrifice, resurrection hope, and a clear mission for His people.",
    note: "Jesus restores Peter after failure and calls him to love Him and care for His people. The question is not whether we have failed, but whether we will return to Jesus and follow Him again. His grace restores men for faithful service."
  },
  {
    date: "2026-08-16",
    scripture: "Open Sunday",
    theme: "Brotherhood & Accountability",
    weekFocus: "Practical faith that shows up in trials, speech, humility, wisdom, and how we treat one another.",
    openDay: true,
    note: OPEN_SUNDAY_NOTE
  },
  {
    date: "2026-08-17",
    scripture: "James 1:1-18",
    theme: "Brotherhood & Accountability",
    weekFocus: "Practical faith that shows up in trials, speech, humility, wisdom, and how we treat one another.",
    note: "James begins with trials, wisdom, and the danger of being pulled away by our own desires. He does not say hardship is easy, but that God can use it to produce endurance. Ask God for wisdom honestly and keep bringing your struggles into the light."
  },
  {
    date: "2026-08-18",
    scripture: "James 1:19-27",
    theme: "Brotherhood & Accountability",
    weekFocus: "Practical faith that shows up in trials, speech, humility, wisdom, and how we treat one another.",
    note: "James calls believers to be quick to listen, slow to speak, slow to anger, and doers of the word. Daily Scripture matters because it should shape how we speak, respond, and care for people. Hearing truth without living it leaves us unchanged."
  },
  {
    date: "2026-08-19",
    scripture: "James 2:1-13",
    theme: "Brotherhood & Accountability",
    weekFocus: "Practical faith that shows up in trials, speech, humility, wisdom, and how we treat one another.",
    note: "James confronts favoritism and reminds believers that mercy is central to a life shaped by God. Brotherhood is not a place for comparison, status, or treating some men as more important than others. We build one another up because Christ has shown us mercy."
  },
  {
    date: "2026-08-20",
    scripture: "James 2:14-26",
    theme: "Brotherhood & Accountability",
    weekFocus: "Practical faith that shows up in trials, speech, humility, wisdom, and how we treat one another.",
    note: "James shows that genuine faith produces visible action. We are not saved by works, but faith that never affects how we live is empty. Steady men take responsibility and let their trust in Christ show up in practical obedience."
  },
  {
    date: "2026-08-21",
    scripture: "James 3:1-12",
    theme: "Brotherhood & Accountability",
    weekFocus: "Practical faith that shows up in trials, speech, humility, wisdom, and how we treat one another.",
    note: "James takes our words seriously because the tongue can direct, damage, or bless. A man can be strong in many areas and still wound people through careless speech. Ask where your words need more truth, patience, and self-control."
  },
  {
    date: "2026-08-22",
    scripture: "James 3:13-18",
    theme: "Brotherhood & Accountability",
    weekFocus: "Practical faith that shows up in trials, speech, humility, wisdom, and how we treat one another.",
    note: "Godly wisdom is humble, peaceable, gentle, and full of mercy. This is not weak leadership; it is strength under control. Homes, workplaces, and friendships are changed when men choose wisdom from above instead of jealousy, pride, or anger."
  },
  {
    date: "2026-08-23",
    scripture: "Open Sunday",
    theme: "Brotherhood & Accountability",
    weekFocus: "Responsibility with grace: prayer, restoration, work, and bearing one another's burdens.",
    openDay: true,
    note: OPEN_SUNDAY_NOTE
  },
  {
    date: "2026-08-24",
    scripture: "James 4:1-12",
    theme: "Brotherhood & Accountability",
    weekFocus: "Responsibility with grace: prayer, restoration, work, and bearing one another's burdens.",
    note: "James traces conflict back to desires that are ruling the heart and calls us to submit to God. Accountability starts with humility: we bring our own pride, anger, and temptation before the Lord instead of only seeing what is wrong in others."
  },
  {
    date: "2026-08-25",
    scripture: "James 4:13-17",
    theme: "Brotherhood & Accountability",
    weekFocus: "Responsibility with grace: prayer, restoration, work, and bearing one another's burdens.",
    note: "James speaks to planning, work, and the illusion of control. It is good to work and plan, but our confidence rests in God's will, not our schedules. Quiet faithfulness includes doing the good we know to do today."
  },
  {
    date: "2026-08-26",
    scripture: "James 5:1-12",
    theme: "Brotherhood & Accountability",
    weekFocus: "Responsibility with grace: prayer, restoration, work, and bearing one another's burdens.",
    note: "James warns against trusting wealth, comfort, or control and calls believers to patient endurance. He points to the farmer who works faithfully while waiting for what he cannot force. Men need patience in work, family life, and the long process of spiritual growth."
  },
  {
    date: "2026-08-27",
    scripture: "James 5:13-20",
    theme: "Brotherhood & Accountability",
    weekFocus: "Responsibility with grace: prayer, restoration, work, and bearing one another's burdens.",
    note: "James closes with prayer, confession, restoration, and bringing wandering people back. This is a key picture for Steady Men: men who pray for one another, speak honestly, and help each other return when someone drifts."
  },
  {
    date: "2026-08-28",
    scripture: "Galatians 6:1-10",
    theme: "Brotherhood & Accountability",
    weekFocus: "Responsibility with grace: prayer, restoration, work, and bearing one another's burdens.",
    studyNight: "Men's Gathering Tonight - 9:00 PM | 693 Line 3, NOTL",
    note: "This is one of our memory passages because it holds grace and responsibility together. We restore a brother gently, carry burdens, examine our own lives, and do not grow weary in doing good. Accountability is meant to help men walk forward, not to shame them."
  },
  {
    date: "2026-08-29",
    scripture: "Proverbs 27:5-17",
    theme: "Brotherhood & Accountability",
    weekFocus: "Responsibility with grace: prayer, restoration, work, and bearing one another's burdens.",
    note: "These verses show why men need one another. Honest correction is better than hidden love, and friends sharpen friends through truth and presence. Brotherhood becomes meaningful when we know God's Word well enough to encourage and challenge one another with it."
  },
  {
    date: "2026-08-30",
    scripture: "Open Sunday",
    theme: "Endurance & Finishing Well",
    weekFocus: "Finishing the summer with holiness, responsibility, Spirit-led living, love, perseverance, and a long view of faithfulness.",
    openDay: true,
    note: OPEN_SUNDAY_NOTE
  },
  {
    date: "2026-08-31",
    scripture: "1 Thessalonians 4:1-5:11",
    theme: "Endurance & Finishing Well",
    weekFocus: "Finishing the summer with holiness, responsibility, Spirit-led living, love, perseverance, and a long view of faithfulness.",
    note: "Paul calls believers to grow in holiness, love one another, live quietly, work faithfully, and stay awake in hope because Christ will return. Steady men do not drift or live carelessly; they pursue purity, responsibility, faith, love, hope, and encouragement in everyday life."
  },
  {
    date: "2026-09-01",
    scripture: "Ephesians 5:15-6:4",
    theme: "Endurance & Finishing Well",
    weekFocus: "Finishing the summer with holiness, responsibility, Spirit-led living, love, perseverance, and a long view of faithfulness.",
    note: "Paul calls believers to walk wisely, be filled with the Spirit, and let Christ shape the home. Husbands are called to sacrificial love, fathers to patient instruction, and all believers to live with humility and care. Faithfulness becomes visible in our closest relationships."
  },
  {
    date: "2026-09-02",
    scripture: "Colossians 3:12-25",
    theme: "Endurance & Finishing Well",
    weekFocus: "Finishing the summer with holiness, responsibility, Spirit-led living, love, perseverance, and a long view of faithfulness.",
    note: "Paul shows what life in Christ looks like inside real relationships: compassion, humility, forgiveness, love, peace, thankfulness, and doing everything in Jesus' name. The home is one of the clearest places where our faith becomes visible. Let Christ's peace and word shape the atmosphere you bring into it."
  },
  {
    date: "2026-09-03",
    scripture: "Galatians 5:16-26",
    theme: "Endurance & Finishing Well",
    weekFocus: "Finishing the summer with holiness, responsibility, Spirit-led living, love, perseverance, and a long view of faithfulness.",
    note: "Paul contrasts the desires of the flesh with life led by the Spirit. The answer to temptation is not merely trying harder; it is walking by the Spirit day by day. The fruit God produces includes self-control, faithfulness, gentleness, and love."
  },
  {
    date: "2026-09-04",
    scripture: "Romans 12:9-21",
    theme: "Endurance & Finishing Well",
    weekFocus: "Finishing the summer with holiness, responsibility, Spirit-led living, love, perseverance, and a long view of faithfulness.",
    note: "Paul gives a practical picture of sincere Christian love: honor, hospitality, patience in suffering, prayer, humility, and refusing revenge. This is a strong summary of the kind of men we want to become. We overcome evil not by becoming harsh, but by doing good in the strength of Christ."
  },
  {
    date: "2026-09-05",
    scripture: "2 Timothy 4:6-18",
    theme: "Endurance & Finishing Well",
    weekFocus: "Finishing the summer with holiness, responsibility, Spirit-led living, love, perseverance, and a long view of faithfulness.",
    note: "Paul looks back on a life of keeping the faith and forward to the Lord's final rescue. Finishing well is not about having an easy story or a perfect record. It is about continuing to trust Christ, fight the good fight, and keep the faith through every season."
  }
];
