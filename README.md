# french-mock-tef-writing

A static site that mimics the look and feel of the TEF Canada writing test interface for practicing the expression
écrite section (timer, word counter, on-screen accented keyboard).

# Development

The other goal of this project was to vibe code the whole thing using Claude Code. The prompt was:
```
Context: I'm planning to do a simple page that mimicks the TEF keyboard input page.
```

With the following prompts from Claude:
```
User answered Claude's questions:
· What should the page actually replicate from the TEF writing test interface? → Timed writing area, Word/character counter, Special character helper, It just mimicks the actual look.  I want it to work on Github Pages, so likely it will be a plain static site with no JS or CSS frameworks.
· What tech stack do you want for this? → Plain HTML/CSS/JS (Recommended)
```

I provided the screenshot from:
https://www.lefrancaisdesaffaires.fr/candidat/test-evaluation-francais/tef-canada/passation/

`Sonnet 5` was used that automatically set to high effort.

Afterwards, I only did some very minor touchups.

## Usage

No build step or server needed — just open `index.html` in your browser.
