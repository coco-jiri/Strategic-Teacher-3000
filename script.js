document.addEventListener('DOMContentLoaded', () => {

    // --- DATA MODEL ---

    let lessonPlan = {
        sidebar: {
            contentGoals: {
                id: 'contentGoals',
                title: 'Obsahové cíle',
                allowAdd: true,
                items: [
                    { id: 'cg1', text: 'Ukládání' },
                    { id: 'cg2', text: 'Práce s klávesnicí' },
                    { id: 'cg3', text: 'Cloudové sdílení' },
                ]
            },
            softSkills: {
                id: 'softSkills',
                title: 'Softskillové cíle',
                allowAdd: false,
                items: [
                    { id: 'ss1', text: 'Schopnost naslouchat' },
                    { id: 'ss2', text: 'Prezentační dovednosti' },
                    { id: 'ss3', text: 'Schopnost řešit problémy' },
                ]
            },
            methods: {
                id: 'methods',
                title: 'Metody',
                allowAdd: true,
                items: [
                    { id: 'm1', text: 'Dokončování příběhů' },
                    { id: 'm2', text: 'Dramatizace' },
                    { id: 'm3', text: 'Insert' },
                ]
            },
            bigQuestions: {
                id: 'bigQuestions',
                title: 'Velké otázky',
                allowAdd: true,
                items: [
                    { id: 'bq1', text: 'Jakým způsobem se dá využít AI k vlastnímu učení?' },
                    { id: 'bq2', text: 'Co znamená, že počítače fungují jen na 1 a 0?' },
                    { id: 'bq3', text: 'Jaké výzvy přináší AI pro lidstvo a pro mě?' },
                ]
            }
        },
        blocks: [],
        config: {
            nextBlockId: 1,
            nextItemId: 1,
            startHue: Math.floor(Math.random() * 360),
            hueStep: 45,
        }
    };

    const softSkillSteps = {
      'Schopnost naslouchat': Array.from({length: 16}, (_, i) => ({ step: i, description: ['Dokážu ostatním chvíli naslouchat.','Dokážu naslouchat dospělým, řídit se jejich pokyny a zopakovat, co jsem slyšel.','Dokážu naslouchat spolužákům a ptát se na to, co jsem slyšel.','Dokážu sledovat rozhovor a zrekapitulovat, čeho se týkal.','Dokážu vysvětlit, že komunikace má různé účely, a umím účel komunikace identifikovat.','Dokážu poslouchat delší projev a umím rozpoznat klíčové informace, které potřebuji.','Dokážu se účastnit skupinové diskuze a odpovídat na otázky.','Dokážu analyzovat, jak mluvčí používá gesta a jazyk k upoutání pozornosti posluchačů.','Umím analyzovat, jak mluvčí mění jazyk za různými účely.','Umím analyzovat tón mluvčího, rozpoznat, na co klade důraz, jaké je jeho společenské postavení a jaký to má vliv na posluchače.','Umím pokládat prohlubující a rozšiřující otázky, abych si ověřil a prohloubil vlastní porozumění.','Dokážu rozeznat a analyzovat odlišné názory různých mluvčích.','Dokážu při poslechu identifikovat nevyjádřená témata, implikace a problémy.','Při poslechu dokážu skrze jazyk, vynechané informace a nejednoznačnost řeči analyzovat zaujatost mluvčího.','Umím analyzovat řečové techniky a přístup mluvčího v různých kontextech.','Dokážu dát mluvčímu zpětnou vazbu o tom, co může zlepšit, aby měl vynikající projev.'][i] })),
      'Prezentační dovednosti': Array.from({length: 16}, (_, i) => ({ step: i, description: ['Dokážu něco srozumitelně sdělit někomu, koho znám.','Dokážu něco srozumitelně sdělit malé skupince lidí, které znám.','Dokážu srozumitelně sdělit své myšlenky skupině lidí.','Když mluvím, řadím své myšlenky tak, aby byly pochopitelné.','Svá sdělení umím uspořádat tak, aby mi posluchači co nejlépe rozuměli.','Při projevu umím využívat formální jazyk, tón a výraz.','Svou řeč umím přizpůsobit účelu prezentace a publiku.','Dokážu svůj projev strukturovat tak, aby byl srozumitelný a zajímavý, a ke svým sdělením uvádím příklady.','Dokážu upravit jazykové prostředky a míru podrobností, aby byl můj projev v daném kontextu co nejzajímavější.','Dokážu upravit strukturu projevu, jazyk a gesta tak, abych zaujal publikum.','Dokážu měnit jazyk, tón a výraz podle automatických i vědomých reakcí svých posluchačů.','Dokážu předvídat různé reakce publika a připravit se na ně.','Aby byl můj projev zajímavější, umím být flexibilní – dokážu např. měnit jeho styl a obsah.','Zabývám se různými prezentačními styly a uvažuji nad jejich efektivitou.','Uvažuji o efektivitě různých prezentačních stylů a umím si vybrat styl, který je pro mě nejvhodnější.','Dokážu pronést efektivní projev, který má osobitý styl a je přizpůsobený situaci, a umím reflektovat, proč byl efektivní.'][i] })),
      'Schopnost řešit problémy': Array.from({length: 16}, (_, i) => ({ step: i, description: ['Dokážu vyřešit problém podle pokynů dospělého.','Dokážu si říct o pomoc, když ji potřebuji.','Dokážu popsat nějaký svůj jednoduchý problém a najít někoho, kdo mi s ním pomůže.','S něčí pomocí si dokážu zjistit informace, které mi pomohou vyřešit jednoduchý problém.','Jednoduchý problém dokážu vyřešit různými způsoby.','Umím posoudit „pro a proti“ různých řešení jednoduchého problému a vybrat to nejlepší.','Umím vysvětlit, čím se liší jednoduchý a složitý problém.','Umím si udělat průzkum, abych lépe porozuměl složitým problémům.','Dokážu zhodnotit příčiny a důsledky složitého problému a zjistit si chybějící informace pomocí průzkumu.','Umím navrhnout několik možných řešení složitého problému a posoudit „pro a proti“ každého z nich.','Umím zhodnotit různá řešení složitého problému a vybrat to nejlepší.','Umím k řešení složitých problémů použít stromový diagram.','Dokážu při řešení složitých problémů použít hypotézy.','Vím, co je to deduktivní a induktivní logika, a umím je použít.','Poznám, které z mých úvah při řešení problému jsou pouze mé domněnky a jaký mohou mít na mé uvažování vliv.','Dokážu ohodnotit, jak efektivní jsou různé mé návrhy řešení složitého problému.'][i] })),
    };

    // --- DOM Elements ---
    const blocksContainer = document.getElementById('lesson-blocks-container');
    const sidebarPanelsContainer = document.getElementById('sidebar-panels');
    const addLessonBlockBtn = document.getElementById('add-lesson-block');
    const deleteZone = document.getElementById('delete-zone');
    const themeSwitcher = document.getElementById('theme-switcher');
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const importFileInput = document.getElementById('import-file-input');

    // --- Templates ---
    const blockTemplate = document.getElementById('lesson-block-template');
    const panelTemplate = document.getElementById('sidebar-panel-template');
    const menuItemTemplate = document.getElementById('menu-item-template');
    const blockItemTemplate = document.getElementById('block-item-template');

    // --- Drag & Drop Variables ---
    let draggedItem = null;
    let draggedItemData = {};

    // --- INITIALIZATION ---
    function init() {
        // Load theme from localStorage or set default
        const savedTheme = localStorage.getItem('theme') || 'light-mode';
        document.body.className = savedTheme;
        themeSwitcher.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Load data from localStorage or use initial data
        const savedPlan = localStorage.getItem('lessonPlan');
        if (savedPlan) {
            try {
                lessonPlan = JSON.parse(savedPlan);
            } catch (e) {
                console.error("Failed to parse saved lesson plan:", e);
                createInitialBlocks(); // Create default blocks if saved data is corrupt
            }
        } else {
            createInitialBlocks(); // Create default blocks on first run
        }

        renderAll();
        addEventListeners();
    }

    function createInitialBlocks() {
        for (let i = 0; i < 7; i++) {
            createNewLessonBlock();
        }
    }

    function renderAll() {
        renderSidebar();
        renderAllBlocks();
        updateSidebarUsage();
    }

    // --- RENDER FUNCTIONS ---

    function renderSidebar() {
        sidebarPanelsContainer.innerHTML = '';
        Object.values(lessonPlan.sidebar).forEach(panelData => {
            const panelEl = panelTemplate.content.cloneNode(true).firstElementChild;
            panelEl.dataset.panelId = panelData.id;
            panelEl.querySelector('.panel-title').textContent = panelData.title;
            const addBtn = panelEl.querySelector('.add-item-btn');
            if (!panelData.allowAdd) {
                addBtn.style.display = 'none';
            } else {
                 addBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    promptAndAddNewSidebarItem(panelData.id);
                });
            }

            const contentEl = panelEl.querySelector('.panel-content');
            contentEl.dataset.type = getSidebarType(panelData.id);
            
            panelData.items.forEach(item => {
                const itemEl = createSidebarItemElement(item);
                contentEl.appendChild(itemEl);
            });
            
            panelEl.querySelector('.panel-header').addEventListener('click', () => {
                panelEl.classList.toggle('panel-collapsed');
                adjustPanelHeights();
            });

            sidebarPanelsContainer.appendChild(panelEl);
        });
        adjustPanelHeights();
    }
    
    function adjustPanelHeights() {
        const panels = Array.from(sidebarPanelsContainer.children);
        const collapsedCount = panels.filter(p => p.classList.contains('panel-collapsed')).length;
        const expandedCount = panels.length - collapsedCount;
        
        panels.forEach(p => {
            if (!p.classList.contains('panel-collapsed')) {
                p.style.flexBasis = expandedCount > 0 ? `${100 / expandedCount}%` : 'auto';
                p.style.flexGrow = '1';
            } else {
                 p.style.flexBasis = 'auto';
                 p.style.flexGrow = '0';
            }
        });
    }

    function renderAllBlocks() {
        blocksContainer.innerHTML = '';
        lessonPlan.blocks.forEach(blockData => {
            const blockEl = createLessonBlockElement(blockData);
            blocksContainer.appendChild(blockEl);
        });
    }
    
    function renderBlock(blockId) {
        const blockData = findBlock(blockId);
        const existingEl = document.querySelector(`.lesson-block[data-block-id="${blockId}"]`);
        if (blockData && existingEl) {
            const newEl = createLessonBlockElement(blockData);
            existingEl.replaceWith(newEl);
        }
    }


    // --- ELEMENT CREATION ---

    function createNewLessonBlock(insertAfterBlockId = null) {
        const newBlock = {
            id: `block${lessonPlan.config.nextBlockId++}`,
            hue: (lessonPlan.config.startHue + (lessonPlan.blocks.length * lessonPlan.config.hueStep)) % 360,
            contentGoals: [],
            softSkillGoals: [],
            methods: [],
            notes: []
        };
        
        if (insertAfterBlockId) {
            const index = lessonPlan.blocks.findIndex(b => b.id === insertAfterBlockId);
            lessonPlan.blocks.splice(index + 1, 0, newBlock);
        } else {
            lessonPlan.blocks.push(newBlock);
        }
        return newBlock;
    }
    
    function createLessonBlockElement(blockData) {
        const blockEl = blockTemplate.content.cloneNode(true).firstElementChild;
        blockEl.dataset.blockId = blockData.id;
        blockEl.style.setProperty('--block-hue', blockData.hue);
        
        const contentTarget = blockEl.querySelector('.goals-content-target');
        contentTarget.dataset.type = 'contentGoals';
        blockData.contentGoals.forEach(item => contentTarget.appendChild(createBlockItemElement(item)));
        
        const softskillTarget = blockEl.querySelector('.goals-softskill-target');
        softskillTarget.dataset.type = 'softSkillGoals';
        blockData.softSkillGoals.forEach(item => softskillTarget.appendChild(createBlockItemElement(item)));

        const methodsTarget = blockEl.querySelector('.methods-column');
        methodsTarget.dataset.type = 'methods';
        blockData.methods.forEach(item => methodsTarget.appendChild(createBlockItemElement(item)));
        
        const notesTarget = blockEl.querySelector('.notes-content');
        blockData.notes.forEach(item => notesTarget.appendChild(createBlockItemElement(item)));

        return blockEl;
    }

    function createSidebarItemElement(itemData) {
        const itemEl = menuItemTemplate.content.cloneNode(true).firstElementChild;
        itemEl.dataset.itemId = itemData.id;
        itemEl.textContent = itemData.text;
        return itemEl;
    }

    function createBlockItemElement(itemData) {
        const itemEl = blockItemTemplate.content.cloneNode(true).firstElementChild;
        itemEl.dataset.itemId = itemData.id;
        if(itemData.sourceId) itemEl.dataset.sourceId = itemData.sourceId;
        itemEl.dataset.type = itemData.type;

        const titleEl = itemEl.querySelector('.item-title');
        titleEl.textContent = itemData.text;

        const subtitleEl = itemEl.querySelector('.item-subtitle');
        if (itemData.type === 'softSkillGoals') {
            if (itemData.selectedStep != null) {
                const skillData = softSkillSteps[itemData.text];
                if (skillData) {
                    const step = skillData.find(s => s.step === itemData.selectedStep);
                    if (step) subtitleEl.innerHTML = `Krok ${itemData.selectedStep}: ${step.description}`;
                }
            } else {
                subtitleEl.innerHTML = `<a href="#" class="select-step-link">Vybrat krok</a>`;
            }
        } else {
            subtitleEl.remove();
        }
        
        const detailsEl = itemEl.querySelector('.item-details');
        if (itemData.details) {
            detailsEl.textContent = itemData.details;
            detailsEl.style.display = 'block';
            detailsEl.classList.add('truncated');
        } else {
            detailsEl.style.display = 'none';
        }

        return itemEl;
    }


    // --- EVENT LISTENERS ---
    
    function addEventListeners() {
        addLessonBlockBtn.addEventListener('click', () => {
            createNewLessonBlock();
            renderAllBlocks();
            saveData();
            blocksContainer.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
        });

        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            themeSwitcher.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
        });
        
        exportBtn.addEventListener('click', exportDataToJSON);
        importBtn.addEventListener('click', () => importFileInput.click());
        importFileInput.addEventListener('change', importDataFromJSON);
        
        document.addEventListener('click', handleActionClicks);
        document.addEventListener('dblclick', handleDoubleClick);

        addDragDropListeners(document.body);
    }
    
    function handleActionClicks(e) {
        // Hide all open menus if clicking outside
        if (!e.target.closest('.menu-btn-dots')) {
            document.querySelectorAll('.menu-content.show').forEach(menu => menu.classList.remove('show'));
        }
        // Untruncate details
        const focusedDetail = document.querySelector('.item-details.focused');
        if (focusedDetail && !focusedDetail.parentElement.contains(e.target)) {
                focusedDetail.classList.add('truncated');
                focusedDetail.classList.remove('focused');
        }

        const target = e.target;
        const itemEl = target.closest('.block-item');
        const blockEl = target.closest('.lesson-block');

        if (target.closest('.menu-btn-dots')) {
            e.preventDefault();
            const menu = target.closest('.menu-btn-dots').nextElementSibling;
            menu.classList.toggle('show');
        }
        else if (target.matches('.delete-block')) {
            e.preventDefault();
            if (confirm(`Opravdu chcete smazat tento výukový blok?`)) {
                lessonPlan.blocks = lessonPlan.blocks.filter(b => b.id !== blockEl.dataset.blockId);
                renderAllBlocks();
                updateSidebarUsage();
                saveData();
            }
        }
        else if (target.matches('.move-block')) {
            e.preventDefault();
            alert('Pro přesun bloku ho uchopte a přetáhněte na požadovanou pozici.');
        }
        else if (target.matches('.block-properties')) {
            e.preventDefault();
            alert('Změna barvy a případně dalších vlastností, zatím neimplementováno.');
        }
        else if (target.matches('.delete-item')) {
            e.preventDefault();
            deleteItemFromBlock(blockEl.dataset.blockId, itemEl.dataset.itemId);
            renderBlock(blockEl.dataset.blockId);
            updateSidebarUsage();
            saveData();
        }
        else if (target.matches('.edit-item')) {
            e.preventDefault();
            makeEditable(itemEl.querySelector('.item-title'), 'text');
        }
        else if (target.matches('.details-item')) {
            e.preventDefault();
            const itemData = findItem(blockEl.dataset.blockId, itemEl.dataset.itemId).item;
            const newDetails = prompt("Zadejte podrobnosti:", itemData.details || "");
            if (newDetails !== null) {
                itemData.details = newDetails;
                renderBlock(blockEl.dataset.blockId);
                saveData();
            }
        }
        else if (target.matches('.select-step-link')) {
            e.preventDefault();
            showStepSelector(itemEl);
        }
        else if (target.matches('.item-details.truncated')) {
            target.classList.remove('truncated');
            target.classList.add('focused');
        }
        else if(target.closest('.add-note-btn')) {
            e.preventDefault();
            const blockData = findBlock(blockEl.dataset.blockId);
            blockData.notes.push({
                id: `item${lessonPlan.config.nextItemId++}`,
                type: 'notes', text: 'Nová poznámka...', details: '',
            });
            renderBlock(blockEl.dataset.blockId);
            saveData();
        }
    }

    function handleDoubleClick(e) {
        if(e.target.matches('.item-title')) makeEditable(e.target, 'text');
        else if(e.target.matches('.item-details')) makeEditable(e.target, 'textarea');
    }

    // --- APPLICATION LOGIC ---
    
    function promptAndAddNewSidebarItem(panelId) {
        const text = prompt(`Zadejte název nové položky:`);
        if (text && text.trim() !== '') {
            const panelData = lessonPlan.sidebar[panelId];
            const prefix = panelId.substring(0, 2);
            const newItem = { id: `${prefix}${Date.now()}`, text: text.trim() };
            panelData.items.push(newItem);
            
            const contentEl = document.querySelector(`.menu-panel[data-panel-id="${panelId}"] .panel-content`);
            const newItemEl = createSidebarItemElement(newItem);
            contentEl.appendChild(newItemEl);
            saveData();
            newItemEl.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
    }
    
    function makeEditable(element, type) {
        const originalText = element.textContent;
        const input = document.createElement(type === 'textarea' ? 'textarea' : 'input');
        input.type = 'text';
        input.value = originalText;
        input.className = 'editable-input';
        
        element.style.display = 'none';
        element.parentNode.insertBefore(input, element.nextSibling);
        input.focus();
        input.select();

        const saveChanges = () => {
            const newText = input.value.trim();
            input.remove();
            element.style.display = '';

            const itemEl = element.closest('.block-item');
            if (!itemEl) return;

            const { item, blockId } = findItemByElement(itemEl);
            
            if (element.matches('.item-title')) {
                if (newText && newText !== item.text) {
                    item.text = newText;
                    if (item.sourceId) { // If text is changed, it's no longer linked to sidebar
                        item.sourceId = null;
                    }
                }
            } else if (element.matches('.item-details')) {
                item.details = newText;
            }
            
            renderBlock(blockId);
            updateSidebarUsage();
            saveData();
        };

        input.addEventListener('blur', saveChanges);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && type !== 'textarea') input.blur();
            else if (e.key === 'Escape') {
                input.remove();
                element.style.display = '';
            }
        });
    }
    
    function showStepSelector(itemEl) {
        const { item, blockId } = findItemByElement(itemEl);
        const steps = softSkillSteps[item.text];
        if (!steps) return;
        
        const subtitleEl = itemEl.querySelector('.item-subtitle');
        const originalHTML = subtitleEl.innerHTML;
        
        const select = document.createElement('select');
        select.innerHTML = `<option value="">-- Vyberte krok --</option>` +
            steps.map(s => `<option value="${s.step}" ${item.selectedStep === s.step ? 'selected' : ''}>Krok ${s.step}: ${s.description.substring(0, 50)}...</option>`).join('');
            
        subtitleEl.innerHTML = '';
        subtitleEl.appendChild(select);
        select.focus();
        
        const saveSelection = () => {
            const selectedStep = select.value === "" ? null : parseInt(select.value, 10);
            if (item.selectedStep !== selectedStep) {
                item.selectedStep = selectedStep;
                renderBlock(blockId);
                saveData();
            } else {
                 renderBlock(blockId); // Rerender to restore original view if nothing changed
            }
        };
        
        select.addEventListener('change', saveSelection);
        select.addEventListener('blur', saveSelection);
    }

    function updateSidebarUsage() {
        const usedIds = new Set(
            lessonPlan.blocks.flatMap(b => 
                [...b.contentGoals, ...b.softSkillGoals, ...b.methods, ...b.notes]
                    .map(item => item.sourceId)
                    .filter(Boolean)
            )
        );
        document.querySelectorAll('.menu-item').forEach(itemEl => {
            itemEl.classList.toggle('used', usedIds.has(itemEl.dataset.itemId));
        });
    }

    // --- DRAG & DROP LOGIC ---

    function addDragDropListeners(container) {
        container.addEventListener('dragstart', e => {
            if (!e.target.draggable) return;
            draggedItem = e.target;
            
            setTimeout(() => draggedItem.classList.add('dragging'), 0);
            deleteZone.classList.add('visible');

            if (draggedItem.matches('.menu-item')) {
                const panelId = draggedItem.closest('.menu-panel').dataset.panelId;
                const itemId = draggedItem.dataset.itemId;
                const itemData = lessonPlan.sidebar[panelId].items.find(i => i.id === itemId);
                const dataType = getSidebarType(panelId);
                draggedItemData = { origin: 'sidebar', type: dataType, sourceId: itemData.id, text: itemData.text };
            } else if (draggedItem.matches('.block-item')) {
                const { item, blockId } = findItemByElement(draggedItem);
                draggedItemData = { origin: 'block', blockId, itemId: item.id, type: item.type };
            } else if(draggedItem.matches('.lesson-block')) {
                 draggedItemData = { origin: 'block-reorder', blockId: draggedItem.dataset.blockId };
            }
        });

        container.addEventListener('dragend', e => {
            if (draggedItem) draggedItem.classList.remove('dragging');
            draggedItem = null;
            draggedItemData = {};
            deleteZone.classList.remove('visible');
            document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        });

        container.addEventListener('dragover', e => {
            e.preventDefault();
            const target = getDropTarget(e.target);
            if (target && isDropAllowed(target)) {
                document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
                target.classList.add('drag-over');
            }
        });

        container.addEventListener('dragleave', e => {
            e.target.closest('.drag-over')?.classList.remove('drag-over');
        });

        container.addEventListener('drop', e => {
            e.preventDefault();
            const target = getDropTarget(e.target);
            if(!target || !draggedItem || !isDropAllowed(target)) {
                document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
                return;
            }
            target.classList.remove('drag-over');
            
            if (target.id === 'delete-zone') handleDropOnDelete();
            else if (target.matches('.lesson-block')) handleDropOnBlockReorder(target);
            else if (target.matches('.panel-content')) handleDropOnSidebar(target, e);
            else if (target.matches('.drop-zone')) handleDropOnBlockColumn(target);
            else if (target.matches('.block-item')) handleDropOnBlockItem(target);

            saveData();
        });
    }

    function getDropTarget(element) {
        if (draggedItemData.origin === 'block-reorder') {
            return element.closest('.lesson-block');
        }
        if (element.closest('#delete-zone')) return document.getElementById('delete-zone');

        return element.closest('.block-item, .drop-zone, .panel-content');
    }
    
    function isDropAllowed(target) {
        if (!draggedItemData.type) return true; // for block reordering

        const targetType = target.dataset.type;
        const sourceType = draggedItemData.type;

        if (target.matches('.panel-content')) {
            return sourceType === targetType;
        }

        if (target.matches('.drop-zone')) {
            if (draggedItemData.origin === 'sidebar') {
                return sourceType === targetType || (sourceType === 'bigQuestions' && targetType === 'notes');
            }
            if (draggedItemData.origin === 'block') {
                return sourceType === targetType || 
                       (sourceType === 'contentGoals' && targetType === 'softSkillGoals') ||
                       (sourceType === 'softSkillGoals' && targetType === 'contentGoals');
            }
        }
        
        if (target.matches('.block-item')) {
            const targetParentType = target.parentElement.closest('.drop-zone')?.dataset.type;
            return isDropAllowed(target.parentElement.closest('.drop-zone'));
        }

        return true; // Default allow for delete zone, etc.
    }

    function handleDropOnDelete() {
        if (draggedItemData.origin === 'block') {
            if (confirm('Opravdu chcete smazat tuto položku?')) {
                deleteItemFromBlock(draggedItemData.blockId, draggedItemData.itemId);
                renderBlock(draggedItemData.blockId);
                updateSidebarUsage();
            }
        } else {
            alert('Položky z nabídky nelze smazat přetažením sem.');
        }
    }
    
    function handleDropOnBlockReorder(targetBlockEl) {
        const sourceBlockId = draggedItemData.blockId;
        const targetBlockId = targetBlockEl.dataset.blockId;
        if (sourceBlockId === targetBlockId) return;

        const sourceIndex = lessonPlan.blocks.findIndex(b => b.id === sourceBlockId);
        let targetIndex = lessonPlan.blocks.findIndex(b => b.id === targetBlockId);
        
        if (sourceIndex > -1 && targetIndex > -1) {
            const [movedBlock] = lessonPlan.blocks.splice(sourceIndex, 1);
            if (sourceIndex < targetIndex) targetIndex--; // adjust index if moving down
            lessonPlan.blocks.splice(targetIndex, 0, movedBlock);
            renderAllBlocks();
        }
    }

    function handleDropOnSidebar(targetPanelContent, event) {
        if (draggedItemData.origin !== 'sidebar') return;

        const sourcePanelId = draggedItem.closest('.menu-panel').dataset.panelId;
        const targetPanelId = targetPanelContent.closest('.menu-panel').dataset.panelId;
        if(sourcePanelId !== targetPanelId) return;

        const items = lessonPlan.sidebar[sourcePanelId].items;
        const sourceIndex = items.findIndex(i => i.id === draggedItemData.sourceId);
        const [movedItem] = items.splice(sourceIndex, 1);
        
        const dropOnItem = document.elementFromPoint(event.clientX, event.clientY).closest('.menu-item');
        if(dropOnItem && dropOnItem.closest('.panel-content') === targetPanelContent) {
            const targetIndex = items.findIndex(i => i.id === dropOnItem.dataset.itemId);
            items.splice(targetIndex, 0, movedItem);
        } else {
            items.push(movedItem);
        }
        renderSidebar();
    }

    function handleDropOnBlockColumn(target) {
        const targetBlockId = target.closest('.lesson-block').dataset.blockId;
        const targetType = target.dataset.type;
        const targetBlock = findBlock(targetBlockId);

        if (draggedItemData.origin === 'sidebar') {
            const newItemType = (draggedItemData.type === 'bigQuestions') ? 'notes' : draggedItemData.type;
            const destinationArray = targetBlock[newItemType];
            destinationArray.push({
                id: `item${lessonPlan.config.nextItemId++}`,
                sourceId: draggedItemData.sourceId,
                text: draggedItemData.text,
                type: newItemType,
                details: '', selectedStep: null
            });
        } else if (draggedItemData.origin === 'block') {
            const { item, collection, index } = findItem(draggedItemData.blockId, draggedItemData.itemId);
            collection.splice(index, 1); // Remove from old location
            item.type = targetType; // Update type for goal swapping
            targetBlock[targetType].push(item); // Add to new location
            
            if (draggedItemData.blockId !== targetBlockId) {
                renderBlock(draggedItemData.blockId); // Re-render source block if different
            }
        }
        
        renderBlock(targetBlockId);
        updateSidebarUsage();
    }
    
    function handleDropOnBlockItem(targetItemEl) {
        const { collection: sourceCollection, index: sourceIndex, blockId: sourceBlockId } = findItemByElement(draggedItem);
        const { item: targetItem, collection: targetCollection, index: targetIndex, blockId: targetBlockId } = findItemByElement(targetItemEl);

        // If dropping on an item in a different block or different column type
        if (sourceBlockId !== targetBlockId || sourceCollection !== targetCollection) {
            handleDropOnBlockColumn(targetItemEl.parentElement);
            return;
        }

        // Reordering within the same list
        const [movedItem] = sourceCollection.splice(sourceIndex, 1);
        sourceCollection.splice(targetIndex, 0, movedItem);
        renderBlock(sourceBlockId);
    }


    // --- DATA HELPERS ---
    
    function findBlock(blockId) {
        return lessonPlan.blocks.find(b => b.id === blockId);
    }
    
    function findItem(blockId, itemId) {
        const block = findBlock(blockId);
        if (!block) return { item: null, collection: null, index: -1, type: null };
        for (const type of ['contentGoals', 'softSkillGoals', 'methods', 'notes']) {
            const collection = block[type];
            const index = collection.findIndex(i => i.id === itemId);
            if (index > -1) {
                return { item: collection[index], collection, index, type };
            }
        }
        return { item: null, collection: null, index: -1, type: null };
    }
    
    function findItemByElement(itemEl) {
        const blockId = itemEl.closest('.lesson-block').dataset.blockId;
        const itemId = itemEl.dataset.itemId;
        return { ...findItem(blockId, itemId), blockId };
    }

    function deleteItemFromBlock(blockId, itemId) {
        const { collection, index } = findItem(blockId, itemId);
        if (collection && index > -1) collection.splice(index, 1);
    }

    function getSidebarType(panelId) {
        switch(panelId) {
            case 'softSkills': return 'softSkillGoals';
            case 'bigQuestions': return 'bigQuestions';
            default: return panelId;
        }
    }

    // --- DATA PERSISTENCE & IMPORT/EXPORT ---

    function saveData() {
        try {
            localStorage.setItem('lessonPlan', JSON.stringify(lessonPlan));
        } catch (e) {
            console.error("Failed to save data to localStorage:", e);
            alert("Nepodařilo se uložit data. Možná je úložiště plné.");
        }
    }

    function loadPlanData(newData) {
        // Basic validation
        if (newData && newData.sidebar && newData.blocks && newData.config) {
            lessonPlan = newData;
            renderAll();
            saveData();
            alert("Data byla úspěšně naimportována.");
        } else {
            alert("Chyba: Soubor pro import má neplatný formát.");
        }
    }

    function exportDataToJSON() {
        const dataStr = JSON.stringify(lessonPlan, null, 2);
        const dataBlob = new Blob([dataStr], {type: "application/json"});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vyukovy-plan-${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function importDataFromJSON(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                loadPlanData(importedData);
            } catch (error) {
                console.error("Error parsing JSON file:", error);
                alert("Při zpracování souboru došlo k chybě. Ujistěte se, že se jedná o platný JSON soubor.");
            }
        };
        reader.onerror = () => {
             alert("Nepodařilo se přečíst soubor.");
        };
        reader.readAsText(file);
        // Reset file input to allow importing the same file again
        event.target.value = '';
    }
    
    init();
});
