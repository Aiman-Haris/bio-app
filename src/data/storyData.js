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
            text: "Thailand has been amazing! The views, the people... and the FOOD! I couldn't resist that street food stall.",
            next: 'scene_2',
            hideDoctor: true,
        },
        {
            id: 'scene_2',
            type: 'dialogue',
            background: 'sick',
            speaker: 'ivan',
            text: "Ugh... sakit perut... I shouldn't have eaten that raw meat. I swear I saw flies on it too...",
            next: 'scene_3',
            hideDoctor: true,
        },
        {
            id: 'scene_3',
            type: 'dialogue',
            background: 'hospital',
            speaker: 'doctor',
            text: "Food poisoning. Looks like you ingested a heavy load of bacteria from that contaminated street food.",
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
            next: 'cm_1_anim',
        },
        // Animation after Q1 - Shows the APCs
        {
            id: 'cm_1_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 1.gif',
            text: "Antigen-Presenting Cells (APCs): Macrophage, Dendritic Cell, and Phagocyte - These cells can engulf pathogens and present antigens to other immune cells.",
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
            next: 'cm_2_anim',
        },
        // Animation after Q2 - APC presents antigen
        {
            id: 'cm_2_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 2.gif',
            text: "APC (Macrophage) presents ANTIGEN: After engulfing and degrading the pathogen, the macrophage breaks it down into antigen fragments and displays them on its surface.",
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
            next: 'cm_6_anim',
        },
        // Animation 3: MHC-Antigen complex
        {
            id: 'cm_6_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 3.gif',
            text: "Macrophage displays antigen fragments on Class II MHC: The MHC-antigen complex is now ready to present to other immune cells. Think of it like the 'wanted poster' to other immune cells.",
            next: 'cm_7',
        },
        // Q4: MCQ 
        {
            id: 'cm_7',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Which cell binds to the class II MHC complex on APCs?",
            choices: [
                { id: 'w1', text: 'B cell', correct: false },
                { id: 'w2', text: 'Natural Killer cell', correct: false },
                { id: 'c1', text: 'Helper T cell', correct: true },
            ],
            next: 'cm_7_anim',
        },
        // Animation 4: Helper T cell binding
        {
            id: 'cm_7_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 4.gif',
            text: "Helper T Cell binds to the Class II MHC complex on APCs: The Helper T cell recognizes and attaches to the MHC-antigen complex displayed on the APC surface.",
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
            next: 'cm_10_anim',
        },
        // Animation 5: IL-1 and CD4
        {
            id: 'cm_10_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 5.gif',
            text: "APC releases Interleukin-1 (IL-1) that activates Helper T cell and Helper T cell uses CD4 receptor in binding with the MHC: IL-1 provides the activation signal to activate the Helper T cell while CD4 accessory receptor strengthens the binding to Class II MHC.",
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
            next: 'cm_12_anim',
        },
        // Animation 6: Helper T cell proliferation
        {
            id: 'cm_12_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 6.gif',
            text: "Activated Helper T cells proliferate and differentiate: They divide into clones of activated Helper T cells and memory Helper T cells for future immune responses.",
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
            next: 'cm_15_anim',
        },
        // Animation 7: IL-2 release
        {
            id: 'cm_15_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 7.gif',
            text: "Activated Helper T cells release Interleukin-2 (IL-2): IL-2 is a cytokine that signals and activates other immune cells like...?",
            next: 'cm_17',
        },
        // Q9: MCQ
        {
            id: 'cm_17',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "In this immune response, IL-2 activates which cells next?",
            choices: [
                { id: 'w1', text: 'B cells', correct: false },
                { id: 'c1', text: 'Cytotoxic T cells', correct: true },
                { id: 'w2', text: 'RBCs', correct: false },
                { id: 'w3', text: 'Antigen presenting cells', correct: false },
            ],
            next: 'cm_17_anim',
        },
        // Animation 8: IL-2 activates Cytotoxic T cells
        {
            id: 'cm_17_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 8.gif',
            text: "IL-2 activates Cytotoxic T cells: The cytokine IL-2 released by Helper T cells activates Cytotoxic T cells to prepare them for attacking infected cells.",
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
                { id: 's6', text: 'Helper T activates' },
                { id: 's4', text: 'Helper T releases IL-2' },
                { id: 's5', text: 'Cytotoxic T activates' },
            ],
            correctOrder: ['s1', 's2', 's3', 's6', 's4', 's5'],
            next: 'cm_21',
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
            next: 'cm_21_anim',
        },
        // Animation 9: Cytotoxic T cell Proliferation
        {
            id: 'cm_21_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 9.gif',
            text: "Activated Cytotoxic T cells proliferate and differentiate: They divide rapidly into an army of activated Cytotoxic T cells and memory cells, ready to hunt the pathogen.",
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
            next: 'cm_23_anim',
        },
        // Animation 10: CD8 binding
        {
            id: 'cm_23_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 10.gif',
            text: "Activated Cytotoxic T cell uses CD8 accessory receptor: The CD8 receptor helps bind the Cytotoxic T cell to the Class I MHC of the infected cell.",
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
            next: 'cm_25_anim',
        },
        // Animation 11: Perforin/Granzymes
        {
            id: 'cm_25_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 11.gif',
            text: "Cytotoxic T Cell releases Perforin and Granzymes: These toxic proteins are released directly towards the infected cell.",
            next: 'cm_25_game',
        },
        // Shooting Game: Eliminate infected cells
        {
            id: 'cm_25_game',
            type: 'shooting_game',
            background: 'bloodstream',
            instruction: "Eliminate infected cells (RED) only!",
            next: 'cm_27',
        },
        // Q13: MCQ - Perforin effects (All correct)
        {
            id: 'cm_27',
            type: 'choice',
            isMultiSelect: true,
            background: 'bloodstream',
            speaker: 'doctor',
            text: "How does Perforin help destroy the infected cell? (Select ALL correct statements)",
            choices: [
                { id: 'p1', text: 'Creates pores in the infected cell membrane', correct: true },
                { id: 'p2', text: 'Causes water and ions to enter the cell', correct: true },
                { id: 'p3', text: 'Causes cell lysis or apoptosis', correct: true },
                { id: 'p4', text: 'Triggers cytolysis (bursting of cell)', correct: true },
            ],
            feedback: "Correct! Perforin creates pores that lead to cell destruction.",
            next: 'cm_27_anim',
        },
        // Animation 12: Lysis/Steps
        {
            id: 'cm_27_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 12.gif',
            text: "Perforin creates pores, causing water entry and cell lysis: The infected cell swells and bursts (cytolysis) or self-destructs (apoptosis).",
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

    // Humoral Path scenes - restructured to match cell-mediated flow
    humoralPath: [
        // Statement + Animation: Engulfing
        {
            id: 'hm_0_statement',
            type: 'dialogue',
            background: 'bloodstream',
            speaker: 'narrator',
            text: "When bacteria invade, macrophage, dendritic cells and phagocytes engulf it and degrade it into antigen fragments.",
            next: 'hm_1',
        },
        // Q1: What does macrophage do after engulfing?
        {
            id: 'hm_1',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "After macrophage engulfs the pathogen, what will it do?",
            choices: [
                { id: 'c1', text: 'Degrades the pathogens into antigen fragments', correct: true },
                { id: 'w1', text: 'Secrete IL-2', correct: false },
                { id: 'w2', text: 'Digest itself', correct: false },
                { id: 'w3', text: 'Hide the antigen', correct: false },
            ],
            next: 'hm_1_anim',
        },
        // Animation 2: Degradation
        {
            id: 'hm_1_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 2.gif',
            text: "Macrophage degrades the pathogens into antigen fragments.",
            next: 'hm_2',
        },
        // Q2: Which MHC class? (Fill in the blank)
        {
            id: 'hm_2',
            type: 'fill_blank',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "APCs present antigen fragments on Class ___ MHC molecules.",
            answer: 'II',
            hint: 'A Roman numeral (hint: not I, not III)',
            next: 'hm_2_anim',
        },
        // Animation 3: MHC II Presentation
        {
            id: 'hm_2_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 3.gif',
            text: "APCs present antigen fragments on Class II MHC molecules.",
            next: 'hm_3',
        },
        // Q3: Which cell binds to MHC II?
        {
            id: 'hm_3',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Which cell binds to the class II MHC complex on APCs?",
            choices: [
                { id: 'w1', text: 'B cell', correct: false },
                { id: 'c1', text: 'Helper T cell', correct: true },
                { id: 'w2', text: 'Natural Killer cell', correct: false },
            ],
            next: 'hm_3_anim',
        },
        // Animation 4: Helper T Binding
        {
            id: 'hm_3_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 4.gif',
            text: "Helper T cell binds to the class II MHC complex on APCs.",
            next: 'hm_4',
        },
        // Q4: Which signal does APC release?
        {
            id: 'hm_4',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'macrophage',
            text: "Which signal does the APC release to activate Helper T cells?",
            choices: [
                { id: 'w1', text: 'Interleukin-2 (IL-2)', correct: false },
                { id: 'w2', text: 'Dopamine', correct: false },
                { id: 'w3', text: 'Acetylcholine', correct: false },
                { id: 'c1', text: 'Interleukin-1 (IL-1)', correct: true },
            ],
            next: 'hm_5',
        },
        // Q5: Accessory receptor
        {
            id: 'hm_5',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Which accessory receptor is involved in this binding?",
            choices: [
                { id: 'w1', text: 'CD8', correct: false },
                { id: 'w2', text: 'Interleukin-1', correct: false },
                { id: 'w3', text: 'CD16', correct: false },
                { id: 'c1', text: 'CD4', correct: true },
            ],
            next: 'hm_5_anim',
        },
        // Animation 5: CD4 receptor
        {
            id: 'hm_5_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 5.gif',
            text: "CD4 accessory receptor is involved in this binding.",
            next: 'hm_6',
        },
        // Q6: What happens to activated Helper T?
        {
            id: 'hm_6',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "What happens to the activated Helper T cells?",
            choices: [
                { id: 'c1', text: 'Proliferates and differentiates into clones of activated helper T cell and memory helper T cell', correct: true },
                { id: 'w1', text: 'Proliferates and differentiates into clones of antibodies and memory helper T cell', correct: false },
                { id: 'w2', text: 'Proliferates and differentiates into clones of B cells and memory helper T cell', correct: false },
                { id: 'w3', text: 'Proliferates and differentiates into clones of cytotoxic T cell and memory helper T cell', correct: false },
            ],
            next: 'hm_6_anim',
        },
        // Animation 13: Helper T Proliferation
        {
            id: 'hm_6_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 13.gif',
            text: "Activated Helper T cells proliferate and differentiate into clones of activated helper T cells and memory helper T cells.",
            next: 'hm_7',
        },
        // Q7: Accessory protein for B cell binding
        {
            id: 'hm_7',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'helperT',
            text: "Activated helper T cell binds to antigen-MHC complex on B cell with the help of which accessory protein?",
            choices: [
                { id: 'w1', text: 'CD8', correct: false },
                { id: 'w2', text: 'CD6', correct: false },
                { id: 'c1', text: 'CD4', correct: true },
                { id: 'w3', text: 'CD16', correct: false },
            ],
            next: 'hm_7_anim',
        },
        // Animation 14: B Cell Binding
        {
            id: 'hm_7_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 14.gif',
            text: "Activated helper T cell binds to antigen-MHC complex on B cell with the help of CD4 accessory protein.",
            next: 'hm_8',
        },
        // Q8: Which cytokines released?
        {
            id: 'hm_8',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'helperT',
            text: "The activated helper T cells then release which cytokines?",
            choices: [
                { id: 'w1', text: 'IL-1', correct: false },
                { id: 'c1', text: 'IL-2', correct: true },
                { id: 'w2', text: 'IL-3', correct: false },
                { id: 'w3', text: 'IL-4', correct: false },
            ],
            next: 'hm_8_anim',
        },
        // Animation 15: IL-2 Release
        {
            id: 'hm_8_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 15.gif',
            text: "The activated helper T cells release IL-2 cytokines.",
            next: 'hm_9',
        },
        // Q9: Which cells does IL-2 activate?
        {
            id: 'hm_9',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "In this immune response, IL-2 activates which cells next?",
            choices: [
                { id: 'w1', text: 'Cytotoxic T cells', correct: false },
                { id: 'w2', text: 'RBCs', correct: false },
                { id: 'w3', text: 'Antigen-presenting cells', correct: false },
                { id: 'c1', text: 'B cells', correct: true },
            ],
            next: 'hm_10',
        },
        // Q10: What happens to activated B cells?
        {
            id: 'hm_10',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "What happens to the activated B cells?",
            choices: [
                { id: 'w1', text: 'Proliferates and differentiates into clones of antibodies and memory cytotoxic T cell', correct: false },
                { id: 'c1', text: 'Proliferates and differentiates into plasma cell and memory B cell', correct: true },
                { id: 'w2', text: 'Proliferates and differentiates into clones of B cells and memory cytotoxic T cell', correct: false },
                { id: 'w3', text: 'Proliferates and differentiates into clones of helper T cell and memory helper T cell', correct: false },
            ],
            next: 'hm_10_anim',
        },
        // Animation 16: B Cell Proliferation
        {
            id: 'hm_10_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 16.gif',
            text: "Activated B cells proliferate and differentiate into plasma cells and memory B cells.",
            next: 'hm_10_ordering',
        },
        // Ordering: B cell activation sequence
        {
            id: 'hm_10_ordering',
            type: 'ordering',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Put the B cell activation steps in the correct order:",
            items: [
                { id: 'b1', text: 'Pathogen binds to B cell receptor' },
                { id: 'b2', text: 'B cell presents antigen on MHC II' },
                { id: 'b3', text: 'Helper T binds to B cell with CD4' },
                { id: 'b4', text: 'Helper T releases IL-2' },
                { id: 'b5', text: 'B cell activates and proliferates' },
                { id: 'b6', text: 'Differentiates into plasma and memory B cells' },
            ],
            correctOrder: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
            next: 'hm_11',
        },
        // Q11: What does plasma cell produce?
        {
            id: 'hm_11',
            type: 'choice',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "Plasma cell produces which protein?",
            choices: [
                { id: 'w1', text: 'Antigen', correct: false },
                { id: 'w2', text: 'Pathogens', correct: false },
                { id: 'c1', text: 'Antibodies', correct: true },
                { id: 'w3', text: 'Epitopes', correct: false },
            ],
            next: 'hm_12',
        },
        // Q12: How do antibodies work? (Recruit - choose 3)
        {
            id: 'hm_12',
            type: 'recruit',
            background: 'bloodstream',
            speaker: 'doctor',
            text: "How does the antibody work to protect Ivan? (Choose 3)",
            options: [
                { id: 'neutralization', name: 'Neutralization', correct: true },
                { id: 'opsonization', name: 'Opsonization', correct: true },
                { id: 'complement', name: 'Activation of complement system', correct: true },
                { id: 'detox', name: 'Detoxification', correct: false },
            ],
            correctCount: 3,
            successText: "Correct! Neutralization, Opsonization, and Complement Activation work together to eliminate pathogens!",
            next: 'hm_12_anim',
        },
        // Animation 17: Antibody Action
        {
            id: 'hm_12_anim',
            type: 'gif_animation',
            background: 'bloodstream',
            gifSrc: 'media/animations/animation 17.gif',
            text: "Antibodies work by Neutralization, Opsonization, and Activation of the complement system.",
            next: 'hm_certificate',
        },
        // Certificate
        {
            id: 'hm_certificate',
            type: 'certificate',
            title: 'Humoral Response Specialist',
            description: 'You have mastered the art of antibody-mediated defense!',
        },
    ],

    victory: {
        cellMediated: {
            title: 'Infected Cell Destroyed!',
            description: 'The Cytotoxic T Cells successfully eliminated the infected cells using Perforin and Granzymes.',
        },
        humoral: {
            title: 'Pathogens Eliminated!',
            description: 'The antibodies neutralized, marked, and destroyed the extracellular pathogens.',
        },
    },
};
