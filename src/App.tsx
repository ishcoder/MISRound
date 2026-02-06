import React, { useState, useMemo } from 'react';
import { QUESTIONS } from './constants';
import { AssessmentState, Category, UserInfo, CategoryScore } from './types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Rule-based feedback generator
function generateFeedback(
  score: number, 
  totalQuestions: number, 
  categoryScores: Record<string, CategoryScore>,
  userName: string
): string {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Find strengths and weaknesses
  const categoryPerformance = Object.entries(categoryScores).map(([cat, stats]) => ({
    category: cat,
    percentage: Math.round((stats.correct / stats.total) * 100),
    correct: stats.correct,
    total: stats.total
  })).sort((a, b) => b.percentage - a.percentage);
  
  const strongest = categoryPerformance[0];
  const weakest = categoryPerformance[categoryPerformance.length - 1];
  
  let feedback = `**Assessment Summary for ${userName}**\n\n`;
  
  if (percentage >= 85) {
    feedback += `🌟 **Exceptional Performance** (${percentage}%)\n\n`;
    feedback += `Outstanding results! You've demonstrated strong expertise across all areas. `;
    feedback += `Your mastery in ${strongest.category.split('(')[0].trim()} (${strongest.percentage}%) is particularly impressive. `;
    feedback += `You're well-equipped to handle complex MIS automation projects independently.\n\n`;
    feedback += `**Recommendation:** ✅ **HIRE** - Candidate shows senior-level competency.`;
  } else if (percentage >= 75) {
    feedback += `✨ **Strong Performance** (${percentage}%)\n\n`;
    feedback += `Great work! You have solid foundational knowledge. `;
    feedback += `Particularly strong in ${strongest.category.split('(')[0].trim()} (${strongest.percentage}%). `;
    if (weakest.percentage < 70) {
      feedback += `Consider strengthening your ${weakest.category.split('(')[0].trim()} skills (${weakest.percentage}%) through hands-on projects. `;
    }
    feedback += `You're ready for MIS roles with appropriate mentorship.\n\n`;
    feedback += `**Recommendation:** ✅ **HIRE** - Candidate meets requirements with room for growth.`;
  } else if (percentage >= 60) {
    feedback += `📚 **Developing Proficiency** (${percentage}%)\n\n`;
    feedback += `You show promise and understanding of core concepts. `;
    feedback += `Your ${strongest.category.split('(')[0].trim()} knowledge (${strongest.percentage}%) is good. `;
    feedback += `However, ${weakest.category.split('(')[0].trim()} (${weakest.percentage}%) needs significant improvement. `;
    feedback += `Focus on practical implementation and real-world automation scenarios.\n\n`;
    feedback += `**Recommendation:** ⚠️ **TRAIN FURTHER** - 2-3 months structured learning recommended.`;
  } else if (percentage >= 50) {
    feedback += `📖 **Foundational Level** (${percentage}%)\n\n`;
    feedback += `You have basic awareness but need substantial skill development. `;
    feedback += `All areas require focused attention, especially ${weakest.category.split('(')[0].trim()} (${weakest.percentage}%). `;
    feedback += `Recommend intensive training in Google Workspace automation tools and systems thinking fundamentals.\n\n`;
    feedback += `**Recommendation:** ❌ **TRAIN FURTHER** - 3-6 months comprehensive training needed.`;
  } else {
    feedback += `🎯 **Beginning Journey** (${percentage}%)\n\n`;
    feedback += `You're at the starting point of your MIS automation journey. `;
    feedback += `This role requires stronger technical foundation. `;
    feedback += `Consider enrolling in structured courses covering Google Sheets, Apps Script, and automation workflows. `;
    feedback += `Build practical projects to gain hands-on experience.\n\n`;
    feedback += `**Recommendation:** ❌ **NOT READY** - Significant training required before consideration.`;
  }
  
  return feedback;
}

export default function App() {
  const [state, setState] = useState<AssessmentState>({
    userInfo: null,
    answers: {},
    isSubmitted: false,
    currentQuestionIndex: 0
  });

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const currentQuestion = QUESTIONS[state.currentQuestionIndex];
  const totalQuestions = QUESTIONS.length;
  const answeredCount = Object.keys(state.answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const scoreResults = useMemo(() => {
    if (!state.isSubmitted) return null;
    
    let totalScore = 0;
    const categoryScores: Record<string, CategoryScore> = {};

    QUESTIONS.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
      }
      categoryScores[q.category].total += 1;
      if (state.answers[q.id] === q.correctAnswer) {
        totalScore += 1;
        categoryScores[q.category].correct += 1;
      }
    });

    const chartData = Object.entries(categoryScores).map(([name, stats]) => ({
      name: name.split(' (')[0],
      score: Math.round((stats.correct / stats.total) * 100),
      label: `${stats.correct}/${stats.total}`
    }));

    const feedback = generateFeedback(totalScore, totalQuestions, categoryScores, state.userInfo?.name || 'Candidate');

    return { totalScore, totalQuestions, categoryScores, chartData, feedback };
  }, [state.isSubmitted, state.answers, state.userInfo?.name]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName && userEmail) {
      setState(prev => ({ ...prev, userInfo: { name: userName, email: userEmail } }));
    }
  };

  const handleOptionSelect = (optionLabel: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion.id]: optionLabel }
    }));
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < totalQuestions - 1) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };

  const handlePrev = () => {
    if (state.currentQuestionIndex > 0) {
      setState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex - 1 }));
    }
  };

  const handleSubmit = () => {
    setState(prev => ({ ...prev, isSubmitted: true }));
  };

  const handleReset = () => {
    setState({
      userInfo: null,
      answers: {},
      isSubmitted: false,
      currentQuestionIndex: 0
    });
    setUserName('');
    setUserEmail('');
  };

  if (!state.userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-slate-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">MIS Executive Assessment</h1>
            <p className="text-slate-600 mt-2">Systems + Automation MCQ Evaluation</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">24 Questions</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">~15 Minutes</span>
            </div>
          </div>
          
          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                required
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input 
                required
                type="email" 
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="your.email@example.com"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Start Assessment →
            </button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Topics: Systems Thinking • Google Sheets • Apps Script • AppSheet
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.isSubmitted && scoreResults) {
    const scorePercentage = Math.round((scoreResults.totalScore / scoreResults.totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Assessment Results</h1>
                <p className="text-slate-600 mt-1">
                  Candidate: <span className="font-semibold text-slate-900">{state.userInfo.name}</span>
                </p>
                <p className="text-sm text-slate-500">{state.userInfo.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className={`text-4xl md:text-5xl font-bold ${
                    scorePercentage >= 75 ? 'text-green-600' : 
                    scorePercentage >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {scorePercentage}%
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {scoreResults.totalScore}/{scoreResults.totalQuestions} Correct
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Expert Evaluation</h2>
                <p className="text-sm text-slate-500">Based on your performance across all categories</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                {scoreResults.feedback}
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Category Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={scoreResults.chartData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis domain={[0, 100]} fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                    {scoreResults.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Detailed Breakdown</h3>
              <div className="space-y-3">
                {Object.entries(scoreResults.categoryScores).map(([category, stats], idx) => {
                  const percent = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">
                          {category.split('(')[0].trim()}
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {stats.correct}/{stats.total} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${percent}%`,
                            backgroundColor: COLORS[idx % COLORS.length]
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Question-by-Question Review</h3>
            <div className="space-y-4">
              {QUESTIONS.map((q, idx) => {
                const isCorrect = state.answers[q.id] === q.correctAnswer;
                const userAnswer = state.answers[q.id];
                return (
                  <div key={q.id} className={`p-4 rounded-lg border-l-4 ${
                    isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 mb-2">
                          Q{idx + 1}. {q.text}
                        </p>
                        <div className="space-y-1 text-sm">
                          <p className={`${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            Your answer: <span className="font-semibold">
                              {userAnswer} - {q.options.find(o => o.label === userAnswer)?.text}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-green-700">
                              Correct answer: <span className="font-semibold">
                                {q.correctAnswer} - {q.options.find(o => o.label === q.correctAnswer)?.text}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Take Another Assessment
            </button>
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold rounded-lg shadow-sm hover:shadow-md transition"
            >
              Print Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Question {state.currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {answeredCount} answered
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
          <div className="mb-6">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-3">
              {currentQuestion.category}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = state.answers[currentQuestion.id] === option.label;
              return (
                <button
                  key={option.label}
                  onClick={() => handleOptionSelect(option.label)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-300 text-slate-400'
                    }`}>
                      {option.label}
                    </div>
                    <span className={`text-slate-700 ${isSelected ? 'font-medium' : ''}`}>
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={handlePrev}
              disabled={state.currentQuestionIndex === 0}
              className="px-6 py-2.5 bg-white border-2 border-slate-300 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-semibold rounded-lg transition"
            >
              ← Previous
            </button>

            {state.currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount < totalQuestions}
                className="px-8 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
              >
                Submit Assessment ✓
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
              >
                Next →
              </button>
            )}
          </div>

          {answeredCount < totalQuestions && state.currentQuestionIndex === totalQuestions - 1 && (
            <p className="text-center text-sm text-amber-600 mt-4">
              Please answer all questions before submitting
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
