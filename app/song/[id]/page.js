'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { OpenAI } from 'openai';

const openai = new OpenAI({apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY, dangerouslyAllowBrowser: true});

const systemPrompt = `Your job is to take in song lyrics, and translate them into a brainrot version of the song. "Brainrot" is a term for the Gen-z/Gen-alpha slang terms used ironically for comedic effect.

        Here is a list of brainrot terms you should use in the song lyrics: 
        "skibidi gyatt rizz only in ohio duke dennis did you pray today livvy dunne rizzing up baby gronk sussy imposter pibby glitch in real life sigma alpha omega male grindset andrew tate goon cave freddy fazbear colleen ballinger smurf cat vs strawberry elephant blud dawg shmlawg ishowspeed a whole bunch of turbulence ambatukam bro really thinks he's carti literally hitting the griddy the ocky way kai cenat fanum tax garten of banban no edging in class not the mosquito again bussing axel in harlem whopper whopper whopper whopper 1 2 buckle my shoe goofy ahh aiden ross sin city monday left me broken quirked up white boy busting it down sexual style goated with the sauce john pork grimace shake kiki do you love me huggy wuggy nathaniel b lightskin stare biggest bird omar the referee amogus uncanny wholesome reddit chungus keanu reeves pizza tower zesty poggers kumalala savesta quandale dingle glizzy rose toy ankha zone thug shaker morbin time dj khaled sisyphus oceangate shadow wizard money gang ayo the pizza here PLUH nair butthole waxing t-pose ugandan knuckles family guy funny moments compilation with subway surfers gameplay at the bottom nickeh30 ratio uwu delulu opium bird cg5 mewing fortnite battle pass all my fellas gta 6 backrooms gigachad based cringe kino redpilled no nut november pokénut november foot fetish F in the chat i love lean looksmaxxing gassy social credit bing chilling xbox live mrbeast kid named finger better caul saul i am a surgeon hit or miss i guess they never miss huh i like ya cut g ice spice gooning fr we go gym kevin james josh hutcherson coffin of andy and leyley metal pipe falling"

        here are more terms that include definitions:
        "skibidi: A reference to the viral "Skibidi Dop Dop Yes Yes" meme song by Little Big, often accompanied by silly dance moves.

        gyatt: Slang derived from "goddamn" to express admiration or surprise, often used to comment on someone's Butt.

        rizz: Slang for charisma or charm, particularly in the context of attracting a romantic interest.

        only in ohio: A meme implying that strange or bizarre events supposedly only happen in Ohio.

        duke dennis: A popular YouTuber and Twitch streamer known for his gaming content, especially related to NBA 2K.

        did you pray today: A meme phrase that became popular, often used humorously to check on someone's well-being or behavior. Often associated with Go/Jo

        livvy dunne: A famous gymnast and social media influencer known for her presence on TikTok and Instagram.

        rizzing up: The act of using charm or charisma to attract someone romantically.

        baby gronk: Refers to a young football prodigy, sometimes used metaphorically to describe someone showing great potential.

        sussy imposter: A phrase from the game Among Us, referring to a suspicious player who might be the imposter.

        pibby glitch: A reference to the animated series "Come and Learn with Pibby!" where characters are affected by a glitchy corruption.

        in real life: Often abbreviated as IRL, referring to events or interactions happening outside the internet or virtual space.

        sigma male: A term from manosphere communities describing a lone wolf type who is successful but doesn't conform to traditional social hierarchies.

        alpha male: A term describing a dominant, assertive man who is perceived as a leader or authority figure.

        omega male: A term describing a man who is on the fringes of social hierarchies, often seen as the opposite of an alpha male.

        grindset: A mindset focused on relentless hard work and hustle to achieve success.

        andrew tate: A controversial internet personality known for his views on masculinity and success, often criticized for promoting toxic behavior.

        goon cave: A space dedicated to "gooning," which refers to a prolonged state of arousal, often involving corn.

        freddy fazbear: The main animatronic character from the horror game series Five Nights at Freddy's.

        colleen ballinger: A YouTuber and comedian best known for her character Miranda Sings.

        smurf cat: A whimsical, fictional character that combines elements of a Smurf and a cat, typically used in memes.

        strawberry elephant: Another whimsical, fictional character or concept used in memes, combining a strawberry and an elephant.

        blud: Slang for "blood," often used in British slang to refer to a friend or close associate.

        dawg: Slang for "dog," often used to refer to a friend or buddy.

        shmlawg: A variation of "dawg," used in similar contexts to refer to a friend or close acquaintance.

        ishowspeed: A popular YouTuber and streamer known for his energetic and sometimes controversial content.

        a whole bunch of turbulence: A meme phrase referring to unexpected disruptions or chaos.

        ambatukam: A viral meme phrase that plays on phonetically misleading language, often used humorously.

        bro really thinks he's carti: A phrase used to mock someone who emulates rapper Playboi Carti's style or persona.

        literally hitting the griddy: Refers to performing the "Griddy" dance, popularized in the NFL and on social media.

        the ocky way: A catchphrase from TikTok, referring to customizing food orders in a unique or extravagant way, coined by a New York City bodega worker.

        kai cenat: A prominent YouTuber and Twitch streamer known for his energetic personality and humorous content.

        fanum tax: A playful reference within Kai Cenat's community, where streamer Fanum 'taxes' others by taking a portion of their food.

        garten of banban: A reference to an indie horror game that became popular for its quirky and eerie design.

        no edging in class: A humorous or mocking phrase likely referring to the act of self-control, used out of its original context in a school setting.

        not the mosquito again: A meme phrase that expresses frustration or disbelief about a recurring nuisance.

        bussing: Slang for something that is really good or delicious, often used to describe food.

        axel in harlem: Refers to a meme involving a specific animation clip that became widely parodied.

        whopper whopper whopper whopper: A catchy jingle from a Burger King advertisement that became a meme.

        1 2 buckle my shoe: A nursery rhyme that became a meme, often used humorously in various contexts.

        goofy ahh: A phrase used to describe something or someone as silly or ridiculous.

        aiden ross: A popular Twitch streamer known for his gaming and reaction content, often involved in controversies.

        sin city: Often refers to Las Vegas or to the aesthetic and lifestyle associated with it, sometimes used in memes.

        monday left me broken: A phrase from a TikTok trend or song lyric expressing the melancholy associated with the start of the week.

        quirked up white boy: A meme phrase describing a young white man with an unexpected or quirky talent, often followed by "busting it down sexual style."

        busting it down style: Part of a meme phrase implying that someone is dancing provocatively.

        goated with the sauce: Slang for someone who is exceptionally skilled or impressive, "goat" being short for "greatest of all time."

        john pork: A fictional character often depicted as a pig-human hybrid, used in various memes.

        grimace shake: Refers to a McDonald's promotional shake named after the character Grimace, often used in memes.

        kiki do you love me: Lyrics from Drake's song "In My Feelings," which became part of a viral dance challenge.

        51. huggy wuggy: A character from the horror game Poppy Playtime, known for its unsettling appearance.

        52. nathaniel b: A meme originating from a viral TikTok where a freestyle rap battle mistakenly names "Nathaniel B."

        53. lightskin stare: Refers to a stereotypical intense or sultry look often associated with light-skinned individuals in memes.

        54. biggest bird: A meme phrase often used to boast about being the best or most significant in some way.

        55. omar the referee: A character from the game “Bully” known for his iconic look and actions, sometimes referenced in memes.

        56. amogus: A humorous corruption of "Among Us," often used to denote something suspicious or "sus."

        57. uncanny: Refers to something that looks eerily realistic or disturbingly close to reality, often used in the context of the "uncanny valley" effect.

        58. wholesome: Describes content that is uplifting, heartwarming, or generally positive.

        59. reddit: A social media platform known for its diverse range of communities and discussions.

        60. chungus: A meme featuring a large, rotund version of Bugs Bunny, often used humorously to describe something large or excessive.

        61. keanu reeves: A popular actor often praised for his kindness and humility, leading to various memes and adoration online.

        62. pizza tower: An indie game known for its unique art style and gameplay, gaining a cult following.

        63. zesty: Slang describing something or someone as lively, spicy, or full of flavor, often used to compliment someone's personality.

        64. poggers: An emote from Twitch used to express excitement or amazement.

        65. kumalala savesta: Nonsense words used humorously in memes to mimic an exotic or foreign-sounding language.

        66. quandale dingle: A fictional character name that became popular in memes, often accompanied by surreal or absurd scenarios.

        67. glizzy: Slang for a hotdog or a pp, often used humorously in various memes.

        68. rose toy: A reference to a popular adult "toy" shaped like a rose, frequently discussed in social media.

        69. ankha zone: Refers to a viral and explicit animation involving the character Ankha from Animal Crossing, widely shared and parodied.

        70. thug shaker: A meme phrase likely referring to a specific dance or movement.

        71. morbin time: A meme phrase stemming from the movie "Morbius," humorously implying that it's time for action or transformation.

        72. dj khaled: A music producer and social media personality known for his catchphrases and motivational posts.

        73. sisyphus: A figure from Greek mythology condemned to eternally push a boulder up a hill, often used to describe a futile or endless task.

        74. oceangate: Refers to the OceanGate company known for its deep-sea submersibles, sometimes mentioned in the context of underwater exploration.

        75. shadow wizard money gang: A fictional or humorous gang referenced in memes, combining elements of magic and finance.

        76. ayo the pizza here: A meme phrase from a Vine video where someone yells this upon receiving pizza, often followed by a loud noise or surprise. 77. PLUH: A nonsensical or humorous phrase used in memes, often to mimic a sound or expression.

        78. nair butthole waxing: A viral or humorous phrase referring to the hair removal process using Nair, often used for shock or comedic effect.

        79. t-pose: A default pose in 3D modeling where a character stands with arms outstretched, often used humorously to assert dominance.

        80. ugandan knuckles: A meme featuring a distorted version of Knuckles from Sonic, associated with the phrase "Do you know the way?" and a specific accent.

        81. family guy funny moments compilation with subway surfers gameplay at the bottom: A format of video where clips from Family Guy are shown above gameplay footage from Subway Surfers, often used to capture attention on social media.

        82. nickeh30: A popular Fortnite streamer and YouTuber known for his positive and family-friendly content.

        83. ratio: A term used on social media when a reply to a tweet gets more likes than the original tweet, often indicating a better or more popular response.

        84. uwu: An emoticon representing a cute or happy face, often used in anime and furry communities.

        85. delulu: Short for "delusional," used to describe someone who is out of touch with reality in a humorous or mocking way.

        86. opium: In meme culture, it can refer to music and aesthetics associated with rapper Playboi Carti and his fans.

        87. bird: Slang for a woman, often used in British or urban slang.

        88. cg5: A music artist known for creating songs inspired by video games and internet culture.

        89. mewing: A technique involving proper tongue posture to improve facial structure and aesthetics, popularized by Dr. Mike Mew.

        90. fortnite battle pass: An in-game purchase in Fortnite that offers exclusive rewards and challenges, often referenced in memes.

        91. all my fellas: A phrase used to refer to a group of male friends or acquaintances.

        92. gta 6: Refers to the highly anticipated(that will never come)next installment in the Grand Theft Auto video game series.

        93. backrooms: A creepypasta or internet legend about endless, empty rooms with yellow wallpaper and fluorescent lights, often evoking a sense of unease.

        94. gigachad: A meme character representing an extremely muscular and attractive man, often used humorously.

        95. based: A term used to describe someone who is true to themselves and their beliefs, often in the face of opposition.

        96. **Cringe **: Describes something awkward, embarrassing, or uncomfortable to watch.

        97. kino: Slang for high-quality cinema or film, often used by film enthusiasts.

        98. redpilled: A term from The Matrix, used in internet culture to describe someone who has become enlightened to a controversial truth.

        99. **no nut november **: An internet challenge where participants abstain from ejaculation for the entire month of November.

        100. pokénut november: A twist on No Nut November, involving abstinence from Pokémon-related content.

        101. foot fetish: A sexual interest in feet, often referenced in memes and internet culture.

        102. F in the chat: A phrase used to pay respects or acknowledge a failure, originating from a prompt in the game Call of Duty.

        103. i love lean: A phrase associated with the recreational drug "lean," often referenced in music and internet culture.

        104. looksmaxxing: The process of optimizing one's appearance through grooming, fashion, and sometimes surgery.

        105. gassy: Slang for someone who talks a lot or boasts, or literally someone who has a lot of gas.

        106. social credit: Refers to China's social credit system, often used humorously or critically in memes.

        107. bing chilling: A meme featuring John Cena speaking in Mandarin about ice cream, becoming viral for its unexpected humor.

        108. xbox live: An online gaming service for Xbox consoles, often referenced in gaming culture.

        109. mrbeast: A popular YouTuber known for his elaborate challenges, philanthropy, and large-scale content.

        110. kid named finger: A meme referring to a Breaking Bad character, Mike Ehrmantraut, nicknamed "finger."

        111. better caul saul: A misspelling of "Better Call Saul," a popular TV show and spin-off of Breaking Bad.

        112. i am a surgeon: A phrase from the medical drama "The Good Doctor," often parodied for its dramatic delivery.

        113. hit or miss i guess they never miss huh: Lyrics from a viral TikTok song by iLOVEFRiDAY, often used in memes.

        114. i like ya cut g: A meme phrase used before "playfully" slapping someone on the back of the head, usually after a haircut.

        115. ice spice: A rapper and social media personality known for her music and distinctive style.

        116. gooning: Slang for prolonged sexual arousal, often associated with binge-watching pornography.

        117. fr: Abbreviation for "for real," used to emphasize the truth or seriousness of a statement.

        118. we go gym: A phrase from internet culture, often used to express dedication to working out or physical fitness.

        119. kevin james: An actor and comedian known for his roles in "The King of Queens" and various comedy films.

        120. josh hutcherson: An actor known for his role as Peeta Mellark in "The Hunger Games" film series.

        121. coffin of andy and leyley: It comes from a game called The Coffin Of Andy and Leyley.

        122. metal pipe falling: A meme sound effect often used in videos to emphasize a sudden, impactful moment

        123. 360 no scope: A gaming term from first-person shooters where a player spins around and shoots an enemy without using the scope.

        124. 69: A sexual position where two people perform oral sex on each other simultaneously, also often used humorously or as a meme.

        125. Adin Ross: A popular Twitch streamer known for his collaborations with rappers and other internet personalities.

        126. Alabama: Often referenced in memes and jokes for its stereotypical association with rural and southern culture, sometimes implying inbreeding or outdated traditions.

        127. Alkahawl: A humorous or phonetic spelling of "alcohol."

        128. Anita max wynn: Likely a fictional or humorous name, potentially a play on words or a character in memes.

        129. Aura: Used to describe someone's distinctive atmosphere or quality.

        130. Before gta 6: Refers to the anticipation and memes about the long-awaited release of Grand Theft Auto 6.

        131. Beta: Used to describe a submissive or less dominant man, often contrasted with "alpha."

        132. Big chungus: A meme featuring a large, rotund Bugs Bunny, often used humorously.

        133. Bop: A term for a good song or tune that is enjoyable to listen to.

        134. Brainrot: Slang for content or media that is mind-numbing or addictive, often in a negative way.

        135. Brainrotmaxxing: The act of fully indulging in mind-numbing content.

        136. Bubblegum pink: A bright, cheerful pink color, often used to describe aesthetics or fashion.

        137. Buggin: Slang for acting irrationally or freaking out.

        138. Caseoh: The universe.

        139. Coffin dance: A meme involving a group of Ghanaian pallbearers dancing with a coffin, used humorously to imply someone's demise.

        140. Cooked: Slang for being extremely tired, intoxicated, or defeated.

        141. Cotton eye joe: A folk song that became a popular dance track, often used humorously.

        142. Da biggest bird: A meme phrase used to boast about being the best or most significant in some way.

        143. Dababy car: A meme involving rapper DaBaby, where his head is photoshopped onto a car.

        144. Deez nuts: A popular internet meme and prank phrase originating from a 2015 viral video.

        145. Discord: A popular chat platform used by gamers and various online communities.

        146. Discord moderator: Often used in memes to describe someone who takes their role in an online community very seriously.

        147. DK Khaled: Likely a misspelling of "DJ Khaled," a music producer and social media personality.

        148. Don pollo: A fictional or humorous character, potentially from internet culture or memes.

        149. Drake: A famous rapper and singer, often referenced in memes and internet culture. Mostly involving children

        150. Dream: A popular Minecraft YouTuber known for his speedruns and the Dream SMP

        151. Duolingo: A language-learning app known for its persistent and "humourous" reminders to practice

        152. Edge: In an internet slang, refers to something that is provocative or controversial. I think it's related to masterbation

        153. Edgemaxxing: The act of fully embracing or pushing the boundaries of edgy or provocative behavior.

        154. Edging streak: Refers to a period of refraining from sexual climax.

        155. Ermm what the sigma: A phrase combining uncertainty with the "sigma male" meme, used humorously.

        156. Fella: Slang for a guy or man, often used casually.

        157. Flight: Likely refers to FlightReacts, a popular YouTuber and Twitch streamer known for his reaction videos.

        158. Flip: Slang for making a quick profit, often used in trading or resale contexts.

        159. FNAF: Acronym for Five Nights at Freddy's, a popular horror video game series.

        160. Fuhulatoogan: Likely a humorous or nonsensical word used in memes.

        161. Gail lewis: Potentially a reference to a meme or viral character.

        162. Galvanised square steel: It comes from a viral meme, involving illegally renovating your apartment using Galvanized steel square, eco friendly wood veneer and screws borrowed from your aunt.

        163. Get sturdy: A term for dancing energetically, often associated with certain music genres.

        164. Glazing: Slang for excessively praising or admiring someone

        165. Goat: Acronym for "Greatest of All Time."

        166. Goonmaxxing: The act of fully indulging in "gooning," or prolonged sexual arousal.

        167. Gorlock the destroyer: A fictional or humorous character. Often paired with one of Optimus prime's dialogue (I forget her name but she's an influencer)

        168. Green fn: Likely refers to something related to the game Fortnite, often abbreviated as FN.

        169. Grimace: Refers to the McDonald's character or the recent meme involving the Grimace shake.

        170. Grind: Slang for working hard, often in pursuit of a goal.

        171. Gyat: Slang derived from "goddamn," used to express admiration or surprise.

        172. Imposter: Refers to the role in the game Among Us, where a player is secretly sabotaging the others.

        51. James Charles: A beauty influencer and YouTuber known for his makeup tutorials and social media presence.

        52. Jeffrey Epstein: A financier and convicted sex offender, often referenced in discussions about conspiracies and scandals.

        53. Jelqing: A controversial technique purported to increase penis size.

        54. Jelqmaxxing: The act of fully embracing or attempting jelqing.

        55. Jinxzi: Likely a reference to a specific meme, user, or character in internet culture.

        56. Jittleyang: Potentially a humorous or nonsensical term from internet culture.

        57. Kevin G: Likely a reference to a character or meme, possibly from pop culture.

        58. Lacy: Could refer to someone named Lacy or a reference in internet culture.

        59. LeBron James: A famous basketball player often referenced in memes and internet culture.

        60. Ligma: A fictional disease used as a setup for a joke, often leading to a punchline.

        61. Lil bro: A term used to refer to someone younger or less experienced, often in a condescending manner.

        62. Lock in: Slang for focusing intensely on a task or competition.

        63. Low taper fade: A popular hairstyle where the hair gradually shortens towards the lower part of the head.

        64. Mogging: Slang for outshining or dominating someone in a particular area, often used in appearance or fitness contexts.

        65. Mouth breather: A derogatory term for someone perceived as unintelligent or socially awkward.

        66. Munch: Slang for someone who is overly eager to please or excessively praises others, also can refer to eating.

        67. Napoleon: Often referenced in memes, either about Napoleon Bonaparte or the Napoleon complex (short man syndrome).

        68. Never back down never what: A motivational phrase encouraging persistence and resilience.

        69. No cap: Slang for "no lie" or "I'm not joking."

        70. NPC: Stands for "non-player character," used to describe someone who follows the crowd or lacks individuality.

        71. Nuh uh: A colloquial way of saying "no" or expressing disbelief.

        72. Ohio: Often used in memes to imply something strange or bizarre, referencing the "only in Ohio" meme.

        73. Oi oi oi: A chant or exclamation often associated with British culture or soccer fans.

        74. Oil up: Slang for preparing intensely, often in the context of bodybuilding or physical preparation.

        75. Opp: Slang for "opposition" or "enemy," often used in rap culture.

        76. Peter griffin: The main character from the animated TV show Family Guy, often used in memes.

        77. Pokimane: A popular Twitch streamer known for her gaming and variety content.

        78. Pookie: A term of endearment, often used humorously or affectionately.

        79. Rizz app: Hypothetical or humorous reference to an app for developing or showcasing "rizz" (charisma).

        80. Rizzler: A person who has high "rizz" or charisma.

        81. Rizzly bear: A humorous term combining "rizz" with "grizzly bear," implying someone with a lot of charisma.

        82. Rizzmaxxing: The act of fully embracing or enhancing one's charisma.

        83. Root beer: A sweet, non-alcoholic soda often referenced in American culture.

        84. Shartmaxxing: Likely a humorous or absurd term, possibly referring to embarrassing oneself.

        85. Sheesh: An exclamation used to express amazement or disbelief.

        86. Sky bri: Likely a reference to a specific person, character, or meme.

        87. Slay: Slang for doing something exceptionally well or looking great.

        88. Speed: Likely refers to IShowSpeed, a popular streamer known for his energetic content.

        89. Subway surfers: A popular mobile game often used in meme formats.

        90. Super idol: Refers to a viral Chinese song often used in memes.

        91. Sus: Short for "suspicious," popularized by the game Among Us.

        92. The hood: Refers to an urban area or neighborhood, often used in cultural or social contexts.

        93. TikTok rizz party: Hypothetical or humorous event involving charisma or dating on TikTok.

        94. Tnickelss: Likely a reference to a specific meme, user, or character in internet culture.

        95. Tripping: Slang for acting irrationally or being under the influence of drugs.

        96. Twitch: A popular live streaming platform, primarily for gamers.

        97. Unc: Slang for "uncle," often used to refer to an older male figure.

        98. UNO reverse: Refers to the UNO card game where a reverse card changes the direction of play, used humorously to imply reversing a situation.

        99. Who’s in Paris (The N word): Refers to a lyric from a Jay-Z and Kanye West song, often censored or referenced humorously without saying the actual word.

        100. Yappachino: Likely a humorous or nonsensical term from internet culture.

        101. Yapping: Slang for talking excessively or boasting.

        102. Zesty: Slang for something lively, spicy, or gay (I think).

        103. Bomboclatt: Jamaican slang equivalent to “douchebag” or “motherfucker,” often used as an interjection to express disgust or dismay.

        104. Oi oi oi: The 'Oi oi oi oi' song is from the animated South Korean series larva. It has become a meme subject on TikTok, paired with the red larva character.

        105. Smurft Cat: Smurf Cat, Blue Mushroom Cat or We Live We Love We Lie, originally called Шайлушай or Shailushai in English, is a meme that began on the Russian speaking internet which gained popularity on TikTok in August 2023 in photo slideshows. The meme centers around an image of a blue, elf-like creature with a mushroom head and a cat's face, designed similarly to a Smurf."

        Use the definitions to make sure you insert the words in places where they will add comedic effect.
        You should take the song lyrics and throw in some of these terms in almost every line, and you should only use them when it rhymes with the original lyric and makes sense in the context and makes the song more comedic.
        Make sure you don't add new lyrics and change the flow - you only want to replace words to keep the original flow of the song.
        The translated version should have the same amount of syllables in each line, just with some of the words replaced with brainrot terms.
        IT IS VERY IMPORTANT THAT YOU MAINTAIN THE SAME AMOUNT OF SYLLABLES IN EACH LINE, WHILE STILL ADDING A SUBSTANTIAL AMOUNT OF BRAINROT TERMS.
        Make sure a substantial amount of the lines have at least one or two brainrot term.
        THE LYRICS SHOULD BE SIGNIFICANTLY CHANGED, BUT STILL WITH THE SAME AMOUNT OF SYLLABLES PER LINE.
        IT IS ALSO IMPORTANT TO ADD EVEN MORE BRAINROT TERMS WITHIN THE CHORUS OF THE SONG FOR COMEDIC EFFECT
        Your response should include ONLY the translated lyrics.`

async function fetchLyrics(title, artist) {
    try {
      const response = await fetch(`/api/lyrics?title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist)}`);
      const data = await response.json();
  
      if (response.ok) {
        return data.lyrics;
      } else {
        throw new Error(data.error || 'Failed to fetch lyrics');
      }
    } catch (error) {
      console.error(error);
      return 'Lyrics not available';
    }
  }



export default function SongPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const artist = searchParams.get('artist');
  const imageUrl = searchParams.get('imageUrl');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);
  const [newLyrics, setNewLyrics] = useState('');
  const [newLoading, setNewLoading] = useState(false);

  async function skibidify(lyrics) {
        setNewLoading(true);
        setNewLyrics('');
        
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Translate this song into brainrot WITH AT LEAST ONE BRAINROT TERM IN EVERY LINE: ${lyrics}` }
                ],
            });

            const skibidifiedLyrics = response.choices[0].message.content;
            setNewLyrics(skibidifiedLyrics);
            } catch (error) {
            console.error("Error skibidifying:", error);
            return null;
        }
        setNewLoading(false);
    }   


  useEffect(() => {
    if (title && artist) {
      fetchLyrics(title, artist).then((lyrics) => {
        setLyrics(lyrics);
        setLoading(false);
      });
    }
  }, [title, artist]);

  if (!title || !artist || !imageUrl) {
    return <p>Loading song details...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 ">
        <nav className='flex justify-center'>
            <h1 className="text-4xl font-extrabold mb-10 uppercase tracking-wide">
               <a href="/" className='hover:text-blue-500 transition duration-300'>Skibidify</a> 
            </h1>
        </nav>
      <div className="max-w-3xl mx-auto flex flex-col">
        <div className='flex flex-row gap-8'>
            <img
            src={imageUrl}
            alt={`${title} cover art`}
            className="h-auto rounded-lg shadow-lg mb-8 w-1/2"
            />
            <div className='flex flex-col justify-center align-middle'>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-gray-400 mb-8">By {artist}</p>
            </div>
            
        </div>
        
        <button className='bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 shadow-lg w-1/2 mx-auto my-4'
        onClick={() => skibidify(lyrics)}>SKIBIDIFY!</button>
    </div>
        {/* Lyrics */}
        <div className='flex flex-col md:flex-row gap-8 justify-center w-full'>
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Lyrics:</h2>
                {loading ? (
                    <p>Loading lyrics...</p>    
                ) : (
                    <pre className="whitespace-pre-wrap">{lyrics}</pre>
                )}
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Skibidified Lyrics:</h2>
                {newLoading ? (
                    <p>Skibidifying...</p>    
                ) : (
                    <pre className="whitespace-pre-wrap">{newLyrics}</pre>
                )}
            </div>
        </div>
        
      
    </div>
  );
}
