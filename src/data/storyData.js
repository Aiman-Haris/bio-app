// Story data for the narrative adventure

export const storyData = {
    // Characters in the story
    characters: {
        ivan: {
            id: 'ivan',
            name: 'Ivan',
            role: 'protagonist',
            color: 'bg-blue-500',
        },
        doctor: {
            id: 'doctor',
            name: 'Dr. Chen',
            role: 'guide',
            color: 'bg-teal-500',
        },
        macrophage: {
            id: 'macrophage',
            name: 'Macrophage',
            role: 'ally',
            color: 'bg-orange-500',
        },
        dendritic: {
            id: 'dendritic',
            name: 'Dendritic Cell',
            role: 'ally',
            color: 'bg-pink-500',
        },
        helperT: {
            id: 'helperT',
            name: 'Helper T Cell',
            role: 'ally',
            color: 'bg-green-500',
        },
        cytotoxicT: {
            id: 'cytotoxicT',
            name: 'Cytotoxic T Cell',
            role: 'ally',
            color: 'bg-red-500',
        },
        bCell: {
            id: 'bCell',
            name: 'B Cell',
            role: 'ally',
            color: 'bg-indigo-500',
        },
        narrator: {
            id: 'narrator',
            name: 'Narrator',
            role: 'narrator',
            color: 'bg-slate-700',
        },
        pathogen: {
            id: 'pathogen',
            name: 'Bacteria',
            role: 'enemy',
            color: 'bg-gray-500',
        }
    },

    // ACT 1: Setup scenes
    act1: [
        {
            id: 'scene_1',
            type: 'dialogue',
            background: 'restaurant',
            speaker: 'ivan',
            text: "That meal was... interesting. I'm not sure if it was cooked all the way through.",
            next: 'scene_2',
        },
        {
            id: 'scene_2',
            type: 'dialogue',
            background: 'sick',
            speaker: 'ivan',
            text: "Ugh... my stomach turns... I think I made a mistake.",
            next: 'scene_3',
        },
        {
            id: 'scene_3',
            type: 'dialogue',
            background: 'hospital',
            speaker: 'doctor',
            text: "Ivan, you're looking pale. It seems you've ingested some harmful bacteria.",
            next: 'scene_4',
        },
        {
            id: 'scene_4',
            type: 'choice',
            background: 'hospital',
            speaker: 'doctor',
            text: "We need to mobilize your immune system immediately. How shall we proceed?",
            choices: [
                { id: 'cell_mediated', text: 'Cell-Mediated Response', description: 'Deploy T Cells to hunt infected cells' },
                { id: 'humoral', text: 'Humoral Response', description: 'Deploy B Cells to fight free-floating enemies' },
            ],
        },
    ],

    // Cell-Mediated Path scenes
    cellMediatedPath: [
        // Q1: APC Recruit
        {
            id: 'cm_1',
            type: 'recruit',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "When bacteria invade, which cells can be antigen-presenting cells? (Choose 3)",
            options: [
                { id: 'macrophage', name: 'Macrophage', correct: true },
                { id: 'dendritic', name: 'Dendritic Cell', correct: true },
                { id: 'phagocyte', name: 'Phagocyte', correct: true },
                { id: 'pathogen', name: 'Pathogen', correct: false },
            ],
            correctCount: 3,
            successText: "Correct! These are our scouts.",
            next: 'cm_2',
        },
        // Q2: Fill Blank
        {
            id: 'cm_2',
            type: 'fill_blank',
            background: 'bloodstream',
            speaker: 'macrophage',
            text: "After macrophage engulfs the pathogen, what will it do? It degrades the pathogens into _____ fragments.",
            answer: 'antigen',
            hint: 'A substance that induces an immune response',
            next: 'cm_4_game',
        },
        // Ready Screen removed as requested
        // Mini-Game 1: Shooting
        {
            id: 'cm_4_game',
            type: 'shooting_game',
            background: 'bloodstream',
            instruction: "Eliminate infected cells (RED) only!",
            next: 'cm_5_anim',
        },
        // Animation 1
        {
            id: 'cm_5_anim',
            type: 'animation',
            background: 'bloodstream',
            animationName: 'apc_present',
            text: "The Macrophage processes the pathogen and presents the ANTIGEN on its surface using an MHC Class II molecule.",
            next: 'cm_6',
        },
        // Q3: MCQ
        {
            id: 'cm_6',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "The antigen fragments bind to class II MHC, forming:",
            choices: [
                { id: 'w1', text: 'Hormone-receptor complex', correct: false },
                { id: 'c1', text: 'MHC-antigen complex', correct: true },
                { id: 'w2', text: 'Enzyme-substrate complex', correct: false },
                { id: 'w3', text: 'Membrane attack complex', correct: false },
            ],
            feedback: "Correct! This complex acts like a 'wanted poster'.",
            next: 'cm_7_anim', // Skipped redundant anim, already showed presentation
        },
        // Q4: MCQ (Connected directly)
        {
            id: 'cm_7_anim', // Re-using ID flow
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Which cell binds to the class II MHC complex on APCs?",
            choices: [
                { id: 'w1', text: 'B cell', correct: false },
                { id: 'w2', text: 'Natural Killer cell', correct: false },
                { id: 'c1', text: 'Helper T cell', correct: true },
            ],
            next: 'cm_8_anim',
        },
        // Animation 2: Binding
        {
            id: 'cm_8_anim',
            type: 'animation',
            background: 'bloodstream',
            animationName: 'binding',
            text: "The Helper T Cell physically binds to the MHC-Antigen complex using its TCR and CD4 receptor.",
            next: 'cm_9',
        },
        // Q5: MCQ
        {
            id: 'cm_9',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'macrophage',
            text: "Which signal does the APC release to activate Helper T cells?",
            choices: [
                { id: 'w1', text: 'Interleukin-2 (IL-2)', correct: false },
                { id: 'c1', text: 'Interleukin-1 (IL-1)', correct: true },
                { id: 'w2', text: 'Dopamine', correct: false },
                { id: 'w3', text: 'Acetylcholine', correct: false },
            ],
            next: 'cm_10',
        },
        // Q6: MCQ
        {
            id: 'cm_10',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Which accessory receptor is involved in this binding?",
            choices: [
                { id: 'w1', text: 'CD8', correct: false },
                { id: 'w2', text: 'Interleukin-1', correct: false },
                { id: 'c1', text: 'CD4', correct: true },
                { id: 'w3', text: 'CD16', correct: false },
            ],
            next: 'cm_11_anim',
        },
        // Animation 3: Activation/Signaling
        {
            id: 'cm_11_anim',
            type: 'animation',
            background: 'bloodstream',
            animationName: 'helper_activate',
            text: "The Helper T Cell receives the IL-1 signal and becomes ACTIVATED, releasing its own IL-2.",
            next: 'cm_12',
        },
        // Q7: MCQ
        {
            id: 'cm_12',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "What happens to the activated Helper T cells?",
            choices: [
                { id: 'w1', text: 'Proliferates and differentiates into clones of antibodies and memory helper T cell', correct: false },
                { id: 'c1', text: 'Proliferates and differentiates into clones of activated helper T cell and memory helper T cell', correct: true },
                { id: 'w2', text: 'Proliferates and differentiates into clones of B cells and memory helper T cell', correct: false },
                { id: 'w3', text: 'Proliferates and differentiates into clones of cytotoxic T cell and memory helper T cell', correct: false },
            ],
            next: 'cm_13_anim',
        },
        // Animation 4: Proliferation
        {
            id: 'cm_13_anim',
            type: 'animation',
            background: 'bloodstream',
            animationName: 'proliferate_helper',
            text: "The activated cell divides rapidly (proliferation), creating an army of clones.",
            next: 'cm_15',
        },
        // Q8: MCQ
        {
            id: 'cm_15',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'helperT',
            text: "What do activated helper T cells release next?",
            choices: [
                { id: 'w1', text: 'IL-1', correct: false },
                { id: 'c1', text: 'IL-2', correct: true },
                { id: 'w2', text: 'IL-3', correct: false },
                { id: 'w3', text: 'IL-4', correct: false },
            ],
            next: 'cm_17',
        },
        // Q9: MCQ
        {
            id: 'cm_17',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "IL-2 activates which cells?",
            choices: [
                { id: 'w1', text: 'B cells', correct: false },
                { id: 'c1', text: 'Cytotoxic T cells', correct: true },
                { id: 'w2', text: 'RBCs', correct: false },
                { id: 'w3', text: 'Antigen presenting cells', correct: false },
            ],
            next: 'cm_19_sort',
        },
        // Mini-Game 2: Sorting (Put in order)
        {
            id: 'cm_19_sort',
            type: 'ordering',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Recall the steps of T Cell activation:",
            items: [
                { id: 's1', text: 'APC presents antigen' },
                { id: 's2', text: 'Helper T binds with CD4' },
                { id: 's3', text: 'APC releases IL-1' },
                { id: 's4', text: 'Helper T releases IL-2' },
                { id: 's5', text: 'Cytotoxic T activates' },
            ],
            correctOrder: ['s1', 's2', 's3', 's4', 's5'],
            next: 'cm_20_ready',
        },
        // Transition Quote/Ready
        {
            id: 'cm_20_ready',
            type: 'ready_screen',
            background: 'bloodstream',
            text: "You are ready to move on into the real battle! The final assault begins now!",
            next: 'cm_21',
        },
        // Q10: MCQ
        {
            id: 'cm_21',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "What happens to the activated cytotoxic T cells?",
            choices: [
                { id: 'w1', text: 'Proliferates and differentiates into clones of antibodies and memory cytotoxic T cell', correct: false },
                { id: 'w2', text: 'Proliferates and differentiates into clones of B cells and memory cytotoxic T cell', correct: false },
                { id: 'c1', text: 'Proliferates and differentiates into clones of activated cytotoxic T cell and memory cytotoxic T cell', correct: true },
                { id: 'w3', text: 'Proliferates and differentiates into clones of helper T cell and memory helper T cell', correct: false },
            ],
            next: 'cm_22_anim',
        },
        // Animation 5: Proliferation Cytotoxic
        {
            id: 'cm_22_anim',
            type: 'animation',
            background: 'bloodstream',
            animationName: 'proliferate_cytotoxic',
            text: "The Killer T Cells multiply, ready to hunt down infected cells.",
            next: 'cm_23',
        },
        // Q11: MCQ
        {
            id: 'cm_23',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Activated cytotoxic T cell migrates and binds to the infected cell via T cell receptor with the helps of which accessory receptor?",
            choices: [
                { id: 'w1', text: 'CD4', correct: false },
                { id: 'c1', text: 'CD8', correct: true },
                { id: 'w2', text: 'CD6', correct: false },
                { id: 'w3', text: 'CD14', correct: false },
            ],
            next: 'cm_25',
        },
        // Q12: MCQ
        {
            id: 'cm_25',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'cytotoxicT',
            text: "What substances do I release?",
            choices: [
                { id: 'w1', text: 'Interleukin-1', correct: false },
                { id: 'w2', text: 'Antibodies', correct: false },
                { id: 'c1', text: 'Perforin and granzymes', correct: true },
                { id: 'w3', text: 'Perforin and granzyme C', correct: false },
            ],
            next: 'cm_27',
        },
        // Q13: MCQ
        {
            id: 'cm_27',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "What does perforin do?",
            choices: [
                { id: 'w1', text: 'Creates pores in the infected cell membrane', correct: false },
                { id: 'c1', text: 'Causes cell lysis or apoptosis', correct: true },
                { id: 'w2', text: 'Causes water and ions to enter the cell', correct: false },
                { id: 'w3', text: 'Cytolysis', correct: false },
            ],
            next: 'cm_28_anim',
        },
        // Animation 6: Finale Lysis
        {
            id: 'cm_28_anim',
            type: 'animation',
            background: 'bloodstream',
            animationName: 'lysis',
            text: "Perforin punches holes in the membrane, and Granzymes trigger the cell to self-destruct (Apoptosis). Victory!",
            next: 'cm_certificate',
        },
        // Certificate
        {
            id: 'cm_certificate',
            type: 'certificate',
            title: 'Cell-Mediated Specialist',
            description: 'You have mastered the art of T Cell defense!',
        },
    ],

    // Humoral Path scenes (Left mostly as is, just ensuring IDs dont conflict if we transition)
    humoralPath: [
        {
            id: 'hm_1',
            type: 'dialogue',
            background: 'bloodstream',
            speaker: 'narrator',
            text: "We enter Ivan's bloodstream. Extracellular bacteria are multiplying, and the body's antibody factories need to be activated.",
            next: 'hm_2',
        },
        {
            id: 'hm_2',
            type: 'dialogue',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "The Humoral Response targets pathogens outside of cells using antibodies. First, let's get the antigen-presenting cells working.",
            next: 'hm_3',
        },
        {
            id: 'hm_3',
            type: 'fill_blank',
            background: 'bloodstream',
            speaker: 'macrophage',
            text: "I've captured the pathogen. I need to present _____ fragments on my surface.",
            answer: 'antigen',
            hint: 'What we call the parts of a pathogen that immune cells recognize',
            next: 'hm_4',
        },
        {
            id: 'hm_4',
            type: 'true_false',
            background: 'bloodstream',
            speaker: 'doctor',
            statement: 'B Cells can also act as antigen-presenting cells.',
            isTrue: true,
            explanation: 'B Cells can capture, process, and present antigens on MHC II to Helper T cells.',
            next: 'hm_5',
        },
        {
            id: 'hm_5',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Which cell binds to the MHC-antigen complex on the APC?",
            choices: [
                { id: 'correct', text: 'Helper T Cell', correct: true },
                { id: 'wrong1', text: 'B Cell', correct: false },
                { id: 'wrong2', text: 'Natural Killer Cell', correct: false },
            ],
            feedback: "Helper T Cell will orchestrate the response!",
            next: 'hm_6',
        },
        {
            id: 'hm_6',
            type: 'timer',
            background: 'bloodstream',
            speaker: 'macrophage',
            text: "Quick! What signal activates the Helper T Cell?",
            timeLimit: 8,
            choices: [
                { id: 'wrong1', text: 'Interleukin-2 (IL-2)', correct: false },
                { id: 'wrong2', text: 'Dopamine', correct: false },
                { id: 'wrong3', text: 'Acetylcholine', correct: false },
                { id: 'correct', text: 'Interleukin-1 (IL-1)', correct: true },
            ],
            next: 'hm_7',
        },
        {
            id: 'hm_7',
            type: 'dialogue',
            background: 'bloodstream',
            speaker: 'narrator',
            text: "Meanwhile, the pathogen also binds directly to B Cell receptors. The B Cell takes up the antigen and presents it on MHC II.",
            next: 'hm_8',
        },
        {
            id: 'hm_8',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'helperT',
            text: "I need to bind to the B Cell's antigen-MHC complex. Which accessory protein helps me?",
            choices: [
                { id: 'correct', text: 'CD4', correct: true },
                { id: 'wrong1', text: 'CD8', correct: false },
                { id: 'wrong2', text: 'CD6', correct: false },
                { id: 'wrong3', text: 'CD16', correct: false },
            ],
            feedback: "CD4 and my TCR will bind to the B Cell!",
            next: 'hm_9',
        },
        {
            id: 'hm_9',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'helperT',
            text: "Now I need to activate the B Cell. Which cytokine should I release?",
            choices: [
                { id: 'correct', text: 'IL-2', correct: true },
                { id: 'wrong1', text: 'IL-1', correct: false },
                { id: 'wrong2', text: 'IL-3', correct: false },
                { id: 'wrong3', text: 'IL-4', correct: false },
            ],
            feedback: "IL-2 activates the B Cell to start the antibody factory!",
            next: 'hm_10',
        },
        {
            id: 'hm_10',
            type: 'category_sort',
            background: 'bloodstream',
            speaker: 'doctor',
            text: 'Sort what B Cells become after activation:',
            categories: [
                { id: 'effector', name: 'Effector Cell', color: '#007AFF' },
                { id: 'memory', name: 'Memory Cell', color: '#FF9500' },
            ],
            items: [
                { id: 'plasma', text: 'Plasma Cell', category: 'effector' },
                { id: 'memb', text: 'Memory B Cell', category: 'memory' },
                { id: 'antibody', text: 'Makes antibodies', category: 'effector' },
                { id: 'longterm', text: 'Long-term protection', category: 'memory' },
            ],
            next: 'hm_11',
        },
        {
            id: 'hm_11',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "The Plasma Cell is an antibody factory. What does it produce?",
            choices: [
                { id: 'correct', text: 'Antibodies', correct: true },
                { id: 'wrong1', text: 'Antigens', correct: false },
                { id: 'wrong2', text: 'Pathogens', correct: false },
                { id: 'wrong3', text: 'Epitopes', correct: false },
            ],
            feedback: "Antibodies - the Y-shaped proteins that target pathogens!",
            next: 'hm_12',
        },
        {
            id: 'hm_12',
            type: 'recruit',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Antibodies protect in multiple ways. Select all the methods they use.",
            options: [
                { id: 'neutralization', name: 'Neutralization', correct: true },
                { id: 'opsonization', name: 'Opsonization', correct: true },
                { id: 'complement', name: 'Complement System Activation', correct: true },
                { id: 'detox', name: 'Detoxification', correct: false },
            ],
            correctCount: 3,
            successText: "Neutralization, Opsonization, and Complement Activation - the antibody trifecta!",
            next: 'hm_finale',
        },
        {
            id: 'hm_finale',
            type: 'finale',
            background: 'bloodstream',
            finaleType: 'antibody',
        },
    ],

    victory: {
        cellMediated: {
            title: 'Infected Cell Destroyed!',
            description: 'The Cytotoxic T Cells successfully eliminated the infected cells using Perforin and Granzymes. Ivan is on the road to recovery!',
        },
        humoral: {
            title: 'Pathogens Eliminated!',
            description: 'The antibodies neutralized, marked, and destroyed the extracellular pathogens. Ivan is on the road to recovery!',
        },
    },
};
