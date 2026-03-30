# Sline TextMate Grammar

A professional TextMate grammar definition for the [Sline template language](https://developer.shopline.com/docs/sline/sline-overview) with support for syntax highlighting across multiple platforms.

![License](https://img.shields.io/badge/license-MIT-green)
![npm version](https://img.shields.io/npm/v/sline-textmate)

## Features

✨ **Comprehensive Syntax Highlighting**
- Full Sline template language support
- Comment detection and highlighting
- Schema block recognition
- Tag and object syntax highlighting

🔗 **Multi-Language Embedding**
- Sline in HTML
- Sline in JavaScript
- Sline in CSS
- Sline in JSON

🎯 **Platform Support**
- [Visual Studio Code](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#textmate-grammars)
- [GitHub.com](https://github.com/github-linguist/linguist)

## Installation

### Via npm

```bash
npm install sline-textmate
# or
yarn add sline-textmate
```

### Manual

Download the `sline.tmLanguage.json` file and place it in your TextMate/VSCode grammar folder.

## Usage

### In Visual Studio Code

1. Install the `sline-textmate` package:
   ```bash
   npm install --save-dev sline-textmate
   ```

2. Reference in your VSCode extension or copy the grammar file to your extension's grammars directory.

### Configuration Example

In your VSCode extension's `package.json`:

```json
{
  "contributes": {
    "grammars": [
      {
        "language": "sline",
        "scopeName": "text.html.sline",
        "path": "./node_modules/sline-textmate/grammars/sline.tmLanguage.json"
      }
    ]
  }
}
```

## Syntax Reference

### Comments

```sline
{{!-- This is a Sline comment --}}
```

### Conditional Tags

```html
<div>
  {{#if condition}}
    Content here
  {{/if}}
</div>
```

## Platform Compatibility

| Platform | Status | Notes |
|----------|--------|-------|
| Visual Studio Code | ✅ Fully Supported | Recommended way to use |
| GitHub Linguist | ✅ Supported | For syntax highlighting on GitHub |

## Related Projects

- [Shopline Developer Plugin](https://marketplace.visualstudio.com/items?itemName=shopline-developer.shopline-developer-plugin)
- [VSCode HTML Grammar](https://github.com/microsoft/vscode/tree/main/extensions/html)

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Update snapshots
npm run test:updateSnapshots
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Convert YAML grammar to JSON
npm run yamlToJson
```

### Project Structure

```
sline-textmate/
├── grammars/              # TextMate grammar files
│   ├── sline.tmLanguage.json
│   └── sline.tmLanguage.yaml
├── test/                  # Test files
│   ├── fixtures/          # Test fixtures
│   ├── snapshots/         # Test snapshots
│   └── helpers/           # Test helpers
├── scripts/               # Build scripts
└── package.json
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

## Support

For issues, questions, or suggestions, please [open an issue](https://github.com/shoplineos/sline-textmate/issues) on GitHub.

---

**Maintained by:** [Shopline](https://shopline.com)  
**Repository:** [github.com/shoplineos/sline-textmate](https://github.com/shoplineos/sline-textmate)
