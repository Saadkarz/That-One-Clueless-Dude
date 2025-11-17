# Contributing to Word Imposter 🎭

First off, thank you for considering contributing to Word Imposter! It's people like you that make this game even better.

## 🚀 How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues as you might find that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots or animated GIFs if possible**

### Suggesting Enhancements 💡

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests 🔧

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the JavaScript/React style guide
* Include screenshots and animated GIFs in your pull request whenever possible
* End all files with a newline
* Avoid platform-dependent code

## 🎨 Style Guidelines

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🚱 `:non-potable_water:` when plugging memory leaks
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * ⬆️ `:arrow_up:` when upgrading dependencies
    * ⬇️ `:arrow_down:` when downgrading dependencies
    * 👕 `:shirt:` when removing linter warnings

### JavaScript/React Style Guide

* Use 2 spaces for indentation
* Use semicolons
* Use single quotes for strings
* Use functional components with hooks
* Keep components small and focused
* Use descriptive variable names

## 📦 Project Structure

```
server/         # Backend Express + Socket.IO server
client/         # React frontend application
  src/
    components/ # React components for each game screen
    socket.js   # Socket.IO connection management
```

## 🧪 Testing

Before submitting a pull request, make sure to:

1. Test the game with 4+ players
2. Test all game phases (Lobby, Role, Hint, Discussion, Voting, Results)
3. Test edge cases (disconnections, invalid inputs, etc.)
4. Ensure the UI looks good on different screen sizes

## 📞 Questions?

Feel free to open an issue with your question or reach out to [@Saadkarz](https://github.com/Saadkarz)

## 🙏 Thank You!

Your contributions to Word Imposter are greatly appreciated! Every bit helps, and credit will always be given.

---

**Happy Coding!** 🎮
