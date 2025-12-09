import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';
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
} from './components';

// Game Over Screen Component
function GameOverScreen({ onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-8 bg-red"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-8xl mb-6"
        >
          <span className="text-8xl font-bold">X</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Game Over!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/90 mb-8"
        >
          The pathogens have overwhelmed Ivan's immune system. Try again!
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onRestart}
          className="btn-pop bg-white text-black text-xl px-8 py-4"
        >
          <RotateCcw className="w-6 h-6" />
          Try Again
        </motion.button>
      </div>
    </motion.div>
  );
}

// Lives Display Component
function LivesDisplay({ lives, maxLives = 3 }) {
  return (
    <div className="flex items-center gap-2">
      {[...Array(maxLives)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Heart
            className={`w-8 h-8 ${i < lives ? 'fill-red text-red' : 'text-white/30'}`}
            strokeWidth={2}
          />
        </motion.div>
      ))}
    </div>
  );
}

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

  // Render current scene
  const renderScene = () => {
    // Game Over screen
    if (currentAct === 'gameover') {
      return <GameOverScreen onRestart={handleRestart} />;
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
              onContinue={() => handleNext(currentScene.next, currentScene.speaker)}
              isSameSpeaker={previousSpeaker === currentScene.speaker}
            />
          </div>
        );

      case 'choice':
        // Check if this is the pathway choice scene
        if (currentScene.choices[0]?.id === 'cell_mediated') {
          return (
            <div className="min-h-screen flex items-center justify-center p-8">
              <PathwayChoice
                text={currentScene.text}
                options={currentScene.choices}
                onSelect={handlePathSelect}
              />
            </div>
          );
        }
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <ChoicePanel
              speaker={currentScene.speaker}
              text={currentScene.text}
              choices={currentScene.choices}
              feedback={currentScene.feedback}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      case 'recruit':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <RecruitPanel
              speaker={currentScene.speaker}
              text={currentScene.text}
              options={currentScene.options}
              correctCount={currentScene.correctCount}
              successText={currentScene.successText}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      case 'action':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <ActionScene
              speaker={currentScene.speaker}
              text={currentScene.text}
              action={currentScene.action}
              onComplete={() => handleNext(currentScene.next)}
            />
          </div>
        );

      case 'finale':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            {currentScene.finaleType === 'attack' ? (
              <AttackFinale onComplete={handleFinaleComplete} />
            ) : (
              <AntibodyFinale onComplete={handleFinaleComplete} />
            )}
          </div>
        );

      case 'ordering':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <OrderingPanel
              speaker={currentScene.speaker}
              text={currentScene.text}
              items={currentScene.items}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      case 'matching':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <MatchingPanel
              speaker={currentScene.speaker}
              text={currentScene.text}
              pairs={currentScene.pairs}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      case 'fill_blank':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <FillBlankPanel
              speaker={currentScene.speaker}
              text={currentScene.text}
              answer={currentScene.answer}
              hint={currentScene.hint}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      case 'true_false':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <TrueFalsePanel
              speaker={currentScene.speaker}
              statement={currentScene.statement}
              isTrue={currentScene.isTrue}
              explanation={currentScene.explanation}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      case 'category_sort':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <CategorySortPanel
              speaker={currentScene.speaker}
              text={currentScene.text}
              categories={currentScene.categories}
              items={currentScene.items}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      case 'timer':
        return (
          <div className="min-h-screen flex items-center justify-center p-8">
            <TimerPanel
              speaker={currentScene.speaker}
              text={currentScene.text}
              choices={currentScene.choices}
              timeLimit={currentScene.timeLimit || 10}
              onComplete={() => handleNext(currentScene.next)}
              onWrongAnswer={handleWrongAnswer}
              lives={lives}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Calculate progress
  const getProgress = () => {
    if (currentAct === 'act1') {
      const index = storyData.act1.findIndex(s => s.id === currentSceneId);
      return { current: index + 1, total: storyData.act1.length };
    } else if (currentAct === 'pathway') {
      const pathData = selectedPath === 'cell_mediated'
        ? storyData.cellMediatedPath
        : storyData.humoralPath;
      const index = pathData.findIndex(s => s.id === currentSceneId);
      return { current: index + 1, total: pathData.length };
    }
    return { current: 0, total: 0 };
  };

  const progress = getProgress();

  return (
    <div className={`min-h-screen transition-all duration-500 ${backgroundClass}`}>
      {/* HUD - Progress bar and Lives */}
      {/* HUD - Just Lives in corner */}
      {currentAct !== 'victory' && currentAct !== 'gameover' && (
        <div className="fixed top-4 right-4 z-50">
          <LivesDisplay lives={lives} maxLives={MAX_LIVES} />
        </div>
      )}

      {/* Scene content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentAct}-${currentSceneId}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
