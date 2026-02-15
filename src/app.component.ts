import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatureCardComponent } from './components/feature-card.component';
import { WritingCanvasComponent } from './components/writing-canvas.component';
import { JapaneseDataService, Kanji, Grammar, Vocab, Question, Kana } from './services/data.service';

type ViewState = 'home' | 'kana' | 'kanji' | 'grammar' | 'particles' | 'vocab' | 'writing' | 'quiz';
type QuizStep = 'menu' | 'config' | 'playing' | 'result';
type Level = 'n5' | 'n4';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FeatureCardComponent, WritingCanvasComponent],
  templateUrl: './app.component.html',
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class AppComponent {
  private dataService = inject(JapaneseDataService);
  
  // App State
  currentView = signal<ViewState>('home');
  selectedLevel = signal<Level>('n5');
  
  // Quiz State
  quizStep = signal<QuizStep>('menu');
  selectedQuizType = signal<string>('');
  quizConfig = signal({ time: 10, count: 10 }); // Default 10 min, 10 questions
  
  quizQuestions = signal<Question[]>([]);
  currentQuestionIndex = signal(0);
  quizScore = signal(0);
  quizFinished = signal(false);
  
  // Quiz Tools
  timerValue = signal(0); // in seconds
  timerInterval: any;
  showTranslation = signal(false);
  showAnswerKey = signal(false);
  
  // Text Input Answer
  userTextInput = signal('');

  // Data Signals
  kanjiList = computed(() => this.dataService.getKanji(this.selectedLevel()));
  grammarList = computed(() => this.dataService.getGrammar(this.selectedLevel(), 'bunpou'));
  particleList = computed(() => this.dataService.getGrammar(this.selectedLevel(), 'particle'));
  vocabList = computed(() => this.dataService.getVocab(this.selectedLevel()));
  kanaList = signal<Kana[]>(this.dataService.getKana());

  constructor() {
    // Clear timer on destroy/view change ideally
  }

  // Navigation Methods
  setView(view: ViewState) {
    this.currentView.set(view);
    if (view === 'quiz') {
      this.quizStep.set('menu');
      this.stopTimer();
    }
  }

  setLevel(level: Level) {
    this.selectedLevel.set(level);
  }

  // --- QUIZ FLOW ---

  selectQuizMode(type: string) {
    this.selectedQuizType.set(type);
    this.quizStep.set('config');
    // Reset defaults
    this.quizConfig.set({ time: 10, count: 10 }); 
  }

  startQuiz() {
    const type = this.selectedQuizType();
    const count = this.quizConfig().count;
    const timeMin = this.quizConfig().time;
    
    // Generate questions
    const questions = this.dataService.generateQuiz(type, count);
    this.quizQuestions.set(questions);
    
    // Reset state
    this.currentQuestionIndex.set(0);
    this.quizScore.set(0);
    this.quizFinished.set(false);
    this.showTranslation.set(false);
    this.showAnswerKey.set(false);
    this.userTextInput.set('');
    
    // Start Timer
    this.timerValue.set(timeMin * 60);
    this.startTimer();

    this.quizStep.set('playing');
  }

  startTimer() {
    this.stopTimer();
    this.timerInterval = setInterval(() => {
      this.timerValue.update(v => {
        if (v <= 1) {
          this.finishQuiz();
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }

  // --- ANSWERING LOGIC ---

  answerMultipleChoice(optionIndex: number) {
    const q = this.quizQuestions()[this.currentQuestionIndex()];
    if (optionIndex === q.answer) {
      this.quizScore.update(s => s + 1);
    }
    this.nextQuestion();
  }

  checkTextAnswer() {
    const q = this.quizQuestions()[this.currentQuestionIndex()];
    const user = this.userTextInput().trim().toLowerCase();
    const correct = (q.textAnswer || '').trim().toLowerCase();
    
    // Basic normalization check
    if (user === correct) {
       this.quizScore.update(s => s + 1);
    }
    this.nextQuestion();
  }

  nextQuestion() {
    // Slight delay to show feedback if we wanted, but for speed just move on or finish
    // Reset tools for next question
    this.showTranslation.set(false);
    this.showAnswerKey.set(false);
    this.userTextInput.set('');

    if (this.currentQuestionIndex() < this.quizQuestions().length - 1) {
      this.currentQuestionIndex.update(i => i + 1);
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    this.stopTimer();
    this.quizFinished.set(true);
    this.quizStep.set('result');
  }

  // --- TOOLS ---
  toggleTranslation() {
    this.showTranslation.update(v => !v);
  }

  toggleAnswerKey() {
    this.showAnswerKey.update(v => !v);
  }

  // --- HELPERS ---
  getKanaByType(type: 'hiragana' | 'katakana', group: 'gojuon' | 'dakuon' | 'handakuon' | 'yoon') {
    return this.kanaList().filter(k => k.type === type && k.group === group);
  }
}