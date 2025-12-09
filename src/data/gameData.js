// Game data extracted from the CSV storyline

export const gameData = {
    // Story intro slides
    intro: [
        {
            id: 'intro1',
            icon: '🏝️',
            topic: 'Story',
            title: 'Vacation Time!',
            content: "Ivan goes on vacation in Thailand. He enjoys the trip and the food there too much!"
        },
        {
            id: 'intro2',
            icon: '🤢',
            topic: 'Uh Oh',
            title: 'Food Poisoning!',
            content: "Ivan got food poisoning from raw meats or street foods that had flies. His stomach hurts badly."
        },
        {
            id: 'intro3',
            icon: '👨‍⚕️',
            topic: 'Help',
            title: 'Doctor Visit',
            content: "Ivan goes to the doctor and undergoes a series of tests."
        },
        {
            id: 'intro4',
            icon: '🔬',
            topic: 'Diagnosis',
            title: 'Third Line Defense',
            content: "The doctor explains about the adaptive immune system - the third line of defense. Ivan has nothing to worry about!"
        }
    ],

    // Pathway options
    pathways: [
        {
            id: 'cell_mediated',
            icon: '🛡️',
            title: 'Cell-Mediated',
            description: 'Fight infected cells with Cytotoxic T Cells',
            color: 'bg-red'
        },
        {
            id: 'humoral',
            icon: '💉',
            title: 'Humoral',
            description: 'Attack extracellular pathogens with Antibodies',
            color: 'bg-blue'
        }
    ],

    // Cell-Mediated pathway questions and games
    cellMediatedPath: [
        {
            type: 'multiSelect',
            question: "When bacteria invade, which cells can be Antigen-Presenting Cells (APCs)?",
            options: [
                { id: 'a', text: 'Macrophage', correct: true },
                { id: 'b', text: 'Dendritic Cell', correct: true },
                { id: 'c', text: 'Phagocyte', correct: true },
                { id: 'd', text: 'Pathogen', correct: false },
            ],
            correctCount: 3,
        },
        {
            type: 'singleChoice',
            question: "After macrophage engulfs the pathogen, what will it do?",
            options: [
                { id: 'a', text: 'Degrades the pathogens into antigen fragments', correct: true },
                { id: 'b', text: 'Secrete IL-2', correct: false },
                { id: 'c', text: 'Digest itself', correct: false },
                { id: 'd', text: 'Hide the antigen', correct: false },
            ],
            feedback: "Correct! The macrophage breaks down the pathogen into antigen fragments to present them."
        },
        {
            type: 'singleChoice',
            question: "The antigen fragments bind to class II MHC, forming what?",
            options: [
                { id: 'a', text: 'MHC-antigen complex', correct: true },
                { id: 'b', text: 'Hormone-receptor complex', correct: false },
                { id: 'c', text: 'Enzyme-substrate complex', correct: false },
                { id: 'd', text: 'Membrane attack complex', correct: false },
            ],
            feedback: "The MHC-antigen complex is displayed on the cell surface for T cells to recognize."
        },
        {
            type: 'singleChoice',
            question: "Which cell binds to the class II MHC complex on APCs?",
            options: [
                { id: 'a', text: 'Helper T cell', correct: true },
                { id: 'b', text: 'B cell', correct: false },
                { id: 'c', text: 'Natural Killer cell', correct: false },
            ],
            feedback: "Helper T cells recognize and bind to the MHC II complex using their TCR."
        },
        {
            type: 'singleChoice',
            question: "Which signal does the APC release to activate Helper T cells?",
            options: [
                { id: 'a', text: 'Interleukin-1 (IL-1)', correct: true },
                { id: 'b', text: 'Interleukin-2 (IL-2)', correct: false },
                { id: 'c', text: 'Dopamine', correct: false },
                { id: 'd', text: 'Acetylcholine', correct: false },
            ],
            feedback: "IL-1 is released by APCs to help activate Helper T cells."
        },
        {
            type: 'singleChoice',
            question: "Which accessory receptor is involved in Helper T cell binding?",
            options: [
                { id: 'a', text: 'CD4', correct: true },
                { id: 'b', text: 'CD8', correct: false },
                { id: 'c', text: 'Interleukin-1', correct: false },
                { id: 'd', text: 'CD16', correct: false },
            ],
            feedback: "CD4 is the accessory receptor on Helper T cells that binds to MHC II."
        },
        {
            type: 'singleChoice',
            question: "What do activated Helper T cells release next?",
            options: [
                { id: 'a', text: 'IL-2', correct: true },
                { id: 'b', text: 'IL-1', correct: false },
                { id: 'c', text: 'IL-3', correct: false },
                { id: 'd', text: 'IL-4', correct: false },
            ],
            feedback: "Activated Helper T cells release IL-2 to activate other immune cells."
        },
        {
            type: 'singleChoice',
            question: "IL-2 activates which cells?",
            options: [
                { id: 'a', text: 'Cytotoxic T cells', correct: true },
                { id: 'b', text: 'B cells', correct: false },
                { id: 'c', text: 'RBCs', correct: false },
                { id: 'd', text: 'Antigen presenting cells', correct: false },
            ],
            feedback: "IL-2 activates Cytotoxic T cells to hunt down infected cells."
        },
        {
            type: 'singleChoice',
            question: "Which accessory receptor helps Cytotoxic T cells bind to infected cells?",
            options: [
                { id: 'a', text: 'CD8', correct: true },
                { id: 'b', text: 'CD4', correct: false },
                { id: 'c', text: 'CD6', correct: false },
                { id: 'd', text: 'CD14', correct: false },
            ],
            feedback: "CD8 on Cytotoxic T cells binds to MHC I on infected cells."
        },
        {
            type: 'singleChoice',
            question: "What substances do Cytotoxic T cells release to kill infected cells?",
            options: [
                { id: 'a', text: 'Perforin and Granzymes', correct: true },
                { id: 'b', text: 'Interleukin-1', correct: false },
                { id: 'c', text: 'Antibodies', correct: false },
                { id: 'd', text: 'Histamine', correct: false },
            ],
            feedback: "Perforin creates pores, Granzymes enter and trigger apoptosis!"
        },
        {
            type: 'attackGame',
        },
    ],

    // Humoral pathway questions and games
    humoralPath: [
        {
            type: 'singleChoice',
            question: "After macrophage engulfs the pathogen, what will it do?",
            options: [
                { id: 'a', text: 'Degrades the pathogens into antigen fragments', correct: true },
                { id: 'b', text: 'Secrete IL-2', correct: false },
                { id: 'c', text: 'Digest itself', correct: false },
                { id: 'd', text: 'Hide the antigen', correct: false },
            ],
            feedback: "Correct! The macrophage breaks down the pathogen into antigen fragments."
        },
        {
            type: 'singleChoice',
            question: "Which MHC does the APC use to present antigen fragments on its surface?",
            options: [
                { id: 'a', text: 'Class II MHC', correct: true },
                { id: 'b', text: 'Class I MHC', correct: false },
                { id: 'c', text: 'Class III MHC', correct: false },
                { id: 'd', text: 'Class IV MHC', correct: false },
            ],
            feedback: "APCs use Class II MHC to present antigens to Helper T cells."
        },
        {
            type: 'singleChoice',
            question: "Which cell binds to the class II MHC complex on APCs?",
            options: [
                { id: 'a', text: 'Helper T cell', correct: true },
                { id: 'b', text: 'B cell', correct: false },
                { id: 'c', text: 'Natural Killer cell', correct: false },
            ],
            feedback: "Helper T cells recognize the MHC II complex to get activated."
        },
        {
            type: 'singleChoice',
            question: "Which signal does the APC release to activate Helper T cells?",
            options: [
                { id: 'a', text: 'Interleukin-1 (IL-1)', correct: true },
                { id: 'b', text: 'Interleukin-2 (IL-2)', correct: false },
                { id: 'c', text: 'Dopamine', correct: false },
                { id: 'd', text: 'Acetylcholine', correct: false },
            ],
            feedback: "IL-1 helps activate Helper T cells."
        },
        {
            type: 'singleChoice',
            question: "Activated Helper T cells bind to B cells with which accessory protein?",
            options: [
                { id: 'a', text: 'CD4', correct: true },
                { id: 'b', text: 'CD8', correct: false },
                { id: 'c', text: 'CD6', correct: false },
                { id: 'd', text: 'CD16', correct: false },
            ],
            feedback: "CD4 helps Helper T cells interact with B cells."
        },
        {
            type: 'singleChoice',
            question: "Which cytokines do activated Helper T cells release?",
            options: [
                { id: 'a', text: 'IL-2', correct: true },
                { id: 'b', text: 'IL-1', correct: false },
                { id: 'c', text: 'IL-3', correct: false },
                { id: 'd', text: 'IL-4', correct: false },
            ],
            feedback: "IL-2 activates B cells to proliferate."
        },
        {
            type: 'singleChoice',
            question: "What do activated B cells become?",
            options: [
                { id: 'a', text: 'Plasma cells and Memory B cells', correct: true },
                { id: 'b', text: 'Antibodies and Memory T cells', correct: false },
                { id: 'c', text: 'Cytotoxic T cells', correct: false },
                { id: 'd', text: 'Helper T cells', correct: false },
            ],
            feedback: "B cells differentiate into Plasma cells (make antibodies) and Memory B cells."
        },
        {
            type: 'singleChoice',
            question: "What protein do Plasma cells produce?",
            options: [
                { id: 'a', text: 'Antibodies', correct: true },
                { id: 'b', text: 'Antigens', correct: false },
                { id: 'c', text: 'Pathogens', correct: false },
                { id: 'd', text: 'Epitopes', correct: false },
            ],
            feedback: "Plasma cells are antibody factories!"
        },
        {
            type: 'multiSelect',
            question: "How do antibodies protect Ivan? (Select 3)",
            options: [
                { id: 'a', text: 'Neutralization', correct: true },
                { id: 'b', text: 'Opsonization', correct: true },
                { id: 'c', text: 'Activation of complement system', correct: true },
                { id: 'd', text: 'Detoxification', correct: false },
            ],
            correctCount: 3,
        },
        {
            type: 'antibodyGame',
        },
    ],

    // Sequence game data
    cellMediatedSequence: [
        { id: 's1', text: 'Pathogen enters the body', order: 1 },
        { id: 's2', text: 'Macrophage engulfs pathogen', order: 2 },
        { id: 's3', text: 'Antigen presented on MHC II', order: 3 },
        { id: 's4', text: 'Helper T cell binds to MHC II', order: 4 },
        { id: 's5', text: 'IL-2 activates Cytotoxic T cells', order: 5 },
        { id: 's6', text: 'Cytotoxic T releases Perforin', order: 6 },
        { id: 's7', text: 'Infected cell undergoes lysis', order: 7 },
    ],

    humoralSequence: [
        { id: 'h1', text: 'Pathogen enters the body', order: 1 },
        { id: 'h2', text: 'Macrophage presents antigen on MHC II', order: 2 },
        { id: 'h3', text: 'Helper T cell gets activated', order: 3 },
        { id: 'h4', text: 'Helper T activates B cells', order: 4 },
        { id: 'h5', text: 'B cells become Plasma cells', order: 5 },
        { id: 'h6', text: 'Plasma cells produce Antibodies', order: 6 },
        { id: 'h7', text: 'Antibodies neutralize pathogens', order: 7 },
    ],

    // Label game data
    helperTCellLabels: {
        labels: [
            { id: 'l1', text: 'CD4', correctZone: 'z1' },
            { id: 'l2', text: 'TCR', correctZone: 'z2' },
            { id: 'l3', text: 'MHC II', correctZone: 'z3' },
        ],
        zones: [
            { id: 'z1', name: 'Receptor 1', position: { top: '20%', left: '10%' } },
            { id: 'z2', name: 'Receptor 2', position: { top: '50%', left: '10%' } },
            { id: 'z3', name: 'APC Surface', position: { top: '70%', left: '60%' } },
        ],
    },
};
