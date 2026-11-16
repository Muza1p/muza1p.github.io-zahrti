import React from 'react';
import { MotionConfig } from 'motion/react';
import { Footer } from '@/src/components/layout/Footer';
import { Navbar } from '@/src/components/layout/Navbar';
import { getInstrumentById } from '@/src/data/assessments/registry';
import { useAssessment } from '@/src/hooks/useAssessment';
import { usePsychPlatform } from '@/src/hooks/usePsychPlatform';
import { useRouter } from '@/src/hooks/useRouter';
import { AboutPage } from '@/src/pages/AboutPage';
import { AnalyzingPage } from '@/src/pages/AnalyzingPage';
import { ComparePage } from '@/src/pages/ComparePage';
import { CompatibilityPage } from '@/src/pages/CompatibilityPage';
import { ComprehensiveReportPage } from '@/src/pages/ComprehensiveReportPage';
import { HomePage } from '@/src/pages/HomePage';
import { InterestsPage } from '@/src/pages/InterestsPage';
import { IntroPage } from '@/src/pages/IntroPage';
import { LibraryPage } from '@/src/pages/LibraryPage';
import { MajorDetailPage } from '@/src/pages/MajorDetailPage';
import { MajorsPage } from '@/src/pages/MajorsPage';
import { MethodologyPage } from '@/src/pages/MethodologyPage';
import { NotFoundPage } from '@/src/pages/NotFoundPage';
import { OurWorldPage } from '@/src/pages/OurWorldPage';
import { PrivacyPage } from '@/src/pages/PrivacyPage';
import { PsychAssessmentIntroPage } from '@/src/pages/PsychAssessmentIntroPage';
import { PsychAssessmentRunnerPage } from '@/src/pages/PsychAssessmentRunnerPage';
import { PsychResultPage } from '@/src/pages/PsychResultPage';
import { QuizPage } from '@/src/pages/QuizPage';
import { ResultsPage } from '@/src/pages/ResultsPage';
import { SettingsPage } from '@/src/pages/SettingsPage';
import { TermsPage } from '@/src/pages/TermsPage';

export default function App() {
  const { pathname, navigate } = useRouter();
  const assessment = useAssessment();
  const psych = usePsychPlatform();

  const effectivePersonalName =
    psych.personalName.trim() ||
    assessment.profilesMeta.person1.name.trim() ||
    '';

  const handleSaveSinglePersonalName = (name: string) => {
    psych.setPersonalName(name);
    assessment.setProfileNames(name, assessment.profilesMeta.person2.name);
  };

  const handleDownloadFullBundle = () => {
    const bundle = psych.exportFullBundle(
      assessment.latestResult,
      assessment.savedRecords,
      assessment.favoriteMajorIds,
      assessment.compareIds
    );
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zahrti-personal-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    psych.clearAllPsychData();
    assessment.clearPersonData('person1');
    assessment.clearPersonData('person2');
  };

  const renderPage = () => {
    if (pathname === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          personalName={effectivePersonalName}
          completedResults={psych.completedResults}
          sessions={psych.sessions}
          hasCareerResult={Boolean(assessment.latestResult)}
          careerAnsweredCount={assessment.answeredCount}
        />
      );
    }

    if (pathname === '/library') {
      return (
        <LibraryPage
          onNavigate={navigate}
          sessions={psych.sessions}
          completedResults={psych.completedResults}
          hasCareerResult={Boolean(assessment.latestResult)}
          careerAnsweredCount={assessment.answeredCount}
        />
      );
    }

    if (pathname === '/report') {
      return (
        <ComprehensiveReportPage
          personalName={effectivePersonalName}
          completedResults={psych.completedResults}
          repeatedInstruments={psych.repeatedInstruments}
          careerResult={assessment.latestResult}
          onDeleteResult={psych.deleteResult}
          onExportJson={handleDownloadFullBundle}
          onNavigate={navigate}
        />
      );
    }

    if (pathname.startsWith('/assessment/')) {
      const rest = pathname.slice('/assessment/'.length);
      const parts = rest.split('/').filter(Boolean);
      const instrumentId = decodeURIComponent(parts[0] || '');
      const subRoute = parts[1] || '';
      const spec = getInstrumentById(instrumentId);

      if (!spec || spec.scientificStatus === 'requires_license_reference') {
        return <NotFoundPage onNavigate={navigate} />;
      }

      if (spec.isLegacyOnetRoute) {
        return (
          <IntroPage
            onNavigate={navigate}
            personalName={effectivePersonalName}
            answeredCount={assessment.answeredCount}
            isCompleted={Boolean(assessment.latestResult)}
            onSavePersonalName={handleSaveSinglePersonalName}
            onStartNewAssessment={() => assessment.startNewAssessment('person1')}
          />
        );
      }

      if (subRoute === 'play') {
        return (
          <PsychAssessmentRunnerPage
            spec={spec}
            session={psych.getSession(spec.id)}
            onSaveAnswer={psych.saveAnswer}
            onChangeIndex={psych.setCurrentIndex}
            onResetSession={psych.resetSession}
            onSubmitAssessment={psych.submitAssessment}
            onNavigate={navigate}
          />
        );
      }

      if (subRoute === 'result') {
        return (
          <PsychResultPage
            spec={spec}
            result={psych.getLatestResult(spec.id)}
            history={psych.getHistoryForInstrument(spec.id)}
            personalName={effectivePersonalName}
            onStartFresh={() => psych.resetSession(spec.id)}
            onNavigate={navigate}
          />
        );
      }

      if (parts.length === 1) {
        return (
          <PsychAssessmentIntroPage
            spec={spec}
            session={psych.getSession(spec.id)}
            latestResult={psych.getLatestResult(spec.id)}
            onStartFresh={() => psych.resetSession(spec.id)}
            onNavigate={navigate}
          />
        );
      }

      return <NotFoundPage onNavigate={navigate} />;
    }

    if (pathname === '/intro') {
      return (
        <IntroPage
          onNavigate={navigate}
          personalName={effectivePersonalName}
          answeredCount={assessment.answeredCount}
          isCompleted={Boolean(assessment.latestResult)}
          onSavePersonalName={handleSaveSinglePersonalName}
          onStartNewAssessment={() => assessment.startNewAssessment('person1')}
        />
      );
    }

    if (pathname === '/quiz') {
      return (
        <QuizPage
          activePersonName={effectivePersonalName || 'ملفي الشخصي'}
          answers={assessment.session.answers}
          currentQuestionIndex={assessment.session.currentQuestionIndex}
          answeredCount={assessment.answeredCount}
          isComplete={assessment.isComplete}
          onSelectAnswer={assessment.setAnswer}
          onChangeQuestionIndex={assessment.setCurrentQuestionIndex}
          onFinish={() => navigate('/analyzing')}
          onReset={() => assessment.startNewAssessment('person1')}
          onSwitchProfile={() => navigate('/intro')}
        />
      );
    }

    if (pathname === '/analyzing') {
      return (
        <AnalyzingPage
          activePersonName={effectivePersonalName || 'ملفي الشخصي'}
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
          activePersonName={effectivePersonalName || 'ملفي الشخصي'}
          result={assessment.latestResult}
          savedRecords={assessment.savedRecords}
          favoriteMajorIds={assessment.favoriteMajorIds}
          compareIds={assessment.compareIds}
          bothCompleted={false}
          onSaveResult={assessment.saveCurrentResult}
          onRestoreRecord={assessment.restoreSavedRecord}
          onDeleteSavedRecord={assessment.deleteSavedRecord}
          onToggleFavorite={assessment.toggleFavoriteMajor}
          onToggleCompare={assessment.toggleCompareMajor}
          onRestartQuiz={() => assessment.startNewAssessment('person1')}
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/interests') {
      return (
        <InterestsPage
          activePersonName={effectivePersonalName || 'ملفي الشخصي'}
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

    // Legacy compatibility routes kept intact in codebase without active nav promotion
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
          personalName={effectivePersonalName}
          completedPsychCount={psych.completedInstrumentIds.length}
          activeSessionsCount={
            Object.values(psych.sessions).filter((s) => Object.keys(s.answers).length > 0).length
          }
          hasCareerResult={Boolean(assessment.latestResult)}
          onSavePersonalName={handleSaveSinglePersonalName}
          onDownloadBundle={() =>
            psych.exportFullBundle(
              assessment.latestResult,
              assessment.savedRecords,
              assessment.favoriteMajorIds,
              assessment.compareIds
            )
          }
          onImportBundle={psych.importPsychBundle}
          onClearAllData={handleClearAllData}
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
          completedCount={
            psych.completedInstrumentIds.length + (assessment.latestResult ? 1 : 0)
          }
          onNavigate={navigate}
        />
      );
    }

    if (pathname === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  const isFocusedQuizCanvas =
    pathname === '/quiz' ||
    pathname === '/analyzing' ||
    /^\/assessment\/[^/]+\/play$/.test(pathname);

  const canvasClass = isFocusedQuizCanvas
    ? 'zahrti-quiz-canvas'
    : 'zahrti-editorial-canvas';

  const inProgressEntry = Object.values(psych.sessions).find(
    (s) => Object.keys(s.answers).length > 0
  );

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
          completedCount={
            psych.completedInstrumentIds.length + (assessment.latestResult ? 1 : 0)
          }
          inProgressInstrumentId={inProgressEntry ? inProgressEntry.instrumentId : null}
        />

        <main id="main-content" className="flex-1">
          {renderPage()}
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </MotionConfig>
  );
}
