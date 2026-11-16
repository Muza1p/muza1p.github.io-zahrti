import React from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from '@/src/components/layout/Footer';
import { Navbar } from '@/src/components/layout/Navbar';
import { useAssessment } from '@/src/hooks/useAssessment';
import { useRouter } from '@/src/hooks/useRouter';
import { AboutPage } from '@/src/pages/AboutPage';
import { AnalyzingPage } from '@/src/pages/AnalyzingPage';
import { ComparePage } from '@/src/pages/ComparePage';
import { CompatibilityPage } from '@/src/pages/CompatibilityPage';
import { HomePage } from '@/src/pages/HomePage';
import { InterestsPage } from '@/src/pages/InterestsPage';
import { IntroPage } from '@/src/pages/IntroPage';
import { MajorDetailPage } from '@/src/pages/MajorDetailPage';
import { MajorsPage } from '@/src/pages/MajorsPage';
import { MethodologyPage } from '@/src/pages/MethodologyPage';
import { NotFoundPage } from '@/src/pages/NotFoundPage';
import { OurWorldPage } from '@/src/pages/OurWorldPage';
import { PrivacyPage } from '@/src/pages/PrivacyPage';
import { QuizPage } from '@/src/pages/QuizPage';
import { ResultsPage } from '@/src/pages/ResultsPage';
import { SettingsPage } from '@/src/pages/SettingsPage';
import { TermsPage } from '@/src/pages/TermsPage';

export default function App() {
  const { pathname, navigate } = useRouter();
  const assessment = useAssessment();

  const renderPage = () => {
    if (pathname === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          activePersonId={assessment.activePersonId}
          person1Name={assessment.person1Name}
          person2Name={assessment.person2Name}
          hasCustomNames={assessment.hasCustomNames}
          person1Completed={assessment.person1Completed}
          person2Completed={assessment.person2Completed}
          person1AnsweredCount={assessment.person1AnsweredCount}
          person2AnsweredCount={assessment.person2AnsweredCount}
          onSelectPerson={assessment.setActivePersonId}
        />
      );
    }

    if (pathname === '/intro') {
      return (
        <IntroPage
          onNavigate={navigate}
          activePersonId={assessment.activePersonId}
          rawPerson1Name={assessment.profilesMeta.person1.name}
          rawPerson2Name={assessment.profilesMeta.person2.name}
          person1Name={assessment.person1Name}
          person2Name={assessment.person2Name}
          person1AnsweredCount={assessment.person1AnsweredCount}
          person2AnsweredCount={assessment.person2AnsweredCount}
          person1Completed={assessment.person1Completed}
          person2Completed={assessment.person2Completed}
          onSaveNames={assessment.setProfileNames}
          onSelectPerson={assessment.setActivePersonId}
          onStartNewAssessment={assessment.startNewAssessment}
        />
      );
    }

    if (pathname === '/quiz') {
      return (
        <QuizPage
          activePersonName={assessment.activePersonName}
          answers={assessment.session.answers}
          currentQuestionIndex={assessment.session.currentQuestionIndex}
          answeredCount={assessment.answeredCount}
          isComplete={assessment.isComplete}
          onSelectAnswer={assessment.setAnswer}
          onChangeQuestionIndex={assessment.setCurrentQuestionIndex}
          onFinish={() => navigate('/analyzing')}
          onReset={() => assessment.startNewAssessment(assessment.activePersonId)}
          onSwitchProfile={() => navigate('/intro')}
        />
      );
    }

    if (pathname === '/analyzing') {
      return (
        <AnalyzingPage
          activePersonName={assessment.activePersonName}
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
          activePersonName={assessment.activePersonName}
          result={assessment.latestResult}
          savedRecords={assessment.savedRecords}
          favoriteMajorIds={assessment.favoriteMajorIds}
          compareIds={assessment.compareIds}
          bothCompleted={assessment.person1Completed && assessment.person2Completed}
          onSaveResult={assessment.saveCurrentResult}
          onRestoreRecord={assessment.restoreSavedRecord}
          onDeleteSavedRecord={assessment.deleteSavedRecord}
          onToggleFavorite={assessment.toggleFavoriteMajor}
          onToggleCompare={assessment.toggleCompareMajor}
          onRestartQuiz={() => assessment.startNewAssessment(assessment.activePersonId)}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/interests') {
      return (
        <InterestsPage
          activePersonName={assessment.activePersonName}
          result={assessment.latestResult}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/majors') {
      return (
        <MajorsPage
          favoriteMajorIds={assessment.favoriteMajorIds}
          compareIds={assessment.compareIds}
          onToggleFavorite={assessment.toggleFavoriteMajor}
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
          favoriteMajorIds={assessment.favoriteMajorIds}
          compareIds={assessment.compareIds}
          onToggleFavorite={assessment.toggleFavoriteMajor}
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

    if (pathname === '/compatibility') {
      return (
        <CompatibilityPage
          person1Name={assessment.person1Name}
          person2Name={assessment.person2Name}
          person1Completed={assessment.person1Completed}
          person2Completed={assessment.person2Completed}
          lockedReason={assessment.compatibilityLockedReason}
          report={assessment.compatibilityReport}
          onStartPersonTest={(pid) => {
            assessment.setActivePersonId(pid);
            navigate('/quiz');
          }}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/our-world') {
      return (
        <OurWorldPage
          person1Name={assessment.person1Name}
          person2Name={assessment.person2Name}
          p1Result={
            assessment.person1Completed
              ? assessment.exportPersonBundle('person1').latestResult
              : null
          }
          p2Result={
            assessment.person2Completed
              ? assessment.exportPersonBundle('person2').latestResult
              : null
          }
          lockedReason={assessment.compatibilityLockedReason}
          report={assessment.compatibilityReport}
          ourWorld={assessment.ourWorld}
          onUpdateNote={assessment.updateOurWorldNote}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/settings') {
      return (
        <SettingsPage
          rawPerson1Name={assessment.profilesMeta.person1.name}
          rawPerson2Name={assessment.profilesMeta.person2.name}
          person1Name={assessment.person1Name}
          person2Name={assessment.person2Name}
          privacy={assessment.profilesMeta.privacy}
          person1AnsweredCount={assessment.person1AnsweredCount}
          person2AnsweredCount={assessment.person2AnsweredCount}
          person1Completed={assessment.person1Completed}
          person2Completed={assessment.person2Completed}
          onSaveNames={assessment.setProfileNames}
          onSetCompatibilityConsent={assessment.setCompatibilityConsent}
          onExportPerson={assessment.exportPersonBundle}
          onImportPerson={assessment.importPersonBundle}
          onClearPersonData={assessment.clearPersonData}
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
          activePersonName={assessment.activePersonName}
          answeredCount={assessment.answeredCount}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  const canvasClass =
    pathname === '/quiz' || pathname === '/analyzing'
      ? 'zahrti-quiz-canvas'
      : 'zahrti-editorial-canvas';

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir="rtl"
        className={`${canvasClass} min-h-screen flex flex-col text-[#351B38]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-50 focus:rounded-full focus:bg-[#762D50] focus:px-4 focus:py-2 focus:text-sm focus:text-[#F9F3EC]"
        >
          تخطي إلى المحتوى الرئيسي
        </a>

        <Navbar
          currentPath={pathname}
          onNavigate={navigate}
          activePersonId={assessment.activePersonId}
          activePersonName={assessment.activePersonName}
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
