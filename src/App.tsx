import React from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from '@/src/components/layout/Footer';
import { Navbar } from '@/src/components/layout/Navbar';
import { useAssessment } from '@/src/hooks/useAssessment';
import { useRouter } from '@/src/hooks/useRouter';
import { AboutPage } from '@/src/pages/AboutPage';
import { AnalyzingPage } from '@/src/pages/AnalyzingPage';
import { ComparePage } from '@/src/pages/ComparePage';
import { HomePage } from '@/src/pages/HomePage';
import { InterestsPage } from '@/src/pages/InterestsPage';
import { IntroPage } from '@/src/pages/IntroPage';
import { MajorDetailPage } from '@/src/pages/MajorDetailPage';
import { MajorsPage } from '@/src/pages/MajorsPage';
import { MethodologyPage } from '@/src/pages/MethodologyPage';
import { NotFoundPage } from '@/src/pages/NotFoundPage';
import { PrivacyPage } from '@/src/pages/PrivacyPage';
import { QuizPage } from '@/src/pages/QuizPage';
import { ResultsPage } from '@/src/pages/ResultsPage';
import { TermsPage } from '@/src/pages/TermsPage';

export default function App() {
  const { pathname, navigate } = useRouter();
  const assessment = useAssessment();

  const renderPage = () => {
    if (pathname === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          answeredCount={assessment.answeredCount}
          hasResult={Boolean(assessment.latestResult)}
        />
      );
    }

    if (pathname === '/intro') {
      return (
        <IntroPage
          onNavigate={navigate}
          answeredCount={assessment.answeredCount}
          onResetProgress={assessment.resetProgress}
        />
      );
    }

    if (pathname === '/quiz') {
      return (
        <QuizPage
          answers={assessment.session.answers}
          currentQuestionIndex={assessment.session.currentQuestionIndex}
          answeredCount={assessment.answeredCount}
          isComplete={assessment.isComplete}
          onSelectAnswer={assessment.setAnswer}
          onChangeQuestionIndex={assessment.setCurrentQuestionIndex}
          onFinish={() => navigate('/analyzing')}
          onReset={() => {
            assessment.resetProgress();
          }}
        />
      );
    }

    if (pathname === '/analyzing') {
      return (
        <AnalyzingPage
          isComplete={assessment.isComplete}
          missingQuestionIndices={assessment.missingQuestionIndices}
          isAnalyzing={assessment.isAnalyzing}
          analysisError={assessment.analysisError}
          onRunAnalysis={assessment.analyzeResults}
          onJumpToQuestion={assessment.setCurrentQuestionIndex}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/results' || pathname === '/profile') {
      return (
        <ResultsPage
          result={assessment.latestResult}
          savedRecords={assessment.savedRecords}
          compareIds={assessment.compareIds}
          onSaveResult={assessment.saveCurrentResult}
          onDeleteSavedRecord={assessment.deleteSavedRecord}
          onToggleCompare={assessment.toggleCompareMajor}
          onRestartQuiz={assessment.resetProgress}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/interests') {
      return (
        <InterestsPage
          result={assessment.latestResult}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/majors') {
      return (
        <MajorsPage
          compareIds={assessment.compareIds}
          onToggleCompare={assessment.toggleCompareMajor}
          onNavigate={navigate}
        />
      );
    }

    if (pathname.startsWith('/majors/')) {
      const majorId = decodeURIComponent(pathname.slice('/majors/'.length));
      return (
        <MajorDetailPage
          majorId={majorId}
          compareIds={assessment.compareIds}
          onToggleCompare={assessment.toggleCompareMajor}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/compare') {
      return (
        <ComparePage
          compareIds={assessment.compareIds}
          onToggleCompare={assessment.toggleCompareMajor}
          onSetCompareIds={assessment.setCompareIds}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (pathname === '/methodology') {
      return <MethodologyPage onNavigate={navigate} />;
    }

    if (pathname === '/privacy') {
      return (
        <PrivacyPage
          answeredCount={assessment.answeredCount}
          onResetProgress={assessment.resetProgress}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  const themeClass =
    pathname === '/quiz' || pathname === '/analyzing'
      ? 'zahrti-theme-quiz'
      : pathname === '/results' || pathname === '/profile' || pathname === '/interests'
      ? 'zahrti-theme-results'
      : pathname === '/majors' || pathname.startsWith('/majors/') || pathname === '/compare'
      ? 'zahrti-theme-majors'
      : 'zahrti-theme-home';

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir="rtl"
        className={`${themeClass} min-h-screen flex flex-col text-[#351B38]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-full focus:bg-[#C04472] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          تخطي إلى المحتوى الرئيسي
        </a>

        <Navbar
          currentPath={pathname}
          onNavigate={navigate}
          answeredCount={assessment.answeredCount}
          hasResult={Boolean(assessment.latestResult)}
        />

        <main id="main-content" className="flex-1">
          {renderPage()}
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}
