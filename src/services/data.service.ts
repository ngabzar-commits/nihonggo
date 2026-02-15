import { Injectable } from '@angular/core';

export interface Kana { char: string; romaji: string; type: 'hiragana' | 'katakana'; group: 'gojuon' | 'dakuon' | 'handakuon' | 'yoon'; }
export interface Kanji { char: string; onyomi: string; kunyomi: string; meaning: string; level: 'n5' | 'n4'; }
export interface Grammar { title: string; formula: string; explanation: string; example: string; level: 'n5' | 'n4'; type: 'bunpou' | 'particle'; }
export interface Vocab { word: string; reading: string; meaning: string; level: 'n5' | 'n4'; }
export interface Sentence { japanese: string; romaji: string; indonesian: string; level: 'n5' | 'n4'; }
export interface Question { 
  question: string; 
  options: string[]; 
  answer: number; 
  type: string; 
  textAnswer?: string; // For typing questions
  reading?: string; // For translation help
}

@Injectable({ providedIn: 'root' })
export class JapaneseDataService {
  
  // =================================================================================================
  // 1. KANA DATABASE (Hiragana & Katakana)
  // =================================================================================================
  private readonly KANA_DATA: Kana[] = [
    // --- HIRAGANA ---
    { char: 'あ', romaji: 'a', type: 'hiragana', group: 'gojuon' }, { char: 'い', romaji: 'i', type: 'hiragana', group: 'gojuon' }, { char: 'う', romaji: 'u', type: 'hiragana', group: 'gojuon' }, { char: 'え', romaji: 'e', type: 'hiragana', group: 'gojuon' }, { char: 'お', romaji: 'o', type: 'hiragana', group: 'gojuon' },
    { char: 'か', romaji: 'ka', type: 'hiragana', group: 'gojuon' }, { char: 'き', romaji: 'ki', type: 'hiragana', group: 'gojuon' }, { char: 'く', romaji: 'ku', type: 'hiragana', group: 'gojuon' }, { char: 'け', romaji: 'ke', type: 'hiragana', group: 'gojuon' }, { char: 'こ', romaji: 'ko', type: 'hiragana', group: 'gojuon' },
    { char: 'さ', romaji: 'sa', type: 'hiragana', group: 'gojuon' }, { char: 'し', romaji: 'shi', type: 'hiragana', group: 'gojuon' }, { char: 'す', romaji: 'su', type: 'hiragana', group: 'gojuon' }, { char: 'せ', romaji: 'se', type: 'hiragana', group: 'gojuon' }, { char: 'そ', romaji: 'so', type: 'hiragana', group: 'gojuon' },
    { char: 'た', romaji: 'ta', type: 'hiragana', group: 'gojuon' }, { char: 'ち', romaji: 'chi', type: 'hiragana', group: 'gojuon' }, { char: 'つ', romaji: 'tsu', type: 'hiragana', group: 'gojuon' }, { char: 'て', romaji: 'te', type: 'hiragana', group: 'gojuon' }, { char: 'と', romaji: 'to', type: 'hiragana', group: 'gojuon' },
    { char: 'な', romaji: 'na', type: 'hiragana', group: 'gojuon' }, { char: 'に', romaji: 'ni', type: 'hiragana', group: 'gojuon' }, { char: 'ぬ', romaji: 'nu', type: 'hiragana', group: 'gojuon' }, { char: 'ね', romaji: 'ne', type: 'hiragana', group: 'gojuon' }, { char: 'の', romaji: 'no', type: 'hiragana', group: 'gojuon' },
    { char: 'は', romaji: 'ha', type: 'hiragana', group: 'gojuon' }, { char: 'ひ', romaji: 'hi', type: 'hiragana', group: 'gojuon' }, { char: 'ふ', romaji: 'fu', type: 'hiragana', group: 'gojuon' }, { char: 'へ', romaji: 'he', type: 'hiragana', group: 'gojuon' }, { char: 'ほ', romaji: 'ho', type: 'hiragana', group: 'gojuon' },
    { char: 'ま', romaji: 'ma', type: 'hiragana', group: 'gojuon' }, { char: 'み', romaji: 'mi', type: 'hiragana', group: 'gojuon' }, { char: 'む', romaji: 'mu', type: 'hiragana', group: 'gojuon' }, { char: 'め', romaji: 'me', type: 'hiragana', group: 'gojuon' }, { char: 'も', romaji: 'mo', type: 'hiragana', group: 'gojuon' },
    { char: 'や', romaji: 'ya', type: 'hiragana', group: 'gojuon' }, { char: 'ゆ', romaji: 'yu', type: 'hiragana', group: 'gojuon' }, { char: 'よ', romaji: 'yo', type: 'hiragana', group: 'gojuon' },
    { char: 'ら', romaji: 'ra', type: 'hiragana', group: 'gojuon' }, { char: 'り', romaji: 'ri', type: 'hiragana', group: 'gojuon' }, { char: 'る', romaji: 'ru', type: 'hiragana', group: 'gojuon' }, { char: 'れ', romaji: 're', type: 'hiragana', group: 'gojuon' }, { char: 'ろ', romaji: 'ro', type: 'hiragana', group: 'gojuon' },
    { char: 'わ', romaji: 'wa', type: 'hiragana', group: 'gojuon' }, { char: 'を', romaji: 'wo', type: 'hiragana', group: 'gojuon' }, { char: 'ん', romaji: 'n', type: 'hiragana', group: 'gojuon' },
    
    // Hiragana Dakuon
    { char: 'が', romaji: 'ga', type: 'hiragana', group: 'dakuon' }, { char: 'ぎ', romaji: 'gi', type: 'hiragana', group: 'dakuon' }, { char: 'ぐ', romaji: 'gu', type: 'hiragana', group: 'dakuon' }, { char: 'げ', romaji: 'ge', type: 'hiragana', group: 'dakuon' }, { char: 'ご', romaji: 'go', type: 'hiragana', group: 'dakuon' },
    { char: 'ざ', romaji: 'za', type: 'hiragana', group: 'dakuon' }, { char: 'じ', romaji: 'ji', type: 'hiragana', group: 'dakuon' }, { char: 'ず', romaji: 'zu', type: 'hiragana', group: 'dakuon' }, { char: 'ぜ', romaji: 'ze', type: 'hiragana', group: 'dakuon' }, { char: 'ぞ', romaji: 'zo', type: 'hiragana', group: 'dakuon' },
    { char: 'だ', romaji: 'da', type: 'hiragana', group: 'dakuon' }, { char: 'ぢ', romaji: 'ji', type: 'hiragana', group: 'dakuon' }, { char: 'づ', romaji: 'zu', type: 'hiragana', group: 'dakuon' }, { char: 'で', romaji: 'de', type: 'hiragana', group: 'dakuon' }, { char: 'ど', romaji: 'do', type: 'hiragana', group: 'dakuon' },
    { char: 'ば', romaji: 'ba', type: 'hiragana', group: 'dakuon' }, { char: 'び', romaji: 'bi', type: 'hiragana', group: 'dakuon' }, { char: 'ぶ', romaji: 'bu', type: 'hiragana', group: 'dakuon' }, { char: 'べ', romaji: 'be', type: 'hiragana', group: 'dakuon' }, { char: 'ぼ', romaji: 'bo', type: 'hiragana', group: 'dakuon' },
    { char: 'ぱ', romaji: 'pa', type: 'hiragana', group: 'handakuon' }, { char: 'ぴ', romaji: 'pi', type: 'hiragana', group: 'handakuon' }, { char: 'ぷ', romaji: 'pu', type: 'hiragana', group: 'handakuon' }, { char: 'ぺ', romaji: 'pe', type: 'hiragana', group: 'handakuon' }, { char: 'ぽ', romaji: 'po', type: 'hiragana', group: 'handakuon' },
    { char: 'きゃ', romaji: 'kya', type: 'hiragana', group: 'yoon' }, { char: 'きゅ', romaji: 'kyu', type: 'hiragana', group: 'yoon' }, { char: 'きょ', romaji: 'kyo', type: 'hiragana', group: 'yoon' },
    { char: 'しゃ', romaji: 'sha', type: 'hiragana', group: 'yoon' }, { char: 'しゅ', romaji: 'shu', type: 'hiragana', group: 'yoon' }, { char: 'しょ', romaji: 'sho', type: 'hiragana', group: 'yoon' },
    { char: 'ちゃ', romaji: 'cha', type: 'hiragana', group: 'yoon' }, { char: 'ちゅ', romaji: 'chu', type: 'hiragana', group: 'yoon' }, { char: 'ちょ', romaji: 'cho', type: 'hiragana', group: 'yoon' },
    { char: 'にゃ', romaji: 'nya', type: 'hiragana', group: 'yoon' }, { char: 'にゅ', romaji: 'nyu', type: 'hiragana', group: 'yoon' }, { char: 'にょ', romaji: 'nyo', type: 'hiragana', group: 'yoon' },

    // --- KATAKANA ---
    { char: 'ア', romaji: 'a', type: 'katakana', group: 'gojuon' }, { char: 'イ', romaji: 'i', type: 'katakana', group: 'gojuon' }, { char: 'ウ', romaji: 'u', type: 'katakana', group: 'gojuon' }, { char: 'エ', romaji: 'e', type: 'katakana', group: 'gojuon' }, { char: 'オ', romaji: 'o', type: 'katakana', group: 'gojuon' },
    { char: 'カ', romaji: 'ka', type: 'katakana', group: 'gojuon' }, { char: 'キ', romaji: 'ki', type: 'katakana', group: 'gojuon' }, { char: 'ク', romaji: 'ku', type: 'katakana', group: 'gojuon' }, { char: 'ケ', romaji: 'ke', type: 'katakana', group: 'gojuon' }, { char: 'コ', romaji: 'ko', type: 'katakana', group: 'gojuon' },
    { char: 'サ', romaji: 'sa', type: 'katakana', group: 'gojuon' }, { char: 'シ', romaji: 'shi', type: 'katakana', group: 'gojuon' }, { char: 'ス', romaji: 'su', type: 'katakana', group: 'gojuon' }, { char: 'セ', romaji: 'se', type: 'katakana', group: 'gojuon' }, { char: 'ソ', romaji: 'so', type: 'katakana', group: 'gojuon' },
    { char: 'タ', romaji: 'ta', type: 'katakana', group: 'gojuon' }, { char: 'チ', romaji: 'chi', type: 'katakana', group: 'gojuon' }, { char: 'ツ', romaji: 'tsu', type: 'katakana', group: 'gojuon' }, { char: 'テ', romaji: 'te', type: 'katakana', group: 'gojuon' }, { char: 'ト', romaji: 'to', type: 'katakana', group: 'gojuon' },
    { char: 'ナ', romaji: 'na', type: 'katakana', group: 'gojuon' }, { char: 'ニ', romaji: 'ni', type: 'katakana', group: 'gojuon' }, { char: 'ヌ', romaji: 'nu', type: 'katakana', group: 'gojuon' }, { char: 'ネ', romaji: 'ne', type: 'katakana', group: 'gojuon' }, { char: 'ノ', romaji: 'no', type: 'katakana', group: 'gojuon' },
    { char: 'ハ', romaji: 'ha', type: 'katakana', group: 'gojuon' }, { char: 'ヒ', romaji: 'hi', type: 'katakana', group: 'gojuon' }, { char: 'フ', romaji: 'fu', type: 'katakana', group: 'gojuon' }, { char: 'ヘ', romaji: 'he', type: 'katakana', group: 'gojuon' }, { char: 'ホ', romaji: 'ho', type: 'katakana', group: 'gojuon' },
    { char: 'マ', romaji: 'ma', type: 'katakana', group: 'gojuon' }, { char: 'ミ', romaji: 'mi', type: 'katakana', group: 'gojuon' }, { char: 'ム', romaji: 'mu', type: 'katakana', group: 'gojuon' }, { char: 'メ', romaji: 'me', type: 'katakana', group: 'gojuon' }, { char: 'モ', romaji: 'mo', type: 'katakana', group: 'gojuon' },
    { char: 'ヤ', romaji: 'ya', type: 'katakana', group: 'gojuon' }, { char: 'ユ', romaji: 'yu', type: 'katakana', group: 'gojuon' }, { char: 'ヨ', romaji: 'yo', type: 'katakana', group: 'gojuon' },
    { char: 'ラ', romaji: 'ra', type: 'katakana', group: 'gojuon' }, { char: 'リ', romaji: 'ri', type: 'katakana', group: 'gojuon' }, { char: 'ル', romaji: 'ru', type: 'katakana', group: 'gojuon' }, { char: 'レ', romaji: 're', type: 'katakana', group: 'gojuon' }, { char: 'ロ', romaji: 'ro', type: 'katakana', group: 'gojuon' },
    { char: 'ワ', romaji: 'wa', type: 'katakana', group: 'gojuon' }, { char: 'ヲ', romaji: 'wo', type: 'katakana', group: 'gojuon' }, { char: 'ン', romaji: 'n', type: 'katakana', group: 'gojuon' },
    
    // Katakana Dakuon
    { char: 'ガ', romaji: 'ga', type: 'katakana', group: 'dakuon' }, { char: 'ギ', romaji: 'gi', type: 'katakana', group: 'dakuon' }, { char: 'グ', romaji: 'gu', type: 'katakana', group: 'dakuon' }, { char: 'ゲ', romaji: 'ge', type: 'katakana', group: 'dakuon' }, { char: 'ゴ', romaji: 'go', type: 'katakana', group: 'dakuon' },
    { char: 'ザ', romaji: 'za', type: 'katakana', group: 'dakuon' }, { char: 'ジ', romaji: 'ji', type: 'katakana', group: 'dakuon' }, { char: 'ズ', romaji: 'zu', type: 'katakana', group: 'dakuon' }, { char: 'ゼ', romaji: 'ze', type: 'katakana', group: 'dakuon' }, { char: 'ゾ', romaji: 'zo', type: 'katakana', group: 'dakuon' },
    { char: 'ダ', romaji: 'da', type: 'katakana', group: 'dakuon' }, { char: 'ヂ', romaji: 'ji', type: 'katakana', group: 'dakuon' }, { char: 'ヅ', romaji: 'zu', type: 'katakana', group: 'dakuon' }, { char: 'デ', romaji: 'de', type: 'katakana', group: 'dakuon' }, { char: 'ド', romaji: 'do', type: 'katakana', group: 'dakuon' },
    { char: 'バ', romaji: 'ba', type: 'katakana', group: 'dakuon' }, { char: 'ビ', romaji: 'bi', type: 'katakana', group: 'dakuon' }, { char: 'ブ', romaji: 'bu', type: 'katakana', group: 'dakuon' }, { char: 'ベ', romaji: 'be', type: 'katakana', group: 'dakuon' }, { char: 'ボ', romaji: 'bo', type: 'katakana', group: 'dakuon' },
    { char: 'パ', romaji: 'pa', type: 'katakana', group: 'handakuon' }, { char: 'ピ', romaji: 'pi', type: 'katakana', group: 'handakuon' }, { char: 'プ', romaji: 'pu', type: 'katakana', group: 'handakuon' }, { char: 'ペ', romaji: 'pe', type: 'katakana', group: 'handakuon' }, { char: 'ポ', romaji: 'po', type: 'katakana', group: 'handakuon' },
    { char: 'キャ', romaji: 'kya', type: 'katakana', group: 'yoon' }, { char: 'キュ', romaji: 'kyu', type: 'katakana', group: 'yoon' }, { char: 'キョ', romaji: 'kyo', type: 'katakana', group: 'yoon' },
    { char: 'シャ', romaji: 'sha', type: 'katakana', group: 'yoon' }, { char: 'シュ', romaji: 'shu', type: 'katakana', group: 'yoon' }, { char: 'ショ', romaji: 'sho', type: 'katakana', group: 'yoon' },
  ];

  // =================================================================================================
  // 2. KANJI DATABASE (N5 & N4)
  // =================================================================================================
  private readonly KANJI_N5_DATA: Kanji[] = [
    { char: '日', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, -び', meaning: 'Matahari, Hari', level: 'n5' },
    { char: '一', onyomi: 'イチ', kunyomi: 'ひと(つ)', meaning: 'Satu', level: 'n5' },
    { char: '二', onyomi: 'ニ', kunyomi: 'ふた(つ)', meaning: 'Dua', level: 'n5' },
    { char: '三', onyomi: 'サン', kunyomi: 'みっ(つ)', meaning: 'Tiga', level: 'n5' },
    { char: '四', onyomi: 'シ', kunyomi: 'よん, よ', meaning: 'Empat', level: 'n5' },
    { char: '五', onyomi: 'ゴ', kunyomi: 'いつ(つ)', meaning: 'Lima', level: 'n5' },
    { char: '六', onyomi: 'ロク', kunyomi: 'むっ(つ)', meaning: 'Enam', level: 'n5' },
    { char: '七', onyomi: 'シチ', kunyomi: 'なな(つ)', meaning: 'Tujuh', level: 'n5' },
    { char: '八', onyomi: 'ハチ', kunyomi: 'やっ(つ)', meaning: 'Delapan', level: 'n5' },
    { char: '九', onyomi: 'キュウ', kunyomi: 'ここの(つ)', meaning: 'Sembilan', level: 'n5' },
    { char: '十', onyomi: 'ジュウ', kunyomi: 'とお', meaning: 'Sepuluh', level: 'n5' },
    { char: '百', onyomi: 'ヒャク', kunyomi: '-', meaning: 'Ratus', level: 'n5' },
    { char: '千', onyomi: 'セン', kunyomi: 'ち', meaning: 'Ribu', level: 'n5' },
    { char: '万', onyomi: 'マン', kunyomi: '-', meaning: 'Sepuluh Ribu', level: 'n5' },
    { char: '円', onyomi: 'エン', kunyomi: 'まる(い)', meaning: 'Yen, Bulat', level: 'n5' },
    { char: '時', onyomi: 'ジ', kunyomi: 'とき', meaning: 'Waktu', level: 'n5' },
    { char: '人', onyomi: 'ジン, ニン', kunyomi: 'ひと', meaning: 'Orang', level: 'n5' },
    { char: '本', onyomi: 'ホン', kunyomi: 'もと', meaning: 'Buku, Asal', level: 'n5' },
    { char: '水', onyomi: 'スイ', kunyomi: 'みず', meaning: 'Air', level: 'n5' },
    { char: '火', onyomi: 'カ', kunyomi: 'ひ', meaning: 'Api', level: 'n5' },
    { char: '木', onyomi: 'モク, ボク', kunyomi: 'き', meaning: 'Pohon', level: 'n5' },
    { char: '土', onyomi: 'ド', kunyomi: 'つち', meaning: 'Tanah', level: 'n5' },
    { char: '金', onyomi: 'キン', kunyomi: 'かね', meaning: 'Emas, Uang', level: 'n5' },
    { char: '月', onyomi: 'ゲツ, ガツ', kunyomi: 'つき', meaning: 'Bulan', level: 'n5' },
    { char: '山', onyomi: 'サン', kunyomi: 'やま', meaning: 'Gunung', level: 'n5' },
    { char: '川', onyomi: 'セン', kunyomi: 'かわ', meaning: 'Sungai', level: 'n5' },
    { char: '田', onyomi: 'デン', kunyomi: 'た', meaning: 'Sawah', level: 'n5' },
    { char: '男', onyomi: 'ダン', kunyomi: 'おとこ', meaning: 'Laki-laki', level: 'n5' },
    { char: '女', onyomi: 'ジョ', kunyomi: 'おんな', meaning: 'Perempuan', level: 'n5' },
    { char: '子', onyomi: 'シ', kunyomi: 'こ', meaning: 'Anak', level: 'n5' },
    { char: '学', onyomi: 'ガク', kunyomi: 'まな(ぶ)', meaning: 'Belajar', level: 'n5' },
    { char: '生', onyomi: 'セイ, ショウ', kunyomi: 'い(きる), う(む)', meaning: 'Hidup, Lahir', level: 'n5' },
    { char: '先', onyomi: 'セン', kunyomi: 'さき', meaning: 'Sebelum', level: 'n5' },
    { char: '私', onyomi: 'シ', kunyomi: 'わたし', meaning: 'Saya', level: 'n5' },
    { char: '友', onyomi: 'ユウ', kunyomi: 'とも', meaning: 'Teman', level: 'n5' },
    { char: '父', onyomi: 'フ', kunyomi: 'ちち', meaning: 'Ayah', level: 'n5' },
    { char: '母', onyomi: 'ボ', kunyomi: 'はは', meaning: 'Ibu', level: 'n5' },
    { char: '兄', onyomi: 'ケイ', kunyomi: 'あに', meaning: 'Kakak laki-laki', level: 'n5' },
    { char: '姉', onyomi: 'シ', kunyomi: 'あね', meaning: 'Kakak perempuan', level: 'n5' },
    { char: '弟', onyomi: 'テイ', kunyomi: 'おとうと', meaning: 'Adik laki-laki', level: 'n5' },
    { char: '妹', onyomi: 'マイ', kunyomi: 'いもうと', meaning: 'Adik perempuan', level: 'n5' },
    { char: '家', onyomi: 'カ', kunyomi: 'いえ, うち', meaning: 'Rumah', level: 'n5' },
    { char: '校', onyomi: 'コウ', kunyomi: '-', meaning: 'Sekolah', level: 'n5' },
    { char: '店', onyomi: 'テン', kunyomi: 'みせ', meaning: 'Toko', level: 'n5' },
    { char: '国', onyomi: 'コク', kunyomi: 'くに', meaning: 'Negara', level: 'n5' },
    { char: '白', onyomi: 'ハク', kunyomi: 'しろ', meaning: 'Putih', level: 'n5' },
    { char: '黒', onyomi: 'コク', kunyomi: 'くろ', meaning: 'Hitam', level: 'n5' },
    { char: '赤', onyomi: 'セキ', kunyomi: 'あか', meaning: 'Merah', level: 'n5' },
    { char: '青', onyomi: 'セイ', kunyomi: 'あお', meaning: 'Biru', level: 'n5' },
    { char: '右', onyomi: 'ウ', kunyomi: 'みぎ', meaning: 'Kanan', level: 'n5' },
    { char: '左', onyomi: 'サ', kunyomi: 'ひだり', meaning: 'Kiri', level: 'n5' },
    { char: '上', onyomi: 'ジョウ', kunyomi: 'うえ', meaning: 'Atas', level: 'n5' },
    { char: '下', onyomi: 'カ', kunyomi: 'した', meaning: 'Bawah', level: 'n5' },
    { char: '中', onyomi: 'チュウ', kunyomi: 'なか', meaning: 'Dalam', level: 'n5' },
    { char: '外', onyomi: 'ガイ', kunyomi: 'そと', meaning: 'Luar', level: 'n5' },
    { char: '前', onyomi: 'ゼン', kunyomi: 'まえ', meaning: 'Depan', level: 'n5' },
    { char: '後', onyomi: 'ゴ', kunyomi: 'うし(ろ)', meaning: 'Belakang', level: 'n5' },
    { char: '北', onyomi: 'ホク', kunyomi: 'きた', meaning: 'Utara', level: 'n5' },
    { char: '南', onyomi: 'ナン', kunyomi: 'みなみ', meaning: 'Selatan', level: 'n5' },
    { char: '東', onyomi: 'トウ', kunyomi: 'ひがし', meaning: 'Timur', level: 'n5' },
    { char: '西', onyomi: 'セイ', kunyomi: 'にし', meaning: 'Barat', level: 'n5' },
    { char: '食', onyomi: 'ショク', kunyomi: 'た(べる)', meaning: 'Makan', level: 'n5' },
    { char: '飲', onyomi: 'イン', kunyomi: 'の(む)', meaning: 'Minum', level: 'n5' },
    { char: '買', onyomi: 'バイ', kunyomi: 'か(う)', meaning: 'Beli', level: 'n5' },
    { char: '見', onyomi: 'ケン', kunyomi: 'み(る)', meaning: 'Melihat', level: 'n5' },
    { char: '聞', onyomi: 'ブン', kunyomi: 'き(く)', meaning: 'Mendengar', level: 'n5' },
    { char: '話', onyomi: 'ワ', kunyomi: 'はな(す)', meaning: 'Berbicara', level: 'n5' },
    { char: '読', onyomi: 'ドク', kunyomi: 'よ(む)', meaning: 'Membaca', level: 'n5' },
    { char: '書', onyomi: 'ショ', kunyomi: 'か(く)', meaning: 'Menulis', level: 'n5' },
    { char: '行', onyomi: 'コウ, ギョウ', kunyomi: 'い(く)', meaning: 'Pergi', level: 'n5' },
    { char: '来', onyomi: 'ライ', kunyomi: 'く(る)', meaning: 'Datang', level: 'n5' },
    { char: '休', onyomi: 'キュウ', kunyomi: 'やす(む)', meaning: 'Istirahat', level: 'n5' },
  ];

  private readonly KANJI_N4_DATA: Kanji[] = [
    { char: '会', onyomi: 'カイ', kunyomi: 'あ(う)', meaning: 'Bertemu', level: 'n4' },
    { char: '同', onyomi: 'ドウ', kunyomi: 'おな(じ)', meaning: 'Sama', level: 'n4' },
    { char: '事', onyomi: 'ジ', kunyomi: 'こと', meaning: 'Hal', level: 'n4' },
    { char: '自', onyomi: 'ジ, シ', kunyomi: 'みずか(ら)', meaning: 'Diri sendiri', level: 'n4' },
    { char: '社', onyomi: 'シャ', kunyomi: 'やしろ', meaning: 'Perusahaan, Kuil', level: 'n4' },
    { char: '発', onyomi: 'ハツ', kunyomi: '-', meaning: 'Berangkat, Terbit', level: 'n4' },
    { char: '者', onyomi: 'シャ', kunyomi: 'もの', meaning: 'Orang', level: 'n4' },
    { char: '地', onyomi: 'チ, ジ', kunyomi: '-', meaning: 'Tanah, Bumi', level: 'n4' },
    { char: '業', onyomi: 'ギョウ', kunyomi: 'わざ', meaning: 'Bisnis, Seni', level: 'n4' },
    { char: '方', onyomi: 'ホウ', kunyomi: 'かた', meaning: 'Arah, Cara', level: 'n4' },
    { char: '新', onyomi: 'シン', kunyomi: 'あたら(しい)', meaning: 'Baru', level: 'n4' },
    { char: '場', onyomi: 'ジョウ', kunyomi: 'ば', meaning: 'Tempat', level: 'n4' },
    { char: '員', onyomi: 'イン', kunyomi: '-', meaning: 'Anggota', level: 'n4' },
    { char: '立', onyomi: 'リツ', kunyomi: 'た(つ)', meaning: 'Berdiri', level: 'n4' },
    { char: '開', onyomi: 'カイ', kunyomi: 'ひら(く), あ(ける)', meaning: 'Membuka', level: 'n4' },
    { char: '手', onyomi: 'シュ', kunyomi: 'て', meaning: 'Tangan', level: 'n4' },
    { char: '力', onyomi: 'リョク', kunyomi: 'ちから', meaning: 'Kekuatan', level: 'n4' },
    { char: '問', onyomi: 'モン', kunyomi: 'と(う)', meaning: 'Pertanyaan', level: 'n4' },
    { char: '代', onyomi: 'ダイ', kunyomi: 'か(わり)', meaning: 'Menggantikan, Era', level: 'n4' },
    { char: '明', onyomi: 'メイ', kunyomi: 'あか(るい)', meaning: 'Terang', level: 'n4' },
    { char: '動', onyomi: 'ドウ', kunyomi: 'うご(く)', meaning: 'Bergerak', level: 'n4' },
    { char: '京', onyomi: 'キョウ', kunyomi: 'みやこ', meaning: 'Ibukota', level: 'n4' },
    { char: '目', onyomi: 'モク', kunyomi: 'め', meaning: 'Mata', level: 'n4' },
    { char: '通', onyomi: 'ツウ', kunyomi: 'とお(る)', meaning: 'Melalui', level: 'n4' },
    { char: '言', onyomi: 'ゲン', kunyomi: 'い(う)', meaning: 'Berkata', level: 'n4' },
    { char: '理', onyomi: 'リ', kunyomi: '-', meaning: 'Logika', level: 'n4' },
    { char: '体', onyomi: 'タイ', kunyomi: 'からだ', meaning: 'Tubuh', level: 'n4' },
    { char: '田', onyomi: 'デン', kunyomi: 'た', meaning: 'Sawah', level: 'n4' },
    { char: '主', onyomi: 'シュ', kunyomi: 'ぬし', meaning: 'Tuan, Utama', level: 'n4' },
    { char: '題', onyomi: 'ダイ', kunyomi: '-', meaning: 'Topik, Judul', level: 'n4' },
    { char: '意', onyomi: 'イ', kunyomi: '-', meaning: 'Pikiran, Makna', level: 'n4' },
    { char: '不', onyomi: 'フ', kunyomi: '-', meaning: 'Tidak', level: 'n4' },
    { char: '作', onyomi: 'サク', kunyomi: 'つく(る)', meaning: 'Membuat', level: 'n4' },
    { char: '用', onyomi: 'ヨウ', kunyomi: 'もち(いる)', meaning: 'Menggunakan', level: 'n4' },
    { char: '度', onyomi: 'ド', kunyomi: 'たび', meaning: 'Derajat, Kali', level: 'n4' },
    { char: '強', onyomi: 'キョウ', kunyomi: 'つよ(い)', meaning: 'Kuat', level: 'n4' },
    { char: '公', onyomi: 'コウ', kunyomi: 'おおやけ', meaning: 'Publik', level: 'n4' },
    { char: '持', onyomi: 'ジ', kunyomi: 'も(つ)', meaning: 'Memegang', level: 'n4' },
    { char: '野', onyomi: 'ヤ', kunyomi: 'の', meaning: 'Ladang', level: 'n4' },
    { char: '以', onyomi: 'イ', kunyomi: 'もっ(て)', meaning: 'Oleh karena, Sejak', level: 'n4' },
    { char: '思', onyomi: 'シ', kunyomi: 'おも(う)', meaning: 'Berpikir', level: 'n4' },
    { char: '家', onyomi: 'カ', kunyomi: 'いえ', meaning: 'Rumah', level: 'n4' },
    { char: '世', onyomi: 'セ', kunyomi: 'よ', meaning: 'Dunia', level: 'n4' },
    { char: '多', onyomi: 'タ', kunyomi: 'おお(い)', meaning: 'Banyak', level: 'n4' },
    { char: '正', onyomi: 'セイ', kunyomi: 'ただ(しい)', meaning: 'Benar', level: 'n4' },
    { char: '安', onyomi: 'アン', kunyomi: 'やす(い)', meaning: 'Murah, Aman', level: 'n4' },
    { char: '院', onyomi: 'イン', kunyomi: '-', meaning: 'Institusi', level: 'n4' },
    { char: '心', onyomi: 'シン', kunyomi: 'こころ', meaning: 'Hati', level: 'n4' },
    { char: '界', onyomi: 'カイ', kunyomi: '-', meaning: 'Dunia', level: 'n4' },
    { char: '教', onyomi: 'キョウ', kunyomi: 'おし(える)', meaning: 'Mengajar', level: 'n4' },
    { char: '文', onyomi: 'ブン', kunyomi: 'ふみ', meaning: 'Tulisan, Kalimat', level: 'n4' },
    { char: '手', onyomi: 'シュ', kunyomi: 'て', meaning: 'Tangan', level: 'n4' },
    { char: '料', onyomi: 'リョウ', kunyomi: '-', meaning: 'Biaya, Bahan', level: 'n4' },
    { char: '味', onyomi: 'ミ', kunyomi: 'あじ', meaning: 'Rasa', level: 'n4' },
    { char: '旅', onyomi: 'リョ', kunyomi: 'たび', meaning: 'Perjalanan', level: 'n4' },
    { char: '風', onyomi: 'フウ', kunyomi: 'かぜ', meaning: 'Angin', level: 'n4' },
    { char: '林', onyomi: 'リン', kunyomi: 'はやし', meaning: 'Hutan kecil', level: 'n4' },
    { char: '森', onyomi: 'シン', kunyomi: 'もり', meaning: 'Hutan', level: 'n4' },
  ];

  // =================================================================================================
  // 3. VOCABULARY DATABASE (N5 & N4)
  // =================================================================================================
  private readonly VOCAB_N5_DATA: Vocab[] = [
    { word: '私', reading: 'わたし', meaning: 'Saya', level: 'n5' },
    { word: '学生', reading: 'がくせい', meaning: 'Siswa', level: 'n5' },
    { word: '先生', reading: 'せんせい', meaning: 'Guru', level: 'n5' },
    { word: '学校', reading: 'がっこう', meaning: 'Sekolah', level: 'n5' },
    { word: '猫', reading: 'ねこ', meaning: 'Kucing', level: 'n5' },
    { word: '犬', reading: 'いぬ', meaning: 'Anjing', level: 'n5' },
    { word: '食べる', reading: 'たべる', meaning: 'Makan', level: 'n5' },
    { word: '飲む', reading: 'のむ', meaning: 'Minum', level: 'n5' },
    { word: '大きい', reading: 'おおきい', meaning: 'Besar', level: 'n5' },
    { word: '小さい', reading: 'ちいさい', meaning: 'Kecil', level: 'n5' },
    { word: '今日', reading: 'きょう', meaning: 'Hari ini', level: 'n5' },
    { word: '明日', reading: 'あした', meaning: 'Besok', level: 'n5' },
    { word: '昨日', reading: 'きのう', meaning: 'Kemarin', level: 'n5' },
    { word: '好き', reading: 'すき', meaning: 'Suka', level: 'n5' },
    { word: '嫌い', reading: 'きらい', meaning: 'Benci', level: 'n5' },
    { word: '上手', reading: 'じょうず', meaning: 'Pandai', level: 'n5' },
    { word: '下手', reading: 'へた', meaning: 'Tidak pandai', level: 'n5' },
    { word: '甘い', reading: 'あまい', meaning: 'Manis', level: 'n5' },
    { word: '辛い', reading: 'からい', meaning: 'Pedas', level: 'n5' },
    { word: '高い', reading: 'たかい', meaning: 'Tinggi/Mahal', level: 'n5' },
    { word: '安い', reading: 'やすい', meaning: 'Murah', level: 'n5' },
    { word: '新しい', reading: 'あたらしい', meaning: 'Baru', level: 'n5' },
    { word: '古い', reading: 'ふるい', meaning: 'Lama (benda)', level: 'n5' },
    { word: '暑い', reading: 'あつい', meaning: 'Panas (cuaca)', level: 'n5' },
    { word: '寒い', reading: 'さむい', meaning: 'Dingin (cuaca)', level: 'n5' },
    { word: '良い', reading: 'よい', meaning: 'Bagus', level: 'n5' },
    { word: '悪い', reading: 'わるい', meaning: 'Buruk', level: 'n5' },
    { word: '忙しい', reading: 'いそがしい', meaning: 'Sibuk', level: 'n5' },
    { word: '暇', reading: 'ひま', meaning: 'Senggang', level: 'n5' },
    { word: '静か', reading: 'しずか', meaning: 'Tenang', level: 'n5' },
    { word: '賑やか', reading: 'にぎやか', meaning: 'Ramai', level: 'n5' },
    { word: '親切', reading: 'しんせつ', meaning: 'Ramah', level: 'n5' },
    { word: '元気', reading: 'げんき', meaning: 'Sehat/Semangat', level: 'n5' },
    { word: '便利', reading: 'べんり', meaning: 'Praktis', level: 'n5' },
    { word: '有名', reading: 'ゆうめい', meaning: 'Terkenal', level: 'n5' },
    { word: '友達', reading: 'ともだち', meaning: 'Teman', level: 'n5' },
    { word: '家族', reading: 'かぞく', meaning: 'Keluarga', level: 'n5' },
    { word: '父', reading: 'ちち', meaning: 'Ayah (saya)', level: 'n5' },
    { word: '母', reading: 'はは', meaning: 'Ibu (saya)', level: 'n5' },
    { word: '朝ご飯', reading: 'あさごはん', meaning: 'Sarapan', level: 'n5' },
    { word: '昼ご飯', reading: 'ひるごはん', meaning: 'Makan siang', level: 'n5' },
    { word: '晩ご飯', reading: 'ばんごはん', meaning: 'Makan malam', level: 'n5' },
    { word: '水', reading: 'みず', meaning: 'Air', level: 'n5' },
    { word: 'お茶', reading: 'おちゃ', meaning: 'Teh', level: 'n5' },
    { word: '魚', reading: 'さかな', meaning: 'Ikan', level: 'n5' },
    { word: '肉', reading: 'にく', meaning: 'Daging', level: 'n5' },
    { word: '野菜', reading: 'やさい', meaning: 'Sayuran', level: 'n5' },
  ];

  private readonly VOCAB_N4_DATA: Vocab[] = [
    { word: '支度', reading: 'したく', meaning: 'Persiapan', level: 'n4' },
    { word: '彼', reading: 'かれ', meaning: 'Dia (laki-laki)', level: 'n4' },
    { word: '彼女', reading: 'かのじょ', meaning: 'Dia (perempuan)', level: 'n4' },
    { word: '招待', reading: 'しょうたい', meaning: 'Undangan', level: 'n4' },
    { word: '紹介', reading: 'しょうかい', meaning: 'Perkenalan', level: 'n4' },
    { word: '将来', reading: 'しょうらい', meaning: 'Masa depan', level: 'n4' },
    { word: '事務所', reading: 'じむしょ', meaning: 'Kantor', level: 'n4' },
    { word: '工場', reading: 'こうじょう', meaning: 'Pabrik', level: 'n4' },
    { word: '故障', reading: 'こしょう', meaning: 'Kerusakan', level: 'n4' },
    { word: '興味', reading: 'きょうみ', meaning: 'Minat', level: 'n4' },
    { word: '競争', reading: 'きょうそう', meaning: 'Kompetisi', level: 'n4' },
    { word: '近所', reading: 'きんじょ', meaning: 'Tetangga/Lingkungan', level: 'n4' },
    { word: '具合', reading: 'ぐあい', meaning: 'Kondisi (kesehatan)', level: 'n4' },
    { word: '空気', reading: 'くうき', meaning: 'Udara', level: 'n4' },
    { word: '経験', reading: 'けいけん', meaning: 'Pengalaman', level: 'n4' },
  ];

  // =================================================================================================
  // 4. GRAMMAR DATABASE (N5 & N4)
  // =================================================================================================
  private readonly GRAMMAR_N5_DATA: Grammar[] = [
    // N5 BUNPOU (SENTENCE PATTERNS)
    { title: '～です (Desu)', formula: 'N / A-na + です', explanation: 'Kopula sopan untuk mengakhiri kalimat positif saat ini.', example: '私は学生です (Saya adalah siswa).', level: 'n5', type: 'bunpou' },
    { title: '～ます (Masu)', formula: 'V(masu-stem) + ます', explanation: 'Bentuk sopan untuk kata kerja (non-lampau).', example: '学校へ行きます (Pergi ke sekolah).', level: 'n5', type: 'bunpou' },
    { title: '～ません (Masen)', formula: 'V(masu-stem) + ません', explanation: 'Bentuk negatif sopan untuk kata kerja.', example: '肉を食べません (Tidak makan daging).', level: 'n5', type: 'bunpou' },
    { title: '～ました (Mashita)', formula: 'V(masu-stem) + ました', explanation: 'Bentuk lampau sopan untuk kata kerja.', example: '昨日、勉強しました (Kemarin saya belajar).', level: 'n5', type: 'bunpou' },
    { title: '～ましょう (Mashou)', formula: 'V(masu-stem) + ましょう', explanation: 'Ajakan sopan "Ayo...".', example: '行きましょう (Ayo pergi).', level: 'n5', type: 'bunpou' },
    { title: '～てください (Te kudasai)', formula: 'V(te-form) + ください', explanation: 'Meminta tolong dengan sopan.', example: '食べてください (Silakan makan).', level: 'n5', type: 'bunpou' },
    { title: '～ています (Te imasu)', formula: 'V(te-form) + います', explanation: 'Sedang melakukan sesuatu (present continuous).', example: '今、本を読んでいます (Sekarang sedang membaca buku).', level: 'n5', type: 'bunpou' },
    { title: '～てもいいです (Te mo ii desu)', formula: 'V(te-form) + もいいです', explanation: 'Izin "Boleh...".', example: '写真を撮ってもいいです (Boleh mengambil foto).', level: 'n5', type: 'bunpou' },
    { title: '～てはいけません (Te wa ikemasen)', formula: 'V(te-form) + はいけません', explanation: 'Larangan "Tidak boleh...".', example: 'ここで吸ってはいけません (Tidak boleh merokok di sini).', level: 'n5', type: 'bunpou' },
    { title: '～から (Kara)', formula: 'Kalimat + から', explanation: 'Menyatakan alasan "Karena...".', example: '暑いですから (Karena panas).', level: 'n5', type: 'bunpou' },
    
    // N5 PARTIKEL
    { title: 'は (Wa)', formula: 'N + は', explanation: 'Penanda topik kalimat.', example: 'これはペンです。', level: 'n5', type: 'particle' },
    { title: 'が (Ga)', formula: 'N + が', explanation: 'Penanda subjek gramatikal / objek dari kata sifat suka/benci/bisa.', example: '猫がいます。私は猫が好きです。', level: 'n5', type: 'particle' },
    { title: 'を (Wo)', formula: 'N + を + V', explanation: 'Penanda objek langsung dari kata kerja.', example: '水を飲みます。', level: 'n5', type: 'particle' },
    { title: 'に (Ni) - Waktu', formula: 'Waktu + に', explanation: 'Menunjukkan waktu spesifik.', example: '６時に起きます。', level: 'n5', type: 'particle' },
    { title: 'に (Ni) - Tujuan', formula: 'Tempat + に + 行く', explanation: 'Menunjukkan tujuan pergerakan.', example: '学校に行きます。', level: 'n5', type: 'particle' },
    { title: 'で (De) - Tempat', formula: 'Tempat + で + V', explanation: 'Menunjukkan tempat terjadinya aksi.', example: '部屋で寝ます。', level: 'n5', type: 'particle' },
    { title: 'で (De) - Cara', formula: 'Alat/Cara + で', explanation: 'Menggunakan alat/cara.', example: 'バスで来ました。', level: 'n5', type: 'particle' },
    { title: 'へ (He)', formula: 'Tempat + へ', explanation: 'Menunjukkan arah tujuan (mirip "ni").', example: '日本へ行きたい。', level: 'n5', type: 'particle' },
    { title: 'と (To)', formula: 'N + と + N', explanation: 'Dan (menghubungkan kata benda) / Bersama.', example: 'これとそれ。友達と遊びます。', level: 'n5', type: 'particle' },
    { title: 'の (No)', formula: 'N + の + N', explanation: 'Kepemilikan / Modifikasi kata benda.', example: '私の本 (Buku saya).', level: 'n5', type: 'particle' },
    { title: 'も (Mo)', formula: 'N + も', explanation: 'Juga.', example: '私も学生です。', level: 'n5', type: 'particle' },
    { title: 'や (Ya)', formula: 'N + や + N', explanation: 'Dan lain-lain (daftar tidak lengkap).', example: 'ペンやノートなど (Pena, buku catatan, dll).', level: 'n5', type: 'particle' },
  ];

  private readonly GRAMMAR_N4_DATA: Grammar[] = [
    // N4 BUNPOU
    { title: '～つもり (Tsumori)', formula: 'V(kamus) + つもり', explanation: 'Berencana untuk...', example: '日本へ行くつもりです。', level: 'n4', type: 'bunpou' },
    { title: '～たことがある (Ta koto ga aru)', formula: 'V(ta-form) + ことがある', explanation: 'Pernah melakukan (pengalaman).', example: 'すしを食べたことがあります。', level: 'n4', type: 'bunpou' },
    { title: '～たり～たり (Tari... tari)', formula: 'V(ta-form)り + V(ta-form)り + します', explanation: 'Melakukan kegiatan seperti A dan B (dan lain-lain).', example: '本を読んだり、テレビを見たりします。', level: 'n4', type: 'bunpou' },
    { title: '～ほうがいい (Hou ga ii)', formula: 'V(ta-form) + ほうがいい', explanation: 'Saran "Sebaiknya...".', example: '薬を飲んだほうがいいです。', level: 'n4', type: 'bunpou' },
    { title: '～なければなりません (Nakereba narimasen)', formula: 'V(nai-stem) + なければなりません', explanation: 'Harus melakukan.', example: '勉強しなければなりません。', level: 'n4', type: 'bunpou' },
    { title: '～かもしれません (Kamoshiremasen)', formula: 'V/A/N + かもしれません', explanation: 'Mungkin / Barangkali.', example: '明日、雨かもしれません。', level: 'n4', type: 'bunpou' },
    { title: '～ことができます (Koto ga dekimasu)', formula: 'V(kamus) + ことができます', explanation: 'Bisa melakukan (potensial).', example: '漢字を書くことができます。', level: 'n4', type: 'bunpou' },
    { title: '～ことになります (Koto ni narimasu)', formula: 'V(kamus) + ことになります', explanation: 'Diputuskan bahwa / Menjadi jadwal bahwa...', example: '来月、出張することになりました。', level: 'n4', type: 'bunpou' },
    { title: '～ように (You ni)', formula: 'V(kamus/nai) + ように', explanation: 'Supaya / Agar.', example: '忘れないようにメモします。', level: 'n4', type: 'bunpou' },
    
    // N4 PARTIKEL
    { title: 'し (Shi)', formula: 'Kalimat + し', explanation: 'Menyebutkan beberapa alasan.', example: '頭も痛いし、熱もあります。', level: 'n4', type: 'particle' },
    { title: 'か (Ka) - Embedded Question', formula: 'Kalimat Tanya + か', explanation: 'Klausa tanya dalam kalimat.', example: 'いつ来るか分かりません。', level: 'n4', type: 'particle' },
    { title: 'までに (Made ni)', formula: 'Waktu + までに', explanation: 'Paling lambat sebelum (tenggat waktu).', example: '５時までに帰ります。', level: 'n4', type: 'particle' },
    { title: 'ばかり (Bakari)', formula: 'N / V(te) + ばかり', explanation: 'Hanya melulu / Baru saja.', example: '遊んでばかりいます (Main melulu).', level: 'n4', type: 'particle' },
  ];

  // =================================================================================================
  // 5. SENTENCES DATABASE (N5 & N4)
  // =================================================================================================
  private readonly SENTENCES_N5_DATA: Sentence[] = [
    { japanese: '私は学生です', romaji: 'watashi wa gakusei desu', indonesian: 'saya adalah siswa', level: 'n5' },
    { japanese: 'これはペンです', romaji: 'kore wa pen desu', indonesian: 'ini adalah pena', level: 'n5' },
    { japanese: '猫が好きです', romaji: 'neko ga suki desu', indonesian: 'saya suka kucing', level: 'n5' },
    { japanese: '日本語を勉強します', romaji: 'nihongo wo benkyou shimasu', indonesian: 'belajar bahasa jepang', level: 'n5' },
    { japanese: '明日は雨です', romaji: 'ashita wa ame desu', indonesian: 'besok hujan', level: 'n5' },
  ];

  private readonly SENTENCES_N4_DATA: Sentence[] = [
    { japanese: '日本へ行ったことがあります', romaji: 'nihon e itta koto ga arimasu', indonesian: 'pernah pergi ke jepang', level: 'n4' },
    { japanese: '漢字を書くことができます', romaji: 'kanji wo kaku koto ga dekimasu', indonesian: 'bisa menulis kanji', level: 'n4' },
  ];


  // =================================================================================================
  // LOGIC SECTION - DO NOT MODIFY BELOW UNLESS YOU KNOW WHAT YOU ARE DOING
  // =================================================================================================

  getKana(): Kana[] {
    return this.KANA_DATA;
  }

  getKanji(level: 'n5' | 'n4'): Kanji[] {
    return level === 'n5' ? this.KANJI_N5_DATA : this.KANJI_N4_DATA;
  }

  getGrammar(level: 'n5' | 'n4', type: 'bunpou' | 'particle'): Grammar[] {
    const data = level === 'n5' ? this.GRAMMAR_N5_DATA : this.GRAMMAR_N4_DATA;
    return data.filter(g => g.type === type);
  }

  getVocab(level: 'n5' | 'n4'): Vocab[] {
    return level === 'n5' ? this.VOCAB_N5_DATA : this.VOCAB_N4_DATA;
  }

  getSentences(level: 'n5' | 'n4'): Sentence[] {
    return level === 'n5' ? this.SENTENCES_N5_DATA : this.SENTENCES_N4_DATA;
  }

  generateQuiz(type: string, count: number = 10): Question[] {
    const questions: Question[] = [];
    const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

    // 1. Translation / Typing Quiz
    if (type === 'translation') {
       const sentences = [...this.getSentences('n5'), ...this.getSentences('n4')];
       for (let i = 0; i < count; i++) {
         const target = sentences[Math.floor(Math.random() * sentences.length)];
         const isJpToId = Math.random() > 0.5;
         
         if (isJpToId) {
            questions.push({
              question: `Artikan ke Indonesia: "${target.japanese}"`,
              options: [],
              answer: -1,
              textAnswer: target.indonesian,
              type: 'Translation',
              reading: target.romaji
            });
         } else {
            questions.push({
              question: `Tulis Romaji dari: "${target.indonesian}"`,
              options: [],
              answer: -1,
              textAnswer: target.romaji,
              type: 'Translation',
              reading: target.japanese
            });
         }
       }
       return questions;
    }

    // 2. Kana Specific
    if (type === 'hiragana' || type === 'katakana') {
       const kana = this.getKana().filter(k => k.type === type);
       for(let i=0; i<count; i++) {
         const t = kana[Math.floor(Math.random() * kana.length)];
         const distractors = shuffle(kana.filter(k => k.char !== t.char)).slice(0, 3);
         const opts = shuffle([t.romaji, ...distractors.map(d => d.romaji)]);
         questions.push({
           question: `Apa bacaan dari "${t.char}"?`,
           options: opts,
           answer: opts.indexOf(t.romaji),
           type: type.toUpperCase(),
           reading: t.romaji
         });
       }
       return questions;
    }

    // 3. JLPT Simulations & Kanji/Vocab
    // Helper to generate mixed bag based on level
    const generateMixed = (level: 'n5' | 'n4', specificType?: 'kanji' | 'vocab') => {
       const qs: Question[] = [];
       const kanji = this.getKanji(level);
       const vocab = this.getVocab(level);
       
       for(let i=0; i<count; i++) {
          const mode = specificType ? specificType : (Math.random() > 0.5 ? 'kanji' : 'vocab');
          
          if (mode === 'kanji') {
             const t = kanji[Math.floor(Math.random() * kanji.length)];
             const d = shuffle(kanji.filter(k => k.char !== t.char)).slice(0, 3);
             const subMode = Math.random();
             let qText = '', correct = '', opts: string[] = [];
             
             if (subMode < 0.5) { // Meaning
                qText = `Arti Kanji "${t.char}"?`;
                correct = t.meaning;
                opts = shuffle([t.meaning, ...d.map(x=>x.meaning)]);
             } else { // Onyomi (Now uses Katakana from DB)
                qText = `Onyomi dari "${t.char}"?`;
                correct = t.onyomi;
                opts = shuffle([t.onyomi, ...d.map(x=>x.onyomi)]);
             }
             qs.push({ question: qText, options: opts, answer: opts.indexOf(correct), type: 'Kanji', reading: t.kunyomi });
          } else {
             const t = vocab[Math.floor(Math.random() * vocab.length)];
             const d = shuffle(vocab.filter(v => v.word !== t.word)).slice(0, 3);
             const subMode = Math.random();
             
             if (subMode < 0.5) {
                // Reading Question (Now uses Hiragana from DB)
                qs.push({ 
                    question: `Apa bacaan "${t.word}"?`, 
                    options: shuffle([t.reading, ...d.map(x=>x.reading)]), 
                    answer: -1, // Will be calculated after shuffle, logic fixed below
                    type: 'Vocab', 
                    reading: t.reading 
                });
                // Re-calculate answer index since we shuffled inline above
                const lastQ = qs[qs.length-1];
                lastQ.answer = lastQ.options.indexOf(t.reading);
             } else {
                // Meaning Question
                const opts = shuffle([t.meaning, ...d.map(x=>x.meaning)]);
                qs.push({ 
                    question: `Arti kata "${t.word}"?`, 
                    options: opts, 
                    answer: opts.indexOf(t.meaning), 
                    type: 'Vocab', 
                    reading: t.reading 
                });
             }
          }
       }
       return qs;
    }

    if (type === 'jlpt-n5') return generateMixed('n5');
    if (type === 'jlpt-n4') return generateMixed('n4');
    if (type === 'kanji-practice') return generateMixed('n5', 'kanji'); // Default to N5 for general practice or mix both
    if (type === 'vocab-practice') return generateMixed('n5', 'vocab');

    return [];
  }
}