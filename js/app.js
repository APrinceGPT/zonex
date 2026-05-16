// Main application logic for Zonex timezone converter
class ZonexApp {
    constructor() {
        this.settings = {
            defaultTimezone: 'Asia/Manila',
            defaultFormat: '12',
            showDstInfo: true,
            autoUpdate: true,
            worldClocks: ['America/New_York', 'Europe/London', 'Asia/Tokyo'],
            meetingPlannerEnabled: true
        };
        
        this.is24HourFormat = false;
        this.currentTimeInterval = null;
        
        this.init();
    }
    
    async init() {
        await this.loadSettings();
        this.initializeElements();
        this.populateTimezones();
        this.bindEvents();
        this.updateCurrentTime();
        this.updateQuickConversions();
        
        if (this.settings.autoUpdate) {
            this.startAutoUpdate();
        }
    }
    
    initializeElements() {
        // Main elements
        this.currentTimezoneEl = document.getElementById('currentTimezone');
        this.currentTimeEl = document.getElementById('currentTime');
        this.timeInputEl = document.getElementById('timeInput');
        this.fromTimezoneEl = document.getElementById('fromTimezone');
        this.toTimezoneEl = document.getElementById('toTimezone');
        this.convertBtn = document.getElementById('convertBtn');
        this.resultSection = document.getElementById('resultSection');
        
        // Result elements
        this.originalTimeEl = document.getElementById('originalTime');
        this.originalTimezoneEl = document.getElementById('originalTimezone');
        this.convertedTimeEl = document.getElementById('convertedTime');
        this.convertedTimezoneEl = document.getElementById('convertedTimezone');
        this.dstInfoEl = document.getElementById('dstInfo');
        this.dateInfoEl = document.getElementById('dateInfo');
        
        // Format toggle
        this.formatBtns = document.querySelectorAll('.format-btn');
        
        // Settings modal
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeModalBtn = document.getElementById('closeModal');
        this.saveSettingsBtn = document.getElementById('saveSettings');
        this.defaultTimezoneSelect = document.getElementById('defaultTimezone');
        this.defaultFormatSelect = document.getElementById('defaultFormat');
        this.showDstInfoCheckbox = document.getElementById('showDstInfo');
        this.autoUpdateCheckbox = document.getElementById('autoUpdate');
        this.darkModeToggle = document.getElementById('darkModeToggle');

        // Swap button
        this.swapBtn = document.getElementById('swapBtn');

        // Tab navigation
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabPanels = document.querySelectorAll('.tab-panel');

        // Quick conversion buttons
        this.quickBtns = document.querySelectorAll('.quick-btn');
        this.quickTimeElements = {
            'America/New_York': document.getElementById('nyTime'),
            'Europe/London': document.getElementById('londonTime'),
            'Asia/Tokyo': document.getElementById('tokyoTime'),
            'Australia/Sydney': document.getElementById('sydneyTime')
        };
    }
    
    populateTimezones() {
        // Clear existing options
        this.fromTimezoneEl.innerHTML = '<option value="Asia/Manila" selected>GMT+8 (Asia/Manila)</option>';
        this.toTimezoneEl.innerHTML = '<option value="">Select timezone…</option>';
        this.defaultTimezoneSelect.innerHTML = '';
        
        // Group timezones by region
        const regions = {};
        TIMEZONE_DATA.timezones.forEach(tz => {
            if (!regions[tz.region]) {
                regions[tz.region] = [];
            }
            regions[tz.region].push(tz);
        });
        
        // Add options by region
        Object.keys(regions).forEach(region => {
            // Add region separator
            const optgroup = document.createElement('optgroup');
            optgroup.label = region;
            
            regions[region].forEach(tz => {
                const option = document.createElement('option');
                option.value = tz.value;
                option.textContent = tz.label;
                optgroup.appendChild(option);
            });
            
            this.fromTimezoneEl.appendChild(optgroup.cloneNode(true));
            this.toTimezoneEl.appendChild(optgroup.cloneNode(true));
            this.defaultTimezoneSelect.appendChild(optgroup.cloneNode(true));
        });
        
        // Set default values
        this.fromTimezoneEl.value = this.settings.defaultTimezone;
        this.defaultTimezoneSelect.value = this.settings.defaultTimezone;
        this.defaultFormatSelect.value = this.settings.defaultFormat;
        this.showDstInfoCheckbox.checked = this.settings.showDstInfo;
        this.autoUpdateCheckbox.checked = this.settings.autoUpdate;
        
        this.updateCurrentTimezone();
    }
    
    bindEvents() {
        // Format toggle
        this.formatBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.formatBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.is24HourFormat = e.target.dataset.format === '24';
                this.updateTimeDisplay();
                this.updateQuickConversions();
            });
        });
        
        // Convert button with ripple
        this.convertBtn.addEventListener('click', (e) => {
            this.triggerRipple(e);
            this.convertTime();
        });

        // Swap button
        if (this.swapBtn) {
            this.swapBtn.addEventListener('click', () => this.swapTimezones());
        }

        // Tab switching
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        
        // Settings modal
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeModalBtn.addEventListener('click', () => this.closeSettings());
        this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());

        // Dark mode toggle
        if (this.darkModeToggle) {
            const saved = localStorage.getItem('zonexDarkMode') === 'true';
            this.darkModeToggle.checked = saved;
            if (saved) document.documentElement.setAttribute('data-theme', 'dark');
            this.darkModeToggle.addEventListener('change', () => {
                const dark = this.darkModeToggle.checked;
                document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
                localStorage.setItem('zonexDarkMode', dark);
            });
        }
        
        // Modal backdrop click
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });
        
        // Quick conversion buttons
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const timezone = btn.dataset.timezone;
                this.toTimezoneEl.value = timezone;
                this.convertTime();
            });
        });

        // Time preset buttons
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.timeInputEl.value = btn.dataset.time;
                if (this.toTimezoneEl.value) this.convertTime();
                else this.updateQuickConversions();
            });
        });

        // ESC key closes modal and focuses settings btn
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.settingsModal.style.display === 'flex') {
                this.closeSettings();
            }
        });
        
        // Time input change
        this.timeInputEl.addEventListener('change', () => {
            if (this.toTimezoneEl.value) {
                this.convertTime();
            }
        });
        
        // Timezone selection change
        this.fromTimezoneEl.addEventListener('change', () => {
            this.updateCurrentTimezone();
            if (this.toTimezoneEl.value) {
                this.convertTime();
            }
        });
        
        this.toTimezoneEl.addEventListener('change', () => {
            if (this.toTimezoneEl.value) {
                this.convertTime();
            }
        });
        
        // Keyboard shortcuts (ESC is also handled above in bindEvents)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.settingsModal.style.display === 'flex') {
                this.closeSettings();
            }
        });
    }
    
    updateCurrentTime() {
        const now = new Date();
        const currentTz = this.fromTimezoneEl.value;
        
        // Get current time in selected timezone
        const timeString = this.formatTimeForTimezone(now, currentTz);
        this.currentTimeEl.textContent = timeString;
        
        // Update timezone display
        this.currentTimezoneEl.textContent = formatTimezoneName(currentTz);
    }
    
    updateCurrentTimezone() {
        const selectedTz = this.fromTimezoneEl.value;
        // Build a compact label for the header: "City · GMT+X"
        const fullLabel = formatTimezoneName(selectedTz);
        const offsetMatch = fullLabel.match(/GMT[+-][\d:]+/);
        const cityMatch = fullLabel.match(/\(([^,)]+)/);
        const city = cityMatch ? cityMatch[1].trim() : selectedTz.split('/').pop().replace(/_/g, ' ');
        const offset = offsetMatch ? offsetMatch[0] : '';
        this.currentTimezoneEl.textContent = offset ? `${city} · ${offset}` : city;
        this.updateCurrentTime();
    }
    
    updateTimeDisplay() {
        this.updateCurrentTime();
        this.updateQuickConversions();
        
        // Re-convert if there's an active conversion
        if (this.toTimezoneEl.value && this.resultSection.style.display !== 'none') {
            this.convertTime();
        }
    }
    
    updateQuickConversions() {
        const inputTime = this.timeInputEl.value;
        const fromTz = this.fromTimezoneEl.value;
        
        if (!inputTime) {
            // Show current time in each timezone
            const now = new Date();
            Object.keys(this.quickTimeElements).forEach(timezone => {
                const timeString = this.formatTimeForTimezone(now, timezone);
                this.quickTimeElements[timezone].textContent = timeString;
            });
        } else {
            // Show converted time in each timezone
            Object.keys(this.quickTimeElements).forEach(timezone => {
                const convertedTime = this.calculateConvertedTime(inputTime, fromTz, timezone);
                this.quickTimeElements[timezone].textContent = convertedTime;
            });
        }
    }
    
    convertTime() {
        const timeInput = this.timeInputEl.value;
        const fromTz = this.fromTimezoneEl.value;
        const toTz = this.toTimezoneEl.value;
        
        if (!timeInput || !toTz) {
            this.showNotification('Please enter a time and select a destination timezone', 'warning');
            return;
        }
        
        try {
            this.convertBtn.classList.add('loading');
            
            // Calculate converted time
            const convertedTime = this.calculateConvertedTime(timeInput, fromTz, toTz);
            
            // Display results
            this.displayConversionResult(timeInput, fromTz, convertedTime, toTz);
            
            // Show result section with animation
            this.resultSection.style.display = 'block';
            this.resultSection.style.animation = 'none';
            void this.resultSection.offsetHeight; // reflow
            this.resultSection.style.animation = '';
            
            // Update quick conversions
            this.updateQuickConversions();
            
        } catch (error) {
            this.showNotification('Error converting time. Please try again.', 'error');
            console.error('Conversion error:', error);
        } finally {
            this.convertBtn.classList.remove('loading');
        }
    }
    
    calculateConvertedTime(timeString, fromTimezone, toTimezone) {
        // Parse input time
        const [hours, minutes] = timeString.split(':').map(Number);
        
        // Create a date object for today with the input time
        const today = new Date();
        const inputDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
        
        // Get timezone offsets (including DST)
        const fromOffset = getCurrentOffset(fromTimezone, inputDate);
        const toOffset = getCurrentOffset(toTimezone, inputDate);
        
        // Calculate the difference
        const offsetDiff = toOffset - fromOffset;
        
        // Convert the time
        const convertedDate = new Date(inputDate.getTime() + (offsetDiff * 60 * 60 * 1000));
        
        // Format and return
        return this.formatTime(convertedDate);
    }
    
    formatTime(date, force24Hour = false) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        
        if (this.is24HourFormat || force24Hour) {
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        } else {
            const hour12 = hours % 12 || 12;
            const ampm = hours >= 12 ? 'PM' : 'AM';
            return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        }
    }
    
    formatTimeForTimezone(date, timezone) {
        try {
            // Use Intl.DateTimeFormat for accurate timezone conversion
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                hour: this.is24HourFormat ? '2-digit' : 'numeric',
                minute: '2-digit',
                hour12: !this.is24HourFormat
            });
            
            return formatter.format(date);
        } catch (error) {
            // Fallback to manual calculation
            console.warn('Timezone formatting error, using fallback:', error);
            const offset = getCurrentOffset(timezone, date);
            const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            const targetTime = new Date(utc + (offset * 3600000));
            return this.formatTime(targetTime);
        }
    }
    
    displayConversionResult(originalTime, fromTz, convertedTime, toTz) {
        // Original time
        this.originalTimeEl.textContent = this.formatInputTime(originalTime);
        this.originalTimezoneEl.textContent = formatTimezoneName(fromTz, false);
        
        // Converted time
        this.convertedTimeEl.textContent = convertedTime;
        this.convertedTimezoneEl.textContent = formatTimezoneName(toTz, false);
        
        // Additional information
        this.updateAdditionalInfo(fromTz, toTz);
    }
    
    formatInputTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return this.formatTime(date);
    }
    
    updateAdditionalInfo(fromTz, toTz) {
        if (!this.settings.showDstInfo) {
            document.getElementById('additionalInfo').style.display = 'none';
            return;
        }
        
        document.getElementById('additionalInfo').style.display = 'block';
        
        // DST information
        const fromDst = isDSTActive(fromTz);
        const toDst = isDSTActive(toTz);
        
        let dstInfo = '';
        if (fromDst || toDst) {
            const dstZones = [];
            if (fromDst) dstZones.push(formatTimezoneName(fromTz, false));
            if (toDst) dstZones.push(formatTimezoneName(toTz, false));
            dstInfo = `Daylight Saving Time is active in: ${dstZones.join(', ')}`;
        } else {
            dstInfo = 'No Daylight Saving Time adjustments applied';
        }
        
        this.dstInfoEl.textContent = dstInfo;
        
        // Date information
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = today.toLocaleDateString('en-US', options);
        this.dateInfoEl.textContent = `Conversion date: ${dateString}`;
    }
    
    switchTab(tabName) {
        this.tabBtns.forEach(b => {
            const active = b.dataset.tab === tabName;
            b.classList.toggle('active', active);
            b.setAttribute('aria-selected', active);
        });
        this.tabPanels.forEach(p => {
            p.style.display = p.id === 'tab-' + tabName ? 'block' : 'none';
        });
    }

    triggerRipple(e) {
        const btn = this.convertBtn;
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
        btn.appendChild(ripple);
        btn.classList.add('converting');
        ripple.addEventListener('animationend', () => {
            ripple.remove();
            btn.classList.remove('converting');
        });
    }

    swapTimezones() {
        const fromVal = this.fromTimezoneEl.value;
        const toVal = this.toTimezoneEl.value;
        if (!toVal) return;
        this.fromTimezoneEl.value = toVal;
        this.toTimezoneEl.value = fromVal;
        this.updateCurrentTimezone();
        if (this.resultSection.style.display !== 'none') {
            this.convertTime();
        }
    }

    openSettings() {
        this.settingsModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Focus the first focusable element for accessibility
        setTimeout(() => {
            const first = this.settingsModal.querySelector('select, input, button');
            if (first) first.focus();
        }, 50);
    }
    
    closeSettings() {
        this.settingsModal.style.display = 'none';
        document.body.style.overflow = '';
        this.settingsBtn.focus();
    }
    
    async saveSettings() {
        this.settings.defaultTimezone = this.defaultTimezoneSelect.value;
        this.settings.defaultFormat = this.defaultFormatSelect.value;
        this.settings.showDstInfo = this.showDstInfoCheckbox.checked;
        this.settings.autoUpdate = this.autoUpdateCheckbox.checked;
        
        // Apply format setting
        this.is24HourFormat = this.settings.defaultFormat === '24';
        this.formatBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.format === this.settings.defaultFormat);
        });
        
        // Apply default timezone
        this.fromTimezoneEl.value = this.settings.defaultTimezone;
        this.updateCurrentTimezone();
        
        // Apply auto-update setting
        if (this.settings.autoUpdate) {
            this.startAutoUpdate();
        } else {
            this.stopAutoUpdate();
        }
        
        // Save to storage
        await this.saveSettingsToStorage();
        
        // Update display
        this.updateTimeDisplay();
        this.updateQuickConversions();
        
        this.closeSettings();
        this.showNotification('Settings saved successfully!', 'success');
    }
    
    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get(['zonexSettings']);
            if (result.zonexSettings) {
                this.settings = { ...this.settings, ...result.zonexSettings };
            }
        } catch (error) {
            console.warn('Could not load settings from storage:', error);
        }
    }
    
    async saveSettingsToStorage() {
        try {
            await chrome.storage.sync.set({ zonexSettings: this.settings });
        } catch (error) {
            console.warn('Could not save settings to storage:', error);
        }
    }
    
    startAutoUpdate() {
        this.stopAutoUpdate(); // Clear any existing interval
        this.currentTimeInterval = setInterval(() => {
            this.updateCurrentTime();
            this.updateQuickConversions();
        }, 1000);
    }
    
    stopAutoUpdate() {
        if (this.currentTimeInterval) {
            clearInterval(this.currentTimeInterval);
            this.currentTimeInterval = null;
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        const bgMap = { success: '#059669', warning: '#d97706', error: '#dc2626', info: '#4f46e5' };
        notification.style.background = bgMap[type] || bgMap.info;

        // Add to DOM
        document.body.appendChild(notification);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.add('notification-exit');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new ZonexApp();
    
    // Make app globally accessible for debugging
    window.ZonexApp = app;
});

// Handle extension lifecycle
if (typeof chrome !== 'undefined' && chrome.runtime) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'updateTime') {
            if (window.ZonexApp) {
                window.ZonexApp.updateCurrentTime();
                window.ZonexApp.updateQuickConversions();
            }
        }
    });
}
