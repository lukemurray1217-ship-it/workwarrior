const DEFAULT_PROMPT = `You are a wellness and ergonomics expert. Based on the user's report of how they feel, recommend 2-3 specific exercises from the following list.

Available Exercises:
${JSON.stringify(EXERCISES)}

Response Format:
1. A brief, encouraging message explaining why these were chosen.
2. A JSON-like list of the exercise IDs being recommended in a separate block.

Example:
"Since your lower back is tight, I recommend these stretches to loosen up your spine."
RECOMMENDED_IDS: ["seated-twist", "standing-stretch"]

Only recommend IDs that exist in the provided list. Be helpful and professional.`;

class WellnessApp {
    constructor() {
        this.apiKey = localStorage.getItem('gemini_api_key') || '';
        this.model = localStorage.getItem('gemini_model') || 'gemini-1.5-flash';
        this.systemPrompt = localStorage.getItem('system_prompt') || DEFAULT_PROMPT;

        this.initElements();
        this.initEventListeners();
        this.loadSettings();
    }

    initElements() {
        this.feelingInput = document.getElementById('feeling-input');
        this.getBtn = document.getElementById('get-recommendation');
        this.resultSection = document.getElementById('result-section');
        this.geminiResponse = document.getElementById('gemini-response');
        this.exerciseList = document.getElementById('exercise-list');
        this.settingsToggle = document.getElementById('settings-toggle');
        this.settingsPanel = document.getElementById('settings-panel');
        this.closeSettings = document.getElementById('close-settings');
        this.saveSettingsBtn = document.getElementById('save-settings');
        this.apiKeyInput = document.getElementById('api-key');
        this.modelInput = document.getElementById('gemini-model');
        this.systemPromptInput = document.getElementById('system-prompt');
        this.loadingOverlay = document.getElementById('loading-overlay');
        this.checkModelsBtn = document.getElementById('check-models');
        this.modelDebug = document.getElementById('model-list-debug');
    }

    initEventListeners() {
        this.getBtn.addEventListener('click', () => this.handleGeminiRequest());
        this.settingsToggle.addEventListener('click', () => this.toggleSettings(true));
        this.closeSettings.addEventListener('click', () => this.toggleSettings(false));
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        this.checkModelsBtn.addEventListener('click', () => this.fetchModels());
    }

    loadSettings() {
        this.apiKeyInput.value = this.apiKey;
        this.modelInput.value = this.model;
        this.systemPromptInput.value = this.systemPrompt;
    }

    toggleSettings(show) {
        if (show) {
            this.settingsPanel.classList.remove('hidden');
        } else {
            this.settingsPanel.classList.add('hidden');
        }
    }

    saveSettings() {
        this.apiKey = this.apiKeyInput.value.trim();
        this.model = this.modelInput.value;
        this.systemPrompt = this.systemPromptInput.value.trim();

        localStorage.setItem('gemini_api_key', this.apiKey);
        localStorage.setItem('gemini_model', this.model);
        localStorage.setItem('system_prompt', this.systemPrompt);

        alert('Configuration saved!');
        this.toggleSettings(false);
    }

    async handleGeminiRequest() {
        const feeling = this.feelingInput.value.trim();
        if (!feeling) {
            alert('Please tell me how you are feeling first.');
            return;
        }

        if (!this.apiKey) {
            alert('Please set your Gemini API key in settings.');
            this.toggleSettings(true);
            return;
        }

        this.setLoading(true);

        try {
            const response = await this.callGemini(feeling);
            this.renderResult(response);
        } catch (error) {
            console.error(error);
            let errorMsg = error.message;
            if (errorMsg.includes('not found') || errorMsg.includes('supported')) {
                errorMsg += '\n\nTIP: Your API key might not have access to this specific model name. Try clicking the "Check Available Models" button in Settings to find models your key supports.';
            }
            alert('Failed to get recommendation: ' + errorMsg);
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.loadingOverlay.classList.remove('hidden');
        } else {
            this.loadingOverlay.classList.add('hidden');
        }
    }

    async callGemini(feeling) {
        // Log outgoing request for debugging
        console.log(`Calling Gemini with model: ${this.model} using v1beta`);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${this.systemPrompt}\n\nUser Input: "${feeling}"`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                const err = await response.json();
                console.error('Gemini Error Response:', err);
                throw new Error(err.error?.message || 'Gemini API Error');
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Fecth Error:', error);
            throw error;
        }
    }

    async fetchModels() {
        if (!this.apiKeyInput.value.trim()) {
            alert('Please enter an API key first.');
            return;
        }

        this.modelDebug.innerText = 'Fetching models...';
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKeyInput.value.trim()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch models: ' + response.statusText);
            const data = await response.json();

            if (!data.models) throw new Error('No models found for this API key. Ensure the Gemini API is enabled in your Google AI Studio project.');

            const models = data.models
                .map(m => m.name.replace('models/', ''))
                .filter(name => name.includes('gemini') && name.includes('1.5'));

            if (models.length === 0) {
                this.modelDebug.innerHTML = '<span style="color:#ef4444">No Gemini 1.5 models found. Check your API key permissions.</span>';
                return;
            }

            // Clear and repopulate dropdown
            this.modelInput.innerHTML = '';
            models.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.innerText = m;
                this.modelInput.appendChild(opt);
            });

            this.modelDebug.innerHTML = `<span style="color:#22c55e">✓ Successfully found ${models.length} models.</span><br>The dropdown has been updated with your available models. Select one and click Save.`;
            this.modelInput.value = models[0];
            console.log('Available Models:', models);
        } catch (error) {
            this.modelDebug.innerHTML = `<div style="color:#ef4444; font-size: 0.9rem;">
                <strong>Error:</strong> ${error.message}<br><br>
                1. Verify your key at <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color:var(--primary)">AI Studio</a><br>
                2. Ensure "Generative Language API" is enabled.<br>
                3. Your region might not support specific models.
            </div>`;
            console.error(error);
        }
    }

    renderResult(text) {
        this.resultSection.classList.remove('hidden');

        // Parse IDs from response
        const idMatch = text.match(/RECOMMENDED_IDS: \[(.*?)\]/);
        let recommendedIds = [];
        let displayMsg = text;

        if (idMatch) {
            recommendedIds = idMatch[1].split(',').map(id => id.trim().replace(/['"]/g, ''));
            displayMsg = text.split('RECOMMENDED_IDS:')[0].trim();
        }

        this.geminiResponse.innerHTML = `<p>${displayMsg.replace(/\n/g, '<br>')}</p>`;

        // Render cards
        this.exerciseList.innerHTML = '';
        const selectedExercises = EXERCISES.filter(ex => recommendedIds.includes(ex.id));

        if (selectedExercises.length === 0) {
            this.exerciseList.innerHTML = '<p class="hint">No specific exercises found. Try adjusting your request!</p>';
        }

        selectedExercises.forEach(ex => {
            const card = document.createElement('div');
            card.className = 'exercise-card';
            card.innerHTML = `
                <div class="card-icon">${ex.icon}</div>
                <h3>${ex.title}</h3>
                <span class="category-tag">${ex.category}</span>
                <p>${ex.description}</p>
                <div class="benefit">
                    <strong>Benefit:</strong> ${ex.benefit}
                </div>
            `;
            this.exerciseList.appendChild(card);
        });

        // Scroll to results
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new WellnessApp();
});
