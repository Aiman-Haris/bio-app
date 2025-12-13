import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from './data/storyData';
import {
  DialogueBox,
  ChoicePanel,
  RecruitPanel,
  ActionScene,
  PathwayChoice,
  AttackFinale,
  AntibodyFinale,
  VictoryScene,
  OrderingPanel,
  MatchingPanel,
  FillBlankPanel,
  TrueFalsePanel,
  CategorySortPanel,
  TimerPanel,
  GameOverScreen,
  ReadyScreen,
  ShootingGame,
  AnimationScene,
  CertificateView,
} from './components';

function App() {
  const [currentAct, setCurrentAct] = useState('act1'); // act1, pathway, victory, gameover
  const [currentSceneId, setCurrentSceneId] = useState('scene_1');
  const [selectedPath, setSelectedPath] = useState(null);
  const [lives, setLives] = useState(3);
  const [previousSpeaker, setPreviousSpeaker] = useState(null);
  const MAX_LIVES = 3;

  // Get current scene data
  const currentScene = useMemo(() => {
    if (currentAct === 'act1') {
      return storyData.act1.find(s => s.id === currentSceneId);
    } else if (currentAct === 'pathway') {
      const pathData = selectedPath === 'cell_mediated'
        ? storyData.cellMediatedPath
        : storyData.humoralPath;
      return pathData.find(s => s.id === currentSceneId);
    }
    return null;
  }, [currentAct, currentSceneId, selectedPath]);

  // Get background class
  const backgroundClass = useMemo(() => {
    if (currentAct === 'gameover') return 'bg-red';
    const bg = currentScene?.background || 'bloodstream';
    return `scene-${bg}`;
  }, [currentScene, currentAct]);

  // Handle advancing to next scene
  const handleNext = (nextId, currentSpeaker) => {
    if (nextId) {
      setPreviousSpeaker(currentSpeaker || null);
      setCurrentSceneId(nextId);
    }
  };

  // Handle pathway selection
  const handlePathSelect = (pathId) => {
    setSelectedPath(pathId);
    setCurrentAct('pathway');
    setCurrentSceneId(pathId === 'cell_mediated' ? 'cm_1' : 'hm_1');
  };

  // Handle wrong answer - deduct life
  const handleWrongAnswer = () => {
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      // Delay game over so user can see the "Game Over incoming" message
      setTimeout(() => {
        setCurrentAct('gameover');
      }, 1500);
    }
  };

  // Handle finale completion
  const handleFinaleComplete = () => {
    setCurrentAct('victory');
  };

  // Handle restart
  const handleRestart = () => {
    setCurrentAct('act1');
    setCurrentSceneId('scene_1');
    setSelectedPath(null);
    setLives(MAX_LIVES); // Reset lives
  };

  // Handle switch path
  const handleSwitchPath = () => {
    const newPath = selectedPath === 'cell_mediated' ? 'humoral' : 'cell_mediated';
    setSelectedPath(newPath);
    setCurrentAct('pathway');
    setCurrentSceneId(newPath === 'cell_mediated' ? 'cm_1' : 'hm_1');
    setLives(MAX_LIVES); // Reset lives for new path
  };

  // Calculate progress
  const getProgress = () => {
    let scenes = [];
    if (currentAct === 'act1') scenes = storyData.act1;
    else if (currentAct === 'pathway') {
      scenes = selectedPath === 'cell_mediated'
        ? storyData.cellMediatedPath
        : storyData.humoralPath;
    }

    if (!scenes.length) return { current: 0, total: 0 };

    const questionTypes = ['choice', 'recruit', 'action', 'ordering', 'matching', 'fill_blank', 'true_false', 'category_sort', 'timer', 'finale', 'shooting_game'];
    const questions = scenes.filter(s => {
      if (!questionTypes.includes(s.type)) return false;
      if (s.choices && s.choices[0]?.id === 'cell_mediated') return false;
      return true;
    });

    const total = questions.length;
    const currentIndex = questions.findIndex(s => s.id === currentSceneId);
    const current = currentIndex !== -1 ? currentIndex + 1 : 0;

    return { current, total };
  };

  // Calculate act title
  const getActTitle = () => {
    if (currentAct === 'act1') return "Act 1: The Invasion";
    if (currentAct === 'pathway') {
      return selectedPath === 'cell_mediated' ? "Act 2: Cell-Mediated Defense" : "Act 2: Humoral Defense";
    }
    if (currentAct === 'victory') return "Victory";
    if (currentAct === 'gameover') return "Game Over";
    return "Immune Adventure";
  };

  const actTitle = getActTitle();
  const progress = getProgress();

  const commonProps = {
    lives,
    actName: actTitle,
    questionNumber: progress.current,
    totalQuestions: progress.total,
  };

  // Render current scene
  const renderScene = () => {
    // Game Over screen
    if (currentAct === 'gameover') {
      return <GameOverScreen onRestart={handleRestart} {...commonProps} />;
    }

    // Victory screen
    if (currentAct === 'victory') {
      const victoryData = selectedPath === 'cell_mediated'
        ? storyData.victory.cellMediated
        : storyData.victory.humoral;
      return (
        <VictoryScene
          title={victoryData.title}
          description={victoryData.description}
          onRestart={handleRestart}
          onSwitchPath={handleSwitchPath}
          {...commonProps}
        />
      );
    }

    if (!currentScene) return null;

    switch (currentScene.type) {
      case 'dialogue':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <DialogueBox
              speaker={currentScene.speaker}
              text={currentScene.text}
              image={currentScene.image}
              onContinue={() => handleNext(currentScene.next, currentScene.speaker)}
              isSameSpeaker={previousSpeaker === currentScene.speaker}
            />
          </div>
        );

      case 'ready_screen':
        return (
          <ReadyScreen
            text={currentScene.text}
            onContinue={() => handleNext(currentScene.next)}
          />
        );

      case 'shooting_game':
        return (
          <ShootingGame
            instruction={currentScene.instruction}
            onComplete={() => handleNext(currentScene.next)}
            onFail={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'animation':
        return (
          <AnimationScene
            animationName={currentScene.animationName}
            text={currentScene.text}
            onNext={() => handleNext(currentScene.next)}
          />
        );

      case 'certificate':
        return (
          <CertificateView
            title={currentScene.title}
            description={currentScene.description}
            onRestart={handleRestart}
          />
        );

      case 'choice':
        // Check if this is the pathway choice scene
        if (currentScene.choices[0]?.id === 'cell_mediated') {
          return (
            <PathwayChoice
              text={currentScene.text}
              options={currentScene.choices}
              onSelect={handlePathSelect}
              {...commonProps}
            />
          );
        }
        return (
          <ChoicePanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            question={currentScene.text}
            choices={currentScene.choices}
            onCorrect={() => handleNext(currentScene.next)}
            onWrong={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'recruit':
        return (
          <RecruitPanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            text={currentScene.text}
            options={currentScene.options}
            correctCount={currentScene.correctCount}
            successText={currentScene.successText}
            onComplete={() => handleNext(currentScene.next)}
            onWrongAnswer={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'action':
        return (
          <ActionScene
            speaker={currentScene.speaker}
            text={currentScene.text}
            action={currentScene.action}
            onComplete={() => handleNext(currentScene.next)}
            {...commonProps}
          />
        );

      case 'finale':
        return currentScene.finaleType === 'attack' ? (
          <AttackFinale
            onComplete={handleFinaleComplete}
            {...commonProps}
          />
        ) : (
          <AntibodyFinale
            onComplete={handleFinaleComplete}
            {...commonProps}
          />
        );

      case 'ordering':
        return (
          <OrderingPanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            instruction={currentScene.text}
            items={currentScene.items}
            correctOrder={currentScene.correctOrder}
            onCorrect={() => handleNext(currentScene.next)}
            onWrong={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'matching':
        return (
          <MatchingPanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            instruction={currentScene.text}
            pairs={currentScene.pairs}
            onCorrect={() => handleNext(currentScene.next)}
            onWrong={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'fill_blank':
        return (
          <FillBlankPanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            question={currentScene.text}
            correctAnswer={currentScene.answer}
            hint={currentScene.hint}
            onCorrect={() => handleNext(currentScene.next)}
            onWrong={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'true_false':
        return (
          <TrueFalsePanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            statement={currentScene.statement}
            isTrue={currentScene.isTrue}
            explanation={currentScene.explanation}
            onCorrect={() => handleNext(currentScene.next)}
            onWrong={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'category_sort':
        return (
          <CategorySortPanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            instruction={currentScene.text}
            categories={currentScene.categories}
            items={currentScene.items}
            onCorrect={() => handleNext(currentScene.next)}
            onWrong={handleWrongAnswer}
            {...commonProps}
          />
        );

      case 'timer':
        return (
          <TimerPanel
            key={currentScene.id}
            speaker={currentScene.speaker}
            question={currentScene.text}
            choices={currentScene.choices}
            timeLimit={currentScene.timeLimit || 10}
            onCorrect={() => handleNext(currentScene.next)}
            onWrong={handleWrongAnswer}
            {...commonProps}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${backgroundClass}`}>
      {/* Scene content - only animate on act changes, not dialogue changes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAct}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
