const animeNames = [
    "Naruto", "Goku", "Luffy", "Sasuke", "Vegeta", "Eren", "Levi", "Zoro", "Itachi", "Gon",
    "Killua", "Jiraiya", "Kakashi", "AllMight", "Deku", "Yusuke", "Kurapika", "Chrollo", "Roronoa", "Natsu",
    "Saitama", "Lelouch", "Holo", "Shiro", "Kagome", "Inuyasha", "Edward", "Alphonse", "Roy Mustang", "Todoroki",
    "Rem", "Emilia", "Saber", "Kirito", "Asuna", "Sakura", "Hinata", "Rika", "Mikasa", "Rei Ayanami",
    "Shinji Ikari", "Light Yagami", "Gintoki", "Akame", "Saber", "Kamina", "Yuno Gasai", "Sakura Matou", "Eugeo",
    "Tomoya Okazaki", "Kamina", "Yusuke Urameshi", "Kenshin Himura", "Tatsuya Shiba", "Yato", "Haruhi Suzumiya",
    "Kyon", "Mikasa Ackerman", "Jean Kirstein", "Kirishima", "Bakugo", "Ochaco", "Izuku", "Tsuyu", "Shigaraki",
    "Todoroki Shoto", "Kageyama", "Hinata", "Suga", "Kenma", "Akashi", "Midorima", "Murasakibara"
  ];


export const generateName = () =>{
    const randomName = animeNames[Math.floor(Math.random() * animeNames.length)];
    return randomName
}

export const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000); 
}