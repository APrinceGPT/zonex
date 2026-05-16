# Zonex - Professional Timezone Converter

A professional web browser extension for easy timezone conversion with daylight saving time support and user-friendly interface.

## Features

### 🌍 **Comprehensive Timezone Support**
- Over 50 major timezones worldwide
- Organized by regions (Asia-Pacific, Europe, Americas, Africa & Middle East)
- Accurate timezone data with proper GMT offsets

### ⏰ **Smart Time Conversion**
- Default timezone set to GMT+8 (Asia/Manila)
- Easy time input with visual time picker
- Instant conversion between any two timezones
- Real-time current time display

### 🌞 **Daylight Saving Time Support**
- Automatic DST detection for US, Europe, and Australia
- Accurate DST start/end dates calculation
- Visual indicators when DST is active
- Proper time adjustments during DST transitions

### 🕐 **Flexible Time Formats**
- Toggle between 12-hour and 24-hour formats
- Persistent format preferences
- Consistent formatting across all displays

### ⚡ **Quick Conversions**
- One-click conversion to popular timezones
- Quick access buttons for New York, London, Tokyo, and Sydney
- Real-time updates for quick conversion times

### ⚙️ **Customizable Settings**
- Set default timezone
- Choose preferred time format
- Toggle DST information display
- Auto-update current time
- Persistent settings storage

### 🎨 **Professional Design**
- Modern, clean interface
- Responsive design for different screen sizes
- Smooth animations and transitions
- Accessible design with proper focus states
- High contrast mode support

## Installation

### For Development
1. Clone or download this repository
2. Open Chrome/Edge and go to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the Zonex folder
5. The extension will appear in your browser toolbar

### For Production
1. Package the extension as a .crx file
2. Install through Chrome Web Store or Edge Add-ons store

## Usage

### Basic Conversion
1. Click the Zonex icon in your browser toolbar
2. Enter the time you want to convert (default shows 09:00)
3. Select the source timezone (defaults to GMT+8)
4. Choose the destination timezone
5. Click "Convert Time" to see the result

### Quick Conversions
- Use the quick conversion buttons for popular cities
- Times update automatically based on your input

### Settings
1. Click the settings gear icon in the header
2. Adjust your preferences:
   - Default timezone
   - Time format (12h/24h)
   - DST information display
   - Auto-update current time
3. Click "Save Settings"

## Technical Features

### Timezone Data
- Comprehensive timezone database with 50+ zones
- Accurate DST rules for different regions
- Support for half-hour offsets (e.g., GMT+5:30 for India)

### DST Calculations
- **US DST**: Second Sunday in March to First Sunday in November
- **Europe DST**: Last Sunday in March to Last Sunday in October  
- **Australia DST**: First Sunday in October to First Sunday in April

### Browser Compatibility
- Chrome 88+
- Edge 88+
- Firefox (with manifest v2 compatibility)
- Safari (with some limitations)

## File Structure

```
Zonex/
├── manifest.json          # Extension manifest
├── popup.html             # Main popup interface
├── css/
│   └── styles.css         # Professional styling
├── js/
│   ├── app.js            # Main application logic
│   └── timezones.js      # Timezone data and utilities
├── icons/                # Extension icons (16, 32, 48, 128px)
└── README.md            # This file
```

## Development

### Prerequisites
- Modern web browser with extension support
- Basic knowledge of HTML, CSS, and JavaScript

### Key Components

#### 1. `manifest.json`
- Extension configuration
- Permissions and icons
- Content Security Policy

#### 2. `popup.html`
- Main user interface
- Semantic HTML structure
- Accessibility features

#### 3. `css/styles.css`
- Professional responsive design
- Modern CSS with gradients and animations
- Dark mode and high contrast support

#### 4. `js/timezones.js`
- Comprehensive timezone database
- DST calculation utilities
- Helper functions for timezone operations

#### 5. `js/app.js`
- Main application logic
- Event handling and user interactions
- Settings management and persistence

### Customization

#### Adding New Timezones
Edit `js/timezones.js` and add entries to the `TIMEZONE_DATA.timezones` array:

```javascript
{
    value: 'Asia/Dhaka',
    label: 'GMT+6 (Dhaka, Bangladesh)',
    offset: 6,
    dst: false,
    region: 'Asia-Pacific'
}
```

#### Modifying DST Rules
Update the `TIMEZONE_DATA.dstRules` object with new rules or modify existing ones.

#### Styling Changes
Modify `css/styles.css` to customize the appearance. The design uses CSS custom properties for easy theming.

## Browser Permissions

The extension requires minimal permissions:
- `storage`: To save user preferences
- No network permissions required
- No access to browsing data

## Privacy

- All data is stored locally in the browser
- No external API calls or data transmission
- User preferences are synced via browser's built-in sync (if enabled)
- No tracking or analytics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across different browsers
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### Version 1.0.0
- Initial release
- Comprehensive timezone support
- DST calculations
- Professional UI design
- Settings persistence
- Quick conversions
- Accessibility features

## Support

For issues, feature requests, or questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include browser version and steps to reproduce

## Credits

- Icons: Font Awesome
- Fonts: Inter (Google Fonts)
- Timezone data: Based on IANA Time Zone Database
- Design inspiration: Modern web applications

---

**Zonex** - Making timezone conversions effortless and professional.
